import { IHasToMap } from '../collection.interface';
import { Iterateable } from '../types';

export function testToMap(create: <T>(iterable: Iterateable<T>) => IHasToMap<T>): void {
  describe('toMap(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const collection: IHasToMap<[number, number]> = create([[1, 1,], [2, 2,], [3, 3,],]);
        expect(collection.toMap()).toEqual(new Map([[1, 1,], [2, 2,], [3, 3,],]));
      });
      it('set', () => {
        const collection: IHasToMap<[number, number]> = create(new Set([[1, 1,], [2, 2,], [3, 3,],]));
        expect(collection.toMap()).toEqual(new Map([[1, 1,], [2, 2,], [3, 3,],]));
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const collection: IHasToMap<[number, number]> = create(map);
        expect(collection.toMap()).toEqual(new Map([[1, 1,], [2, 2,], [3, 3,],]));
      });
      it('generator', () => {
        const generator = function * (): Iterable<[number, number]> {
          yield [1, 1,]; yield [2, 2,]; yield [3, 3,];
        };
        const collection: IHasToMap<[number, number]> = create(generator);
        expect(collection.toMap()).toEqual(new Map([[1, 1,], [2, 2,], [3, 3,],]));
      });
    });
  });
}
