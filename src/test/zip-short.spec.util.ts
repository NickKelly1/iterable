import { IHasZip } from '../collection.interface';
import { Iterateable } from '../types';

export function testZip(create: <T>(iterable: Iterateable<T>) => IHasZip<T>): void {
  describe('zip(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = create([1, 2, 3,]);
        const called: [number, number][] = Array.from(pipeline
          .zip([4, 5, 6, 7,])
        );
        expect(called[0]).toEqual([1, 4,]);
        expect(called[1]).toEqual([2, 5,]);
        expect(called[2]).toEqual([3, 6,]);
        expect(called[3]).toEqual(undefined);
      });
      it('set', () => {
        const pipeline = create(new Set([1, 2, 3,]));
        const called: [number, number][] = Array.from(pipeline
          .zip([4, 5, 6, 7,])
        );
        expect(called[0]).toEqual([1, 4,]);
        expect(called[1]).toEqual([2, 5,]);
        expect(called[2]).toEqual([3, 6,]);
        expect(called[3]).toEqual(undefined);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = create(() => map.values());
        const called: [number, number][] = Array.from(pipeline
          .zip([4, 5, 6, 7,])
        );
        expect(called[0]).toEqual([1, 4,]);
        expect(called[1]).toEqual([2, 5,]);
        expect(called[2]).toEqual([3, 6,]);
        expect(called[3]).toEqual(undefined);
      });
      it('generator', () => {
        const generator = function * (): Iterable<number> {
          yield 1;
          yield 2;
          yield 3;
        };
        const pipeline = create(generator);
        const called: [number, number][] = Array.from(pipeline
          .zip([4, 5, 6, 7,])
        );
        expect(called[0]).toEqual([1, 4,]);
        expect(called[1]).toEqual([2, 5,]);
        expect(called[2]).toEqual([3, 6,]);
        expect(called[3]).toEqual(undefined);
      });
    });
  });
}
