import { IHasCompact } from '../collection.interface';
import { Iterateable } from '../types';

export function testCompact(create: <T>(iterable: Iterateable<T>) => IHasCompact<T>): void {
  describe('compact(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const collection = create([1, null, undefined, false, 0, 3,]);
        const called: (number | boolean)[] = Array.from(collection
          .compact()
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
      it('set', () => {
        const collection = create(new Set([1, null, undefined, false, 0, 3,]));
        const called: (number | boolean)[] = Array.from(collection
          .compact()
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
      it('map', () => {
        const map = new Map<number, number | null | undefined | boolean>([
          [1, 1,],
          [2, null, ],
          [3, undefined, ],
          [4, false, ],
          [5, 0, ],
          [6, 3,],
        ]);
        const collection = create(() => map.values());
        const called: (number | boolean)[] = Array.from(collection
          .compact()
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
      it('generator', () => {
        const collection = create(function * (): Iterable<number | null | undefined | boolean> {
          yield 1; yield null; yield undefined; yield false; yield 0; yield 3;
        });
        const called: (number | boolean)[] = Array.from(collection
          .compact()
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
    });
  });
}
