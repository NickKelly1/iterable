import { IHasTapSelf } from '../collection.interface';
import { Iterateable } from '../types';

export function testTapSelf(create: <T>(iterable: Iterateable<T>) => IHasTapSelf<T>): void {
  describe('tapSelf(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const collection = create([1, 2, 3,]);
        let result1: IHasTapSelf<number>;
        const result2: IHasTapSelf<number> = collection
          .tapSelf(self => result1 = self);
        expect(result1!).toBe(collection);
        expect(result2).toBe(collection);
      });
      it('set', () => {
        const collection = create(new Set([1, 2, 3,]));
        let result1: IHasTapSelf<number>;
        const result2: IHasTapSelf<number> = collection
          .tapSelf(self => result1 = self);
        expect(result1!).toBe(collection);
        expect(result2).toBe(collection);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const collection = create(map);
        let result1: IHasTapSelf<[number, number]>;
        const result2: IHasTapSelf<[number, number]> = collection
          .tapSelf(self => result1 = self);
        expect(result1!).toBe(collection);
        expect(result2).toBe(collection);
      });
      it('generator', () => {
        const collection = create(function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        });
        let result1: IHasTapSelf<number>;
        const result2: IHasTapSelf<number> = collection
          .tapSelf(self => result1 = self);
        expect(result1!).toBe(collection);
        expect(result2).toBe(collection);
      });
    });
  });
}
