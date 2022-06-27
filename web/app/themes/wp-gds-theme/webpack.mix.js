const mix = require('laravel-mix');
require('@tinypixelco/laravel-mix-wp-blocks');
require('laravel-mix-copy-watched');
const fs = require('fs');
const yaml = require('js-yaml');

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

mix.setPublicPath('./public')
  .setResourceRoot(`/app/themes/wp-gds-theme/public/`)
  .webpackConfig({
    output: {
      chunkFilename: '[name].[contenthash:8].js',
      publicPath: global.Config.resourceRoot,
    },
  })
  .browserSync({
    // You need to make sure the host is hardcoded in robo.yml
    proxy: robo.env["@ddev"].host,
    // Set to true, if you want the browser to open when running the server.
    open: false,
  });

mix.sass('resources/styles/app.scss', 'styles')
   .sass('resources/styles/editor.scss', 'styles')
   .sass('resources/styles/editor-overrides.scss', 'styles');

mix.js('resources/scripts/app.js', 'scripts')
   .blocks('resources/scripts/editor.js', 'scripts', {disableRegenerator: true});

mix.copyWatched('resources/images', 'public/images', {base: 'resources/images'})
  .copyWatched('resources/fonts', 'public/fonts', {base: 'resources/fonts'});

// GDS
const gdsPath = 'node_modules/genero-design-system';
mix.copyWatched(`${gdsPath}/dist`, 'public/gds/dist', { base: `${gdsPath}/dist` })
  .copyWatched(`${gdsPath}/loader`, 'public/gds/loader', { base: `${gdsPath}/loader` });

mix.autoload({
  jquery: ['$', 'window.jQuery'],
});

mix.options({
  processCssUrls: false,
  postCss: [
    require('postcss-inline-svg')({
      paths: ['resources'],
      encode(code) {
        return code
          .replace(/\(/g, '%28')
          .replace(/\)/g, '%29')
          .replace(/%/g, '%25')
          .replace(/</g, '%3C')
          .replace(/>/g, '%3E')
          .replace(/&/g, '%26')
          .replace(/#/g, "%23")
          .replace(/{/g, "%7B")
          .replace(/}/g, "%7D");
      },
    }),
  ],
  // Causes the follow invalid optimization:
  //   calc(50% - (50vw - ((100vw - 42.125rem) / 2) * .2) + 10px)
  //   calc(50% - 50vw - (100vw - 42.125rem) / 2 * 0.2 + 10px)
  cssNano: {calc: false},
});

mix.sourceMaps(false, 'source-map')
   .version();
