const mix = require('laravel-mix');
require('@tinypixelco/laravel-mix-wp-blocks');
require('laravel-mix-copy-watched');
const path = require('path');
const glob = require('glob');
const fs = require('fs');

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

mix.setPublicPath('./public')
  .setResourceRoot('/app/themes/gds/public/')
  .webpackConfig({
    output: {
      chunkFilename: '[name].[contenthash:8].js',
      publicPath: global.Config.resourceRoot,
    },
    resolve: {
      alias: {
        '@': path.resolve('resources/styles'),
        '~': path.resolve('resources/scripts'),
        '@blocks': path.resolve('resources/blocks'),
        '@components': path.resolve('resources/components'),
      },
    },
  })
  .browserSync({
    // You need to make sure the host is hardcoded in robo.yml
    proxy: 'https://gdsbedrock.ddev.site',
    // Set to true, if you want the browser to open when running the server.
    open: false,
  });

mix.sass('resources/styles/app.scss', 'styles')
   .sass('resources/styles/editor.scss', 'styles')
   .sass('resources/styles/woocommerce.scss', 'styles')
   .sass('resources/styles/editor-overrides.scss', 'styles');

mix.js('resources/scripts/app.js', 'scripts')
   .blocks('resources/scripts/editor.js', 'scripts', {disableRegenerator: true});

glob.sync('resources/styles/blocks/*').forEach((file) => {
  mix.sass(file, 'styles/blocks');
});

const assetCompiler = (buildPath) => {
  return (file) => {
    if (/.scss$/.test(file)) {
      mix.sass(file, buildPath(file))
    } else if (/index.js$/.test(file)) {
      mix.blocks(file, buildPath(file), {disableRegenerator: true});
    } else if (/.js$/.test(file)) {
      mix.js(file, buildPath(file));
    } else if (/.json$/.test(file)) {
      const destination = `public/${buildPath(file)}/${path.basename(file)}`;
      mix.copy(file, destination);
    }
  }
}

glob.sync('resources/blocks/*/*').forEach(assetCompiler(
  (file) => `blocks/${path.basename(path.dirname(file))}`
));

glob.sync('resources/components/*/*').forEach(assetCompiler(
  (file) => `components/${path.basename(path.dirname(file))}`
));

mix.copyWatched('resources/images', 'public/images', {base: 'resources/images'})
  .copyWatched('resources/fonts', 'public/fonts', {base: 'resources/fonts'});

mix.copy('node_modules/jquery/dist/jquery.min.js', 'public/scripts/jquery.js');

mix.extend('copyDirectoryDirectly', function (webpackConfig, from, to) {
  fs.cpSync(from, to, {recursive: true});
});
mix.copyDirectoryDirectly('node_modules/@fortawesome/fontawesome-pro/svgs', 'public/icons');


mix.autoload({
  jquery: ['$', 'window.jQuery'],
});

mix.options({
  processCssUrls: false,
  postCss: [
    require('postcss-preset-env'),
    require('postcss-inline-svg')({
      paths: [
        'resources',
        'public/icons',
      ],
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
