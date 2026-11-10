import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

/**
 * Warn loudly during a build. A block.json that promises an asset webpack
 * never emits produces no error anywhere — not at build time, not at
 * registration — the asset simply never loads, so make it visible here.
 *
 * @param {string} message
 */
function warn(message) {
  // eslint-disable-next-line no-console
  console.warn(`\n[discoverBlocks] ${message}\n`);
}

/**
 * Discover blocks and generate webpack entry points from a blocks directory.
 * Reads block.json to auto-detect editorScript, script/viewScript, editorStyle,
 * style and render.
 *
 * @param {string} blocksDir  - Absolute path to the blocks directory
 * @param {string} contextDir - Absolute path to the webpack context (package root)
 * @returns {{ entry: Object, blockNames: string[], copyPatterns: Object[] }}
 */
export function discoverBlocks(blocksDir, contextDir) {
  if (!fs.existsSync(blocksDir)) {
    return {entry: {}, blockNames: [], copyPatterns: []};
  }

  const blockNames = fs
    .readdirSync(blocksDir, {withFileTypes: true})
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const entry = {};
  const copyPatterns = [];
  const rel = path.relative(contextDir, blocksDir);

  for (const name of blockNames) {
    const jsonPath = path.join(blocksDir, name, 'block.json');
    if (!fs.existsSync(jsonPath)) continue;

    const blockJson = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    const has = (file) => fs.existsSync(path.join(blocksDir, name, file));

    // Editor script. Blocks are split between .jsx and plain .js entry
    // points, so accept either — checking only for .jsx silently skips any
    // block written as index.js.
    const indexFile = ['index.jsx', 'index.js'].find(has);
    if (indexFile) {
      entry[`blocks/${name}/index`] = `./${rel}/${name}/${indexFile}`;
    }

    // `script` and `viewScript` are separate assets with separate
    // conventional filenames — treating both as script.js meant a block
    // using viewScript/view.js would build nothing at all.
    for (const [field, source, output] of [
      ['script', 'script.js', 'script'],
      ['viewScript', 'view.js', 'view'],
      ['editorStyle', 'editor.scss', 'editor'],
    ]) {
      if (!blockJson[field]) continue;

      if (!has(source)) {
        // Declared but unbuildable. Left silent, block.json would ship
        // pointing at a file webpack never emitted and the asset would
        // vanish at runtime with no error anywhere.
        warn(
          `block "${name}" declares ${field} but has no ${source} — asset will be missing`,
        );
        continue;
      }

      entry[`blocks/${name}/${output}`] = `./${rel}/${name}/${source}`;
    }

    // A block may render through a PHP file instead of a render_callback;
    // block.json resolves `render` relative to its own directory, so the
    // file has to be copied next to it.
    if (typeof blockJson.render === 'string') {
      const renderFile = blockJson.render.replace(/^file:\.?\/?/, '');

      if (has(renderFile)) {
        copyPatterns.push({
          from: `${rel}/${name}/${renderFile}`,
          to: `blocks/${name}/${renderFile}`,
        });
      } else {
        warn(
          `block "${name}" declares render "${blockJson.render}" but ${renderFile} does not exist`,
        );
      }
    }

    // Front-end block styles are NOT entries of their own. @wordpress/scripts
    // splits any module named style.(s)css into its own chunk named
    // `<dirname>/style-<basename>`, so an entry `blocks/<name>/style` would
    // emit `style-style.css`. The working convention is that the block's
    // entry point imports ./style.scss and webpack extracts it to
    // `blocks/<name>/style-index.css`, which block.json points at.
    if (typeof blockJson.style === 'string') {
      if (!has('style.scss')) {
        warn(
          `block "${name}" declares style but has no style.scss — asset will be missing`,
        );
      } else if (!indexFile) {
        // No JS entry point to import the stylesheet from. Point the `index`
        // entry straight at style.scss: the split chunk is still named after
        // the entry, so the emitted CSS is `style-index.css` exactly as for
        // blocks that do have an index — one filename convention everywhere.
        // Webpack also emits a small stub `index.js`, which is harmless.
        entry[`blocks/${name}/index`] = `./${rel}/${name}/style.scss`;
      } else if (
        !fs
          .readFileSync(path.join(blocksDir, name, indexFile), 'utf-8')
          .includes('style.scss')
      ) {
        warn(
          `block "${name}" declares style but ${indexFile} never imports ./style.scss — no CSS will be emitted`,
        );
      }

      if (!blockJson.style.includes('style-index.css')) {
        warn(
          `block "${name}" declares style "${blockJson.style}" — the build emits style-index.css`,
        );
      }
    }

    copyPatterns.push({
      from: `${rel}/${name}/block.json`,
      to: `blocks/${name}/block.json`,
    });
  }

  return {entry, blockNames, copyPatterns};
}

/**
 * Webpack plugin that generates a manifest.json with content hashes and
 * JS dependency info (from .asset.php files generated by @wordpress/scripts).
 */
export class ManifestPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync(
      'ManifestPlugin',
      (compilation, callback) => {
        const outputPath = compiler.options.output.path;
        const manifest = {};
        const skipExts = new Set(['.php', '.json']);
        const assetExts = new Set([
          '.js',
          '.css',
          '.svg',
          '.png',
          '.jpg',
          '.jpeg',
          '.gif',
          '.webp',
          '.ico',
          '.woff',
          '.woff2',
          '.ttf',
          '.eot',
        ]);

        function walkDir(dir, base = '') {
          for (const entry of fs.readdirSync(dir, {
            withFileTypes: true,
          })) {
            const fullPath = path.join(dir, entry.name);
            const relPath = base ? `${base}/${entry.name}` : entry.name;

            if (entry.isDirectory()) {
              walkDir(fullPath, relPath);
              continue;
            }

            const ext = path.extname(entry.name);
            if (skipExts.has(ext) || !assetExts.has(ext)) continue;
            if (entry.name === 'manifest.json') continue;

            const content = fs.readFileSync(fullPath);
            const hash = crypto
              .createHash('md5')
              .update(content)
              .digest('hex')
              .slice(0, 8);

            const manifestEntry = {hash};

            if (ext === '.js') {
              const assetPhp = fullPath.replace(/\.js$/, '.asset.php');
              if (fs.existsSync(assetPhp)) {
                const assetContent = fs.readFileSync(assetPhp, 'utf-8');
                const depsMatch = assetContent.match(
                  /'dependencies'\s*=>\s*array\(([^)]*)\)/,
                );
                if (depsMatch) {
                  const deps = depsMatch[1]
                    .match(/'([^']+)'/g)
                    ?.map((s) => s.replace(/'/g, ''));
                  if (deps?.length) {
                    manifestEntry.dependencies = deps;
                  }
                }
              }
            }

            manifest[relPath] = manifestEntry;
          }
        }

        try {
          walkDir(outputPath);
          fs.writeFileSync(
            path.join(outputPath, 'manifest.json'),
            JSON.stringify(manifest, null, 2),
          );
        } catch (err) {
          compilation.warnings.push(
            new Error(`ManifestPlugin: ${err.message}`),
          );
        }

        callback();
      },
    );
  }
}

/**
 * Inject postcss-inline-svg into the PostCSS plugin chain before autoprefixer.
 * Allows using svg-load() in SCSS for CSS mask/background images.
 *
 * @param {Object} defaultConfig   - The @wordpress/scripts default webpack config
 * @param {Object} inlineSvgPlugin - A configured postcss-inline-svg plugin instance
 */
export function injectPostcssInlineSvg(defaultConfig, inlineSvgPlugin) {
  for (const rule of defaultConfig.module.rules) {
    for (const loader of rule.use || []) {
      if (!loader.loader?.includes('postcss-loader')) continue;
      const plugins = loader.options.postcssOptions.plugins;
      const idx = plugins.findIndex((p) => p?.postcssPlugin === 'autoprefixer');
      plugins.splice(idx >= 0 ? idx : 0, 0, inlineSvgPlugin);
    }
  }
}
