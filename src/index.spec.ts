import { collect, lazyCollect } from '.';
import { Collection } from './collection';
import { LazyCollection } from './lazy-collection';

describe('index', () => {
  it('should export collect', () => {
    expect(collect([1, 2, 3,])).toBeInstanceOf(Collection);
  });

  it('should export lazyCollect', () => {
    expect(lazyCollect([1, 2, 3,])).toBeInstanceOf(LazyCollection);
  });
});
