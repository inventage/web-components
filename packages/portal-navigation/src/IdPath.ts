/**
 * An IdPath is a sequence of ids (strings) that describe the path through the menu/item structure,
 * starting from a menu id and leading through one or more item ids.
 *
 * IMPORTANT: ids of menu and items must all be unique.
 */
export class IdPath {
  ids: (string | undefined)[];

  constructor(...ids: (string | undefined)[]) {
    this.ids = ids ? ids.filter(id => id !== undefined) : [];
  }

  /**
   * Gets the id for a given level. Simply prevents errors and returns undefined for index out of bounds.
   *
   * @param level - a level (e.g. 0 for the root id, which is the menu id).
   *
   * @returns an id or undefined
   */
  getId(level: number): string | undefined {
    return level < this.ids.length ? this.ids[level] : undefined;
  }

  /**
   * Convenience function to get the root level id (menu id) of the path.
   *
   * @returns an id or undefined
   */
  getMenuId(): string | undefined {
    return this.getId(0);
  }

  /**
   * Convenience function to get the first-level id of the path.
   *
   * @returns an id or undefined
   */
  getFirstLevelItemId(): string | undefined {
    return this.getId(1);
  }

  /**
   * Check whether or not the path contains a given id.
   *
   * @param id - an id to look for in the path.
   * @returns true if the id is part of the path.
   */
  contains(id: string): boolean {
    for (const currentId of this.ids) {
      if (currentId === id) {
        return true;
      }
    }

    return false;
  }

  /**
   * @returns true if the path has no ids.
   */
  isEmpty(): boolean {
    return this.ids.length === 0;
  }

  /**
   * @param ids - a list of ids to append to the newly created path.
   * @returns a new id path consisting of this path's ids with the given ids appended at the end.
   */
  concat(...ids: (string | undefined)[]): IdPath {
    return new IdPath(...this.ids, ...ids);
  }
}
