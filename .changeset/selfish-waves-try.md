---
'@inventage-web-components/portal-navigation': patch
---

Add a default storybook story

Make sure the Web Dev Server config for storybook only serves `custom-elements-experimental.json` as `js`, since we need to serve other JSON files as JSON (e.g. for `src` attribute / property in this component)

Fix wrong `hamburger-menu` custom tag usage
