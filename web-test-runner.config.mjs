// import fs from 'fs';
//
// const packages = fs.readdirSync('packages').filter(dir => fs.statSync(`packages/${dir}`).isDirectory());

export default {
  // groups: packages.map(pkg => ({
  //   name: pkg,
  //   files: `packages/${pkg}/**/*.test.js`,
  // })),
  files: 'packages/**/*.test.js',
  nodeResolve: true,
};
