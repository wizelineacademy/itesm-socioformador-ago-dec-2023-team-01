module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  globals: {
    NodeJS: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'import/extensions': ['error', 'ignorePackages', { ts: 'never' }],
    'no-underscore-dangle': ['error', { allow: ['_count'] }],
    // 'no-console': ['error', { allow: ['info', 'error'] }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['tests/prisma-mock.ts'] }],
    semi: ['error', 'always'],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.ts', '.d.ts', '.tsx'],
      },
    },
  },
  ignorePatterns: ['*.d.ts', ".eslintrc.js"],
};