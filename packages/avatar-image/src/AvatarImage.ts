import { baseStyles, CSSResultArray, html, LitElement, TemplateResult } from '@inventage-web-components/common';
import { styles } from './styles-css.js';

/**
 * An avatar image based on user initials.
 */
export class AvatarImage extends LitElement {
  static get styles(): CSSResultArray {
    return [baseStyles, styles];
  }

  render(): TemplateResult {
    return html` Avatar image… `;
  }
}
