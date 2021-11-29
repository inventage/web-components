---
'@inventage-web-components/common': minor
'@inventage-web-components/hamburger-menu': minor
'@inventage-web-components/portal-navigation': minor
---

**BREAKING**: Underlying Lit 1 libraries updated to Lit 2.

This may break certain builds that are transitively relying on Lit 1. If your Lit 1 components break due to this, make sure your `package.json` explicitly includes the latest Lit 1 versions of `lit-html` and `lit-element` or deduplicate your versions of Lit 1 with your bundler.

This does not change any of the public APIs. It however effects you when you have your own extension layer or your own components especially when using directives. See the [official lit upgrade guide](https://lit.dev/docs/releases/upgrade/).
