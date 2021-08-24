import { Maybe } from '@nkp/maybe';
import { IHasZipLong } from '../collection.interface';
import { Iterateable } from '../types';

export function testZipLong(create: <T>(iterable: Iterateable<T>) => IHasZipLong<T>): void {
  describe('zipLong(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = create([1, 2, 3,]);
        const called: [Maybe<number>, Maybe<number>][] = Array.from(pipeline
          .zipLong([4, 5, 6, 7,])
        );
        expect(called[0]).toEqual([Maybe.some(1), Maybe.some(4),]);
        expect(called[1]).toEqual([Maybe.some(2), Maybe.some(5),]);
        expect(called[2]).toEqual([Maybe.some(3), Maybe.some(6),]);
        expect(called[3]).toEqual([Maybe.none, Maybe.some(7),]);
        expect(called[4]).toEqual(undefined);
      });
      it('set', () => {
        const pipeline = create(new Set([1, 2, 3,]));
        const called: [Maybe<number>, Maybe<number>][] = Array.from(pipeline
          .zipLong([4, 5, 6, 7,])
        );
        expect(called[0]).toEqual([Maybe.some(1), Maybe.some(4),]);
        expect(called[1]).toEqual([Maybe.some(2), Maybe.some(5),]);
        expect(called[2]).toEqual([Maybe.some(3), Maybe.some(6),]);
        expect(called[3]).toEqual([Maybe.none, Maybe.some(7),]);
        expect(called[4]).toEqual(undefined);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = create(() => map.values());
        const called: [Maybe<number>, Maybe<number>][] = Array.from(pipeline
          .zipLong([4, 5, 6, 7,])
        );
        expect(called[0]).toEqual([Maybe.some(1), Maybe.some(4),]);
        expect(called[1]).toEqual([Maybe.some(2), Maybe.some(5),]);
        expect(called[2]).toEqual([Maybe.some(3), Maybe.some(6),]);
        expect(called[3]).toEqual([Maybe.none, Maybe.some(7),]);
        expect(called[4]).toEqual(undefined);
      });
      it('generator', () => {
        const generator = function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        };
        const pipeline = create(generator);
        const called: [Maybe<number>, Maybe<number>][] = Array.from(pipeline
          .zipLong([4, 5, 6, 7,])
        );
        expect(called[0]).toEqual([Maybe.some(1), Maybe.some(4),]);
        expect(called[1]).toEqual([Maybe.some(2), Maybe.some(5),]);
        expect(called[2]).toEqual([Maybe.some(3), Maybe.some(6),]);
        expect(called[3]).toEqual([Maybe.none, Maybe.some(7),]);
        expect(called[4]).toEqual(undefined);
      });
    });
  });

}
