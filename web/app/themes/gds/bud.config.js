import {homedir} from 'os';
import {resolve, relative} from 'node:path';
import BudBlock from './build/bud-block.js';

/**
 * @type {import('@roots/bud').Config}
 */
export default async (app) => {
  app.extensions.add(BudBlock);

  app
    .entry('scripts/app', ['@scripts/app'])
    .entry('styles/app', ['@styles/app'])
    .entry('scripts/editor', ['@scripts/editor'])
    .entry('styles/editor', ['@styles/editor'])
    .entry('styles/editor-overrides', ['@styles/editor-overrides'])
    .entry('styles/woocommerce', ['@styles/woocommerce'])
    .assets(['images', 'fonts'])
    .copyFile('jquery.min.js', await app.module.getDirectory(`jquery/dist`));

  const fontawesomeDir = await app.module.getDirectory(
    `@fortawesome/fontawesome-pro`,
  );

  [
    'svgs/brands/facebook.svg',
    'svgs/brands/twitter.svg',
    'svgs/brands/youtube.svg',
    'svgs/regular/envelope.svg',
    'svgs/regular/link.svg',
    'svgs/regular/share-nodes.svg',
    'svgs/solid/calendar-week.svg',
    'svgs/solid/circle-check.svg',
    'svgs/solid/circle-exclamation.svg',
    'svgs/solid/circle-info.svg',
    'svgs/solid/check.svg',
    'svgs/solid/chevron-down.svg',
    'svgs/solid/chevron-left.svg',
    'svgs/solid/chevron-right.svg',
    'svgs/solid/magnifying-glass.svg',
    'svgs/solid/star.svg',
    'svgs/solid/xmark.svg',
  ].forEach((file) => app.copyFile(file, fontawesomeDir));

  app
    .alias('@blocks', resolve('resources/blocks'))
    .alias('@components', resolve('resources/components'));

  app.globSync('resources/styles/blocks/*').forEach((file) => {
    app.entry(relative(app.path('@src'), file));
  });
  app.globSync('resources/blocks/*/*.json').forEach((file) => {
    app.block(relative(app.path('@src'), file));
  });
  app.globSync('resources/components/*/*.{js,scss}').forEach((file) => {
    app.entry(relative(app.path('@src'), file));
  });

  app.setPublicPath('/app/themes/gds/public/');

  app
    .setPath({'@certs': `${homedir()}/.ddev/traefik/certs`})
    .serve({
      host: 'gdsbedrock.ddev.site',
      cert: app.path('@certs/default_cert.crt'),
      key: app.path('@certs/default_key.key'),
    })
    .setUrl('https://localhost:3000')
    .setProxyUrl('https://gdsbedrock.ddev.site')
    .watch(['resources/views', 'app']);

  app.postcss
    .use((plugins) => [...plugins, 'postcss-inline-svg'])
    .setPlugin('postcss-inline-svg', [
      'postcss-inline-svg',
      {
        paths: ['resources', fontawesomeDir],
        encode(code) {
          return code
            .replace(/\(/g, '%28')
            .replace(/\)/g, '%29')
            .replace(/%/g, '%25')
            .replace(/</g, '%3C')
            .replace(/>/g, '%3E')
            .replace(/&/g, '%26')
            .replace(/#/g, '%23')
            .replace(/{/g, '%7B')
            .replace(/}/g, '%7D');
        },
      },
    ]);

  app.build.items.precss.setLoader('minicss');
  app.hooks.action('build.before', (bud) => {
    bud.extensions
      .get('@roots/bud-extensions/mini-css-extract-plugin')
      .enable();
  });
};
