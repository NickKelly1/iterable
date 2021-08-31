import { IHasForkFlat } from '../collection.interface';
import { Iterateable } from '../types';

export function testForkFlat(create: <T>(iterable: Iterateable<T>) => IHasForkFlat<T>): void {
  describe('forkFlat(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const collection = create([1, 2, 3,]);
        const called: number[] = Array.from(collection
          .forkFlat(
            // x2
            c => Array.from(c).map(n => n * 2),
            // square
            c => new Set(Array.from(c).map(n => n ** 2)),
            // half
            c => Array.from(c).map(n => Math.ceil(n / 2)),
            // is even
            c => Array.from(c).filter(n => !(n % 2)),
          )
        );
        expect(called).toEqual([
          2, 4, 6,
          1, 4, 9,
          1, 1, 2,
          2,
        ]);
      });
      it('set', () => {
        const collection = create(new Set([1, 2, 3,]));
        const called: number[] = Array.from(collection
          .forkFlat(
            // x2
            c => Array.from(c).map(n => n * 2),
            // square
            c => new Set(Array.from(c).map(n => n ** 2)),
            // half
            c => Array.from(c).map(n => Math.ceil(n / 2)),
            // is even
            c => Array.from(c).filter(n => !(n % 2)),
          )
        );
        expect(called).toEqual([
          2, 4, 6,
          1, 4, 9,
          1, 1, 2,
          2,
        ]);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const collection = create(map);
        const called: number[][] = Array.from(collection
          .forkFlat(
            // x2
            c => Array.from(c).map(n => n.map(n2 => n2 * 2)),
            // square
            c => new Set(Array.from(c).map(n => n.map(n2 => n2 ** 2))),
            // half
            c => Array.from(c).map(n => n.map(n2 => Math.ceil(n2 / 2))),
            // is even
            c => Array.from(c).filter(n => !(n[1] % 2)),
          )
        );
        expect(called).toEqual([
          [2, 2,], [4, 4,], [6, 6,],
          [1, 1,], [4, 4,], [9, 9,],
          [1, 1,], [1, 1,], [2, 2,],
          [2, 2,],
        ]);
      });
      it('generator', () => {
        const collection = create(function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        });
        const called: number[] = Array.from(collection
          .forkFlat(
            // x2
            c => Array.from(c).map(n => n * 2),
            // square
            c => new Set(Array.from(c).map(n => n ** 2)),
            // half
            c => Array.from(c).map(n => Math.ceil(n / 2)),
            // is even
            c => Array.from(c).filter(n => !(n % 2)),
          )
        );
        expect(called).toEqual([
          2, 4, 6,
          1, 4, 9,
          1, 1, 2,
          2,
        ]);
      });
    });
  });
}
