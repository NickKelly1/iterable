import { IHasNotNull } from '../collection.interface';
import { Iterateable } from '../types';

export function testNotNull(create: <T>(iterable: Iterateable<T>) => IHasNotNull<T>): void {
  describe('notNull(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = create([1, null, 3,]);
        const called: number[] = Array.from(pipeline
          .notNull()
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
      it('set', () => {
        const pipeline = create(new Set([1, null, 3,]));
        const called: number[] = Array.from(pipeline
          .notNull()
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
      it('map', () => {
        const map = new Map<number, number | null>([
          [1, 1,],
          [2, null,],
          [3, 3,],
        ]);
        const pipeline = create(() => map.values());
        const called: number[] = Array.from(pipeline
          .notNull()
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
      it('generator', () => {
        const pipeline = create(function * (): Iterable<number | null> {
          yield 1; yield null; yield 3;
        });
        const called: number[] = Array.from(pipeline
          .notNull()
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
    });
  });
}
