import {relative} from 'node:path';
import BudBlock from '../../themes/gds/build/bud-block.js';

/**
 * @type {import('@roots/bud').Config}
 */
export default async (app) => {
  await app.extensions.add(BudBlock);
  app
    // .entry('scripts/app', ['@src/scripts/app'])
    .entry('styles/app', ['@src/styles/woocommerce'])
    .entry('scripts/editor', ['@src/scripts/editor'])
    // .entry('styles/editor', ['@src/styles/editor'])
    .setPath({
      '@src': `resources`,
      '@styles': `../../themes/gds/resources/styles`,
      '@scripts': `../../themes/gds/resources/scripts`,
      '@blocks': `../../themes/gds/resources/blocks`,
    });

  await Promise.all(
    app.globSync('resources/blocks/*/*.json').map(async (file) => {
      return app.block(relative(app.path('@src'), file));
    }),
  );

  app.globSync('resources/styles/blocks/*').forEach((file) => {
    app.entry(relative(app.path('@src'), file));
  });

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

  const fontawesomeDir = await app.module.getDirectory(
    `@fortawesome/fontawesome-pro`,
  );

  app.postcss
    .use((plugins) => [...plugins, 'postcss-inline-svg'])
    .setPlugin('postcss-inline-svg', [
      'postcss-inline-svg',
      {
        paths: ['../../themes/gds/resources', fontawesomeDir],
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
};
