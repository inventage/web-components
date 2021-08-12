#!/usr/bin/env bash

# Runs changeset version + npm install so the root package-lock.json gets updated as well…
npx changeset version
npm install
git add .
git commit -m "chore: version release packages"
