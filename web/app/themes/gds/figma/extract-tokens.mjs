#!/usr/bin/env node
// Extract design tokens from resources/styles/config/variables.scss into figma/tokens.json.
//
// Usage: node figma/extract-tokens.mjs [path/to/variables.scss] [out.json]
//
// The SCSS file is the source of truth. This reads every `--custom-property: value;`
// inside the `:root` block and turns it into a token with a Mobile and a Desktop value:
//   - `#{sloped-size(8px, 12px)}`  → mobile 8, desktop 12 (fluid between 375px and 1400px)
//   - `em(40px)` inside sloped-size → 40 (px)
//   - `16px` / `1.4` / `#fff`        → same value in both modes
//   - `var(--other)`                 → alias to the other token
//   - `'Open sans', sans-serif`      → string (first family)
// Values it cannot express as a Figma variable (calc(), rgba() shadows, the grid-column
// loop, media-query overrides) are listed under `skipped` so nothing is lost silently.

import {readFileSync, writeFileSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const scssPath = resolve(
  process.argv[2] ?? resolve(here, '../resources/styles/config/variables.scss'),
);
const outPath = resolve(process.argv[3] ?? resolve(here, 'tokens.json'));

const scss = readFileSync(scssPath, 'utf8');
const rootStart = scss.indexOf(':root {');
const mqStart = scss.indexOf('@include mq(', rootStart);
const rootBody = scss.slice(rootStart, mqStart > 0 ? mqStart : undefined);

// Figma variable name from a CSS custom property.
// `--gds-color-primary` → `color/primary`, `--block-gutter-m` → `block-gutter/m`,
// `--gds-heading-m-font-size` → `heading/m/font-size`.
const GROUPS = [
  ['gds-color-', 'color/'],
  ['gds-spacing-', 'spacing/'],
  ['block-gutter-pair-', 'block-gutter/pair/'],
  ['block-gutter-', 'block-gutter/'],
  ['block-gutter', 'block-gutter/default'],
  ['gds-heading-', 'heading/'],
  ['gds-text-', 'text/'],
  ['gds-border-radius-', 'radius/'],
  ['gds-border-radius', 'radius/default'],
  ['gds-button-', 'button/'],
  ['gds-input-', 'input/'],
  ['gds-caption-', 'caption/'],
  ['gds-hamburger-', 'hamburger/'],
  ['gds-link-', 'link/'],
  ['gds-container-', 'container/'],
  ['gds-media-card-', 'media-card/'],
  ['media-text-', 'media-text/'],
  ['grid-', 'grid/'],
  ['viewport-', 'layout/viewport-'],
  ['alignwide-', 'layout/alignwide-'],
  ['alignfull-', 'layout/alignfull-'],
  ['content-', 'layout/content-'],
  ['gds-min-', 'layout/min-'],
  ['gds-outline-', 'outline/'],
  ['gds-outline', 'outline/default'],
  ['gds-box-shadow--', 'shadow/'],
  ['gds-box-shadow', 'shadow/default'],
];
const SIZE_SUFFIX =
  /^(xxxs|xxs|xs|s|m|l|xl|xxl|xxxl)-(font-size|font-family|line-height|margin-start|margin-end)$/;

function figmaName(prop) {
  const bare = prop.replace(/^--/, '');
  for (const [prefix, group] of GROUPS) {
    if (bare.startsWith(prefix)) {
      let rest = bare.slice(prefix.length);
      const m = rest.match(SIZE_SUFFIX);
      if (m) rest = `${m[1]}/${m[2]}`;
      return group + rest;
    }
  }
  return bare;
}

function px(v) {
  v = v.trim();
  let m =
    v.match(/^em\((\d+(?:\.\d+)?)px\)$/) ||
    v.match(/^rem\((\d+(?:\.\d+)?)px\)$/);
  if (m) return Number(m[1]);
  m = v.match(/^(-?\d+(?:\.\d+)?)px$/);
  if (m) return Number(m[1]);
  m = v.match(/^(-?\d+(?:\.\d+)?)$/);
  if (m) return Number(m[1]);
  return null;
}

const tokens = [];
const skipped = [];
const re = /^\s*(--[a-z0-9-]+):\s*([\s\S]*?);\s*(?:\/\/.*)?$/gm;
let m;
while ((m = re.exec(rootBody))) {
  const [, prop, rawValue] = m;
  const value = rawValue.replace(/\s+/g, ' ').trim();
  if (prop.includes('#{$i}')) continue;
  const name = figmaName(prop);
  const base = {name, css: prop, source: value};

  let s;
  if ((s = value.match(/^#\{sloped-size\((.*)\)\}$/))) {
    const [a, b] = s[1].split(',').map(px);
    if (a === null || b === null) {
      skipped.push({...base, reason: 'sloped-size with non-px value'});
      continue;
    }
    tokens.push({...base, type: 'FLOAT', unit: 'px', mobile: a, desktop: b});
  } else if ((s = value.match(/^var\(\s*(--[a-z0-9-]+)\s*\)$/))) {
    tokens.push({...base, type: 'ALIAS', alias: figmaName(s[1])});
  } else if (/^#[0-9a-f]{3,8}$/i.test(value)) {
    tokens.push({...base, type: 'COLOR', mobile: value, desktop: value});
  } else if (/^'[^']+'/.test(value)) {
    const fam = value.match(/^'([^']+)'/)[1];
    tokens.push({...base, type: 'STRING', mobile: fam, desktop: fam});
  } else if (
    (s = value.match(/^(-?\d+)px (-?\d+)px (\d+)px rgba\(0 0 0 \/ (\d+)%\)$/))
  ) {
    tokens.push({
      ...base,
      type: 'SHADOW',
      x: Number(s[1]),
      y: Number(s[2]),
      blur: Number(s[3]),
      alpha: Number(s[4]) / 100,
    });
  } else if (px(value) !== null) {
    const n = px(value);
    tokens.push({
      ...base,
      type: 'FLOAT',
      unit: /px$/.test(value) ? 'px' : '',
      mobile: n,
      desktop: n,
    });
  } else {
    skipped.push({...base, reason: 'not expressible as a variable'});
  }
}

// Media-query override in the same file: --grid-gutter is 16px on mobile and 24px from `medium`.
const gg = tokens.find((t) => t.css === '--grid-gutter');
const mqGutter = scss.match(
  /@include mq\(\$from: medium\)[\s\S]*?--grid-gutter:\s*(\d+)px/,
);
if (gg && mqGutter) gg.desktop = Number(mqGutter[1]);

// The `@for $i from 1 through 12 { --grid-column-#{$i} }` loop: column * i + gutter * (i - 1), per mode.
const col = tokens.find((t) => t.css === '--grid-column');
if (col && gg) {
  for (let i = 1; i <= 12; i++) {
    tokens.push({
      name: `grid/column-${i}`,
      css: `--grid-column-${i}`,
      source: 'calc(var(--grid-column) * i + var(--grid-gutter) * (i - 1))',
      type: 'FLOAT',
      unit: 'px',
      mobile: col.mobile * i + gg.mobile * (i - 1),
      desktop: col.desktop * i + gg.desktop * (i - 1),
    });
  }
}
// --content-width is only set from `medium` up: alias to grid/column-8.
const cw = scss.match(
  /@include mq\(\$from: medium\)[\s\S]*?--content-width:\s*var\((--[a-z0-9-]+)\)/,
);
if (cw)
  tokens.push({
    name: 'layout/content-width',
    css: '--content-width',
    source: `var(${cw[1]})`,
    type: 'ALIAS',
    alias: figmaName(cw[1]),
  });

// Breakpoints from resources/styles/common/breakpoints.scss (WordPress base-styles values inlined).
const WP = {
  'wp.$break-small': 600,
  'wp.$break-medium': 782,
  'wp.$break-large': 960,
  'wp.$break-xlarge': 1080,
  'wp.$break-wide': 1280,
  'wp.$break-huge': 1440,
};
try {
  const bp = readFileSync(
    resolve(dirname(scssPath), '../common/breakpoints.scss'),
    'utf8',
  );
  const block = bp.match(/\$mq-breakpoints:\s*\(([\s\S]*?)\);/);
  if (block) {
    for (const line of block[1].split('\n')) {
      const b = line.match(/^\s*([a-z]+):\s*([^,]+),?/);
      if (!b) continue;
      const v = px(b[2]) ?? WP[b[2].trim()];
      if (v != null)
        tokens.push({
          name: `breakpoint/${b[1]}`,
          css: null,
          source: b[2].trim(),
          type: 'FLOAT',
          unit: 'px',
          mobile: v,
          desktop: v,
        });
    }
  }
} catch {}

// Which collection a token lives in. "GDS Responsive" has Mobile/Desktop modes and holds every
// fluid value, every font size (so all sizes are in one place), the spacing/gutter/grid groups and
// anything aliasing those. "GDS" has a single mode for colours, radii, breakpoints and fixed values.
const byName = new Map(tokens.map((t) => [t.name, t]));
const responsive = (t) =>
  /font-size$/.test(t.name) ||
  /^(spacing|block-gutter|grid\/column-\d)/.test(t.name) ||
  (t.type === 'FLOAT' && t.mobile !== t.desktop) ||
  (t.type === 'ALIAS' &&
    byName.get(t.alias) &&
    responsive(byName.get(t.alias)));
for (const t of tokens)
  if (t.type !== 'SHADOW')
    t.collection = responsive(t) ? 'GDS Responsive' : 'GDS';

const out = {
  $schema: 'gds-figma-tokens/1',
  generatedFrom: scssPath.replace(process.cwd() + '/', ''),
  fluid: {minViewport: 375, maxViewport: 1400},
  collections: {GDS: ['Value'], 'GDS Responsive': ['Mobile', 'Desktop']},
  tokens,
  skipped,
};
writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n');
console.log(`${tokens.length} tokens, ${skipped.length} skipped → ${outPath}`);
for (const s of skipped) console.log(`  skipped ${s.css}: ${s.source}`);
