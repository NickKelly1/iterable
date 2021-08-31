import { IHasToArray } from '../collection.interface';
import { Iterateable } from '../types';

export function testToArray(create: <T>(iterable: Iterateable<T>) => IHasToArray<T>): void {
  describe('toArray(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = create([1, 2, 3,]);
        expect(pipeline.toArray()).toEqual([1, 2, 3,]);
      });
      it('set', () => {
        const pipeline = create(new Set([1, 2, 3,]));
        expect(pipeline.toArray()).toEqual([1, 2, 3,]);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = create(map);
        expect(pipeline.toArray()).toEqual([[1, 1,], [2, 2,], [3, 3,],]);
      });
      it('generator', () => {
        const generator = function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        };
        const pipeline = create(generator);
        expect(pipeline.toArray()).toEqual([1, 2, 3,]);
      });
    });
  });
}
