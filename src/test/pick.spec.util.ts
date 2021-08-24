import { IHasPick } from '../collection.interface';
import { Iterateable } from '../types';

export function testPick(create: <T>(iterable: Iterateable<T>) => IHasPick<T>): void {
  describe('pick(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = create([1, 2, 3,]);
        const called: number[] = Array.from(pipeline
          .pick(1, 3)
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(undefined);
      });
      it('set', () => {
        const pipeline = create(new Set([1, 2, 3,]));
        const called: number[] = Array.from(pipeline
          .pick(1, 3)
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(undefined);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = create(() => map.values());
        const called: number[] = Array.from(pipeline
          .pick(3, 1)
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(undefined);
      });
      it('generator', () => {
        const pipeline = create(function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        });
        const called: number[] = Array.from(pipeline
          .pick(3, 1)
        );
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(undefined);
      });
    });
  });

}
