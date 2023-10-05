import { baseStyles, CSSResultArray, html, LitElement, nothing, PropertyValues } from '@inventage-web-components/common';
import { property, state } from '@inventage-web-components/common/lib/src/decorators.js';
import { unsafeSVG } from '@inventage-web-components/common/lib/src/directives.js';

import { styles } from './styles-css.js';
import { getInitialsFromString, stringHash, svgImage, svgImageDefaultOptions } from './utils.js';

const BACKGROUND_COLORS = [
  '#030b60',
  '#a32800',
  '#4d0887',
  '#e0cb0d',
  '#e812b2',
  '#ab08cc',
  '#961b0d',
  '#9603bf',
  '#0d912e',
  '#036363',
  '#4b0b75',
  '#a102d6',
  '#e2a412',
  '#d84d0d',
  '#077a7a',
  '#b55710',
  '#ad2d06',
  '#587c02',
  '#757c09',
  '#0a7482',
];

/**
 * An avatar image based on user initials.
 *
 * @prop {String} input - The string input to use for generating the avatar image
 */
export class AvatarImage extends LitElement {
  static get styles(): CSSResultArray {
    return [baseStyles, styles];
  }

  @property()
  input?: string;

  @state()
  private initials?: string;

  @state()
  private backgroundColor: string = svgImageDefaultOptions.backgroundColor;

  protected willUpdate(changedProperties: PropertyValues) {
    super.willUpdate(changedProperties);

    if (changedProperties.has('input')) {
      this.initials = getInitialsFromString(this.input || '');
    }

    if (changedProperties.has('initials')) {
      this.color = this.initials ? BACKGROUND_COLORS[stringHash(this.initials) % BACKGROUND_COLORS.length] : undefined;
    }
  }

  render() {
    if (!this.initials) {
      return nothing;
    }

    return html`<div class="avatar">
      ${html`${unsafeSVG(
        svgImage(getInitialsFromString(this.initials)!, 64, {
          backgroundColor: this.color,
        })
      )}`}
    </div>`;
  }
}
