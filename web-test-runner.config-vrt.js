import config from './web-test-runner.config.js';

// Increase timeouts for vrt
config.testsFinishTimeout = 200000;
config.testFramework.config.timeout = 100000;

export default config;
