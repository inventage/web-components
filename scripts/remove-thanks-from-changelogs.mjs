#!/usr/bin/env node
import globby from 'globby';
import replace from 'replace-in-file';
import escapeStringRegexp from 'escape-string-regexp';

// Github usernames to remove "Thanks" for (we do not want to thank ourselves…)
const USERNAMES = ['peschee'];

const changelogs = await globby(['packages/**/CHANGELOG.md'], {
  gitignore: true,
});

const regex = new RegExp(`${USERNAMES.map(username => escapeStringRegexp(`Thanks [@${username}](https://github.com/${username})! - `)).join('|')}`, 'g');
const results = await replace({
  files: changelogs,
  from: regex,
  to: '',
});

const replacedCount = results.filter(result => result.hasChanged).length;
console.info(`Replaced ${replacedCount} files${replacedCount > 0 ? ':' : '.'}`);
if (replacedCount > 0) {
  results.map(result => console.log(`  - ${result.file}`));
}
