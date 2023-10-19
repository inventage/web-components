import config from './web-test-runner.config.js';

// Increase timeout when needed (e.g. when debugging visually in a browser)
// @see https://modern-web.dev/docs/test-runner/test-frameworks/mocha/#configuring-mocha-options
config.testFramework.config.timeout = 200000;

export default config;
