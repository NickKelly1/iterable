import { IHasFlat } from '../collection.interface';
import { Iterateable } from '../types';

export function testFlat(create: <T>(iterable: Iterateable<T>) => IHasFlat<T>): void {
  describe('flat(...)', () => {
    describe('should work on', () => {
      it('self', () => {
        const pipeline = create([
          create([1, 2, 3,]),
          create([2, 3, 4,]),
          create([3, 4, 5,]),
        ]);
        const called: number[] = Array.from(pipeline
          .flat()
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(3);

        expect(called[3]).toEqual(2);
        expect(called[4]).toEqual(3);
        expect(called[5]).toEqual(4);

        expect(called[6]).toEqual(3);
        expect(called[7]).toEqual(4);
        expect(called[8]).toEqual(5);
      });
      it('array', () => {
        const pipeline = create([
          [1, 2, 3,],
          [2, 3, 4,],
          [3, 4, 5,],
        ]);
        const called: number[] = Array.from(pipeline
          .flat()
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(3);

        expect(called[3]).toEqual(2);
        expect(called[4]).toEqual(3);
        expect(called[5]).toEqual(4);

        expect(called[6]).toEqual(3);
        expect(called[7]).toEqual(4);
        expect(called[8]).toEqual(5);
      });
      it('set', () => {
        const pipeline = create([
          new Set([1, 2, 3,]),
          new Set([2, 3, 4,]),
          new Set([3, 4, 5,]),
        ]);
        const called: number[] = Array.from(pipeline
          .flat()
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(3);

        expect(called[3]).toEqual(2);
        expect(called[4]).toEqual(3);
        expect(called[5]).toEqual(4);

        expect(called[6]).toEqual(3);
        expect(called[7]).toEqual(4);
        expect(called[8]).toEqual(5);
      });
      it('map', () => {
        const pipeline = create([
          new Map([[1, 3,], [2, 4,], [3, 5,],]),
          new Map([[2, 5,], [3, 6,], [4, 7,],]),
          new Map([[3, 9,], [4, 10,], [5, 11,],]),
        ]);
        const called: [number, number][] = Array.from(pipeline
          .flat()
        );
        expect(called[0]).toEqual([1, 3,]);
        expect(called[1]).toEqual([2, 4,]);
        expect(called[2]).toEqual([3, 5,]);

        expect(called[3]).toEqual([2, 5,]);
        expect(called[4]).toEqual([3, 6,]);
        expect(called[5]).toEqual([4, 7,]);

        expect(called[6]).toEqual([3, 9,]);
        expect(called[7]).toEqual([4, 10,]);
        expect(called[8]).toEqual([5, 11,]);
      });
      it('generator', () => {
        const pipeline = create(function * (): Iterable<Iterable<number>> {
          yield (function * iterable1(): Iterable<number> {
            yield 1; yield 2; yield 3;
          })();

          yield (function * iterable2(): Iterable<number> {
            yield 2; yield 3; yield 4;
          })();

          yield (function * iterable3(): Iterable<number> {
            yield 3; yield 4; yield 5;
          })();
        });
        const called: number[] = Array.from(pipeline
          .flat()
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(3);

        expect(called[3]).toEqual(2);
        expect(called[4]).toEqual(3);
        expect(called[5]).toEqual(4);

        expect(called[6]).toEqual(3);
        expect(called[7]).toEqual(4);
        expect(called[8]).toEqual(5);
      });
    });
  });
}
