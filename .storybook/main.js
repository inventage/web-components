const json = require('@rollup/plugin-json');
const { storybookRollupPlugin } = require('@inventage-web-components/markdown-storybook');

module.exports = {
  stories: ['../packages/*/docs/**/*.md', '../packages/*/lib/stories/*.stories.js'],

  rollupConfig(config) {
    // Replace Modern Web plugin MD support with plain markdown support
    config.plugins = config.plugins.filter(plugin => plugin.name !== 'md');
    config.plugins.unshift(storybookRollupPlugin());

    // Add additional plugins to the build
    // @see https://modern-web.dev/docs/dev-server/plugins/storybook/#customizing-the-build
    config.plugins.push(json());

    return config;
  },
};
