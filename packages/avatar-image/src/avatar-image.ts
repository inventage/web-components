import { AvatarImage } from './AvatarImage.js';

customElements.get('avatar-image') || customElements.define('avatar-image', AvatarImage);

declare global {
  interface HTMLElementTagNameMap {
    'avatar-image': AvatarImage;
  }
}
