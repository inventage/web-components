import { HamburgerMenu } from './HamburgerMenu.js';

customElements.define('hamburger-menu', HamburgerMenu);

declare global {
  interface HTMLElementTagNameMap {
    'hamburger-menu': HamburgerMenu;
  }
}
