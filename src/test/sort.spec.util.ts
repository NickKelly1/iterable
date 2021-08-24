import { IHasSort } from '../collection.interface';
import { Iterateable } from '../types';

export function testSort(create: <T>(iterable: Iterateable<T>) => IHasSort<T>): void {
  describe('sort(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const arr = [1, 3, 2,];
        expect(Array.from(create(arr).sort(-1))).toEqual([3, 2, 1,]);
        expect(Array.from(create(arr).sort(1))).toEqual([1, 2, 3,]);
        expect(Array.from(create(arr).sort('desc'))).toEqual([3, 2, 1,]);
        expect(Array.from(create(arr).sort('asc'))).toEqual([1, 2, 3,]);
        expect(Array.from(create(arr).sort('DESC'))).toEqual([3, 2, 1,]);
        expect(Array.from(create(arr).sort('ASC'))).toEqual([1, 2, 3,]);
        expect(Array.from(create(arr).sort('-1'))).toEqual([3, 2, 1,]);
        expect(Array.from(create(arr).sort('1'))).toEqual([1, 2, 3,]);
      });
      it('set', () => {
        const set = new Set([1, 3, 2,]);
        expect(Array.from(create(set).sort(-1))).toEqual([3, 2, 1,]);
        expect(Array.from(create(set).sort(1))).toEqual([1, 2, 3,]);
        expect(Array.from(create(set).sort('desc'))).toEqual([3, 2, 1,]);
        expect(Array.from(create(set).sort('asc'))).toEqual([1, 2, 3,]);
        expect(Array.from(create(set).sort('DESC'))).toEqual([3, 2, 1,]);
        expect(Array.from(create(set).sort('ASC'))).toEqual([1, 2, 3,]);
        expect(Array.from(create(set).sort('-1'))).toEqual([3, 2, 1,]);
        expect(Array.from(create(set).sort('1'))).toEqual([1, 2, 3,]);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [3, 3,], [2, 2,],]);
        expect(Array.from(create(() => map.values()).sort(-1))).toEqual([3, 2, 1,]);
        expect(Array.from(create(() => map.values()).sort(1))).toEqual([1, 2, 3,]);
        expect(Array.from(create(() => map.values()).sort('desc'))).toEqual([3, 2, 1,]);
        expect(Array.from(create(() => map.values()).sort('asc'))).toEqual([1, 2, 3,]);
        expect(Array.from(create(() => map.values()).sort('DESC'))).toEqual([3, 2, 1,]);
        expect(Array.from(create(() => map.values()).sort('ASC'))).toEqual([1, 2, 3,]);
        expect(Array.from(create(() => map.values()).sort('-1'))).toEqual([3, 2, 1,]);
        expect(Array.from(create(() => map.values()).sort('1'))).toEqual([1, 2, 3,]);
      });
      it('generator', () => {
        const generator = function * (): Iterable<number> {
          yield 1; yield 3; yield 2;
        };
        expect(Array.from(create(generator).sort(-1))).toEqual([3, 2, 1,]);
        expect(Array.from(create(generator).sort(1))).toEqual([1, 2, 3,]);
        expect(Array.from(create(generator).sort('desc'))).toEqual([3, 2, 1,]);
        expect(Array.from(create(generator).sort('asc'))).toEqual([1, 2, 3,]);
        expect(Array.from(create(generator).sort('DESC'))).toEqual([3, 2, 1,]);
        expect(Array.from(create(generator).sort('ASC'))).toEqual([1, 2, 3,]);
        expect(Array.from(create(generator).sort('-1'))).toEqual([3, 2, 1,]);
        expect(Array.from(create(generator).sort('1'))).toEqual([1, 2, 3,]);
      });
    });
  });

}
