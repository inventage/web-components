module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:import/errors', 'plugin:import/warnings', 'plugin:lit/recommended', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['import', 'lit'],
  overrides: [
    {
      files: ['**/*.ts'],
      extends: ['plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint'],
      rules: {
        'import/named': 'off',
        'import/no-unresolved': 'off',
        'no-unexpected-multiline': 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
          },
        ],
      },
    },
    {
      files: ['web-test-runner.config.js'],
      env: {
        node: true,
      },
    },
  ],
};
