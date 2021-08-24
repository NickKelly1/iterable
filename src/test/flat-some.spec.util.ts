import { Maybe } from '@nkp/maybe';
import { IHasFlatSome } from '../collection.interface';
import { Iterateable } from '../types';

export function testFlatSome(create: <T>(iterable: Iterateable<T>) => IHasFlatSome<T>): void {
  describe('flatSome(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = create<Maybe<number>>([
          Maybe.some(1),
          Maybe.none,
          Maybe.some(3),
        ]);
        const called: number[] = Array.from(pipeline
          .flatSome()
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
      it('set', () => {
        const pipeline = create<Maybe<number>>(new Set([
          Maybe.some(1),
          Maybe.none,
          Maybe.some(3),
        ]));
        const called: number[] = Array.from(pipeline
          .flatSome()
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
      it('map', () => {
        const map = new Map<number, Maybe<number>>([
          [1, Maybe.some(1),],
          [2, Maybe.none,],
          [3, Maybe.some(3),],
        ]);
        const pipeline = create(() => map.values());
        const called: number[] = Array.from(pipeline
          .flatSome()
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
      it('generator', () => {
        const pipeline = create(function * (): Iterable<Maybe<number>> {
          yield Maybe.some(1); yield Maybe.none; yield Maybe.some(3);
        });
        const called: number[] = Array.from(pipeline
          .flatSome()
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
    });
  });
}
