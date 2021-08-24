import { IHasMap } from '../collection.interface';
import { Iterateable } from '../types';

export function testMap(create: <T>(iterable: Iterateable<T>) => IHasMap<T>): void {
  describe('map(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = create([1, 2, 3,]);
        const called: number[] = Array.from(pipeline
          .map(n => n + 1)
        );
        expect(called[0]).toEqual(2);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(4);
      });
      it('set', () => {
        const pipeline = create(new Set([1, 2, 3,]));
        const called: number[] = Array.from(pipeline
          .map(n => n + 1)
        );
        expect(called[0]).toEqual(2);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(4);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = create(map);
        const called: [number, number][] = Array.from(pipeline
          .map<[number, number]>(([a, b,]) => ([a + 1, b + 1,]))
        );
        expect(called[0]).toEqual([2, 2,]);
        expect(called[1]).toEqual([3, 3,]);
        expect(called[2]).toEqual([4, 4,]);
      });
      it('generator', () => {
        const pipeline = create(function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        });
        const called: number[] = Array.from(pipeline
          .map(n => n + 1)
        );
        expect(called[0]).toEqual(2);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(4);
      });
    });
  });
}
