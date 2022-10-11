import { ObjectPath } from './ObjectPath.js';
import { IdPath } from './IdPath.js';
import { NavigationMenuName } from './PortalNavigation.js';

export interface MenuLabel {
  /**
   * English translation of the label
   */
  en: string;
  /**
   * German translation of the label
   */
  de: string;

  /**
   * You can have as many additional language keys as you want…
   */
  [key: string]: string;
}

export interface BaseMenuItem {
  /**
   * The label of a menu item
   */
  label?: MenuLabel | string;

  /**
   * Optional icon, will be set as the `src` property of an `img` element, so any valid URL is valid here. Data URLs are supported as well.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
   */
  icon?: string;

  /**
   * A list of child menu items
   */
  items?: MenuItem[];
}

export interface MenuItem extends BaseMenuItem {
  /**
   * The id of the menu item. If not set, it will be generated automatically and should be unique across all menu items in the menu.
   */
  id?: string;

  /**
   * The URL this menu item points to
   */
  url?: string;

  /**
   * If 'extern' is set here, the URL of the menu item will open a new window/tab (as in `_blank` for target)
   */

  destination?: 'extern';

  /**
   * An id of a child menu item where this item points to by default.
   */
  defaultItem?: string;

  /**
   * The application this menu item belongs to. If the navigation's current application equals this and internal routing is enabled,
   * navigating to the item's URL will be prevented and an event will be thrown instead.
   */
  application?: string;

  /**
   * Whether to use internal routing for this specific menu item. This overrides any global internal routing setting.
   */
  internalRouting?: boolean;

  /**
   * This can be used instead of application to allow for internal routing within multiple applications.
   */
  internalRoutingApplications?: string[];
}

export interface FirstLevelMenuItem extends MenuItem {
  /**
   * If true, the menu item will be rendered as "expanded" in mobile breakpoint
   */
  expanded?: boolean;
}

export interface RootLevelMenuItem extends BaseMenuItem {
  /**
   * The id of the first level menu item. Has to be a valid id from the list of possible first level menu item ids.
   */
  id: NavigationMenuName;

  /**
   * If true, the items in this first level menu item will be rendered in a dropdown.
   */
  dropdown?: boolean;

  /**
   * A list of child menu items
   */
  items?: FirstLevelMenuItem[];
}

export type CommonMenuItem = RootLevelMenuItem | FirstLevelMenuItem | MenuItem;

/**
 * A configuration for the portal-navigation
 */
export interface ConfigurationData {
  /**
   * A list of top-level menus
   */
  menus?: RootLevelMenuItem[];

  /**
   * Additional properties are allowed but will be ignored
   */
  [key: string]: unknown;
}

export interface SelectorFunction {
  (menu: CommonMenuItem): boolean;
}

/**
 * Wraps the json structured configuration of a portal navigation, does some basic sanitizing of the received data
 * (e.g. generating missing ids), and provides convenience functions to access menus and items with the data.
 *
 * @see https://github.com/inventage/portal-components/blob/master/docs/portal-navigation/configuration.md
 */
export class Configuration {
  private readonly data?: ConfigurationData;

  constructor(data?: ConfigurationData) {
    this.data = data;
    this.generateAllMissingIds();
    this.validate();
  }

  /**
   * Generates "unique ids" for menus/items missing an id.
   */
  private generateAllMissingIds() {
    if (!this.data) {
      return;
    }

    let id = 0;
    this.getMenus()?.forEach(menu => {
      id = this.generateMissingIds(menu, id);
    });
  }

  /**
   * Generates the missing ids for menu/items of the given object and its child items.
   *
   * @param menu the "root" object of the tree structure that would be checked for missing ids.
   * @param nextAvailableId the next available id.
   * @returns the next available id.
   */
  private generateMissingIds(menu: CommonMenuItem, nextAvailableId: number): number {
    let id = nextAvailableId;
    if (!menu.id) {
      menu.id = `${id}`;
      id += 1;
    }

    if (menu.items && menu.items.length > 0) {
      menu.items.forEach(item => {
        id = this.generateMissingIds(item, id);
      });
    }

    return id;
  }

  /**
   * @returns returns all menus within the 'menus' property of the dataset.
   */
  getMenus(): RootLevelMenuItem[] | undefined {
    const menus = this.getData(['menus']);
    if (Array.isArray(menus)) {
      return menus as RootLevelMenuItem[];
    }

    return;
  }

  /**
   * Returns the menu object identified by the given menuId.
   *
   * @param {string} menuId - a menuId of a menu found within the configuration.
   * @returns the menu object found in the configuration.
   */
  getMenu(menuId: string): RootLevelMenuItem | undefined {
    const menu = this.getData([`menus::${menuId}`]);
    if (menu && !Array.isArray(menu)) {
      return menu as RootLevelMenuItem;
    }

    return;
  }

  /**
   * Returns the first object within the given data that matches the given array of keys (keyPath).
   * By default, the configurations data will be used, but you can pass subsets of the data to only search these parts.
   * A key within the path can be a simple string (referring to a property name) or a two strings delimited by '::'.
   * This refers to a menu/item (by id) within an array structure. e.g. ['menus::menu1', 'items::item3'] would find
   * the first item with id 'item3' (in array property named 'items') of menu with id 'menu1' (in array of property
   * named 'menus').
   *
   * @param keyPath a path of property names describing the path to the object to be found.
   * @param data the data set to be searched. the configurations data set by default.
   * @returns the first object matching the given path or undefined
   */
  getData(keyPath: string[], data: ConfigurationData | CommonMenuItem | undefined = this.data): CommonMenuItem | Array<CommonMenuItem> | undefined {
    if (!data || !Array.isArray(keyPath) || keyPath.length <= 0) {
      return;
    }

    const head = keyPath[0];
    const value = this.resolveValue(head, data);

    if (keyPath.length === 1) {
      return value;
    }

    const tail = keyPath.slice(1, keyPath.length);
    return this.getData(tail, value);
  }

  /**
   * Returns the id path to the first item, whose url matches the given url.
   * If none can be found the process is repeated while the given url is "reduced" step by step by removing the last
   * part delimited with '/' until a match can be found. If still none can be found undefined is returned.
   *
   * @param url - the url of an item within the data set.
   */
  getIdPathForUrl(url?: string): IdPath | undefined {
    if (!url) {
      return;
    }

    const result = this.getIdPathForSelection(object => {
      const { url: menuItemUrl } = object as MenuItem;

      // Bail if given menu item has no url
      if (!menuItemUrl) {
        return false;
      }

      // Otherwise, we only compare paths without search params + hash from menu item url
      const parsedMenuItemUrl = new URL(menuItemUrl, 'http://localhost');
      const parsedUrl = new URL(url, 'http://localhost');
      return parsedMenuItemUrl.pathname === parsedUrl.pathname;
    });

    if (result && !result.isEmpty()) {
      return result;
    }

    const index = url.lastIndexOf('/');
    if (index < 1) {
      return;
    }

    return this.getIdPathForUrl(url.substring(0, index));
  }

  /**
   * Returns an id path to the first menu or item that is selected by the given selector.
   */
  getIdPathForSelection(selector: SelectorFunction): IdPath {
    return this.getObjectPathForSelection(selector).toIdPath();
  }

  /**
   * Returns an object path (full objects from data set, not just ids) to the first menu or item that is selected by the
   * given selector.
   */
  getObjectPathForSelection(selector: SelectorFunction): ObjectPath {
    if (!this.data || !selector) {
      return new ObjectPath();
    }

    const menus = this.getMenus();
    if (!menus) {
      return new ObjectPath();
    }

    for (const menu of [...menus]) {
      const result = this.__getObjectPathForSelection([], menu, selector);
      if (result) {
        return new ObjectPath(...result);
      }
    }

    return new ObjectPath();
  }

  /**
   * Returns an array of objects from the data set to the item selected by the selector, if it exists. Otherwise,
   * undefined is returned.
   *
   * @param visitedObjects the path of objects visited so far (will be prepended to the return value if a match is found)
   * @param currentObject this object (and its children, if any) are checked next for selection
   * @param selector a result will be returned if an item is found for which selector returns true.
   * @returns {any[]|undefined} the object path (as an array) to the item selected by selector or undefined it none can be found.
   */
  private __getObjectPathForSelection(
    visitedObjects: CommonMenuItem[],
    currentObject: CommonMenuItem,
    selector: SelectorFunction
  ): CommonMenuItem[] | undefined {
    const newVisitedObject = visitedObjects.concat(currentObject);
    if (currentObject && selector(currentObject)) {
      return newVisitedObject;
    }

    if (currentObject.items && currentObject.items.length > 0) {
      for (const childObject of currentObject.items) {
        const result = this.__getObjectPathForSelection(newVisitedObject, childObject, selector);
        if (result) {
          return result;
        }
      }
    }

    return;
  }

  /**
   * Returns the value of the property specified by the given key from the given data object. If the value of the
   * property is an array, you can specify which array element you want resolved by appending '::' with the id of
   * the desired menu or item in the array. e.g.: items::idOfItem4
   *
   * @param key - a string that is either the name of a property or the name of a property, that's expected to
   * be an array, followed by '::' and an id of the menu or item within that array to be returned.
   * @param data - an object from the data set.
   * @returns the object found in data based on the given key, which is either the value of the property or a specific array element if the property's value is an array.
   */
  private resolveValue(key: string, data: ConfigurationData | MenuItem | RootLevelMenuItem): RootLevelMenuItem | MenuItem | undefined {
    const keyParts = key.split('::');
    if (keyParts.length === 1) {
      return (data as Record<string, MenuItem | RootLevelMenuItem>)[key];
    }

    if (keyParts.length === 2) {
      const values = (data as Record<string, Array<MenuItem | RootLevelMenuItem>>)[keyParts[0]]?.filter(object => object.id === keyParts[1]);
      if (values?.length > 0) {
        return values[0];
      }
    }

    return;
  }

  /**
   * Iterates over the entire menu tree and collects all urls.
   *
   * @param menuItems Array of menu items
   * @param urls Array for collecting the urls
   * @private
   */
  private collectMenuUrls(menuItems?: CommonMenuItem[], urls: string[] = []) {
    if (!menuItems || menuItems.length < 1) {
      return;
    }

    menuItems.forEach(item => {
      const { url, items = [] } = item as MenuItem;
      if (url) {
        urls.push(url);
      }

      this.collectMenuUrls(items, urls);
    });
  }

  /**
   * Iterates over the entire menu tree and collects all ids.
   *
   * @param menuItems Array of menu items
   * @param ids Array for collecting the ids
   * @private
   */
  private collectMenuIds(menuItems?: CommonMenuItem[], ids: string[] = []) {
    if (!menuItems || menuItems.length < 1) {
      return;
    }

    menuItems.forEach(item => {
      const { id, items = [] } = item as MenuItem;
      if (id) {
        ids.push(id);
      }

      this.collectMenuIds(items, ids);
    });
  }

  /**
   * Performs structural validations and displays warnings or errors accordingly.
   *
   * @private
   */
  private validate() {
    const menuIds = this.getMenuIds();
    const menuIdsUnique = new Set(menuIds);
    if (menuIds.length !== [...menuIdsUnique].length) {
      const duplicateIds = menuIds.filter(id => {
        if (menuIdsUnique.has(id)) {
          menuIdsUnique.delete(id);
          return;
        }

        return id;
      });

      console.warn('Duplicate ids found: %s', duplicateIds.join(', '));
    }

    const menuItemUrls = this.getMenuUrls();
    const menuItemUrlsUnique = new Set(menuItemUrls);
    if (menuItemUrls.length !== [...menuItemUrlsUnique].length) {
      const duplicateUrls = menuItemUrls.filter(url => {
        if (menuItemUrlsUnique.has(url)) {
          menuItemUrlsUnique.delete(url);
          return;
        }

        return url;
      });

      console.warn('Duplicate urls found: %s', duplicateUrls.join(', '));
    }

    return;
  }

  /**
   * Convenience method that returns all menu item ids
   */
  getMenuIds(): string[] {
    const menuIds: string[] = [];
    this.collectMenuIds(this.getMenus(), menuIds);
    return menuIds;
  }

  /**
   * Convenience method that returns all menu item urls
   */
  getMenuUrls(): string[] {
    const menuUrls: string[] = [];
    this.collectMenuUrls(this.getMenus(), menuUrls);
    return menuUrls;
  }
}
