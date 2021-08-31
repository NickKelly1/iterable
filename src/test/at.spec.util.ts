import { IHasAt } from '../collection.interface';
import { Iterateable } from '../types';

export function testAt(create: <T>(iterable: Iterateable<T>) => IHasAt<T>): void {
  describe('at(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const collection = create([1, 2, 3,]);
        expect(collection.at(0).value).toEqual(1);
        expect(collection.at(1).value).toEqual(2);
        expect(collection.at(2).value).toEqual(3);
        expect(collection.at(3).value).toEqual(undefined);
        expect(collection.at(-1).value).toEqual(3);
        expect(collection.at(-2).value).toEqual(2);
        expect(collection.at(-3).value).toEqual(1);
        expect(collection.at(-4).value).toEqual(undefined);
      });
      it('set', () => {
        const collection = create(new Set([1, 2, 3,]));
        expect(collection.at(0).value).toEqual(1);
        expect(collection.at(1).value).toEqual(2);
        expect(collection.at(2).value).toEqual(3);
        expect(collection.at(3).value).toEqual(undefined);
        expect(collection.at(-1).value).toEqual(3);
        expect(collection.at(-2).value).toEqual(2);
        expect(collection.at(-3).value).toEqual(1);
        expect(collection.at(-4).value).toEqual(undefined);
      });
      it('map', () => {
        const map = new Map<number, number>([
          [1, 1,],
          [2, 2,],
          [3, 3,],
        ]);
        const collection = create(map);
        expect(collection.at(0).value).toEqual([1, 1,]);
        expect(collection.at(1).value).toEqual([2, 2,]);
        expect(collection.at(2).value).toEqual([3, 3,]);
        expect(collection.at(3).value).toEqual(undefined);
        expect(collection.at(-1).value).toEqual([3, 3,]);
        expect(collection.at(-2).value).toEqual([2, 2,]);
        expect(collection.at(-3).value).toEqual([1, 1,]);
        expect(collection.at(-4).value).toEqual(undefined);
      });
      it('generator', () => {
        const generator = function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        };
        const collection = create(generator);
        expect(collection.at(0).value).toEqual(1);
        expect(collection.at(1).value).toEqual(2);
        expect(collection.at(2).value).toEqual(3);
        expect(collection.at(3).value).toEqual(undefined);
        expect(collection.at(-1).value).toEqual(3);
        expect(collection.at(-2).value).toEqual(2);
        expect(collection.at(-3).value).toEqual(1);
        expect(collection.at(-4).value).toEqual(undefined);
      });
    });
  });

}
