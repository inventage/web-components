#!/usr/bin/env node
import path from 'path';
import replace from 'replace-in-file';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const BUILD_VERSION =
  process.env.GITHUB_RUN_ID && process.env.GITHUB_SHA
    ? `${new Date().toISOString()}-${process.env.GITHUB_RUN_ID}-${process.env.GITHUB_SHA.substring(0, 7)}`
    : 'n/a';

console.info(`Replacing BUILD_VERSION = ${BUILD_VERSION}\n`);

// prettier-ignore
try {
  const results = replace.sync({
    files: `${path.resolve(__dirname, '..', 'storybook-static')}/**/*.html`,
    from: /__BUILD_VERSION__/g,
    to: BUILD_VERSION,
  });

  const changedFiles = results.filter(r => r.hasChanged);
  if (changedFiles.length < 1) {
    console.log('No replacements made.');
    process.exit();
  }

  // prettier-ignore
  console.log(`Build version replaced in files:\n\n`, changedFiles.map(r => `  ${r.file}`).join('\n'));
} catch (error) {
  console.error('Could not set build version:', error);
}
