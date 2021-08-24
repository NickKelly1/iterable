import { IHasJoin } from '../collection.interface';
import { Iterateable } from '../types';

export function testJoin(create: <T>(iterable: Iterateable<T>) => IHasJoin<T>): void {
  describe('join(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = create([1, 2, 3,]);
        const result = pipeline.join('-');
        expect(result).toEqual('1-2-3');
      });
      it('set', () => {
        const pipeline = create(new Set([1, 2, 3,]));
        const result = pipeline.join('-');
        expect(result).toEqual('1-2-3');
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = create(() => map.values());
        const result = pipeline.join('-');
        expect(result).toEqual('1-2-3');
      });
      it('generator', () => {
        const pipeline = create(function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        });
        const result = pipeline.join('-');
        expect(result).toEqual('1-2-3');
      });
    });
  });
}
