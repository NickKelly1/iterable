import { IHasGetSize } from '../collection.interface';
import { Iterateable } from '../types';

export function testGetSize(create: <T>(iterable: Iterateable<T>) => IHasGetSize<T>): void {
  describe('getSize(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = create([1, 2, 3,]);
        expect(pipeline.getSize()).toEqual(3);
      });
      it('set', () => {
        const pipeline = create(new Set([1, 2, 3,]));
        expect(pipeline.getSize()).toEqual(3);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = create(map);
        expect(pipeline.getSize()).toEqual(3);
      });
      it('generator', () => {
        const pipeline = create(function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        });
        expect(pipeline.getSize()).toEqual(3);
      });
    });
  });
}
