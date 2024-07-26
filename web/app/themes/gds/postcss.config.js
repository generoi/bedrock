module.exports = (ctx) => ({
  plugins: [
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
});
