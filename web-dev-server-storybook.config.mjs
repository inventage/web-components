import { fromRollup } from '@web/dev-server-rollup';
import rollupJson from '@rollup/plugin-json';
import { storybookPlugin } from '@web/dev-server-storybook';
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
    json(),
    storybookPlugin({ type: 'web-components' }),
    // hmrPlugin({
    //     include: ['[packages]/**/*'],
    //     presets: [presets.litElement],
    // }),
  ],
});
