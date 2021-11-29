import { CssCustomProperty, CustomElement, Package } from 'custom-elements-manifest/schema.js';

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
 * Returns the argType object with all CSS properties for the given custom element.
 *
 * @param element
 */
export const getCssPropArgTypes = (element?: CustomElement): Record<string, unknown> => {
  const cssPropArgTypes: Record<string, unknown> = {};
  const cssProperties = getCssProperties(element);

  // Define CSS custom prop argTypes for all CSS properties
  cssProperties.map(prop => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { type: { text = {} } = {}, name } = prop as unknown as any;
    if (!name) {
      console.error('No property name found for', prop);
    }

    cssPropArgTypes[name] = {
      control: {
        type: `${text}`.toLowerCase() === 'color' ? 'color' : 'text',
        // This seems to be automatically inferred from CEM…
        // table: {
        //   defaultValue: {
        //     type: `${text}`.toLowerCase() === 'color' ? 'color' : 'text',
        //     summary: prop.default,
        //   },
        // },
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
