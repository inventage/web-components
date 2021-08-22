export * from './baseStyles.js';
export * from './utils.js';

export * from 'lit-element';
export { nothing } from 'lit-html';

/**
 * lit-html does not provide a type for the special `nothing` sentinel value so we define one here…
 *
 * @see https://github.com/typescript-eslint/typescript-eslint/issues/2063#issuecomment-675156492
 */
export type Nothing = Record<string, never>;
