import { PortalNavigation } from './PortalNavigation.js';

customElements.define('portal-navigation', PortalNavigation);

declare global {
  interface HTMLElementTagNameMap {
    'portal-navigation': PortalNavigation;
  }
}
