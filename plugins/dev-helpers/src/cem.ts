import { CssCustomProperty, CssPart, CustomElement, Package, Slot } from 'custom-elements-manifest/schema.js';

/**
 * Returns the custom element declaration from the given custom elements manifest at the given path and for the given class name.
 *
 * @param cem
 * @param path
 * @param className
 */
export const getCustomElement = (cem: Package, path: string, className: string): CustomElement | undefined => {
  const module = cem.modules.find(m => m.path === path);
  if (!module) {
    return;
  }

  const { declarations } = module;
  if (!declarations) {
    return;
  }

  const [declaration] = module!.declarations!.filter(d => d.kind === 'class' && d.name === className);
  if (!declaration) {
    return;
  }

  const { customElement } = declaration as CustomElement;
  if (!customElement) {
    return;
  }

  return declaration as CustomElement;
};

/**
 * Returns the list of properties for the given custom element.
 *
 * @param element
 */
export const getCssProperties = (element?: CustomElement): CssCustomProperty[] => {
  if (!element) {
    return [];
  }

  const { cssProperties } = element;
  if (!cssProperties) {
    return [];
  }

  return cssProperties;
};

/**
 * Returns the list of css parts for the given custom element.
 *
 * @param element
 */
export const getCssParts = (element?: CustomElement): CssPart[] => {
  if (!element) {
    return [];
  }

  const { cssParts } = element;
  if (!cssParts) {
    return [];
  }

  return cssParts;
};

/**
 * Returns the list of slots for the given custom element.
 *
 * @param element
 */
export const getSlots = (element?: CustomElement): Slot[] => {
  if (!element) {
    return [];
  }

  const { slots } = element;
  if (!slots) {
    return [];
  }

  return slots;
};

/**
 * Returns the argType object with all custom element for the given custom element.
 *
 * @param element
 * @see https://storybook.js.org/docs/web-components/essentials/controls#annotation
 */
export const getArgTypes = (element?: CustomElement): Record<string, unknown> => {
  const cssPropArgTypes: Record<string, unknown> = {};
  const cssProperties = getCssProperties(element);
  const cssParts = getCssParts(element);
  const slots = getSlots(element);

  // Define argTypes for all CSS properties
  cssProperties.map((prop: CssCustomProperty) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { type: { text = {} } = {}, name } = prop as unknown as any;
    if (!name) {
      console.error('No property name found for', prop);
    }

    cssPropArgTypes[name] = {
      control: {
        type: `${text}`.toLowerCase() === 'color' ? 'color' : 'text',
      },
    };
  });

  // Define argTypes for all CSS parts
  cssParts.map(prop => {
    const { name } = prop;

    cssPropArgTypes[name] = {
      control: false,
    };
  });

  // Define argTypes for all slots
  slots.map(slot => {
    const { name } = slot;

    cssPropArgTypes[name] = {
      control: {
        type: 'text',
      },
    };
  });

  return cssPropArgTypes;
};

/**
 * Returns the list of arguments (mapping name → default value) for all CSS properties for the given custom element.
 *
 * @param element
 */
export const getCssArgs = (element?: CustomElement): Record<string, unknown> => {
  const cssArgs: Record<string, unknown> = {};
  const cssProperties = getCssProperties(element);

  cssProperties.map(prop => (cssArgs[prop.name] = prop.default));

  return cssArgs;
};

/**
 * Sets the style properties for all arguments that correspond to a CSS custom property.
 *
 * @param args
 * @param styleContainer
 *
 * @see https://github.com/storybookjs/storybook/issues/11395
 */
export const setCssStyleFromArgs = (args: Record<string, unknown>, styleContainer: CSSStyleDeclaration): void => {
  Object.entries(args)
    .filter(([name, value]) => name.match(/^--/) && typeof value === 'string')
    .forEach(([name, value]) => styleContainer.setProperty(name, `${value}`));
};
