import { baseStyles, CSSResultArray, html, LitElement, PropertyValues, TemplateResult } from '@inventage-web-components/common';
import { property } from '@inventage-web-components/common/lib/src/decorators.js';
import { classMap } from '@inventage-web-components/common/lib/src/directives.js';
import { styles } from './styles-css.js';

/**
 * A simple hamburger menu component.
 *
 * @fires state-changed - Event fired when the hamburger menu state changes.
 *
 * @prop {Boolean} toggled - Reflects the toggled state.
 *
 * @cssprop {Length} [--hamburger-padding-x=3px]
 * @cssprop {Length} [--hamburger-padding-y=10px]
 * @cssprop {Length} [--hamburger-layer-width=26px]
 * @cssprop {Length} [--hamburger-layer-height=2px]
 * @cssprop {Length} [--hamburger-layer-spacing=4px]
 * @cssprop {Color} [--hamburger-layer-color=black]
 * @cssprop {Length} [--hamburger-layer-border-radius=0]
 * @cssprop {Length} [--hamburger-hover-opacity=1]
 * @cssprop {Length} [--hamburger-hover-transition-duration=0.15s]
 * @cssprop {Length} [--hamburger-hover-transition-timing-function=linear]
 */
export class HamburgerMenu extends LitElement {
  @property({
    type: Boolean,
    reflect: true,
  })
  toggled = false;

  static get styles(): CSSResultArray {
    return [baseStyles, styles];
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('toggled') && changedProperties.get('toggled') !== undefined) {
      this.dispatchEvent(
        new CustomEvent('state-changed', {
          detail: this.toggled,
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  toggle(): void {
    this.toggled = !this.toggled;
  }

  render(): TemplateResult {
    return html`
      <button aria-label="Hamburger Toggle" class="hamburger ${classMap({ '-toggled': this.toggled })}" @click="${this.onHamburgerClick}">
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
    `;
  }

  private onHamburgerClick(e: Event): void {
    e.preventDefault();
    this.toggle();
  }
}
