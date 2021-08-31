import { IHasPluck } from '../collection.interface';
import { Iterateable } from '../types';

export function testPluck(create: <T>(iterable: Iterateable<T>) => IHasPluck<T>): void {
  describe('pluck(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const collection = create([{ prop: 'first', }, { prop: 'second', },]);
        const called: string[] = Array.from(collection
          .pluck('prop')
        );
        expect(called[0]).toEqual('first');
        expect(called[1]).toEqual('second');
      });
      it('set', () => {
        const collection = create(new Set([{ prop: 'first', }, { prop: 'second', },]));
        const called: string[] = Array.from(collection
          .pluck('prop')
        );
        expect(called[0]).toEqual('first');
        expect(called[1]).toEqual('second');
      });
      it('map', () => {
        const map = new Map([[1, { prop: 'first', },], [2, { prop: 'second',},],]);
        const collection = create(map);
        const called0: number[] = Array.from(collection
          .pluck(0)
        );
        expect(called0[0]).toEqual(1);
        expect(called0[1]).toEqual(2);
        const called1: { prop: string }[] = Array.from(collection
          .pluck(1)
        );
        expect(called1[0]).toEqual({ prop: 'first', });
        expect(called1[1]).toEqual({ prop: 'second',});
      });
      it('generator', () => {
        const collection = create(function * () {
          yield { prop: 'first', }; yield { prop: 'second', };
        });
        const called: string[] = Array.from(collection
          .pluck('prop')
        );
        expect(called[0]).toEqual('first');
        expect(called[1]).toEqual('second');
      });
    });
  });
}
