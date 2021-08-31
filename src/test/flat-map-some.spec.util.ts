import { Maybe } from '@nkp/maybe';
import { IHasFlatMapSome } from '../collection.interface';
import { Iterateable } from '../types';

export function testFlatMapSome(create: <T>(iterable: Iterateable<T>) => IHasFlatMapSome<T>): void {
  describe('flatMapSome(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = create<Maybe<number>>([
          Maybe.some(1),
          Maybe.none,
          Maybe.some(3),
        ]);
        const called: number[] = Array.from(pipeline
          .flatMapSome((maybe) => maybe.map(n => n + 1))
        );
        expect(called).toEqual([2, 4,]);
      });
      it('set', () => {
        const pipeline = create<Maybe<number>>(new Set([
          Maybe.some(1),
          Maybe.none,
          Maybe.some(3),
        ]));
        const called: number[] = Array.from(pipeline
          .flatMapSome((maybe) => maybe.map(n => n + 1))
        );
        expect(called).toEqual([2, 4,]);
      });
      it('map', () => {
        const map = new Map<number, Maybe<number>>([
          [1, Maybe.some(1),],
          [2, Maybe.none,],
          [3, Maybe.some(3),],
        ]);
        const pipeline = create(() => map.values());
        const called: number[] = Array.from(pipeline
          .flatMapSome((maybe) => maybe.map(n => n + 1))
        );
        expect(called).toEqual([2, 4,]);
      });
      it('generator', () => {
        const pipeline = create(function * (): Iterable<Maybe<number>> {
          yield Maybe.some(1); yield Maybe.none; yield Maybe.some(3);
        });
        const called: number[] = Array.from(pipeline
          .flatMapSome((maybe) => maybe.map(n => n + 1))
        );
        expect(called).toEqual([2, 4,]);
      });
    });
  });
}
