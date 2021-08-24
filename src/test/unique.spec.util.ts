import { IHasUnique } from '../collection.interface';
import { Iterateable } from '../types';

export function testUnique(create: <T>(iterable: Iterateable<T>) => IHasUnique<T>): void {
  describe('unique(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = create([1, 1, 3,]);
        const called: number[] = Array.from(pipeline
          .unique()
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(undefined);
      });
      it('set', () => {
        const pipeline = create(new Set([1, 1, 3,]));
        const called: number[] = Array.from(pipeline
          .unique()
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(undefined);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 1,], [3, 3,],]);
        const pipeline = create(() => map.values());
        const called: number[] = Array.from(pipeline
          .unique()
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(undefined);
      });
      it('generator', () => {
        const generator = function * (): Iterable<number> {
          yield 1; yield 1; yield 3;
        };
        const pipeline = create(generator);
        const called: number[] = Array.from(pipeline
          .unique()
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(undefined);
      });
    });
  });
}
