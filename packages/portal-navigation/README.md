# @inventage-web-components/portal-navigation

A component implementing an opinionated (but generic and hence configurable) navigation pattern.

[![Published on npm](https://img.shields.io/npm/v/@inventage-web-components/portal-navigation.svg?style=flat-square)](https://www.npmjs.com/package/@inventage-web-components/portal-navigation)
[![License](https://img.shields.io/npm/l/@inventage-web-components/common?style=flat-square)](https://github.com/inventage/web-components/blob/main/LICENSE)
[![Release](https://img.shields.io/github/workflow/status/inventage/web-components/Release?style=flat-square)](https://github.com/inventage/web-components/actions)

## Quick Start

Use [jspm.dev](https://jspm.org/docs/cdn#jspmdev) to get a simple example running in a single HTML file:

```html
<script type="module" src="https://jspm.dev/@inventage-web-components/portal-navigation/portal-navigation.js"></script>
<portal-navigation src="./test-data.json" currentApplication="app1" internalRouting></portal-navigation>
```

Here's an [example of this method](https://tender-glowing-income.glitch.me/) to get you started.

## Installation

```bash
npm i @inventage-web-components/portal-navigation
```

## Usage

```html
<!--
  Adjust path to node_modules and use a dev server that support Node module
  resolution, like Web Dev server: https://www.npmjs.com/package/@web/dev-server
-->
<script
  type="module"
  src="/node_modules/@inventage-web-components/portal-navigation/lib/src/portal-navigation.js"
</script>

<portal-navigation src="/path/to/data.json"></portal-navigation>
```

## Documentation

The API documentation as well as interactive examples can be found in the [Storybook examples](https://inventage.github.io/web-components/?path=/story/portal-navigation).
