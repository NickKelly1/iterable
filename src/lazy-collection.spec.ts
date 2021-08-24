import { LazyCollection } from './lazy-collection';
import { testConcat } from './test/concat.spec.util';
import { testEvery } from './test/every.spec.util';
import { testExclude } from './test/exclude.spec.util';
import { testFilter } from './test/filter.spec.util';
import { testFirst } from './test/first.spec.util';
import { testFlatMap } from './test/flat-map.spec.util';
import { testFlatSome } from './test/flat-some.spec.util';
import { testFlat } from './test/flat.spec.util';
import { testForEach } from './test/for-each.spec.util';
import { testJoin } from './test/join.spec.util';
import { testMap } from './test/map.spec.util';
import { testMatching } from './test/matching.spec.util';
import { testNotMatching } from './test/not-matching.spec.util';
import { testNotNull } from './test/not-null.spec.util';
import { testNotNullable } from './test/not-nullable.spec.util';
import { testNotUndefined } from './test/not-undefined.spec.util';
import { testPick } from './test/pick.spec.util';
import { testReduceRight } from './test/reduce-right.spec.util';
import { testReduce } from './test/reduce.spec.util';
import { testReverse } from './test/reverse.spec.util';
import { testSkip } from './test/skip.spec.util';
import { testSlice } from './test/slice.spec.util';
import { testSome } from './test/some.spec.util';
import { testSort } from './test/sort.spec.util';
import { testTake } from './test/take.spec.util';
import { testArray } from './test/to-array.spec.util';
import { testSet } from './test/to-set.spec.util';
import { testUnique } from './test/unique.spec.util';
import { testUnshift } from './test/unshift.spec.util';
import { testZipLong } from './test/zip-long.spec.util';
import { testZipShort } from './test/zip-short.spec.util';
import { Iterateable } from './types';

describe('LazyCollection', () => {
  it('should flatten on construction', () => {
    const c1 = new LazyCollection([1, 2, 3,]);
    const c2 = new LazyCollection(c1);
    for (const next of c2) {
      expect(typeof next).toEqual('number');
    }
  });

  function create<T>(iterable: Iterateable<T>): LazyCollection<T> {
    return new LazyCollection(iterable);
  }

  testArray(create);
  testConcat(create);
  testEvery(create);
  testEvery(create);
  testExclude(create);
  testFilter(create);
  testFirst(create);
  testFlat(create);
  testFlatMap(create);
  testFlatSome(create);
  testForEach(create);
  testJoin(create);
  testMap(create);
  testMatching(create);
  testNotMatching(create);
  testNotNull(create);
  testNotNullable(create);
  testNotUndefined(create);
  testPick(create);
  testReduce(create);
  testReduceRight(create);
  testReverse(create);
  testSet(create);
  testSkip(create);
  testSlice(create);
  testSome(create);
  testSort(create);
  testTake(create);
  testUnique(create);
  testUnshift(create);
  testZipLong(create);
  testZipShort(create);
});
