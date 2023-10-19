import { html, nothing, TemplateResult } from '@inventage-web-components/common';
import { getArgTypes, getCustomElement, Package, setCssStyleFromArgs, Story } from '@inventage-web-components/dev-helpers';
import { ClassInfo } from 'lit-html/development/directives/class-map';
import { classMap } from '@inventage-web-components/common/lib/src/directives.js';

import '../src/avatar-image.js';

import cem from '../custom-elements.json';

const customElement = getCustomElement(cem as Package, 'src/AvatarImage.js', 'AvatarImage');

console.log('customElement', customElement);
console.log('getCssPropArgTypes(customElement)', getArgTypes(customElement));

export default {
  component: 'avatar-image',
  title: 'Avatar Image',
  // For available controls
  // @see https://storybook.js.org/docs/web-components/essentials/controls#annotation
  argTypes: {
    input: {
      control: {
        type: 'text',
      },
    },
    // CSS prop arg types
    ...getArgTypes(customElement),
  },
};

interface ArgTypes {
  input?: string;

  [key: string]: unknown;
}

type TemplateOptions = {
  slots?: TemplateResult;
  classInfo: ClassInfo;
};

const Template = (args: ArgTypes, options: Partial<TemplateOptions> = {}) => {
  const { slots, classInfo = {} } = options || {};

  // Automatically set styles for each CSS custom prop passed as argument
  setCssStyleFromArgs(args, document.documentElement.style);

  return html`<avatar-image .input="${args.input}" class="${classMap(classInfo)}">${slots ?? nothing}</avatar-image>`;
};

export const Default: Story<ArgTypes> = (args: ArgTypes) =>
  html`${Template(args)}${html`<style>
    avatar-image {
      width: 64px;
    }
  </style>`}`;
Default.args = {
  input: 'Foo Bar',
};

export const Empty: Story<ArgTypes> = (args: ArgTypes) => Template(args);
Empty.args = {};

export const Sizes: Story<ArgTypes> = (args: ArgTypes) => {
  return html`${Template(args, {
    classInfo: {
      avatar1: true,
    },
  })}${Template(args, {
    classInfo: {
      avatar2: true,
    },
  })}${Template(args, {
    classInfo: {
      avatar3: true,
    },
  })}${html`
    <style>
      avatar-image {
        display: inline-block;
        margin-right: 1rem;
      }

      .avatar1 {
        width: 32px;
      }

      .avatar2 {
        width: 64px;
      }

      .avatar3 {
        width: 128px;
      }
    </style>
  `}`;
};
Sizes.args = {
  input: 'John Wick',
};
