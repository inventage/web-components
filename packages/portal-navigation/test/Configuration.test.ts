import { expect } from '@open-wc/testing';

import { Configuration, ConfigurationData, MenuItem } from '../src/Configuration.js';

import dataJson from '../data/test-data.json';
import dataUrlsJson from '../data/test-urls.json';

const configurationData = dataJson as ConfigurationData;
const configurationDataUrls = dataUrlsJson as ConfigurationData;

describe('Configuration', () => {
  it('getMenus returns all menus', () => {
    const configuration = new Configuration(configurationData);
    const result = configuration.getMenus();

    expect(result).not.to.be.undefined;
    expect(result!.length).to.equal(3);
  });

  it('getMenu returns menu with items', () => {
    const configuration = new Configuration(configurationData);
    const result = configuration.getMenu('main');

    expect(result!.items!.length).to.equal(7);
    expect(result!.items![0].id).to.equal('parent1');
    expect(result!.items![1].id).to.equal('parent2');
    expect(result!.items![2].id).to.equal('parent6');
    expect(result!.items![3].id).to.equal('parent7');
    expect(result!.items![4].id).to.equal('parent8');
    expect(result!.items![5].id).to.equal('parent9');
    expect(result!.items![6].id).to.equal('parent10');
  });

  it('getMenu should return undefined when menu is a valid object but was not found', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const configuration = new Configuration({
      menus: [
        {
          id: 'profile',
        },
      ],
    });
    const result = configuration.getMenu('main');

    expect(result).to.be.undefined;
  });

  it('getIdPathForUrl returns first item matching url', () => {
    const configuration = new Configuration(configurationData);
    const result = configuration.getIdPathForUrl('/some/path/item2.2');

    expect(result!.getMenuId()).to.equal('main');
    expect(result!.getFirstLevelItemId()).to.equal('parent2');
    expect(result!.getId(2)).to.equal('item2.2');
  });

  it('getIdPathForUrl returns first item matching url, and tries to match without trailing slash as a fallback', () => {
    const configuration = new Configuration(configurationData);
    const result = configuration.getIdPathForUrl('/some/path/item2.2/');

    expect(result!.getMenuId()).to.equal('main');
    expect(result!.getFirstLevelItemId()).to.equal('parent2');
    expect(result!.getId(2)).to.equal('item2.2');
  });

  it('should return empty ObjectPath when menus are missing in data', () => {
    const configuration = new Configuration({});
    const item = configuration.getObjectPathForSelection(object => (object as MenuItem).url === '/some/path/item2.2/unknown-subitem');

    expect(item).to.deep.include({ objects: [] });
  });

  it('should generate missing ids on creation', () => {
    const configuration = new Configuration(configurationData);
    const item = configuration.getObjectPathForSelection(object => (object as MenuItem).url === '/some/path/generatedId');

    expect(item.getLastItem()!.id).to.not.be.undefined;
  });

  it('all ids (including the generated ones) should be unique across the entire navigation', () => {
    const configuration = new Configuration(configurationData);
    const menuIds = configuration.getMenuIds();

    expect(menuIds.length).to.be.greaterThan(1);
    expect(menuIds).to.deep.equal([...new Set(menuIds)]);
  });

  it('all urls should be unique across the entire navigation', () => {
    const configuration = new Configuration(configurationData);
    const menuUrls = configuration.getMenuUrls();

    expect(menuUrls.length).to.be.greaterThan(1);
    expect(menuUrls).to.deep.equal([...new Set(menuUrls)]);
  });

  it('should not generate ids on invalid data', () => {
    [undefined, null, 0].forEach(configData => {
      const configuration = new Configuration(configData as unknown as ConfigurationData);

      expect(configuration.getMenu('main')).to.be.undefined;
      expect(configuration.getMenu('menu2')).to.be.undefined;
    });
  });

  it('findFirstNodePath returns first node path matching criteria', () => {
    const configuration = new Configuration(configurationData);
    const result = configuration.getObjectPathForSelection(object => object.id === 'item2.2');

    expect(result.getObject(0)!.id).to.equal('main');
    expect(result.getObject(1)!.id).to.equal('parent2');
    expect(result.getObject(2)!.id).to.equal('item2.2');
  });

  it('getData returns nested first level items by path', () => {
    const configuration = new Configuration(configurationData);
    const result = configuration.getData(['menus::meta', `items::parent4`]);

    expect((result as MenuItem).id!).to.equal('parent4');
    expect((result as MenuItem).url!).to.equal('/some/path/parent4');
  });

  it('getIdPathForSelection returns first parent item matching id', () => {
    const configuration = new Configuration(configurationData);
    const result = configuration.getIdPathForSelection(element => element.id === 'parent2');

    expect(result.getMenuId()).to.equal('main');
    expect(result.getFirstLevelItemId()).to.equal('parent2');
    expect(result.getId(2)).to.be.undefined;
  });

  it('getIdPathForSelection returns first item matching id', () => {
    const configuration = new Configuration(configurationData);
    const result = configuration.getIdPathForSelection(element => element.id === 'item2.2');

    expect(result.getMenuId()).to.equal('main');
    expect(result.getFirstLevelItemId()).to.equal('parent2');
    expect(result.getId(2)).to.equal('item2.2');
  });

  it('getObjectPathForSelection returns first-level item as lastItem', () => {
    const configuration = new Configuration(configurationData);
    const objectPath = configuration.getObjectPathForSelection(object => object.id === 'parent3');

    expect(objectPath.getLastItem()!.id).to.equal('parent3');
  });

  describe('URLs', () => {
    it('getIdPathForUrl fuzzy matches the right url #1', () => {
      const configuration = new Configuration(configurationDataUrls);
      const result = configuration.getIdPathForUrl('/foo/bar');

      expect(result!.getMenuId()).to.equal('main');
      expect(result!.getFirstLevelItemId()).to.equal('1');
      expect(result!.getId(2)).to.equal('1.1');
    });

    it('getIdPathForUrl fuzzy matches the right url #2', () => {
      const configuration = new Configuration(configurationDataUrls);
      const result = configuration.getIdPathForUrl('/foo/bar?foo=bar&bar=baz');

      expect(result!.getMenuId()).to.equal('main');
      expect(result!.getFirstLevelItemId()).to.equal('1');
      expect(result!.getId(2)).to.equal('1.1');
    });

    it('getIdPathForUrl fuzzy matches the right url #3', () => {
      const configuration = new Configuration(configurationDataUrls);
      const result = configuration.getIdPathForUrl('/foo/');

      expect(result!.getMenuId()).to.equal('main');
      expect(result!.getFirstLevelItemId()).to.equal('1');
      expect(result!.getId(2)).to.equal('1.2');
    });

    it('getIdPathForUrl fuzzy matches the right url #4', () => {
      const configuration = new Configuration(configurationDataUrls);
      const result = configuration.getIdPathForUrl('/bar/');

      expect(result!.getMenuId()).to.equal('meta');
      expect(result!.getFirstLevelItemId()).to.equal('2');
      expect(result!.getId(2)).to.be.undefined;
    });

    it('getIdPathForUrl fuzzy matches the right url #5', () => {
      const configuration = new Configuration(configurationDataUrls);
      const result = configuration.getIdPathForUrl('/bar');

      expect(result!.getMenuId()).to.equal('meta');
      expect(result!.getFirstLevelItemId()).to.equal('2');
      expect(result!.getId(2)).to.equal('2.1');
    });

    it('getIdPathForUrl fuzzy matches the right url #6', () => {
      const configuration = new Configuration(configurationDataUrls);
      const result = configuration.getIdPathForUrl('/?foo=bar&bar=baz');

      expect(result!.getMenuId()).to.equal('meta');
      expect(result!.getFirstLevelItemId()).to.equal('2');
      expect(result!.getId(2)).to.equal('2.4');
    });
  });
});
