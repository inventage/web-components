const rollupJson = require('@rollup/plugin-json');

module.exports = {
  stories: ['../packages/*/lib/stories/*.stories.js'],

  rollupConfig(config) {
    // Add a new plugin to the build
    // @see https://modern-web.dev/docs/dev-server/plugins/storybook/#customizing-the-build
    config.plugins.push(rollupJson());

    return config;
  },
};
