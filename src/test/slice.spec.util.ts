import { IHasSlice } from '../collection.interface';
import { Iterateable } from '../types';

export function testSlice(create: <T>(iterable: Iterateable<T>) => IHasSlice<T>): void {
  describe('slice(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = create([1, 2, 3, 4, 5,]);
        const called: number[] = Array.from(pipeline
          .slice(1, 4)
        );
        expect(called[0]).toEqual(2);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(4);
        expect(called[3]).toEqual(undefined);
      });
      it('set', () => {
        const pipeline = create(new Set([1, 2, 3, 4, 5,]));
        const called: number[] = Array.from(pipeline
          .slice(1, 4)
        );
        expect(called[0]).toEqual(2);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(4);
        expect(called[3]).toEqual(undefined);
      });
      it('map', () => {
        const map = new Map<number, number>([
          [1, 1,],
          [2, 2,],
          [3, 3,],
          [4, 4,],
          [5, 5,],
        ]);
        const pipeline = create(() => map.values());
        const called: number[] = Array.from(pipeline
          .slice(1, 4)
        );
        expect(called[0]).toEqual(2);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(4);
        expect(called[3]).toEqual(undefined);
      });
      it('generator', () => {
        const generator = function * (): Iterable<number> {
          yield 1;
          yield 2;
          yield 3;
          yield 4;
          yield 5;
        };
        const pipeline = create(generator);
        const called: number[] = Array.from(pipeline
          .slice(1, 4)
        );
        expect(called[0]).toEqual(2);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(4);
        expect(called[3]).toEqual(undefined);
      });
    });
  });

}
