# @inventage-web-components/portal-navigation

A component implementing an opinionated (but generic and hence configurable) navigation pattern.

[![Published on npm](https://img.shields.io/npm/v/@inventage-web-components/portal-navigation.svg?style=flat-square)](https://www.npmjs.com/package/@inventage-web-components/portal-navigation)
[![License](https://img.shields.io/npm/l/@inventage-web-components/common?style=flat-square)](https://github.com/inventage/web-components/blob/main/LICENSE)
[![Release](https://img.shields.io/github/workflow/status/inventage/web-components/Release?style=flat-square)](https://github.com/inventage/web-components/actions)

## Quick Start

Use [unpkg.com](https://unpkg.com/browse/@inventage-web-components/portal-navigation/) to get a simple example running in a single HTML file:

```html
<script type="module" src="https://unpkg.com/@inventage-web-components/portal-navigation/lib/src/portal-navigation.js?module"></script>

<portal-navigation src="/path/to/data.json"></portal-navigation>
```

Here's an [example of this method](https://plum-maze-visor.glitch.me/) to get you started.

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
