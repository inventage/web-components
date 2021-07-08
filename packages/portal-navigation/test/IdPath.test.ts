import { expect } from '@open-wc/testing';
import { IdPath } from '../src/IdPath';

describe('IdPath', () => {
  it('with no ids returns undefined for all queries', () => {
    const idPath = new IdPath();

    expect(idPath.ids.length).to.equal(0);
    expect(idPath.getMenuId()).to.be.undefined;
    expect(idPath.getFirstLevelItemId()).to.be.undefined;
    expect(idPath.getId(2)).to.be.undefined;
    expect(idPath.isEmpty()).to.be.true;
  });

  it('undefined ids are ignored and filtered during construction', () => {
    const idPath = new IdPath('menu', 'parent', undefined);

    expect(idPath.ids.length).to.equal(2);
    expect(idPath.getMenuId()).to.equal('menu');
    expect(idPath.getFirstLevelItemId()).to.equal('parent');
    expect(idPath.getId(2)).to.be.undefined;
  });

  it('getId returns id of proper level', () => {
    const idPath = new IdPath('menu', 'parent', 'item');

    expect(idPath.getMenuId()).to.equal('menu');
    expect(idPath.getFirstLevelItemId()).to.equal('parent');
    expect(idPath.getId(2)).to.equal('item');
    expect(idPath.getId(3)).to.be.undefined;
  });

  it('contains returns true if id is in path', () => {
    const idPath = new IdPath('menu', 'parent', 'item');

    expect(idPath.contains('menu')).to.be.true;
    expect(idPath.contains('parent')).to.be.true;
    expect(idPath.contains('item')).to.be.true;
    expect(idPath.contains('other')).to.not.be.true;
  });

  it('should concat additional ids and provide new id path', () => {
    const idPath = new IdPath('menu', 'parent', 'item');
    const idPath2 = idPath.concat('sub-item');

    expect(idPath.getMenuId()).to.equal('menu');
    expect(idPath.getFirstLevelItemId()).to.equal('parent');
    expect(idPath.getId(2)).to.equal('item');
    expect(idPath.getId(3)).to.be.undefined;

    expect(idPath2.getMenuId()).to.equal('menu');
    expect(idPath2.getFirstLevelItemId()).to.equal('parent');
    expect(idPath2.getId(2)).to.equal('item');
    expect(idPath2.getId(3)).to.equal('sub-item');
  });
});
