#!/usr/bin/env node
// Print the Figma plugin script with tokens.json inlined, ready for `use_figma`.
// Usage: node figma/render-push-script.mjs [tokens.json] > push.js
import {readFileSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const here = dirname(fileURLToPath(import.meta.url));
const tokens = JSON.parse(
  readFileSync(
    resolve(process.argv[2] ?? resolve(here, 'tokens.json')),
    'utf8',
  ),
);
const slim = {
  ...tokens,
  skipped: undefined,
  tokens: tokens.tokens.map(
    ({name, css, source, type, alias, mobile, desktop, x, y, blur, alpha}) => ({
      name,
      css,
      source,
      type,
      alias,
      mobile,
      desktop,
      x,
      y,
      blur,
      alpha,
    }),
  ),
};
process.stdout.write(
  readFileSync(resolve(here, 'push-variables.plugin.js'), 'utf8').replace(
    'const DATA = __TOKENS__;',
    'const DATA = ' + JSON.stringify(slim) + ';',
  ),
);
