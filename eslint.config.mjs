/**
 * Shared ESLint flat config. @wordpress/scripts ships ESLint 10, which no
 * longer reads .eslintrc files. Rules mirror the .eslintrc.cjs kaskipuu
 * shipped with its wp-scripts migration.
 *
 * Flat config does not cascade: `wp-scripts lint-js` resolves config from the
 * workspace it runs in, so each workspace re-exports this file from its own
 * eslint.config.mjs. A new workspace needs that file too, or it silently falls
 * back to wp-scripts' bundled defaults.
 */

import wordpress from '@wordpress/eslint-plugin';
import globals from 'globals';

export default [
  ...wordpress.configs.recommended,
  {
    // ESLint only traverses `**/*.js` when handed a directory; other
    // extensions are opted in by appearing in a `files` pattern.
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // Overrides @wordpress/prettier-config (tabs) to match prettier.config.js.
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          bracketSpacing: false,
          experimentalTernaries: true,
        },
      ],
      curly: 'off',
      'no-console': ['warn', {allow: ['error', 'debug']}],
      'no-shadow': 'off',
      'no-nested-ternary': 'off',

      // WordPress: __experimental* APIs are unavoidable, the resolver doesn't
      // understand WP global packages or webpack aliases, and jsdoc isn't
      // used consistently.
      '@wordpress/no-unsafe-wp-apis': 'off',
      '@wordpress/no-unused-vars-before-return': 'off',
      '@wordpress/no-global-active-element': 'off',
      'jsdoc/check-tag-names': 'off',
      'import/no-unresolved': 'off',
      'import/no-extraneous-dependencies': 'off',

      'react-hooks/rules-of-hooks': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];
