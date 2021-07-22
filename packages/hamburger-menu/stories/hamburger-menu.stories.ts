import { html, TemplateResult } from 'lit-html';
import { spreadProps } from '@open-wc/lit-helpers';

import '../src/portal-hamburger-menu.js';

export default {
  component: 'hamburger-menu',
  title: 'Hamburger Menu',
  // For available controls
  // @see https://storybook.js.org/docs/react/essentials/controls#annotation
  argTypes: {
    toggled: { control: 'boolean' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  toggled?: boolean;
}

const Template: Story<ArgTypes> = (args: ArgTypes) => html`<portal-hamburger-menu ...="${spreadProps(args)}"></portal-hamburger-menu>`;

export const Default = Template.bind({});
Default.args = {};
