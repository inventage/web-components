---
'@inventage-web-components/portal-navigation': patch
---

Instead of relying on two nested `requestAnimationFrame` callbacks to detect when style and layout information have been applied (for computing the `anchor` padding in `sticky` mode), we instead now use `requestAnimationFrame` in combination with `setTimeout`.

This should hopefully give us a more reliable hook into the point in time where the style and layout information have been calculated and the paint has occurred.
