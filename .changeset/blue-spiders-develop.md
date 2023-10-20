---
'@inventage-web-components/portal-navigation': patch
'@inventage-web-components/hamburger-menu': patch
'@inventage-web-components/avatar-image': patch
---

Prevent re-defining components when the component names have already been consumed (fixes issues with errors like `Failed to execute 'define' on 'CustomElementRegistry': the name "avatar-image" has already been used with this registry)`).
