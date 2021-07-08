import { IdPath } from './IdPath';
import { MenuItem } from './Configuration';

/**
 * An ObjectPath is a sequence of objects (from the menu/item data structure) starting from a menu object,
 * where every object is the child of the previous object in the path.
 */
export class ObjectPath {
  private readonly objects: MenuItem[];

  constructor(...objects: MenuItem[]) {
    this.objects = objects ? objects.filter(object => object !== undefined) : [];
  }

  /**
   * Gets the object for a given level. Simply prevents errors and returns undefined for index out of bounds.
   *
   * @param level - a level (e.g. 0 for the root id, which is the menu id).
   * @returns an object or undefined.
   */
  getObject(level: number): MenuItem | undefined {
    return level < this.objects.length ? this.objects[level] : undefined;
  }

  /**
   * Returns the last object of the path.
   *
   * @returns an object or undefined.
   */
  getLastItem(): MenuItem | undefined {
    if (this.objects.length > 1) {
      return this.getObject(this.objects.length - 1);
    }

    return undefined;
  }

  /**
   * Returns the IdPath represented by this ObjectPath. Reduces the path to its ids.
   */
  toIdPath(): IdPath {
    return new IdPath(...this.objects.map(object => object.id));
  }
}
