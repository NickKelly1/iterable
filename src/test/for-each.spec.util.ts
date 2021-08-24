import { IHasForEach } from '../collection.interface';
import { Iterateable } from '../types';

export function testForEach(create: <T>(iterable: Iterateable<T>) => IHasForEach<T>): void {
  describe('forEach(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = create([1, 2, 3,]);
        const called: number[] = [];
        pipeline
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(3);
      });
      it('set', () => {
        const pipeline = create(new Set([1, 2, 3,]));
        const called: number[] = [];
        pipeline
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(3);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = create(map);
        const called: [number, number][] = [];
        pipeline
          .forEach(item => called.push(item));
        expect(called[0]).toEqual([1, 1,]);
        expect(called[1]).toEqual([2, 2,]);
        expect(called[2]).toEqual([3, 3,]);
      });
      it('generator', () => {
        const pipeline = create(function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        });
        const called: number[] = [];
        pipeline
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(3);
      });
    });
  });
}
