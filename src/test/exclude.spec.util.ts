import { IHasExclude } from '../collection.interface';
import { Iterateable } from '../types';

export function testExclude(create: <T>(iterable: Iterateable<T>) => IHasExclude<T>): void {
  describe('exclude(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = create([1, 2, 3,]);
        const called: number[] = Array.from(pipeline
          .exclude(1, 2)
        );
        expect(called[0]).toEqual(3);
      });
      it('set', () => {
        const pipeline = create(new Set([1, 2, 3,]));
        const called: number[] = Array.from(pipeline
          .exclude(1, 3)
        );
        expect(called[0]).toEqual(2);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = create(() => map.values());
        const called: number[] = Array.from(pipeline
          .exclude(3, 1)
        );
        expect(called[0]).toEqual(2);
      });
      it('generator', () => {
        const pipeline = create(function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        });
        const called: number[] = Array.from(pipeline
          .exclude(2)
        );
        expect(called[1]).toEqual(3);
      });
    });
  });
}
