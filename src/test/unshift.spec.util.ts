import { IHasUnshift } from '../collection.interface';
import { Iterateable } from '../types';

export function testUnshift(create: <T>(iterable: Iterateable<T>) => IHasUnshift<T>): void {
  describe('unshift(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = create([1, 2, 3,]);
        const called: number[] = Array.from(pipeline
          .unshift(4, 5)
        );
        expect(called[0]).toEqual(4);
        expect(called[1]).toEqual(5);
      });
      it('set', () => {
        const pipeline = create(new Set([1, 2, 3,]));
        const called: number[] = Array.from(pipeline
          .unshift(4, 5)
        );
        expect(called[0]).toEqual(4);
        expect(called[1]).toEqual(5);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = create(() => map.values());
        const called: number[] = Array.from(pipeline
          .unshift(4, 5)
        );
        expect(called[0]).toEqual(4);
        expect(called[1]).toEqual(5);
      });
      it('generator', () => {
        const generator = function * (): Iterable<number> {
          yield 1;
          yield 2;
          yield 3;
        };
        const pipeline = create(generator);
        const called: number[] = Array.from(pipeline
          .unshift(4, 5)
        );
        expect(called[0]).toEqual(4);
        expect(called[1]).toEqual(5);
      });
    });
  });
}
