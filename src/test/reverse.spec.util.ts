import { IHasReverse } from '../collection.interface';
import { Iterateable } from '../types';

export function testReverse(create: <T>(iterable: Iterateable<T>) => IHasReverse<T>): void {
  describe('reverse(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = create([1, 2, 3,]);
        const called: number[] = Array.from(pipeline
          .reverse()
        );
        expect(called[0]).toEqual(3);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(1);
      });
      it('set', () => {
        const pipeline = create(new Set([1, 2, 3,]));
        const called: number[] = Array.from(pipeline
          .reverse()
        );
        expect(called[0]).toEqual(3);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(1);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = create(() => map.values());
        const called: number[] = Array.from(pipeline
          .reverse()
        );
        expect(called[0]).toEqual(3);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(1);
      });
      it('generator', () => {
        const generator = function * (): Iterable<number> {
          yield 1;
          yield 2;
          yield 3;
        };
        const pipeline = create(generator);
        const called: number[] = Array.from(pipeline
          .reverse()
        );
        expect(called[0]).toEqual(3);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(1);
      });
    });
  });
}
