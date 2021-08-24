import { IHasReduce } from '../collection.interface';
import { Iterateable } from '../types';

export function testReduce(create: <T>(iterable: Iterateable<T>) => IHasReduce<T>): void {
  describe('reduce(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = create([1, 2, 3,]);
        const result = pipeline.reduce((n, a) => String(a) + String(n), '');
        expect(result).toEqual('123');
      });
      it('set', () => {
        const pipeline = create(new Set([1, 2, 3,]));
        const result = pipeline.reduce((n, a) => String(a) + String(n), '');
        expect(result).toEqual('123');
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = create(map);
        const result = pipeline.reduce(([na, nb,], a) => String(a) + String(na + nb), '');
        expect(result).toEqual('246');
      });
      it('generator', () => {
        const pipeline = create(function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        });
        const result = pipeline.reduce((n, a) => String(a) + String(n), '');
        expect(result).toEqual('123');
      });
    });
  });

}
