import { IHasFind } from '../collection.interface';
import { Iterateable } from '../types';


export function testFind(create: <T>(iterable: Iterateable<T>) => IHasFind<T>): void {
  describe('find(...)', () => {
    describe('should work on', () => {
      describe('array', () => {
        it('Some', () => {
          const collection = create([1, 2, 3,]);
          const f = collection.find((v) => v === 2);
          expect(f.isSome()).toEqual(true);
          expect(f.unwrap()).toEqual(2);
        });
        it('None', () => {
          const collection = create([1, 2, 3,]);
          const f = collection.find((v) => v === 4);
          expect(f.isSome()).toEqual(false);
        });
      });
      describe('set', () => {
        it('Some', () => {
          const collection = create(new Set([1, 2, 3,]));
          const f = collection.find((v) => v === 2);
          expect(f.isSome()).toEqual(true);
          expect(f.unwrap()).toEqual(2);
        });
        it('None', () => {
          const collection = create(new Set([1, 2, 3,]));
          const f = collection.find((v) => v === 4);
          expect(f.isSome()).toEqual(false);
        });
      });
      describe('map', () => {
        it('Some', () => {
          const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
          const collection = create(map);
          const f = collection.find((v) => v[1] === 2);
          expect(f.isSome()).toEqual(true);
          expect(f.unwrap()).toEqual([2, 2,]);
        });
        it('None', () => {
          const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
          const collection = create(map);
          const f = collection.find((v) => v[1] === 4);
          expect(f.isSome()).toEqual(false);
        });
      });
      describe('generator', () => {
        it('Some', () => {
          const collection = create(function * (): Iterable<number> {
            yield 1; yield 2; yield 3;
          });
          const f = collection.find((v) => v === 2);
          expect(f.isSome()).toEqual(true);
          expect(f.unwrap()).toEqual(2);
        });
        it('None', () => {
          const collection = create(function * (): Iterable<number> {
            yield 1; yield 2; yield 3;
          });
          const f = collection.find((v) => v === 4);
          expect(f.isSome()).toEqual(false);
        });
      });
    });
  });
}
