---
'@inventage-web-components/portal-navigation': minor
---

Rewrite the anchor padding updating mechanism in sticky mode to use `requestAnimationFrame` for a maximum of `100` times after each update. This should fix the padding issues in sticky mode once and for all…
