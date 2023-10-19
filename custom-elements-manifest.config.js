import { plugins } from '@inventage-web-components/cem-preset';

// @see https://github.com/open-wc/custom-elements-manifest
export default {
  globs: ['packages/*/src/**/*.ts'],
  outdir: '.',
  litelement: true,
  plugins: [...plugins],
};
