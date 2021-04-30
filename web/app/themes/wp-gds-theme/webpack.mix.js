const mix = require('laravel-mix');
require('@tinypixelco/laravel-mix-wp-blocks');
require('laravel-mix-copy-watched');
const fs = require('fs');
const yaml = require('js-yaml');
const glob = require('glob');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Sage application. By default, we are compiling the Sass file
 | for your application, as well as bundling up your JS files.
 |
 */

const robo = yaml.safeLoad(fs.readFileSync('../../../../robo.yml', 'utf8'));

mix.setPublicPath('./dist')
  .setResourceRoot(`/app/themes/wp-gds-theme/dist/`)
  .webpackConfig({
    output: {
      chunkFilename: '[name].[contenthash:8].js',
      publicPath: global.Config.resourceRoot,
    },
  })
  .browserSync({
    // You need to make sure the host is hardcoded in robo.yml
    proxy: robo.env["@dev"].host,
    // Set to true, if you want the browser to open when running the server.
    open: false,
  });

mix.sass('resources/assets/styles/app.scss', 'styles')
   .sass('resources/assets/styles/editor.scss', 'styles')
   .sass('resources/assets/styles/editor-overrides.scss', 'styles');

mix.js('resources/assets/scripts/app.js', 'scripts')
   .blocks('resources/assets/scripts/editor.js', 'scripts', {disableRegenerator: true});

mix.copyWatched('resources/assets/images', 'dist/images', {base: 'resources/assets/images'})
  .copyWatched('resources/assets/fonts', 'dist/fonts', {base: 'resources/assets/fonts'});

glob.sync('resources/assets/styles/blocks/*').forEach((file) => {
  mix.sass(file, 'styles/blocks');
});

// GDS
const gdsPath = 'node_modules/genero-design-system';
mix.copyWatched(`${gdsPath}/dist`, 'dist/gds/dist', { base: `${gdsPath}/dist` })
  .copyWatched(`${gdsPath}/loader`, 'dist/gds/loader', { base: `${gdsPath}/loader` });

mix.autoload({
  jquery: ['$', 'window.jQuery'],
});

mix.options({
  processCssUrls: false,
  postCss: [
    require('postcss-custom-properties')({preserve: true}),
  ],
  // Causes the follow invalid optimization:
  //   calc(50% - (50vw - ((100vw - 42.125rem) / 2) * .2) + 10px)
  //   calc(50% - 50vw - (100vw - 42.125rem) / 2 * 0.2 + 10px)
  cssNano: {calc: false},
});

mix.sourceMaps(false, 'source-map')
   .version();
