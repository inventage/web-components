import { storybookPlugin } from '@web/dev-server-storybook';
// import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  nodeResolve: true,
  watch: true,
  open: '/',
  plugins: [
    storybookPlugin({ type: 'web-components' }),
    // hmrPlugin({
    //     include: ['[packages]/**/*'],
    //     presets: [presets.litElement],
    // }),
  ],
});
