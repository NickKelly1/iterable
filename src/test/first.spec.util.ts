import { Maybe } from '@nkp/maybe';
import { Iterateable } from '../types';

export interface HasFirst<T> extends Iterable<T> {
  first(): Maybe<T>;
}

export function testFirst(create: <T>(iterable: Iterateable<T>) => HasFirst<T>): void {
  describe('first(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = create([1, 2, 3,]);
        expect(pipeline.first().value).toEqual(1);
      });
      it('set', () => {
        const pipeline = create(new Set([1, 2, 3,]));
        expect(pipeline.first().value).toEqual(1);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = create(map);
        expect(pipeline.first().value).toEqual([1, 1,]);
      });
      it('generator', () => {
        const pipeline = create(function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        });
        expect(pipeline.first().value).toEqual(1);
      });
    });
  });
}
