/**
 * Wraps the json structured configuration of a portal navigation, does some basic sanitizing of the received data
 * (e.g. generating missing ids), and provides convenience functions to access menus and items with the data.
 */
import { ObjectPath } from './ObjectPath';
import { IdPath } from './IdPath';

export interface SelectorFunction {
  (menu: MenuItem): boolean;
}

export interface MenuLabel {
  en: string;
  de: string;
  [key: string]: string;
}

export interface MenuItem {
  id?: string;
  label?: MenuLabel | string;
  icon?: string;
  url?: string;
  destination?: string;
  dropdown?: boolean;
  items?: MenuItem[];
  defaultItem?: string;
  [key: string]: unknown;
}

export interface ConfigurationData {
  menus?: MenuItem[];
  [key: string]: MenuItem[] | undefined;
}

/**
 * [documentation]{@link https://github.com/inventage/portal-components/blob/master/docs/portal-navigation/configuration.md}.
 */
export class Configuration {
  private readonly data: ConfigurationData | undefined;

  constructor(data?: ConfigurationData) {
    this.data = data;
    this.generateAllMissingIds();
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
  private generateMissingIds(menu: MenuItem, nextAvailableId: number): number {
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
  getMenus(): MenuItem[] | undefined {
    const menus = this.getData(['menus']);
    if (Array.isArray(menus)) {
      return menus;
    }

    return undefined;
  }

  /**
   * Returns the menu object identified by the given menuId.
   *
   * @param {string} menuId - a menuId of a menu found within the configuration.
   * @returns the menu object found in the configuration.
   */
  getMenu(menuId: string): MenuItem | undefined {
    const menu = this.getData([`menus::${menuId}`]);
    if (!Array.isArray(menu)) {
      return menu;
    }

    return;
  }

  /**
   * Returns the first object within the given data that matches the given array of keys (keyPath).
   * By default the configurations data will be used, but you can pass subsets of the data to only search these parts.
   * A key within the path can be a simple string (referring to a property name) or a two strings delimited by '::'.
   * This refers to a menu/item (by id) within an array structure. e.g. ['menus::menu1', 'items::item3'] would find
   * the first item with id 'menu3' (in array property named 'items') of menu with id 'menu1' (in array of property
   * named 'menus').
   *
   * @param keyPath a path of property names describing the path to the object to be found.
   * @param data the data set to be searched. the configurations data set by default.
   * @returns the first object matching the given path or undefined
   */
  getData(keyPath: string[], data: ConfigurationData | MenuItem | undefined = this.data): MenuItem | MenuItem[] | undefined {
    if (!data || !keyPath || keyPath.length <= 0) {
      return undefined;
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
  getIdPathForUrl(url: string | undefined): IdPath | undefined {
    if (!url) {
      return undefined;
    }
    const result = this.getIdPathForSelection(object => object.url === url);
    if (result && !result.isEmpty()) {
      return result;
    }
    const index = url.lastIndexOf('/');
    if (index > 0) {
      return this.getIdPathForUrl(url.substring(0, index));
    }
    return undefined;
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
   * Returns an array of objects from the data set to the item selected by the selector, if it should exist. Otherwise,
   * undefined is returned.
   *
   * @param visitedObjects the path of objects visited so far (will be prepended to the return value if a match is found)
   * @param currentObject this object (and its children, if any) are checked next for selection
   * @param selector a result will be returned if an item is found for which selector returns true.
   * @returns {any[]|undefined} the object path (as an array) to the item selected by selector or undefined it none can be found.
   */
  private __getObjectPathForSelection(visitedObjects: MenuItem[], currentObject: MenuItem, selector: SelectorFunction): MenuItem[] | undefined {
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

    return undefined;
  }

  /**
   * Returns the value of the property specified by the given key from the given data object. If the value of the
   * property is an array, you can specify which array element you want resolved by appending '::' with the id of
   * the desired menu or item in the array. e.g.: items::idOfItem4
   *
   * @param key - a string that is either the name of a property or the name of a property, that's expected to
   * be an array, followed by '::' and an id of the menu or item within that array to be returned.
   * @param data - a object from the data set.
   * @returns the object found in data based on the given key, which is either the value of the property or a specific array element if the property's value is an array.
   */
  private resolveValue(key: string, data: ConfigurationData | MenuItem): MenuItem | undefined {
    if (!data || !key) {
      return undefined;
    }

    const keyParts = key.split('::');
    if (keyParts.length === 1) {
      return data[key] as MenuItem;
    }

    if (keyParts.length === 2) {
      const values = (data[keyParts[0]] as MenuItem[])?.filter(object => object.id === keyParts[1]);
      if (values?.length > 0) {
        return values[0];
      }
    }

    return undefined;
  }
}
