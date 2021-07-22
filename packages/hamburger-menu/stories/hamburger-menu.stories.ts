import { html, TemplateResult } from 'lit-html';
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

const Template: Story<ArgTypes> = ({ toggled = false }: ArgTypes) => html`<portal-hamburger-menu .toggled=${toggled}></portal-hamburger-menu>`;

export const Regular = Template.bind({});
