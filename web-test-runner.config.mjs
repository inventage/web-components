export default {
  files: 'packages/**/*.test.js',
  nodeResolve: true,
  coverageConfig: {
    exclude: ['coverage/**/*', 'packages/**/*.test.{ts,js}', '**/node_modules/**/*'],
  },
};
