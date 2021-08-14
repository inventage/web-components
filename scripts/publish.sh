#!/usr/bin/env bash

# https://docs.github.com/en/actions/reference/workflow-commands-for-github-actions#setting-an-environment-variable
echo "{package_published_on_npm}={1}" >> "$GITHUB_ENV"
npx changeset publish

