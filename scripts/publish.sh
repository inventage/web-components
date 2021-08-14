#!/usr/bin/env bash

# Workaround for steps.changesets.outputs.published == 'true' which does not seem to work…
# https://docs.github.com/en/actions/reference/workflow-commands-for-github-actions#setting-an-environment-variable
echo "{package_published_on_npm}={1}" >> "$GITHUB_ENV"
npx changeset publish

