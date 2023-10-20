import { HamburgerMenu } from './HamburgerMenu.js';

customElements.get('hamburger-menu') || customElements.define('hamburger-menu', HamburgerMenu);

declare global {
  interface HTMLElementTagNameMap {
    'hamburger-menu': HamburgerMenu;
  }
}
