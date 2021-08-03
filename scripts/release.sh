#!/usr/bin/env bash

# Thanks, Benny (& Westbrook)
[ ! -f .changeset/pre.json ] && npx changeset pre exit
npm run clean
npx changeset publish
