import fs from 'fs';
import path from 'path';
import {createRequire} from 'module';
import defaultConfig from '@wordpress/scripts/config/webpack.config.js';
import CopyPlugin from 'copy-webpack-plugin';
import postcssInlineSvg from 'postcss-inline-svg';
import {
  discoverBlocks,
  ManifestPlugin,
  I18nMapPlugin,
  injectPostcssInlineSvg,
} from '../../../../webpack.shared.mjs';

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;

const themeDir = path.resolve(__dirname, '../../themes/gds');

let fontawesomeDir;
try {
  fontawesomeDir = path.dirname(
    require.resolve('@fortawesome/fontawesome-pro/package.json'),
  );
} catch {
  fontawesomeDir = path.join(
    themeDir,
    'node_modules/@fortawesome/fontawesome-pro',
  );
}

// --- Block discovery ---
const blocksDir = path.resolve(__dirname, 'resources/blocks');
const blocks = discoverBlocks(blocksDir, __dirname);

// --- Entry points ---
const entry = {
  'app-styles': './resources/styles/woocommerce.scss',
  editor: './resources/scripts/editor.jsx',
};

// Block entries
Object.assign(entry, blocks.entry);

// Block style overrides
const blocksStyleDir = path.resolve(__dirname, 'resources/styles/blocks');
if (fs.existsSync(blocksStyleDir)) {
  for (const file of fs.readdirSync(blocksStyleDir)) {
    if (file.endsWith('.scss')) {
      entry[`block-styles/${path.basename(file, '.scss')}`] =
        `./resources/styles/blocks/${file}`;
    }
  }
}

// --- PostCSS: insert postcss-inline-svg before autoprefixer ---
injectPostcssInlineSvg(
  defaultConfig,
  postcssInlineSvg({
    paths: [path.resolve(themeDir, 'resources'), fontawesomeDir],
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
    uniqueName: 'genero-woocommerce',
    publicPath: '/app/plugins/genero-woocommerce/build/',
  },
  module: {
    ...defaultConfig.module,
    rules: [
      {test: /\.m?js/, resolve: {fullySpecified: false}},
      ...(defaultConfig.module?.rules || []),
    ],
  },
  resolve: {
    ...defaultConfig.resolve,
    alias: {
      ...(defaultConfig.resolve?.alias || {}),
      '@styles': path.resolve(themeDir, 'resources/styles'),
      '@scripts': path.resolve(themeDir, 'resources/scripts'),
      '@blocks': path.resolve(themeDir, 'resources/blocks'),
      '@fonts': path.resolve(themeDir, 'resources/fonts'),
      '@src': path.resolve(__dirname, 'resources'),
    },
  },
  plugins: [
    ...(defaultConfig.plugins || []).filter(
      (p) => p.constructor.name !== 'RtlCssPlugin',
    ),
    new CopyPlugin({
      patterns: [...blocks.copyPatterns],
    }),
    new ManifestPlugin(),
    new I18nMapPlugin(),
  ],
};
