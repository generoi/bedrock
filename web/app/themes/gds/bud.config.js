import {homedir} from 'os';
import {resolve, relative, parse as parsePath} from 'node:path'
import BudBlock from './build/bud-block.js'
import BudCopyWithoutManifest from './build/bud-copy-without-manifest.js'

/**
 * @type {import('@roots/bud').Config}
 */
export default async (app) => {
  app.extensions.add(BudBlock);
  app.extensions.add(BudCopyWithoutManifest);

  app
    .entry('scripts/app', ['@scripts/app'])
    .entry('styles/app', ['@styles/app'])
    .entry('scripts/editor', ['@scripts/editor'])
    .entry('styles/editor', ['@styles/editor'])
    .entry('styles/editor-overrides', ['@styles/editor-overrides'])
    .entry('styles/woocommerce', ['@styles/woocommerce'])
    .assets(['images', 'fonts']);

  app.copyFile('jquery.min.js', await app.module.getDirectory(`jquery/dist`));
  // @todo icons
  //app.copyDir(['svgs', 'icons'], await app.module.getDirectory(`@fortawesome/fontawesome-pro`));
  app.copyWithoutManifest('svgs', await app.module.getDirectory(`@fortawesome/fontawesome-pro`));

  app
    .alias('@', resolve('resources/styles'))
    .alias('~', resolve('resources/scripts'))
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

  app.build.items.precss.setLoader('minicss');
  app.hooks.action('build.before', (bud) => {
    bud.extensions.get('@roots/bud-extensions/mini-css-extract-plugin').enable(true);
  });

  app
    .setPath({'@certs': `${homedir()}/Library/Application Support/mkcert`})
    .serve({
      host: 'gdsbedrock.ddev.site',
      cert: app.path('@certs/rootCA.pem'),
      key: app.path('@certs/rootCA-key.pem'),
    });

  app
    .setUrl('http://localhost:3000')
    .setProxyUrl('https://gdsbedrock.ddev.site')
    .watch(['resources/views', 'app']);
};
