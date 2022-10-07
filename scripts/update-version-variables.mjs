#!/usr/bin/env node
/**
 * Updates package versions based on versions in package.json
 *
 * @see Inspired by https://github.com/lit/lit/blob/lit-html%402.4.0/scripts/update-version-variables.js
 */

import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Updates a global version variable.
 */
const updateVersionVariable = async (packageDir, sourcePath) => {
  // Read new version from package.json
  const packagePath = path.resolve(__dirname, '..', 'packages', packageDir, 'package.json');
  const packageSource = await fs.readFile(packagePath, 'utf-8');
  const packageData = JSON.parse(packageSource);
  const { version } = packageData;

  // Read source file
  const filePath = path.resolve(__dirname, '..', 'packages', packageDir, 'src', sourcePath);
  console.log(`Updating version for ${filePath} to ${version}…`);
  const fileSource = await fs.readFile(filePath, 'utf-8');

  // Replace version number
  const versionVarRegex = new RegExp(`(readonly version = ')(.*)(';$)`, 'm');
  console.log('versionVarRegex', versionVarRegex);
  let replaced = false;
  const newSource = fileSource.replace(versionVarRegex, (_, pre, semver, post) => {
    replaced = true;
    return pre + version + post;
  });

  if (!replaced) {
    throw new Error(`Version string not found in ${filePath}`);
  }

  // Write file
  await fs.writeFile(filePath, newSource);
};

await Promise.all([updateVersionVariable('portal-navigation', 'PortalNavigation.ts')]);
