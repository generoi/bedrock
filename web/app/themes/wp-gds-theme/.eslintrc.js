module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  parser: 'babel-eslint',
  globals: {
    wp: true
  },
  env: {
    node: true,
    es6: true,
    amd: true,
    browser: true,
    jquery: true
  },
  parserOptions: {
    ecmaFeatures: {
      globalReturn: true,
      generators: false,
      objectLiteralDuplicateProperties: false
    },
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: ['import'],
  settings: {
    'import/core-modules': [],
    'import/ignore': ['node_modules', '\\.(coffee|scss|css|less|hbs|svg|json)$'],
    'react': {
      version: '16.9.0'
    }
  },
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'react/display-name': 0,
    'no-console': 0,
    'eqeqeq': 1,
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore'
      }
    ]
  }
};
