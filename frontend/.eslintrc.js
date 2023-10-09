module.exports = {
  extends: [
    'next/core-web-vitals',
    'airbnb',
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
    },
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'react/jsx-filename-extension': 0,
    'no-param-reassign': 0,
    'react/prop-types': 1,
    'react/require-default-props': 0,
    'react/no-array-index-key': 0,
    'react/jsx-props-no-spreading': 0,
    'react/forbid-prop-types': 0,
    'import/order': 1,
    'import/no-cycle': 0,
    'no-console': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'prefer-destructuring': 0,
    'no-shadow': 0,
    'import/no-named-as-default': 0,
    '@typescript-eslint/no-unused-vars': 1,
    'no-unused-vars': 1,
    'import/extensions': 0,
  },
  ignorePatterns: ['.eslintrc.js'],
};