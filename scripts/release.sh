#!/usr/bin/env bash

# Thanks, Benny (& Westbrook)
[ ! -f .changeset/pre.json ] && npx changeset pre exit
npm run get-ready
npx changeset publish
