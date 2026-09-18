#!/usr/bin/env node
// Write Figma variable values back into resources/styles/config/variables.scss.
//
// Usage: node figma/pull-tokens.mjs figma/figma-export.json [path/to/variables.scss] [--dry-run]
//
// Input is the JSON returned by figma/export-variables.plugin.js. For every token that has a
// `css` name and a matching `--css-name: …;` line in the :root block, the value is rewritten:
//   mobile == desktop  → `16px`, `1.4`, `#1d7c88`
//   mobile != desktop  → `#{sloped-size(16px, 24px)}` (em() wrapped for heading font sizes, as before)
//   alias              → `var(--target-css)`
//   shadow             → `Xpx Ypx Bpx rgba(0 0 0 / A%)`
// Lines whose value cannot be expressed (calc, currentcolor, the grid-column loop) and tokens
// with no CSS name (breakpoints) are left alone and reported. The SCSS stays the source of truth:
// review the diff, then commit.

import {readFileSync, writeFileSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const dry = process.argv.includes('--dry-run');
const inPath = resolve(args[0] ?? resolve(here, 'figma-export.json'));
const scssPath = resolve(
  args[1] ?? resolve(here, '../resources/styles/config/variables.scss'),
);

const data = JSON.parse(readFileSync(inPath, 'utf8'));
let scss = readFileSync(scssPath, 'utf8');
const byName = new Map(data.tokens.map((t) => [t.name, t]));

const fmt = (n) =>
  Number.isInteger(n) ? `${n}` : `${Math.round(n * 1000) / 1000}`;
function render(t, current) {
  if (t.type === 'ALIAS') {
    const target = byName.get(t.alias);
    return target && target.css ? `var(${target.css})` : null;
  }
  if (t.type === 'SHADOW')
    return `${t.x}px ${t.y}px ${t.blur}px rgba(0 0 0 / ${Math.round(t.alpha * 100)}%)`;
  if (t.type === 'COLOR') {
    const expand = (h) =>
      (h.length === 4 ?
        '#' +
        h
          .slice(1)
          .split('')
          .map((c) => c + c)
          .join('')
      : h
      ).toLowerCase();
    return expand(current) === expand(t.mobile) ? current : t.mobile;
  }
  if (t.type === 'STRING') {
    // font family: CSS matching is case-insensitive, keep the SCSS spelling if only case differs
    const next = `'${t.mobile}', sans-serif`;
    return current.toLowerCase() === next.toLowerCase() ? current : next;
  }
  if (t.type !== 'FLOAT') return null;
  const unitless = /line-height|columns$/.test(t.css);
  const unit = unitless ? '' : 'px';
  const wrapEm = /em\(/.test(current);
  const px = (n) => (wrapEm ? `em(${fmt(n)}px)` : `${fmt(n)}${unit}`);
  if (t.mobile === t.desktop) return px(t.mobile);
  return `#{sloped-size(${px(t.mobile)}, ${px(t.desktop)})}`;
}

const changed = [],
  untouched = [],
  missing = [];
for (const t of data.tokens) {
  if (!t.css) {
    untouched.push(`${t.name} (no CSS name)`);
    continue;
  }
  if (
    /^--grid-column-\d+$/.test(t.css) ||
    t.css === '--content-width' ||
    t.css === '--grid-gutter'
  )
    continue; // derived / handled below
  const re = new RegExp(
    `(^[ \\t]*${t.css.replace(/[-]/g, '\\-')}:\\s*)([^;]*?)(\\s*;)`,
    'm',
  );
  const m = scss.match(re);
  if (!m) {
    missing.push(t.css);
    continue;
  }
  const current = m[2]
    .replace(/\s+/g, ' ')
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .trim();
  const next = render(t, current);
  if (next === null) {
    untouched.push(`${t.css}: ${current}`);
    continue;
  }
  if (current !== next) {
    changed.push(`${t.css}: ${current} → ${next}`);
    scss = scss.replace(re, `$1${next}$3`);
  }
}
// --grid-gutter has a desktop override inside the medium media query.
const gg = byName.get('grid/gutter');
if (gg && gg.type === 'FLOAT') {
  const re = /(@include mq\(\$from: medium\)[\s\S]*?--grid-gutter:\s*)(\d+)px/;
  const m = scss.match(re);
  if (m && Number(m[2]) !== gg.desktop) {
    changed.push(`--grid-gutter (medium): ${m[2]}px → ${gg.desktop}px`);
    scss = scss.replace(re, `$1${gg.desktop}px`);
  }
  const re0 = /(^[ \t]*--grid-gutter:\s*)([^;]*)(;)/m;
  const m0 = scss.match(re0);
  if (m0 && m0[2] !== `${gg.mobile}px`) {
    changed.push(`--grid-gutter: ${m0[2]} → ${gg.mobile}px`);
    scss = scss.replace(re0, `$1${gg.mobile}px$3`);
  }
}

if (!dry && changed.length) writeFileSync(scssPath, scss);
console.log(
  `${changed.length} value(s) ${dry ? 'would change' : 'changed'} in ${scssPath}`,
);
for (const c of changed) console.log(`  ${c}`);
if (missing.length)
  console.log(`not in SCSS (new in Figma, add by hand): ${missing.join(', ')}`);
if (untouched.length)
  console.log(
    `left alone: ${untouched.length} (${untouched.slice(0, 6).join('; ')}${untouched.length > 6 ? '; …' : ''})`,
  );
