import { IHasFilter } from '../collection.interface';
import { Iterateable } from '../types';

export function testFilter(create: <T>(iterable: Iterateable<T>) => IHasFilter<T>): void {
  describe('filter(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = create([1, 2, 3,]);
        const called: number[] = Array.from(pipeline
          .filter((v) => v !== 2)
        );
        expect(called[1]).toEqual(3);
      });
      it('set', () => {
        const pipeline = create(new Set([1, 2, 3,]));
        const called: number[] = Array.from(pipeline
          .filter((v) => v !== 2)
        );
        expect(called[1]).toEqual(3);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = create(map);
        const called: [number, number][] = Array.from(pipeline
          .filter(([v,]) => v !== 2)
        );
        expect(called[1]).toEqual([3, 3,]);
      });
      it('generator', () => {
        const pipeline = create(function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        });
        const called: number[] = Array.from(pipeline
          .filter((v) => v !== 2)
        );
        expect(called[1]).toEqual(3);
      });
    });
  });

}
