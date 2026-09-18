// Figma Plugin API script: upsert the GDS variable collection from figma/tokens.json.
//
// Run it through the Figma MCP `use_figma` tool (or the Figma console / Scripter) after
// inlining tokens.json:
//   node figma/render-push-script.mjs > /tmp/push.js
// Idempotent: variables are matched by name inside the "GDS" collection and updated in place.
// Shadow tokens become effect styles, everything else becomes a variable with
// Mobile and Desktop modes and WEB code syntax `var(--css-name)`.

const DATA = __TOKENS__;

const SCOPES = [
  [/^color\//, ['FRAME_FILL', 'SHAPE_FILL', 'TEXT_FILL', 'STROKE_COLOR']],
  [
    /^(button|caption|link)\/.*color$/,
    ['FRAME_FILL', 'SHAPE_FILL', 'TEXT_FILL', 'STROKE_COLOR'],
  ],
  [/font-family$/, ['FONT_FAMILY']],
  [/font-size$/, ['FONT_SIZE']],
  [/line-height$/, ['LINE_HEIGHT']],
  [/radius/, ['CORNER_RADIUS']],
  [/^(spacing|block-gutter)\//, ['GAP']],
  [
    /^(grid\/gutter|container\/|media-card\/|caption\/gutter|input\/padding|media-text\/(content-padding|column-gap|gutter)|layout\/viewport-gutter|outline\/offset|heading\/margin)/,
    ['GAP'],
  ],
  [
    /^(grid\/column|layout\/|media-text\/min-height|breakpoint\/|hamburger\/|grid\/columns)/,
    ['WIDTH_HEIGHT'],
  ],
];
function scopesFor(name) {
  for (const [re, s] of SCOPES) if (re.test(name)) return s;
  return ['WIDTH_HEIGHT', 'GAP'];
}
function hex(h) {
  h = h.replace('#', '');
  if (h.length === 3)
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  const n = parseInt(h.slice(0, 6), 16);
  return {
    r: ((n >> 16) & 255) / 255,
    g: ((n >> 8) & 255) / 255,
    b: (n & 255) / 255,
  };
}

// 1. Collection + modes
const collections = await figma.variables.getLocalVariableCollectionsAsync();
let col = collections.find((c) => c.name === DATA.collection);
if (!col) col = figma.variables.createVariableCollection(DATA.collection);
const modeIds = {};
DATA.modes.forEach((m, i) => {
  let mode = col.modes.find((x) => x.name === m);
  if (!mode) {
    if (i === 0) {
      col.renameMode(col.modes[0].modeId, m);
      mode = col.modes[0];
    } else {
      const id = col.addMode(m);
      mode = {modeId: id, name: m};
    }
  }
  modeIds[m] = mode.modeId;
});
const [MOBILE, DESKTOP] = DATA.modes.map((m) => modeIds[m]);

// 2. Variables (values first, aliases second so targets exist)
const existing = new Map();
for (const id of col.variableIds) {
  const v = await figma.variables.getVariableByIdAsync(id);
  if (v) existing.set(v.name, v);
}
const created = [],
  updated = [];
function upsert(name, type) {
  let v = existing.get(name);
  if (v && v.resolvedType !== type) {
    v.remove();
    v = null;
  }
  if (!v) {
    v = figma.variables.createVariable(name, col, type);
    existing.set(name, v);
    created.push(name);
  } else updated.push(name);
  return v;
}
const plain = DATA.tokens.filter(
  (t) => t.type !== 'ALIAS' && t.type !== 'SHADOW',
);
const aliases = DATA.tokens.filter((t) => t.type === 'ALIAS');
for (const t of plain) {
  const v = upsert(t.name, t.type);
  const val = (m) => (t.type === 'COLOR' ? hex(t[m]) : t[m]);
  v.setValueForMode(MOBILE, val('mobile'));
  v.setValueForMode(DESKTOP, val('desktop'));
  v.scopes = scopesFor(t.name);
  if (t.css) v.setVariableCodeSyntax('WEB', `var(${t.css})`);
  v.description = t.source ? `${t.css ?? ''} = ${t.source}`.trim() : '';
}
// Aliases may point at other aliases, so loop until nothing new resolves.
let pending = aliases.slice();
for (let pass = 0; pass < 5 && pending.length; pass++) {
  pending = pending.filter((t) => !existing.get(t.alias));
  for (const t of aliases.filter(
    (t) => existing.get(t.alias) && !existing.get(t.name),
  ))
    upsertAlias(t);
}
const unresolved = pending.map((t) => `${t.name} → ${t.alias}`);
function upsertAlias(t) {
  const target = existing.get(t.alias);
  const v = upsert(t.name, target.resolvedType);
  const ref = {type: 'VARIABLE_ALIAS', id: target.id};
  v.setValueForMode(MOBILE, ref);
  v.setValueForMode(DESKTOP, ref);
  v.scopes = scopesFor(t.name);
  if (t.css) v.setVariableCodeSyntax('WEB', `var(${t.css})`);
  v.description = `${t.css} = ${t.source}`;
}

// 3. Shadows → effect styles
const effects = figma.getLocalEffectStyles();
const styles = [];
for (const t of DATA.tokens.filter((t) => t.type === 'SHADOW')) {
  const name = t.name.replace(/^shadow\//, 'Shadow/');
  let s = effects.find((e) => e.name === name);
  if (!s) {
    s = figma.createEffectStyle();
    s.name = name;
  }
  s.effects = [
    {
      type: 'DROP_SHADOW',
      color: {r: 0, g: 0, b: 0, a: t.alpha},
      offset: {x: t.x, y: t.y},
      radius: t.blur,
      spread: 0,
      visible: true,
      blendMode: 'NORMAL',
    },
  ];
  s.description = `${t.css} = ${t.source}`;
  styles.push(name);
}

return {
  collection: col.id,
  modes: modeIds,
  created: created.length,
  updated: updated.length,
  unresolved,
  effectStyles: styles,
};
