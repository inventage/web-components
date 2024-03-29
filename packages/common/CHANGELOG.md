# @inventage-web-components/common

## 2.1.0

### Minor Changes

- [`fc456be`](https://github.com/inventage/web-components/commit/fc456be97be01f15ab09efffa770e308f2da4d83) Upgrade Lit (`^3.0.1` → `^3.1.0`).

## 2.0.1

### Patch Changes

- [`8acbc31`](https://github.com/inventage/web-components/commit/8acbc31030b41ae9b15c55ca3ea55222e53360c8) - Bump `lit` from `^3.0.0` to `^3.0.1`

## 2.0.0

### Major Changes

- [`f37e930`](https://github.com/inventage/web-components/commit/f37e9301923d9d5824c5452b9488ac614afb3696) - Upgrade Lit from `2.8.0` to `3.0.0`. See https://lit.dev/blog/2023-10-10-lit-3.0/x

## 1.2.0

### Minor Changes

- [#154](https://github.com/inventage/web-components/pull/154) [`d340286`](https://github.com/inventage/web-components/commit/d3402861096daa46034c9970f60494d69438d287) Added exports for `unsafeHTML` and `unsafeSVG` directives.

## 1.1.0

### Minor Changes

- [`74b6541`](https://github.com/inventage/web-components/commit/74b6541464a943ba770b8a53e52569c00e01276d) - Updated `lit` from `^2.7.4` to `^2.8.0`

## 1.0.1

### Patch Changes

- [`b6007b0`](https://github.com/inventage/web-components/commit/b6007b0fb591de305e368ce197d46ef69f284732) - Update `lit-html` to `2.7.4` (see https://github.com/lit/lit/releases/tag/lit-html%402.7.4)

## 1.0.0

### Major Changes

- [`3292414`](https://github.com/inventage/web-components/commit/3292414de8cc9864e22dc88c2920b6e80038d2e5) - Initial 1.0 release 🎉

## 0.6.1

### Patch Changes

- [#99](https://github.com/inventage/web-components/pull/99) [`e828a66`](https://github.com/inventage/web-components/commit/e828a6653175dbbe0057f35cfa97dc6a526907ab) Thanks [@dependabot](https://github.com/apps/dependabot)! - - Update Lit from `2.4.0` to `2.6.1`

## 0.6.0

### Minor Changes

- [`82917ba`](https://github.com/inventage/web-components/commit/82917ba5ec7231cb3266be2b2fb6f9d098b10a1b) Bump `lit` from `^2.2.5` to `^2.4.0`

## 0.5.1

### Patch Changes

- [`dcf2b83`](https://github.com/inventage/web-components/commit/dcf2b8312784f277d9527af87741da4f4298d0f5) Reformat package.json

## 0.5.0

### Minor Changes

- [`6ef2bae`](https://github.com/inventage/web-components/commit/6ef2bae99a3b6a6badc4d3132fee096a2aa41ae5) Upgrade `lit` from `^2.2.1` to `^2.2.2`

### Patch Changes

- [`de3a9d3`](https://github.com/inventage/web-components/commit/de3a9d376d85a2057097aab3ad5366ed50c21a92) Upgrade `lit` from `^2.2.2` to `^2.2.5`

## 0.4.3

### Patch Changes

- [`98480c3`](https://github.com/inventage/web-components/commit/98480c39a20e09064d02f3890de74eef46186833) Patch upgrade `lit`

## 0.4.2

### Patch Changes

- [`769ffd7`](https://github.com/inventage/web-components/commit/769ffd77f0b93e8a37d1c1a5ece90c1eab3194d1) Dependency updates (`lit`).

## 0.4.1

### Patch Changes

- [`3765f1c`](https://github.com/inventage/web-components/commit/3765f1c47e1b1cdd45fe438b31315f544068b03d) Use `requestAnimationFrame` (twice) to wait to layout updated before calculating container height in sticky mode

## 0.4.0

### Minor Changes

- [`b3c3cba`](https://github.com/inventage/web-components/commit/b3c3cbaa23598c658af0fab1ae58ba778a52eb57) Prepend `lib` to exports defined in `package.json`

## 0.3.0

### Minor Changes

- [#58](https://github.com/inventage/web-components/pull/58) [`9a7463a`](https://github.com/inventage/web-components/commit/9a7463a4cb3fa830f6009e5b65841d59f6384fef) **BREAKING**: Underlying Lit 1 libraries updated to Lit 2.

  This may break certain builds that are transitively relying on Lit 1. If your Lit 1 components break due to this, make sure your `package.json` explicitly includes the latest Lit 1 versions of `lit-html` and `lit-element` or deduplicate your versions of Lit 1 with your bundler.

  This does not change any of the public APIs. It however effects you when you have your own extension layer or your own components especially when using directives. See the [official lit upgrade guide](https://lit.dev/docs/releases/upgrade/).

## 0.2.0

### Minor Changes

- [`2d708d1`](https://github.com/inventage/web-components/commit/2d708d1d39cc456a4ee88d13afcb06c0baee8ed7) This is the last [Lit 1](https://lit-element.polymer-project.org) release. Future releases will be using [Lit 2](https://lit.dev)

## 0.1.3

### Patch Changes

- [`55fe0e4`](https://github.com/inventage/web-components/commit/55fe0e4bc5a7f2ae2048eb1089bc843ef703e8e6) Empty release to fix changeset issues.

## 0.1.2

### Patch Changes

- [`02228c4`](https://github.com/inventage/web-components/commit/02228c4f07e12c7bafdacf0bd0d3b264e38efd63) Empty release to fix changeset issues.

## 0.1.1

### Patch Changes

- [`2614cf7`](https://github.com/inventage/web-components/commit/2614cf7cd9d1ae46042f2ef90c0c05a7b749a0db) Import all lit\* things from @inventage-web-components/common

## 0.1.0

### Minor Changes

- [`2acd897`](https://github.com/inventage/web-components/commit/2acd897) Provide `lit-html` and `lit-element` and related exports for other `@inventage-web-components` packages

### Patch Changes

- [`af5e012`](https://github.com/inventage/web-components/commit/af5e012) Add sideEffects to package.json

## 0.0.11

### Patch Changes

- [`2cc54a2`](https://github.com/inventage/web-components/commit/2cc54a2) Re-add missing publish step in Github actions

## 0.0.10

### Patch Changes

- [`b3057c0`](https://github.com/inventage/web-components/commit/b3057c0) Do not use custom script for releases

## 0.0.9

### Patch Changes

- [`55343d9`](https://github.com/inventage/web-components/commit/55343d9) Test release for Github action fixes

## 0.0.8

### Patch Changes

- [`d83aec9`](https://github.com/inventage/web-components/commit/d83aec9) Test release for Github action fixes

## 0.0.7

### Patch Changes

- [`e0dae87`](https://github.com/inventage/web-components/commit/e0dae87) Test release for Github action fixes

## 0.0.6

### Patch Changes

- [`a857d1e`](https://github.com/inventage/web-components/commit/a857d1e) Add missing meta fields (github repo, issues, etc.) to `package.json`

## 0.0.5

### Patch Changes

- [`8a8eca8`](https://github.com/inventage/web-components/commit/8a8eca8) Use `@changesets/changelog-git` for changelog generation

## 0.0.4

### Patch Changes

- [`03daeb5`](https://github.com/inventage/web-components/commit/03daeb5978e3a7ffa37acd409b0019a2bd027d70) Use `@changesets/changelog-github` for changelog generation

## 0.0.3

### Patch Changes

- [`a27e5d5`](https://github.com/inventage/web-components/commit/a27e5d5) Empty test release

## 0.0.3-next.0

### Patch Changes

- [`4a93691`](https://github.com/inventage/web-components/commit/4a93691) Added missing license, fixed license links.

## 0.0.2

### Patch Changes

- [`cae77d2`](https://github.com/inventage/web-components/commit/cae77d2) - Add keywords to `package.json`
- [`6fc5042`](https://github.com/inventage/web-components/commit/6fc5042) Add initial README versions
- [`9c100e6`](https://github.com/inventage/web-components/commit/9c100e6) Import and export everything from `lit-element` to provide a consistent version for other packages

## 0.0.2-next.1

### Patch Changes

- [`cae77d2`](https://github.com/inventage/web-components/commit/cae77d2) - Add keywords to `package.json`

## 0.0.2-next.0

### Patch Changes

- [`6fc5042`](https://github.com/inventage/web-components/commit/6fc5042) Add initial README versions
- [`9c100e6`](https://github.com/inventage/web-components/commit/9c100e6) Import and export everything from `lit-element` to provide a consistent version for other packages

## 0.0.1

### Patch Changes

- [`05d8bdd`](https://github.com/inventage/web-components/commit/05d8bdd) Do not include test + stories in final npm package

## 0.0.1-next.1

### Patch Changes

- [`05d8bdd`](https://github.com/inventage/web-components/commit/05d8bdd) Do not include test + stories in final npm package
