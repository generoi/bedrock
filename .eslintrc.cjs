module.exports = {
  root: true,
  extends: ['@roots/eslint-config/sage'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'react/prop-types': 0,
    'react/display-name': 0,
  },
  overrides: [
    {
      files: ['*.jsx'],
    },
  ],
};
