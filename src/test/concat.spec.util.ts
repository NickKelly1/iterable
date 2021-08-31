import { IHasConcat } from '../collection.interface';
import { Iterateable } from '../types';

export function testConcat(create: <T>(iterable: Iterateable<T>) => IHasConcat<T>): void {
  describe('concat(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const collection = create([1, 2, 3,]);
        const called: number[] = Array.from(collection
          .concat([4, 5,])
        );
        expect(called[3]).toEqual(4);
        expect(called[4]).toEqual(5);
      });
      it('set', () => {
        const collection = create(new Set([1, 2, 3,]));
        const called: number[] = Array.from(collection
          .concat([4, 5,])
        );
        expect(called[3]).toEqual(4);
        expect(called[4]).toEqual(5);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const collection = create(() => map.values());
        const called: number[] = Array.from(collection
          .concat([4, 5,])
        );
        expect(called[3]).toEqual(4);
        expect(called[4]).toEqual(5);
      });
      it('generator', () => {
        const generator = function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        };
        const collection = create(generator);
        const called: number[] = Array.from(collection
          .concat([4, 5,])
        );
        expect(called[3]).toEqual(4);
        expect(called[4]).toEqual(5);
      });
    });
  });

}
