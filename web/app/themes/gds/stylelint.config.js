/** @type {import('stylelint').Config} */
export default {
  extends: 'stylelint-config-standard-scss',
  rules: {
    'no-descending-specificity': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'scss/comment-no-empty': null,
    'scss/operator-no-newline-after': null,
    'selector-class-pattern':
      '^(?:(?:o|c|u|t|s|is|has|_|js|qa)-)?[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*(?:__[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:--[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:\\[.+\\])?$',
    'custom-property-pattern': '^([a-z][a-z0-9]*)(--?[a-z0-9]+)*$',
  },
};
