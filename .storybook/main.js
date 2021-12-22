const path = require('path');
const replace = require('replace-in-file');
const json = require('@rollup/plugin-json');
const { storybookRollupPlugin } = require('@inventage-web-components/markdown-storybook');

const BUILD_VERSION =
  process.env.GITHUB_RUN_ID && process.env.GITHUB_SHA
    ? `${new Date().toISOString()}-${process.env.GITHUB_RUN_ID}-${process.env.GITHUB_SHA.substring(0, 7)}`
    : 'n/a';

console.info(`BUILD_VERSION = ${BUILD_VERSION}`);

module.exports = {
  stories: ['../packages/*/docs/**/*.md', '../packages/*/lib/stories/*.stories.js'],

  rollupConfig(config) {
    // Replace Modern Web plugin MD support with plain markdown support
    config.plugins = config.plugins.filter(plugin => plugin.name !== 'md');
    config.plugins.unshift(storybookRollupPlugin());

    // Add additional plugins to the build
    // @see https://modern-web.dev/docs/dev-server/plugins/storybook/#customizing-the-build
    config.plugins.push(json());
    config.plugins.push({
      name: 'replace-build-id',
      generateBundle() {
        try {
          const results = replace.sync({
            files: `${path.resolve(__dirname, '..', 'storybook-static')}/*.html`,
            from: /__BUILD_VERSION__/g,
            to: BUILD_VERSION,
          });

          // prettier-ignore
          console.log(`Build version replaced in files:\n\n`, results.filter(r => r.hasChanged).map(r => `  ${r.file}`).join('\n'));
        } catch (error) {
          console.error('Could not set build version:', error);
        }
      },
    });

    return config;
  },
};
