import { IHasFlatMap } from '../collection.interface';
import { Iterateable } from '../types';

export function testFlatMap(create: <T>(iterable: Iterateable<T>) => IHasFlatMap<T>): void {
  describe('flatMap(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = create([1, 2, 3,]);
        const called: number[] = Array.from(pipeline
          .flatMap(n => create([n, n + 1, n + 2,]))
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
        const pipeline = create(new Set([1, 2, 3,]));
        const called: number[] = Array.from(pipeline
          .flatMap(n => create([n, n + 1, n + 2,]))
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
        const map = new Map<number, number>([[1, 3,], [2, 5,], [3, 9,],]);
        const pipeline = create(map);
        const called: [number, number][] = Array.from(pipeline
          .flatMap(([a, b,]) => create<[number, number]>([
            [a, b,],
            [a + 1, b + 1,],
            [a + 2, b + 2,],
          ]))
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
        const pipeline = create(function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        });
        const called: number[] = Array.from(pipeline
          .flatMap(n => create([n, n + 1, n + 2,]))
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
