import fs from 'fs';
import path from 'path';
import {createRequire} from 'module';
import defaultConfig from '@wordpress/scripts/config/webpack.config.js';
import CopyPlugin from 'copy-webpack-plugin';
import postcssInlineSvg from 'postcss-inline-svg';
import {
  discoverBlocks,
  ManifestPlugin,
  injectPostcssInlineSvg,
} from '../../../../webpack.shared.mjs';

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;

const fontawesomeDir = path.dirname(
  require.resolve('@fortawesome/fontawesome-pro/package.json'),
);

// --- Block discovery ---
const blocksDir = path.resolve(__dirname, 'resources/blocks');
const blocks = discoverBlocks(blocksDir, __dirname);

// --- Entry points ---
const entry = {
  app: './resources/scripts/app.js',
  'app-styles': './resources/styles/app.scss',
  editor: './resources/scripts/editor.jsx',
  'editor-styles': './resources/styles/editor.scss',
  'editor-overrides': './resources/styles/editor-overrides.scss',
};

// Block entries (auto-discovered from block.json)
Object.assign(entry, blocks.entry);

// Block style overrides (resources/styles/blocks/*.scss)
const blocksStyleDir = path.resolve(__dirname, 'resources/styles/blocks');
if (fs.existsSync(blocksStyleDir)) {
  for (const file of fs.readdirSync(blocksStyleDir)) {
    if (file.endsWith('.scss')) {
      entry[`block-styles/${path.basename(file, '.scss')}`] =
        `./resources/styles/blocks/${file}`;
    }
  }
}

// YouTube embed stylesheet, registered by its index.php. The script is
// lazy-imported from app.js.
entry['components/youtube-embed/index'] =
  './resources/components/youtube-embed/index.scss';

// --- PostCSS: insert postcss-inline-svg before autoprefixer ---
injectPostcssInlineSvg(
  defaultConfig,
  postcssInlineSvg({
    paths: [path.resolve(__dirname, 'resources'), fontawesomeDir],
    encode: (code) =>
      code
        .replace(/%/g, '%25')
        .replace(/</g, '%3C')
        .replace(/>/g, '%3E')
        .replace(/&/g, '%26')
        .replace(/#/g, '%23')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/{/g, '%7B')
        .replace(/}/g, '%7D'),
  }),
);

export default {
  ...defaultConfig,
  entry,
  output: {
    ...defaultConfig.output,
    path: path.resolve(__dirname, 'build'),
    uniqueName: 'gds-theme',
    publicPath: '/app/themes/gds/build/',
  },
  module: {
    ...defaultConfig.module,
    rules: [
      {test: /\.m?js/, resolve: {fullySpecified: false}},
      {test: /\.svg$/, resourceQuery: /source/, type: 'asset/source'},
      ...(defaultConfig.module?.rules || []).map((rule) =>
        rule.test?.toString() === '/\\.svg$/' ?
          {...rule, resourceQuery: {not: [/source/]}}
        : rule,
      ),
    ],
  },
  resolve: {
    ...defaultConfig.resolve,
    alias: {
      ...(defaultConfig.resolve?.alias || {}),
      '@styles': path.resolve(__dirname, 'resources/styles'),
      '@scripts': path.resolve(__dirname, 'resources/scripts'),
      '@blocks': path.resolve(__dirname, 'resources/blocks'),
      '@components': path.resolve(__dirname, 'resources/components'),
      '@src': path.resolve(__dirname, 'resources'),
      '@fonts': path.resolve(__dirname, 'resources/fonts'),
      '@fontawesome': fontawesomeDir,
      [path.resolve(__dirname, 'resources/webfonts')]: path.join(
        fontawesomeDir,
        'webfonts',
      ),
    },
  },
  plugins: [
    ...(defaultConfig.plugins || [])
      .filter((p) => p.constructor.name !== 'RtlCssPlugin')
      .map((p) => {
        // wp-scripts versions lazy JS chunks (?ver=) but not lazy CSS chunks,
        // so a CSS-only change to a dynamically imported component would be
        // served stale from CDN and browser caches.
        if (p.constructor.name === 'MiniCssExtractPlugin') {
          p.options.chunkFilename = '[name].css?ver=[chunkhash]';
        }
        return p;
      }),
    new CopyPlugin({
      patterns: [
        ...blocks.copyPatterns,
        {
          from: 'resources/images',
          to: 'images',
          noErrorOnMissing: true,
        },
        {
          from: 'resources/fonts',
          to: 'fonts',
          noErrorOnMissing: true,
        },
        ...[
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
        ].map((file) => ({
          from: path.join(fontawesomeDir, file),
          to: file,
        })),
      ],
    }),
    new ManifestPlugin(),
  ],
};
