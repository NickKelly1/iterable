import { IHasNotUndefined } from '../collection.interface';
import { Iterateable } from '../types';

export function testNotUndefined(create: <T>(iterable: Iterateable<T>) => IHasNotUndefined<T>): void {
  describe('notUndefined(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = create([1, undefined, 3,]);
        const called: number[] = Array.from(pipeline
          .notUndefined()
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
      it('set', () => {
        const pipeline = create(new Set([1, undefined, 3,]));
        const called: number[] = Array.from(pipeline
          .notUndefined()
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
      it('map', () => {
        const map = new Map<number, number | undefined>([
          [1, 1,],
          [2, undefined,],
          [3, 3,],
        ]);
        const pipeline = create(() => map.values());
        const called: number[] = Array.from(pipeline
          .notUndefined()
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
      it('generator', () => {
        const pipeline = create(function * (): Iterable<number | undefined> {
          yield 1; yield undefined; yield 3;
        });
        const called: number[] = Array.from(pipeline
          .notUndefined()
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
    });
  });
}
