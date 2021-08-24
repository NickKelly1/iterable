import { IHasNotNullable } from '../collection.interface';
import { Iterateable } from '../types';

export function testNotNullable(create: <T>(iterable: Iterateable<T>) => IHasNotNullable<T>): void {
  describe('notNullable(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = create([1, null, undefined, 3,]);
        const called: number[] = Array.from(pipeline
          .notNullable()
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
      it('set', () => {
        const pipeline = create(new Set([1, null, undefined, 3,]));
        const called: number[] = Array.from(pipeline
          .notNullable()
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
      it('map', () => {
        const map = new Map<number, number | null | undefined>([
          [1, 1,],
          [2, null, ],
          [3, undefined, ],
          [4, 3,],
        ]);
        const pipeline = create(() => map.values());
        const called: number[] = Array.from(pipeline
          .notNullable()
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
      it('generator', () => {
        const pipeline = create(function * (): Iterable<number | null | undefined> {
          yield 1; yield null; yield undefined; yield 3;
        });
        const called: number[] = Array.from(pipeline
          .notNullable()
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
    });
  });
}
