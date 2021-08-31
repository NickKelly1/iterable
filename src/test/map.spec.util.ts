import { IHasMap } from '../collection.interface';
import { Iterateable } from '../types';

export function testMap(create: <T>(iterable: Iterateable<T>) => IHasMap<T>): void {
  describe('map(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const collection = create([1, 2, 3,]);
        const called: number[] = Array.from(collection
          .map(n => n + 1)
        );
        expect(called).toEqual([2, 3, 4,]);
      });
      it('set', () => {
        const collection = create(new Set([1, 2, 3,]));
        const called: number[] = Array.from(collection
          .map(n => n + 1)
        );
        expect(called).toEqual([2, 3, 4,]);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const collection = create(map);
        const called: [number, number][] = Array.from(collection
          .map<[number, number]>(([a, b,]) => ([a + 1, b + 1,]))
        );
        expect(called).toEqual([[2, 2,], [3, 3,], [4, 4,],]);
      });
      it('generator', () => {
        const collection = create(function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        });
        const called: number[] = Array.from(collection
          .map(n => n + 1)
        );
        expect(called).toEqual([2, 3, 4,]);
      });
    });
  });
}
