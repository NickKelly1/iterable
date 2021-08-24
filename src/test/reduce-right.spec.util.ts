import { IHasReduceRight } from '../collection.interface';
import { Iterateable } from '../types';

export function testReduceRight(create: <T>(iterable: Iterateable<T>) => IHasReduceRight<T>): void {
  describe('reduceRight(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = create([1, 2, 3,]);
        const result = pipeline.reduceRight((n, a) => String(a) + String(n), '');
        expect(result).toEqual('321');
      });
      it('set', () => {
        const pipeline = create(new Set([1, 2, 3,]));
        const result = pipeline.reduceRight((n, a) => String(a) + String(n), '');
        expect(result).toEqual('321');
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = create(map);
        const result = pipeline.reduceRight(([na, nb,], a) => String(a) + String(na + nb), '');
        expect(result).toEqual('642');
      });
      it('generator', () => {
        const pipeline = create(function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        });
        const result = pipeline.reduceRight((n, a) => String(a) + String(n), '');
        expect(result).toEqual('321');
      });
    });
  });
}
