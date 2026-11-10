/** @type {import('stylelint').Config} */
export default {
  extends: 'stylelint-config-standard-scss',
  rules: {
    'no-descending-specificity': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'scss/comment-no-empty': null,
    'scss/operator-no-newline-after': null,
    // `& { ... }` in mixins is deliberate: it keeps declarations after nested
    // rules valid under Sass' mixed-decls change.
    'block-no-redundant-nested-style-rules': null,
    // `clip` is still required by the screen-reader-text pattern.
    'property-no-deprecated': [true, {ignoreProperties: ['clip']}],
    'selector-class-pattern':
      '^(?:(?:o|c|u|t|s|is|has|_|js|qa)-)?[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*(?:__[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:--[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:\\[.+\\])?$',
    'custom-property-pattern': '^([a-z][a-z0-9]*)(--?[a-z0-9]+)*$',
  },
};
