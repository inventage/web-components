#!/usr/bin/env bash

# Runs changeset version + npm install so the root package-lock.json gets updated as well…
npx changeset version
node ./scripts/remove-thanks-from-changelogs.mjs
node ./scripts/update-version-variables.mjs
npm install
git add .
git commit -m "chore: version packages"
