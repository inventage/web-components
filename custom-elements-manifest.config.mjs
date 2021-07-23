import { moduleFileExtensionsPlugin } from 'cem-plugin-module-file-extensions';

// @see https://github.com/webcomponents/custom-elements-manifest
export default {
  // globs: ['packages/*/src/**/*.ts'],
  globs: ['packages/*/src/*.ts'],
  outdir: '.',
  plugins: [moduleFileExtensionsPlugin()],
};
