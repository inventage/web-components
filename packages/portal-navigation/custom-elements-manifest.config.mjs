import { plugins } from '@inventage-web-components/cem-preset';

// @see https://github.com/webcomponents/custom-elements-manifest
export default {
  globs: ['src/**/*.ts'],
  litelement: true,
  plugins: [...plugins],
};
