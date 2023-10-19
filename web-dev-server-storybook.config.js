import { fromRollup } from '@web/dev-server-rollup';
import rollupJson from '@rollup/plugin-json';
import { storybookWdsPlugin } from '@inventage-web-components/markdown-storybook';
import { rewriteDataJsonPaths } from './web-test-runner.config.js';

const json = fromRollup(rollupJson);

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  nodeResolve: true,
  watch: true,
  open: true,
  mimeTypes: {
    '**/custom-elements.json': 'js',
  },
  plugins: [storybookWdsPlugin(), json()],
  middleware: [rewriteDataJsonPaths],
});
