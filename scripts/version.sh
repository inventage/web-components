#!/usr/bin/env bash

npx changeset version
npm install
git add .
git commit -m "chore: version prerelease packages"
