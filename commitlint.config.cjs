module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['workspace-scopes'],
  rules: {
    'header-max-length': [0, 'always', 120],
  },
};
