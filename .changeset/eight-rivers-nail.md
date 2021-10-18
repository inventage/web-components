---
'@inventage-web-components/portal-navigation': minor
---

**BREAKING**: Renamed events in order for all events that the component throws to be namespaced. The two events that make this a breaking change are `hamburgerMenuExpanded` and `firstUpdated`. These are now prefixed with the global component event prefix `portal-navigation.` (e.g. `hamburgerMenuExpanded` → `portal-navigation.hamburgerMenuExpanded`).

All events have been unified by using `composed: true` and `bubbles: true`, which means you do not have listen to them on the element directly.
