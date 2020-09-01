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
mix.setPublicPath('./dist').browserSync(robo.env["@dev"].host);

mix.sass('resources/assets/styles/app.scss', 'styles')
   .sass('resources/assets/styles/editor.scss', 'styles')
   .sass('resources/assets/styles/editor-overrides.scss', 'styles');

mix.js('resources/assets/scripts/app.js', 'scripts')
   .blocks('resources/assets/scripts/editor.js', 'scripts')
   .extract();

mix.copyWatched('resources/assets/images', 'dist/images', {base: 'resources/assets/images'})
  .copyWatched('resources/assets/fonts', 'dist/fonts', {base: 'resources/assets/fonts'});

// GDS
const gdsPath = 'node_modules/genero-design-system';
mix.styles([`${gdsPath}/src/styles/index.css`], 'dist/styles/gds.css')
  .scripts([`${gdsPath}/loader/index.mjs`], 'dist/gds/loader/index.mjs')
  .copyWatched(`${gdsPath}/dist`, 'dist/gds/dist', { base: `${gdsPath}/dist` });

mix.autoload({
  jquery: ['$', 'window.jQuery'],
});

mix.options({
  processCssUrls: false,
  postCss: [
    require('postcss-custom-properties')({preserve: true}),
    // @see https://github.com/JeffreyWay/laravel-mix/issues/1606#issuecomment-551457071
    require('autoprefixer')({grid: 'autoplace'}),
  ],
  // Causes the follow invalid optimization:
  //   calc(50% - (50vw - ((100vw - 42.125rem) / 2) * .2) + 10px)
  //   calc(50% - 50vw - (100vw - 42.125rem) / 2 * 0.2 + 10px)
  cssNano: {calc: false}
});

mix.sourceMaps(false, 'source-map')
   .version();
