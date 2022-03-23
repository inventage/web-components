# @inventage-web-components/portal-navigation

## 0.13.5

### Patch Changes

- [`a438a0d`](https://github.com/inventage/web-components/commit/a438a0d5ae01e10a2a1b6e70a82a558343e03239) Call debounced computation of anchor padding in sticky mode immediately.

## 0.13.4

### Patch Changes

- [`769ffd7`](https://github.com/inventage/web-components/commit/769ffd77f0b93e8a37d1c1a5ece90c1eab3194d1) Dependency updates (`lit`).

## 0.13.3

### Patch Changes

- [`3832039`](https://github.com/inventage/web-components/commit/383203973a56fc1de12aa17d8f6add559666eda1) Empty release to fix gh-pages deployment issues.

## 0.13.2

### Patch Changes

- [`1ace7a2`](https://github.com/inventage/web-components/commit/1ace7a2ed424d40a78d688476dcd8f564a9980f4) Release only version, no changes to the previous version.

## 0.13.1

### Patch Changes

- [`c109119`](https://github.com/inventage/web-components/commit/c1091198903762da7540b3b6ea4bfc628116ac55) Do not display hamburger menu when all menus are empty (and hence there's nothing to display behing the hamburger toggle…)

## 0.13.0

### Minor Changes

- [`0c801d6`](https://github.com/inventage/web-components/commit/0c801d6fd4c129bf6b0ff4f96b1045e8e01f92b2) Adds a `fallbackLanguage` property to use as fallback (key) in label translations. When this exists as a key in the label object, the value of that key will be used for the label instead of falling back to an empty string.

## 0.12.3

### Patch Changes

- [`3765f1c`](https://github.com/inventage/web-components/commit/3765f1c47e1b1cdd45fe438b31315f544068b03d) Use `requestAnimationFrame` (twice) to wait to layout updated before calculating container height in sticky mode

## 0.12.2

### Patch Changes

- [`8c17216`](https://github.com/inventage/web-components/commit/8c1721609999c5b15c1a1c241d8a8fab7bff2262) Use `setTimeout` for computing anchor padding when navigation is sticky

## 0.12.1

### Patch Changes

- [`eee9340`](https://github.com/inventage/web-components/commit/eee9340a20436a77602180cf04572394a4b5b1d9) Use non-debounced method for updating padding in sticky mode after each update (in `updated()` Lit callback)

## 0.12.0

### Minor Changes

- [`b3c3cba`](https://github.com/inventage/web-components/commit/b3c3cbaa23598c658af0fab1ae58ba778a52eb57) Prepend `lib` to exports defined in `package.json`

### Patch Changes

- Updated dependencies [[`b3c3cba`](https://github.com/inventage/web-components/commit/b3c3cbaa23598c658af0fab1ae58ba778a52eb57)]:
  - @inventage-web-components/common@0.4.0
  - @inventage-web-components/hamburger-menu@0.5.0

## 0.11.0

### Minor Changes

- [#58](https://github.com/inventage/web-components/pull/58) [`9a7463a`](https://github.com/inventage/web-components/commit/9a7463a4cb3fa830f6009e5b65841d59f6384fef) **BREAKING**: Underlying Lit 1 libraries updated to Lit 2.

  This may break certain builds that are transitively relying on Lit 1. If your Lit 1 components break due to this, make sure your `package.json` explicitly includes the latest Lit 1 versions of `lit-html` and `lit-element` or deduplicate your versions of Lit 1 with your bundler.

  This does not change any of the public APIs. It however effects you when you have your own extension layer or your own components especially when using directives. See the [official lit upgrade guide](https://lit.dev/docs/releases/upgrade/).

### Patch Changes

- Updated dependencies [[`9a7463a`](https://github.com/inventage/web-components/commit/9a7463a4cb3fa830f6009e5b65841d59f6384fef)]:
  - @inventage-web-components/common@0.3.0
  - @inventage-web-components/hamburger-menu@0.4.0

## 0.10.0

### Minor Changes

- [`2d708d1`](https://github.com/inventage/web-components/commit/2d708d1d39cc456a4ee88d13afcb06c0baee8ed7) This is the last [Lit 1](https://lit-element.polymer-project.org) release. Future releases will be using [Lit 2](https://lit.dev)

### Patch Changes

- Updated dependencies [[`2d708d1`](https://github.com/inventage/web-components/commit/2d708d1d39cc456a4ee88d13afcb06c0baee8ed7)]:
  - @inventage-web-components/common@0.2.0
  - @inventage-web-components/hamburger-menu@0.3.0

## 0.9.0

### Minor Changes

- [`224263c`](https://github.com/inventage/web-components/commit/224263c998c2805f444b3b45b4f8e600c89a46e6) Do not use `Helvetica` as the explicit `font-family` for badges. This change adds a new CSS custom property `--portal-navigation-font-family-badge` for the font-family in badges.

### Patch Changes

- [`1b02481`](https://github.com/inventage/web-components/commit/1b024816ba24978ad33aef241b37fe9799f0b973) Dependencies upgrades

## 0.8.9

### Patch Changes

- [`55fe0e4`](https://github.com/inventage/web-components/commit/55fe0e4bc5a7f2ae2048eb1089bc843ef703e8e6) Empty release to fix changeset issues.

## 0.8.8

### Patch Changes

- [`02228c4`](https://github.com/inventage/web-components/commit/02228c4f07e12c7bafdacf0bd0d3b264e38efd63) Empty release to fix changeset issues.

## 0.8.7

### Patch Changes

- [`7f373a6`](https://github.com/inventage/web-components/commit/7f373a60e35a52527db27027e17d81096fc3a908) Add test for routing menu items internally when no application has been set.

* [`d9c8bb5`](https://github.com/inventage/web-components/commit/d9c8bb51be596a5b7caab0375f160205e05a6f8f) Add visual regression tests

- [`5a088b1`](https://github.com/inventage/web-components/commit/5a088b1a70516c571e81fcd7c036429f61c14a31) Better vertically center menu item badge text.

## 0.8.6

### Patch Changes

- [`aae981a`](https://github.com/inventage/web-components/commit/aae981aa3160027d362c082900a8cffb8302ce44) Cleanup storybook docs

* [`e5318c6`](https://github.com/inventage/web-components/commit/e5318c673fa41b0c0ec3424d79f3ab53308d6965) Exclude `private` and `protected` members from custom-elements-manifest.json

## 0.8.5

### Patch Changes

- [`8914720`](https://github.com/inventage/web-components/commit/8914720677828f1b93c3388dde875efc2edd97cd) Add `argTypes` from CSS custom properties from CEM

## 0.8.4

### Patch Changes

- [`9a61a24`](https://github.com/inventage/web-components/commit/9a61a244ec5f31b189b5911bd2daa9e9c9760276) Fixes an issue where the `setActiveUrl` event would not properly update the `activePath` in some cases.

## 0.8.3

### Patch Changes

- [`e18a409`](https://github.com/inventage/web-components/commit/e18a409254b7f811504f7ce344a582bbf85abf74) Add exports for `NavigationEventListeners` and `NavigationEvents`

* [`2ade867`](https://github.com/inventage/web-components/commit/2ade8679e8e16cd87abe03590ed7ae895b41e826) Replace `aTimeout` promises with `oneEvent` in tests.

## 0.8.2

### Patch Changes

- [`d1d817d`](https://github.com/inventage/web-components/commit/d1d817da5c740ade2731296e2797358baa2d8a24) Fixes an issue where the `setBadgeValue` event would not properly set a badge by url if it had already been set for that item by id.

## 0.8.1

### Patch Changes

- [`cfd90ea`](https://github.com/inventage/web-components/commit/cfd90ea1b0988793ba76471638365b6180ac8745) Add example for `setBadgeValue` using `url` instead of an `id` property for selecting menu items.

* [`6d172fc`](https://github.com/inventage/web-components/commit/6d172fc377961b1674bdf37b3ade704638655703) Display `.menu-item` elements with `cursor: pointer`, even when they do not have a `href` attribute defined (since they might have a `defaultItem`)

## 0.8.0

### Minor Changes

- [`fd7c029`](https://github.com/inventage/web-components/commit/fd7c029bb8d4a35111f0121ade988869c3dd37c8) Add `setActiveUrl` event listener for setting the active url (and the derived active path) through events.

### Patch Changes

- [`4200e67`](https://github.com/inventage/web-components/commit/4200e6761dd9c791e19877c9cb49db6755256375) Minor dependency update

* [`891e992`](https://github.com/inventage/web-components/commit/891e9921fc3defefefd6f28d3ad9e634b11baf90) Better documentation for events in storybook

## 0.7.1

### Patch Changes

- [`2790959`](https://github.com/inventage/web-components/commit/279095946dceb04815aea925a1136065f05dc53e) Add missing `tslib` dependency

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
