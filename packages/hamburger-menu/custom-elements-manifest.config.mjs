import { plugins } from '@inventage-web-components/cem-preset';

// @see https://github.com/open-wc/custom-elements-manifest
export default {
  globs: ['src/**/*.ts'],
  litelement: true,
  plugins: [...plugins],
  litElement: true,
};
