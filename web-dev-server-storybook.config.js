import json from '@rollup/plugin-json';
import { rollupAdapter } from '@web/dev-server-rollup';
import { storybookWdsPlugin } from '@inventage-web-components/markdown-storybook';

import { rewriteDataJsonPaths } from './web-test-runner.config.js';

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  nodeResolve: true,
  watch: true,
  open: true,
  mimeTypes: {
    '**/custom-elements.json': 'js',
  },
  plugins: [storybookWdsPlugin(), rollupAdapter(json())],
  middleware: [rewriteDataJsonPaths],
});
