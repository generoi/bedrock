/** @type {import('prettier').Config} */
export default {
  singleQuote: true,
  bracketSpacing: false,
  experimentalTernaries: true,
  plugins: ['@shufo/prettier-plugin-blade'],
  overrides: [
    {
      files: ['*.blade.php'],
      options: {
        parser: 'blade',
        tabWidth: 2,
        wrapAttributes: 'force-expand-multiline',
        trailingCommaPHP: false,
      },
    },
  ],
};
