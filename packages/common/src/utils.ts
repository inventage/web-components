/**
 * A function resolving a promise after a given time.
 * This can be used in async functions to delay execution:
 *
 * async func() {
 *   await delay(1000);
 *   …
 * }
 *
 * @param time
 */
export const delay = (time: number): Promise<void> => new Promise(r => setTimeout(r, time));

/**
 * lit-html does not provide a type for the special `nothing` sentinel value so we define one here…
 *
 * @see https://github.com/typescript-eslint/typescript-eslint/issues/2063#issuecomment-675156492
 */
export type Nothing = Record<string, never>;
