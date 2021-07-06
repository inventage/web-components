import { PortalHamburgerMenu } from './PortalHamburgerMenu';

customElements.define('portal-hamburger-menu', PortalHamburgerMenu);

declare global {
  interface HTMLElementTagNameMap {
    'portal-hamburger-menu': PortalHamburgerMenu;
  }
}
