import { AvatarImage } from './AvatarImage.js';

customElements.define('hamburger-menu', AvatarImage);

declare global {
  interface HTMLElementTagNameMap {
    'avatar-image': AvatarImage;
  }
}
