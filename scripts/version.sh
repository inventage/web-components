#!/usr/bin/env bash

# Thanks, Westbrook & Benny
[ ! -f .changeset/pre.json ] \
  && npx changeset pre exit \
  || echo "Not in prerelease mode"

npx changeset version
npm install
