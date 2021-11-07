import { TemplateResult } from '@inventage-web-components/common';

export { Package } from 'custom-elements-manifest/schema';

export * from './cem.js';
export * from './helpers.js';

export interface Story<T> {
  (args: T): TemplateResult;

  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
  parameters?: Record<string, unknown>;
}
