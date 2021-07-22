import { html, TemplateResult } from 'lit-html';
import '../src/portal-hamburger-menu.js';

export default {
  component: 'hamburger-menu',
  title: 'Hamburger Menu',
  args: {
    toggled: false,
  },
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

const Template: Story<ArgTypes> = ({ toggled = false }: ArgTypes = {}): TemplateResult => {
  return html`<portal-hamburger-menu .toggled="${toggled}"></portal-hamburger-menu>`;
};

export const Default = Template.bind({});
