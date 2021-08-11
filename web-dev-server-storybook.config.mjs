import { fromRollup } from '@web/dev-server-rollup';
import rollupJson from '@rollup/plugin-json';
import { storybookWdsPlugin } from '@inventage-web-components/markdown-storybook';
// import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';

const json = fromRollup(rollupJson);

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  nodeResolve: true,
  watch: true,
  open: true,
  mimeTypes: {
    'custom-elements-experimental.json': 'js',
  },
  plugins: [
    storybookWdsPlugin(),
    json(),
    // hmrPlugin({
    //     include: ['[packages]/**/*'],
    //     presets: [presets.litElement],
    // }),
  ],
});
