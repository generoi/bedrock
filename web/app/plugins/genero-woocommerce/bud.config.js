import {relative} from 'node:path';
import BudBlock from '../../themes/gds/build/bud-block.js';

/**
 * @type {import('@roots/bud').Config}
 */
export default async (app) => {
  await app.extensions.add(BudBlock);
  app
    .entry('app', ['styles/woocommerce'])
    .setPath({'@styles': `../../themes/gds/resources/styles`});

  await Promise.all(
    app.globSync('resources/blocks/*/*.json').map(async (file) => {
      return app.block(relative(app.path('@src'), file));
    }),
  );

  app.when(app.isProduction, app.hash);
  app.build.items.precss.setLoader('minicss');
  app.hooks.on(
    `build.output.uniqueName`,
    () => '@roots/bud/genero-woocommerce',
  );
  app.extensions.get('@roots/bud-eslint').setUseEslintrc(true);
  app.hooks.action('build.before', (bud) => {
    bud.extensions
      .get('@roots/bud-extensions/mini-css-extract-plugin')
      .enable();
  });
};
