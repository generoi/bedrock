// Figma Plugin API script (read-only): dump the GDS and GDS Responsive collections as tokens JSON.
//
// Run through the Figma MCP `use_figma` tool, save the returned JSON as figma/figma-export.json,
// then `node figma/pull-tokens.mjs figma/figma-export.json` writes the values back into
// resources/styles/config/variables.scss. Same shape as tokens.json so the two can be diffed.

const all = await figma.variables.getLocalVariableCollectionsAsync();
const gds = all.filter((c) => c.name === 'GDS' || c.name === 'GDS Responsive');
if (!gds.length)
  throw new Error(
    'No "GDS" / "GDS Responsive" variable collection in this file',
  );
const byId = new Map();
for (const col of gds)
  for (const id of col.variableIds) {
    const v = await figma.variables.getVariableByIdAsync(id);
    if (v) byId.set(v.id, {v, col});
  }
const hex = (c) =>
  '#' +
  [c.r, c.g, c.b]
    .map((x) =>
      Math.round(x * 255)
        .toString(16)
        .padStart(2, '0'),
    )
    .join('');
const tokens = [];
for (const {v, col} of byId.values()) {
  const css =
    v.codeSyntax && v.codeSyntax.WEB ?
      v.codeSyntax.WEB.replace(/^var\((.*)\)$/, '$1')
    : null;
  const first = v.valuesByMode[col.modes[0].modeId];
  if (first && typeof first === 'object' && first.type === 'VARIABLE_ALIAS') {
    const target = byId.get(first.id);
    tokens.push({
      name: v.name,
      css,
      type: 'ALIAS',
      collection: col.name,
      alias: target ? target.v.name : first.id,
    });
    continue;
  }
  const out = {name: v.name, css, type: v.resolvedType, collection: col.name};
  const val = (m) => {
    const x = v.valuesByMode[m.modeId];
    return v.resolvedType === 'COLOR' ? hex(x) : x;
  };
  if (col.modes.length === 1) {
    out.mobile = out.desktop = val(col.modes[0]);
  } else
    col.modes.forEach((m) => {
      out[m.name.toLowerCase()] = val(m);
    });
  tokens.push(out);
}
const shadows = figma
  .getLocalEffectStyles()
  .filter((s) => s.name.startsWith('Shadow/'))
  .map((s) => {
    const e = s.effects[0];
    return {
      name: s.name.replace(/^Shadow\//, 'shadow/'),
      css: (s.description.match(/^(--[a-z0-9-]+)/) || [])[1] || null,
      type: 'SHADOW',
      x: e.offset.x,
      y: e.offset.y,
      blur: e.radius,
      alpha: e.color.a,
    };
  });
return {
  $schema: 'gds-figma-tokens/1',
  exportedFrom: figma.root.name,
  collection: col.name,
  modes,
  tokens: tokens.concat(shadows),
};
