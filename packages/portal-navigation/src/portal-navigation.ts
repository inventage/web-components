import { PortalNavigation } from './PortalNavigation';

customElements.define('portal-navigation', PortalNavigation);

declare global {
  interface HTMLElementTagNameMap {
    'portal-navigation': PortalNavigation;
  }
}
