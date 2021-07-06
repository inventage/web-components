import { css } from 'lit-element';

/**
 * Shared component styles
 *
 * @link https://lit-element.polymer-project.org/guide/styles#style-the-component-itself
 */
export const baseStyles = css`
  :host {
    display: block;
  }

  :host([hidden]) {
    display: none;
  }
`;
