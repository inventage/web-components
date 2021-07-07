import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  nodeResolve: {
    exportConditions: ['browser', 'development']
  },
  concurrentBrowsers: 1,
  concurrency: 3,
  coverageConfig: {
    report: true,
    reportDir: 'coverage',
    threshold: {
      statements: 85,
      branches: 50,
      functions: 80,
      lines: 85,
    },
  },
  // testFramework: {
  //   config: {
  //     timeout: 100000,
  //   },
  // },
  plugins: [esbuildPlugin({ ts: true })],
};
