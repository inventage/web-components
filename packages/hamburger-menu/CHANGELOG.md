# @inventage-web-components/hamburger-menu

## 1.1.2

### Patch Changes

- [`fdd1d0a`](https://github.com/inventage/web-components/commit/fdd1d0a96b6ebb4e132ae47d8498b53a60d28ac3) - Prevent re-defining components when the component names have already been consumed (fixes issues with errors like `Failed to execute 'define' on 'CustomElementRegistry': the name "avatar-image" has already been used with this registry)`).

## 1.1.1

### Patch Changes

- Updated dependencies [[`f37e930`](https://github.com/inventage/web-components/commit/f37e9301923d9d5824c5452b9488ac614afb3696)]:
  - @inventage-web-components/common@2.0.0

## 1.1.0

### Minor Changes

- [`a334bba`](https://github.com/inventage/web-components/commit/a334bba1cdcdc8c38eb25a0e18a17f138be77654) - Updated `tslib` from `^2.5.0` to `^2.6.2` (see https://github.com/Microsoft/tslib/releases)

### Patch Changes

- Updated dependencies [[`74b6541`](https://github.com/inventage/web-components/commit/74b6541464a943ba770b8a53e52569c00e01276d)]:
  - @inventage-web-components/common@1.1.0

## 1.0.0

### Major Changes

- [`3292414`](https://github.com/inventage/web-components/commit/3292414de8cc9864e22dc88c2920b6e80038d2e5) - Initial 1.0 release 🎉

### Patch Changes

- Updated dependencies [[`3292414`](https://github.com/inventage/web-components/commit/3292414de8cc9864e22dc88c2920b6e80038d2e5)]:
  - @inventage-web-components/common@1.0.0

## 0.5.3

### Patch Changes

- Updated dependencies [[`82917ba`](https://github.com/inventage/web-components/commit/82917ba5ec7231cb3266be2b2fb6f9d098b10a1b)]:
  - @inventage-web-components/common@0.6.0

## 0.5.2

### Patch Changes

- [`dcf2b83`](https://github.com/inventage/web-components/commit/dcf2b8312784f277d9527af87741da4f4298d0f5) Reformat package.json

## 0.5.1

### Patch Changes

- Updated dependencies [[`6ef2bae`](https://github.com/inventage/web-components/commit/6ef2bae99a3b6a6badc4d3132fee096a2aa41ae5), [`de3a9d3`](https://github.com/inventage/web-components/commit/de3a9d376d85a2057097aab3ad5366ed50c21a92)]:
  - @inventage-web-components/common@0.5.0

## 0.5.0

### Minor Changes

- [`b3c3cba`](https://github.com/inventage/web-components/commit/b3c3cbaa23598c658af0fab1ae58ba778a52eb57) Prepend `lib` to exports defined in `package.json`

### Patch Changes

- Updated dependencies [[`b3c3cba`](https://github.com/inventage/web-components/commit/b3c3cbaa23598c658af0fab1ae58ba778a52eb57)]:
  - @inventage-web-components/common@0.4.0

## 0.4.0

### Minor Changes

- [#58](https://github.com/inventage/web-components/pull/58) [`9a7463a`](https://github.com/inventage/web-components/commit/9a7463a4cb3fa830f6009e5b65841d59f6384fef) **BREAKING**: Underlying Lit 1 libraries updated to Lit 2.

  This may break certain builds that are transitively relying on Lit 1. If your Lit 1 components break due to this, make sure your `package.json` explicitly includes the latest Lit 1 versions of `lit-html` and `lit-element` or deduplicate your versions of Lit 1 with your bundler.

  This does not change any of the public APIs. It however effects you when you have your own extension layer or your own components especially when using directives. See the [official lit upgrade guide](https://lit.dev/docs/releases/upgrade/).

### Patch Changes

- Updated dependencies [[`9a7463a`](https://github.com/inventage/web-components/commit/9a7463a4cb3fa830f6009e5b65841d59f6384fef)]:
  - @inventage-web-components/common@0.3.0

## 0.3.0

### Minor Changes

- [`2d708d1`](https://github.com/inventage/web-components/commit/2d708d1d39cc456a4ee88d13afcb06c0baee8ed7) This is the last [Lit 1](https://lit-element.polymer-project.org) release. Future releases will be using [Lit 2](https://lit.dev)

### Patch Changes

- Updated dependencies [[`2d708d1`](https://github.com/inventage/web-components/commit/2d708d1d39cc456a4ee88d13afcb06c0baee8ed7)]:
  - @inventage-web-components/common@0.2.0

## 0.2.8

### Patch Changes

- [`55fe0e4`](https://github.com/inventage/web-components/commit/55fe0e4bc5a7f2ae2048eb1089bc843ef703e8e6) Empty release to fix changeset issues.

## 0.2.7

### Patch Changes

- [`02228c4`](https://github.com/inventage/web-components/commit/02228c4f07e12c7bafdacf0bd0d3b264e38efd63) Empty release to fix changeset issues.

## 0.2.6

### Patch Changes

- [`d9c8bb5`](https://github.com/inventage/web-components/commit/d9c8bb51be596a5b7caab0375f160205e05a6f8f) Add visual regression tests

## 0.2.5

### Patch Changes

- [`aae981a`](https://github.com/inventage/web-components/commit/aae981aa3160027d362c082900a8cffb8302ce44) Cleanup storybook docs

* [`e5318c6`](https://github.com/inventage/web-components/commit/e5318c673fa41b0c0ec3424d79f3ab53308d6965) Exclude `private` and `protected` members from custom-elements-manifest.json

## 0.2.4

### Patch Changes

- [`8914720`](https://github.com/inventage/web-components/commit/8914720677828f1b93c3388dde875efc2edd97cd) Add `argTypes` from CSS custom properties from CEM

## 0.2.3

### Patch Changes

- [`2790959`](https://github.com/inventage/web-components/commit/279095946dceb04815aea925a1136065f05dc53e) Add missing `tslib` dependency

## 0.2.2

### Patch Changes

- [`3927bf3`](https://github.com/inventage/web-components/commit/3927bf31a79d97777bbcfb602901458965494395) Fix `sideEffects` definition in `package.json`

## 0.2.1

### Patch Changes

- [`2614cf7`](https://github.com/inventage/web-components/commit/2614cf7cd9d1ae46042f2ef90c0c05a7b749a0db) Import all lit\* things from @inventage-web-components/common

## 0.2.0

### Minor Changes

- [`a288eb3`](https://github.com/inventage/web-components/commit/a288eb3) Fix sideEffects configuration

## 0.1.0

### Minor Changes

- [`abbeb80`](https://github.com/inventage/web-components/commit/abbeb80) Add exports to package.json
- [`467e204`](https://github.com/inventage/web-components/commit/467e204) Remove tslib and lit dependencies, these are provided by the common package

### Patch Changes

- [`2acd897`](https://github.com/inventage/web-components/commit/2acd897) Use `lit-html` and `lit-element` and related exports from `@inventage-web-components/common` package.
- Updated dependencies [`2acd897`](https://github.com/inventage/web-components/commit/2acd897)
- Updated dependencies [`af5e012`](https://github.com/inventage/web-components/commit/af5e012)
  - @inventage-web-components/common@0.1.0

## 0.0.17

### Patch Changes

- [`f6beaec`](https://github.com/inventage/web-components/commit/f6beaec) Test release for Github action fixes

## 0.0.16

### Patch Changes

- [`72687b1`](https://github.com/inventage/web-components/commit/72687b1) Test release for Github action fixes

## 0.0.15

### Patch Changes

- [`d7f98d0`](https://github.com/inventage/web-components/commit/d7f98d0) Test release for Github action fixes

## 0.0.14

### Patch Changes

- [`e41e693`](https://github.com/inventage/web-components/commit/e41e693) Use a separate storybook deployment script

## 0.0.13

### Patch Changes

- Updated dependencies [`2cc54a2`](https://github.com/inventage/web-components/commit/2cc54a2)
  - @inventage-web-components/common@0.0.11

## 0.0.12

### Patch Changes

- Updated dependencies [`b3057c0`](https://github.com/inventage/web-components/commit/b3057c0)
  - @inventage-web-components/common@0.0.10

## 0.0.11

### Patch Changes

- [`55343d9`](https://github.com/inventage/web-components/commit/55343d9) Test release for Github action fixes
- Updated dependencies [`55343d9`](https://github.com/inventage/web-components/commit/55343d9)
  - @inventage-web-components/common@0.0.9

## 0.0.10

### Patch Changes

- Updated dependencies [`d83aec9`](https://github.com/inventage/web-components/commit/d83aec9)
  - @inventage-web-components/common@0.0.8

## 0.0.9

### Patch Changes

- Updated dependencies [`e0dae87`](https://github.com/inventage/web-components/commit/e0dae87)
  - @inventage-web-components/common@0.0.7

## 0.0.8

### Patch Changes

- [`62d385e`](https://github.com/inventage/web-components/commit/62d385e) Do not inline ts helpers, use `importHelpers` and build-time dependencies on `tslib` instead

## 0.0.7

### Patch Changes

- [`a857d1e`](https://github.com/inventage/web-components/commit/a857d1e) Add missing meta fields (github repo, issues, etc.) to `package.json`
- Updated dependencies [`a857d1e`](https://github.com/inventage/web-components/commit/a857d1e)
  - @inventage-web-components/common@0.0.6

## 0.0.6

### Patch Changes

- [`8a8eca8`](https://github.com/inventage/web-components/commit/8a8eca8) Use `@changesets/changelog-git` for changelog generation
- Updated dependencies [`8a8eca8`](https://github.com/inventage/web-components/commit/8a8eca8)
  - @inventage-web-components/common@0.0.5

## 0.0.5

### Patch Changes

- [`03daeb5`](https://github.com/inventage/web-components/commit/03daeb5978e3a7ffa37acd409b0019a2bd027d70) Use `@changesets/changelog-github` for changelog generation

- Updated dependencies [[`03daeb5`](https://github.com/inventage/web-components/commit/03daeb5978e3a7ffa37acd409b0019a2bd027d70)]:
  - @inventage-web-components/common@0.0.4

## 0.0.4

### Patch Changes

- [`35d57d9`](https://github.com/inventage/web-components/commit/35d57d9) Fix event names in JSDoc comments
- [`4dd5dae`](https://github.com/inventage/web-components/commit/4dd5dae) Minor fix for sinon imports in tests

## 0.0.3

### Patch Changes

- [`a27e5d5`](https://github.com/inventage/web-components/commit/a27e5d5) Empty test release
- Updated dependencies [`a27e5d5`](https://github.com/inventage/web-components/commit/a27e5d5)
  - @inventage-web-components/common@0.0.3

## 0.0.3-next.0

### Patch Changes

- [`4a93691`](https://github.com/inventage/web-components/commit/4a93691) Added missing license, fixed license links.
- Updated dependencies [`4a93691`](https://github.com/inventage/web-components/commit/4a93691)
  - @inventage-web-components/common@0.0.3-next.0

## 0.0.2

### Patch Changes

- [`cae77d2`](https://github.com/inventage/web-components/commit/cae77d2) - Add keywords to `package.json`
- [`6fc5042`](https://github.com/inventage/web-components/commit/6fc5042) Add initial README versions
- Updated dependencies [`cae77d2`](https://github.com/inventage/web-components/commit/cae77d2)
- Updated dependencies [`6fc5042`](https://github.com/inventage/web-components/commit/6fc5042)
- Updated dependencies [`9c100e6`](https://github.com/inventage/web-components/commit/9c100e6)
  - @inventage-web-components/common@0.0.2

## 0.0.2-next.1

### Patch Changes

- [`cae77d2`](https://github.com/inventage/web-components/commit/cae77d2) - Add keywords to `package.json`
- Updated dependencies [`cae77d2`](https://github.com/inventage/web-components/commit/cae77d2)
  - @inventage-web-components/common@0.0.2-next.1

## 0.0.2-next.0

### Patch Changes

- [`6fc5042`](https://github.com/inventage/web-components/commit/6fc5042) Add initial README versions
- Updated dependencies [`6fc5042`](https://github.com/inventage/web-components/commit/6fc5042)
- Updated dependencies [`9c100e6`](https://github.com/inventage/web-components/commit/9c100e6)
  - @inventage-web-components/common@0.0.2-next.0

## 0.0.1

### Patch Changes

- [`05d8bdd`](https://github.com/inventage/web-components/commit/05d8bdd) Do not include test + stories in final npm package
- Updated dependencies [`05d8bdd`](https://github.com/inventage/web-components/commit/05d8bdd)
  - @inventage-web-components/common@0.0.1

## 0.0.1-next.1

### Patch Changes

- [`05d8bdd`](https://github.com/inventage/web-components/commit/05d8bdd) Do not include test + stories in final npm package
- Updated dependencies [`05d8bdd`](https://github.com/inventage/web-components/commit/05d8bdd)
  - @inventage-web-components/common@0.0.1-next.1
