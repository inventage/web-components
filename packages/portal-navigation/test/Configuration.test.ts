import { expect } from '@open-wc/testing';

import { Configuration, ConfigurationData, MenuItem } from '../src/Configuration.js';
import * as data from './test-data.json';

const configurationData = data as ConfigurationData;

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

    expect(result!.items!.length).to.equal(2);
    expect(result!.items![0].id).to.equal('parent1');
    expect(result!.items![1].id).to.equal('parent2');
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

  it('getIdPathForUrl returns first item matching url, and tries to match subpath as a fallback', () => {
    const configuration = new Configuration(configurationData);
    const result = configuration.getIdPathForUrl('/some/path/item2.2/unknown-subitem');

    expect(result!.getMenuId()).to.equal('main');
    expect(result!.getFirstLevelItemId()).to.equal('parent2');
    expect(result!.getId(2)).to.equal('item2.2');
  });

  it('should generate missing ids on creation', () => {
    const configuration = new Configuration(configurationData);
    const item = configuration.getObjectPathForSelection(object => object.url === '/some/path/generatedId');

    expect(item.getLastItem()!.id).to.not.be.undefined;
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
});
