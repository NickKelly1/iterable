import { IHasMapSelf } from '../collection.interface';
import { Iterateable } from '../types';

export function testMapSelf(create: <T>(iterable: Iterateable<T>) => IHasMapSelf<T>): void {
  describe('mapSelf(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const collection = create([1, 2, 3,]);
        expect(collection.mapSelf((self) => Array.from(self)[0])).toEqual(1);
      });
      it('set', () => {
        const collection = create(new Set([1, 2, 3,]));
        expect(collection.mapSelf((self) => Array.from(self)[0])).toEqual(1);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const collection = create(map);
        expect(collection.mapSelf((self) => Array.from(self)[0])).toEqual([1, 1,]);
      });
      it('generator', () => {
        const collection = create(function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        });
        expect(collection.mapSelf((self) => Array.from(self)[0])).toEqual(1);
      });
    });
  });
}
