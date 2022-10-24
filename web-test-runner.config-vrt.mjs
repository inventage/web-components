import config from './web-test-runner.config.mjs';

// Increase timeouts for vrt
config.testsFinishTimeout = 200000;
config.testFramework.config.timeout = 100000;

// Increase threshold to prevent regression errors because of 1-2 pixel differences
config.failureThreshold = 2;
config.failureThresholdType = 'pixel';

export default config;
