import { PortalNavigation } from './PortalNavigation.js';

customElements.get('portal-navigation') || customElements.define('portal-navigation', PortalNavigation);

declare global {
  interface HTMLElementTagNameMap {
    'portal-navigation': PortalNavigation;
  }
}
