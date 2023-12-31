module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/forbid-prop-types': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'no-restricted-syntax': 0,
    'object-curly-newline': 0,
    // 'import/no-extraneous-dependencies': 1,
    'no-shadow': 0,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
