import { IHasToSet } from '../collection.interface';
import { Iterateable } from '../types';

export function testSet(create: <T>(iterable: Iterateable<T>) => IHasToSet<T>): void {
  describe('toSet(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = create([1, 2, 3,]);
        expect(pipeline.toSet()).toEqual(new Set([1, 2, 3,]));
      });
      it('set', () => {
        const pipeline = create(new Set([1, 2, 3,]));
        expect(pipeline.toSet()).toEqual(new Set([1, 2, 3,]));
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = create(map);
        expect(pipeline.toSet()).toEqual(new Set([[1, 1,], [2, 2,], [3, 3,],]));
      });
      it('generator', () => {
        const generator = function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        };
        const pipeline = create(generator);
        expect(pipeline.toSet()).toEqual(new Set([1, 2, 3,]));
      });
    });
  });
}
