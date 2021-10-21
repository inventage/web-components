# @inventage-web-components/portal-navigation

## 0.7.0

### Minor Changes

- [`d8bb19c`](https://github.com/inventage/web-components/commit/d8bb19c010afe0fd96e349554a3d3aee1df4c5da) Hide tree parent indicator (arrow) in mobile breakpoint for `expanded` menu items.

### Patch Changes

- [`9b38371`](https://github.com/inventage/web-components/commit/9b38371ef0023ccc11a29cb82d1b49f73d9db3af) Add missing space between `meta-left` and `meta-right` meta bar slots

## 0.6.1

### Patch Changes

- [`54d99b5`](https://github.com/inventage/web-components/commit/54d99b5110d72192fd56d4e9ec9f472428169174) Fix an issue where the `breakpointChanged` event was not thrown.

* [`61214f2`](https://github.com/inventage/web-components/commit/61214f27c0b327d931fbc0ad63f51482676f5399) Fix an issue where the `breakpointChanged` event was not thrown initially (even though the property changed).

- [`502ac52`](https://github.com/inventage/web-components/commit/502ac52ea95f17677b03ab0a8799080b482cbf2f) Use `@media (hover: hover)` query to fix [«sticky» hover states](https://css-tricks.com/solving-sticky-hover-states-with-media-hover-hover/) on touch devices.

## 0.6.0

### Minor Changes

- [`4ea7c46`](https://github.com/inventage/web-components/commit/4ea7c4644ad7d443f4f60651eb5a427e2e7bcb11) Added **expanding menus** in mobile breakpoint.

  This feature expands menu items with children instead of navigating to their defaults. This makes browsing menu item's children easier on mobile.

* [`3ccdeb6`](https://github.com/inventage/web-components/commit/3ccdeb64dad719550bc78cc93b6692011bc68c57) **BREAKING**: Renamed events in order for all events that the component throws to be namespaced. The two events that make this a breaking change are `hamburgerMenuExpanded` and `firstUpdated`. These are now prefixed with the global component event prefix `portal-navigation.` (e.g. `hamburgerMenuExpanded` → `portal-navigation.hamburgerMenuExpanded`).

  All events have been unified by using `composed: true` and `bubbles: true`, which means you do not have listen to them on the element directly.

### Patch Changes

- [`105832a`](https://github.com/inventage/web-components/commit/105832a0e13a759f264a621b46d4d0768837166d) Remove superfluous closing `</div>` in one template

* [`b7f1ee2`](https://github.com/inventage/web-components/commit/b7f1ee23931d64e92179909af4fcc1ac383d97dd) All `portalNavigation.*` events should bubble out of the shadow DOM.

- [`3927bf3`](https://github.com/inventage/web-components/commit/3927bf31a79d97777bbcfb602901458965494395) Fix `sideEffects` definition in `package.json`

## 0.5.0

### Minor Changes

- [`0afc1ed`](https://github.com/inventage/web-components/commit/0afc1ed406167a719c18a9902518e4a08645cfae) Adds an `expanded` configuration property to first level menu items. When this is set to `true`, the menu's items (**children**) will be rendered visible (**expanded**) when in **mobile breakpoint**.

## 0.4.3

### Patch Changes

- [`d8d0612`](https://github.com/inventage/web-components/commit/d8d06125987245abbc4fb02ee847c4834385b031) Add missing CSS part `slot-current` for current slot wrapper element

## 0.4.2

### Patch Changes

- [`a9285bd`](https://github.com/inventage/web-components/commit/a9285bd4631b1fbd97537ec090cafcacd7f83154) Add "current" slot rendered next to current items (2nd level) container in desktop only

## 0.4.1

### Patch Changes

- [`faf4284`](https://github.com/inventage/web-components/commit/faf428475f37e22410de540035ae1702577dbcbd) Add --portal-navigation-z-index-sticky

## 0.4.0

### Minor Changes

- [`db3a7da`](https://github.com/inventage/web-components/commit/db3a7da46b168498d4dd6bd173b9bf2a353c80ee) Add possibility for the navigation to be sticky (relative to a given anchor)

### Patch Changes

- [`2614cf7`](https://github.com/inventage/web-components/commit/2614cf7cd9d1ae46042f2ef90c0c05a7b749a0db) Import all lit\* things from @inventage-web-components/common

* [`0cbaa38`](https://github.com/inventage/web-components/commit/0cbaa38aba1ecad6896001f0a877652fca0eeac8) Use non-transparent default colors for backgrounds

## 0.3.0

### Minor Changes

- [`28b5ec7`](https://github.com/inventage/web-components/commit/28b5ec7) Introduce the concept of BaseMenuItem, MenuItem, FirstLevelMenuItem and CommonMenuItem for better JSON schema generation

### Patch Changes

- [`d00eabf`](https://github.com/inventage/web-components/commit/d00eabf) Add JSON schema for configuration
- [`8c16981`](https://github.com/inventage/web-components/commit/8c16981) @open-wc/scoped-elements ^1.3.3 → ^1.3.4

## 0.2.0

### Minor Changes

- [`a288eb3`](https://github.com/inventage/web-components/commit/a288eb3) Fix sideEffects configuration

### Patch Changes

- Updated dependencies [`a288eb3`](https://github.com/inventage/web-components/commit/a288eb3)
  - @inventage-web-components/hamburger-menu@0.2.0

## 0.1.0

### Minor Changes

- [`467e204`](https://github.com/inventage/web-components/commit/467e204) Remove tslib and lit dependencies, these are provided by the common package

### Patch Changes

- [`2acd897`](https://github.com/inventage/web-components/commit/2acd897) Use `lit-html` and `lit-element` and related exports from `@inventage-web-components/common` package.
- [`af5e012`](https://github.com/inventage/web-components/commit/af5e012) Add sideEffects to package.json
- [`3a35db2`](https://github.com/inventage/web-components/commit/3a35db2) Add JSPM example
- Updated dependencies [`2acd897`](https://github.com/inventage/web-components/commit/2acd897)
- Updated dependencies [`2acd897`](https://github.com/inventage/web-components/commit/2acd897)
- Updated dependencies [`abbeb80`](https://github.com/inventage/web-components/commit/abbeb80)
- Updated dependencies [`af5e012`](https://github.com/inventage/web-components/commit/af5e012)
- Updated dependencies [`467e204`](https://github.com/inventage/web-components/commit/467e204)
  - @inventage-web-components/hamburger-menu@0.1.0
  - @inventage-web-components/common@0.1.0

## 0.0.24

### Patch Changes

- [`d4f76a5`](https://github.com/inventage/web-components/commit/d4f76a5) Add subpath exports to package.json

## 0.0.23

### Patch Changes

- [`67a08d5`](https://github.com/inventage/web-components/commit/67a08d5) Test release for Github action fixes

## 0.0.22

### Patch Changes

- Updated dependencies [`f6beaec`](https://github.com/inventage/web-components/commit/f6beaec)
  - @inventage-web-components/hamburger-menu@0.0.17

## 0.0.21

### Patch Changes

- Updated dependencies [`72687b1`](https://github.com/inventage/web-components/commit/72687b1)
  - @inventage-web-components/hamburger-menu@0.0.16

## 0.0.20

### Patch Changes

- Updated dependencies [`d7f98d0`](https://github.com/inventage/web-components/commit/d7f98d0)
  - @inventage-web-components/hamburger-menu@0.0.15

## 0.0.19

### Patch Changes

- Updated dependencies [`e41e693`](https://github.com/inventage/web-components/commit/e41e693)
  - @inventage-web-components/hamburger-menu@0.0.14

## 0.0.18

### Patch Changes

- Updated dependencies [`2cc54a2`](https://github.com/inventage/web-components/commit/2cc54a2)
  - @inventage-web-components/common@0.0.11
  - @inventage-web-components/hamburger-menu@0.0.13

## 0.0.17

### Patch Changes

- Updated dependencies [`b3057c0`](https://github.com/inventage/web-components/commit/b3057c0)
  - @inventage-web-components/common@0.0.10
  - @inventage-web-components/hamburger-menu@0.0.12

## 0.0.16

### Patch Changes

- [`617d4ad`](https://github.com/inventage/web-components/commit/617d4ad) Add missing class comment for `Configuration`

## 0.0.15

### Patch Changes

- [`55343d9`](https://github.com/inventage/web-components/commit/55343d9) Test release for Github action fixes
- Updated dependencies [`55343d9`](https://github.com/inventage/web-components/commit/55343d9)
  - @inventage-web-components/common@0.0.9
  - @inventage-web-components/hamburger-menu@0.0.11

## 0.0.14

### Patch Changes

- Updated dependencies [`d83aec9`](https://github.com/inventage/web-components/commit/d83aec9)
  - @inventage-web-components/common@0.0.8
  - @inventage-web-components/hamburger-menu@0.0.10

## 0.0.13

### Patch Changes

- Updated dependencies [`e0dae87`](https://github.com/inventage/web-components/commit/e0dae87)
  - @inventage-web-components/common@0.0.7
  - @inventage-web-components/hamburger-menu@0.0.9

## 0.0.12

### Patch Changes

- [`62d385e`](https://github.com/inventage/web-components/commit/62d385e) Do not inline ts helpers, use `importHelpers` and build-time dependencies on `tslib` instead
- Updated dependencies [`62d385e`](https://github.com/inventage/web-components/commit/62d385e)
  - @inventage-web-components/hamburger-menu@0.0.8

## 0.0.11

### Patch Changes

- [`be30ab0`](https://github.com/inventage/web-components/commit/be30ab0) Display all controls even in the Empty storybook story
- [`87e4923`](https://github.com/inventage/web-components/commit/87e4923) Add more storybook stories with examples
- [`41754be`](https://github.com/inventage/web-components/commit/41754be) Add markdown files (documentation) to storybook docs
- [`a857d1e`](https://github.com/inventage/web-components/commit/a857d1e) Add missing meta fields (github repo, issues, etc.) to `package.json`
- Updated dependencies [`a857d1e`](https://github.com/inventage/web-components/commit/a857d1e)
  - @inventage-web-components/common@0.0.6
  - @inventage-web-components/hamburger-menu@0.0.7

## 0.0.10

### Patch Changes

- [`8a8eca8`](https://github.com/inventage/web-components/commit/8a8eca8) Use `@changesets/changelog-git` for changelog generation
- [`d19b6d2`](https://github.com/inventage/web-components/commit/d19b6d2) Add installation instructions and code example to README
- Updated dependencies [`8a8eca8`](https://github.com/inventage/web-components/commit/8a8eca8)
  - @inventage-web-components/common@0.0.5
  - @inventage-web-components/hamburger-menu@0.0.6

## 0.0.9

### Patch Changes

- [`03daeb5`](https://github.com/inventage/web-components/commit/03daeb5978e3a7ffa37acd409b0019a2bd027d70) Use `@changesets/changelog-github` for changelog generation

- Updated dependencies [[`03daeb5`](https://github.com/inventage/web-components/commit/03daeb5978e3a7ffa37acd409b0019a2bd027d70)]:
  - @inventage-web-components/common@0.0.4
  - @inventage-web-components/hamburger-menu@0.0.5

## 0.0.8

### Patch Changes

- [`35d57d9`](https://github.com/inventage/web-components/commit/35d57d9) Fix event names in JSDoc comments
- [`d1abc20`](https://github.com/inventage/web-components/commit/d1abc20) Made some internal methods private, added better tests for external routing.
- Updated dependencies [`35d57d9`](https://github.com/inventage/web-components/commit/35d57d9)
- Updated dependencies [`4dd5dae`](https://github.com/inventage/web-components/commit/4dd5dae)
  - @inventage-web-components/hamburger-menu@0.0.4

## 0.0.7

### Patch Changes

- [`5a4140a`](https://github.com/inventage/web-components/commit/5a4140a) Add more test coverage
- [`d020809`](https://github.com/inventage/web-components/commit/d020809) Increment version in lockfile
- [`c7075ac`](https://github.com/inventage/web-components/commit/c7075ac) Better test for "breakpointChanged" event
- [`b15d4e8`](https://github.com/inventage/web-components/commit/b15d4e8) Add test case for uniqueness of generated menu (item) ids
- [`f1eadd7`](https://github.com/inventage/web-components/commit/f1eadd7) Added test case for retrieving the configuration from the menu

## 0.0.6

### Patch Changes

- [`23df371`](https://github.com/inventage/web-components/commit/23df371) Fixing released and broken version 0.0.5

## 0.0.5

### Patch Changes

- [`611170f`](https://github.com/inventage/web-components/commit/611170f) Add test for `breakpointChanged` event
- [`549c366`](https://github.com/inventage/web-components/commit/549c366) Storybook story cleanup + added CSS custom prop example

## 0.0.4

### Patch Changes

- [`a27e5d5`](https://github.com/inventage/web-components/commit/a27e5d5) Empty test release
- Updated dependencies [`a27e5d5`](https://github.com/inventage/web-components/commit/a27e5d5)
  - @inventage-web-components/common@0.0.3
  - @inventage-web-components/hamburger-menu@0.0.3

## 0.0.4-next.0

### Patch Changes

- [`4a93691`](https://github.com/inventage/web-components/commit/4a93691) Added missing license, fixed license links.
- Updated dependencies [`4a93691`](https://github.com/inventage/web-components/commit/4a93691)
  - @inventage-web-components/common@0.0.3-next.0
  - @inventage-web-components/hamburger-menu@0.0.3-next.0

## 0.0.3

### Patch Changes

- [`6f7e820`](https://github.com/inventage/web-components/commit/6f7e820) Fixed default value for src in storybook story
- [`52496eb`](https://github.com/inventage/web-components/commit/52496eb) Use relative paths for data.json files in storybook

## 0.0.3-next.0

### Patch Changes

- [`6f7e820`](https://github.com/inventage/web-components/commit/6f7e820) Fixed default value for src in storybook story
- [`52496eb`](https://github.com/inventage/web-components/commit/52496eb) Use relative paths for data.json files in storybook

## 0.0.2

### Patch Changes

- [`cae77d2`](https://github.com/inventage/web-components/commit/cae77d2) - Add keywords to `package.json`
- [`6fc5042`](https://github.com/inventage/web-components/commit/6fc5042) Add initial README versions
- [`9c100e6`](https://github.com/inventage/web-components/commit/9c100e6) Add a default storybook story

  Make sure the Web Dev Server config for storybook only serves `custom-elements-experimental.json` as `js`, since we need to serve other JSON files as JSON (e.g. for `src` attribute / property in this component)

  Fix wrong `hamburger-menu` custom tag usage

- Updated dependencies [`cae77d2`](https://github.com/inventage/web-components/commit/cae77d2)
- Updated dependencies [`6fc5042`](https://github.com/inventage/web-components/commit/6fc5042)
- Updated dependencies [`9c100e6`](https://github.com/inventage/web-components/commit/9c100e6)
  - @inventage-web-components/common@0.0.2
  - @inventage-web-components/hamburger-menu@0.0.2

## 0.0.2-next.1

### Patch Changes

- [`cae77d2`](https://github.com/inventage/web-components/commit/cae77d2) - Add keywords to `package.json`
- Updated dependencies [`cae77d2`](https://github.com/inventage/web-components/commit/cae77d2)
  - @inventage-web-components/common@0.0.2-next.1
  - @inventage-web-components/hamburger-menu@0.0.2-next.1

## 0.0.2-next.0

### Patch Changes

- [`6fc5042`](https://github.com/inventage/web-components/commit/6fc5042) Add initial README versions
- [`9c100e6`](https://github.com/inventage/web-components/commit/9c100e6) Add a default storybook story

  Make sure the Web Dev Server config for storybook only serves `custom-elements-experimental.json` as `js`, since we need to serve other JSON files as JSON (e.g. for `src` attribute / property in this component)

  Fix wrong `hamburger-menu` custom tag usage

- Updated dependencies [`6fc5042`](https://github.com/inventage/web-components/commit/6fc5042)
- Updated dependencies [`9c100e6`](https://github.com/inventage/web-components/commit/9c100e6)
  - @inventage-web-components/common@0.0.2-next.0
  - @inventage-web-components/hamburger-menu@0.0.2-next.0

## 0.0.1

### Patch Changes

- [`05d8bdd`](https://github.com/inventage/web-components/commit/05d8bdd) Do not include test + stories in final npm package
- Updated dependencies [`05d8bdd`](https://github.com/inventage/web-components/commit/05d8bdd)
  - @inventage-web-components/common@0.0.1
  - @inventage-web-components/hamburger-menu@0.0.1

## 0.0.1-next.1

### Patch Changes

- [`05d8bdd`](https://github.com/inventage/web-components/commit/05d8bdd) Do not include test + stories in final npm package
- Updated dependencies [`05d8bdd`](https://github.com/inventage/web-components/commit/05d8bdd)
  - @inventage-web-components/common@0.0.1-next.1
  - @inventage-web-components/hamburger-menu@0.0.1-next.1
