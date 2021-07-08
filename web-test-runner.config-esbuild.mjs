import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  files: 'packages/**/*.test.ts',
  nodeResolve: true,
  plugins: [esbuildPlugin({ ts: true })],
};
