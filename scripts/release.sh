#!/usr/bin/env bash

if [ -f .changeset/pre.json ]; then
  echo "Prerelease mode detected, cannot release."
  exit 1
else
  npm run get-ready
  npx changeset publish
fi
