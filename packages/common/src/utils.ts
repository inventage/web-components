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
