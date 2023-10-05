import { AvatarImage } from './AvatarImage.js';

customElements.define('avatar-image', AvatarImage);

declare global {
  interface HTMLElementTagNameMap {
    'avatar-image': AvatarImage;
  }
}
