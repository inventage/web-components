import { TemplateResult } from '@inventage-web-components/common';

export interface Story<T> {
  (args: T): TemplateResult;

  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
  parameters?: Record<string, unknown>;
}
