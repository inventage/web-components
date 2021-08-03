import { html, TemplateResult } from 'lit-html';

import '../src/hamburger-menu.js';

export default {
  component: 'hamburger-menu',
  title: 'Hamburger Menu',
  // For available controls
  // @see https://storybook.js.org/docs/web-components/essentials/controls#annotation
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

const Template: Story<ArgTypes> = (args: ArgTypes) => html`<hamburger-menu ?toggled="${args.toggled}"></hamburger-menu>`;

export const Default = Template.bind({});
Default.args = {};

export const Toggled = Template.bind({});
Toggled.args = {
  toggled: true,
};
