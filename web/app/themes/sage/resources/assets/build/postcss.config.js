/* eslint-disable */

const cssnanoConfig = {
  preset: ['default', { discardComments: { removeAll: true } }]
};

const autoprefixerConfig = {
  grid: true
}

module.exports = ({ file, options }) => {
  return {
    parser: options.enabled.optimize ? 'postcss-safe-parser' : undefined,
    plugins: {
      autoprefixer: autoprefixerConfig,
      cssnano: options.enabled.optimize ? cssnanoConfig : false,
    },
  };
};
