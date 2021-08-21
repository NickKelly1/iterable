import { Pipelineable } from '../utils/types';
import { Repeatable } from './repeatable';


export function testRepeatableFunctions(create: (<T>(pipelineable: Pipelineable<T>) => Repeatable<T>)): void {
  describe(': Repeatable', () => {
    describe('at(...)', () => {
      describe('should work on', () => {
        it('array', () => {
          const pipeline = create([1, 2, 3,]);
          expect(pipeline.at(0).value).toEqual(1);
          expect(pipeline.at(1).value).toEqual(2);
          expect(pipeline.at(2).value).toEqual(3);
        });
        it('set', () => {
          const pipeline = create(new Set([1, 2, 3,]));
          expect(pipeline.at(0).value).toEqual(1);
          expect(pipeline.at(1).value).toEqual(2);
          expect(pipeline.at(2).value).toEqual(3);
        });
        it('map', () => {
          const map = new Map<number, number>([
            [1, 1,], [2, 2,], [3, 3,],
          ]);
          const pipeline = create(map);
          expect(pipeline.at(0).value).toEqual([1, 1,]);
          expect(pipeline.at(1).value).toEqual([2, 2,]);
          expect(pipeline.at(2).value).toEqual([3, 3,]);
        });
        it('generator', () => {
          const pipeline = create(function * (): Iterable<number> {
            yield 1; yield 2; yield 3;
          });
          expect(pipeline.at(0).value).toEqual(1);
          expect(pipeline.at(1).value).toEqual(2);
          expect(pipeline.at(2).value).toEqual(3);
        });
      });
    });

    describe('getSize(...)', () => {
      describe('should map every item', () => {
        it('array', () => {
          const pipeline = create([1, 2, 3,]);
          expect(pipeline.getSize()).toEqual(3);
        });
        it('set', () => {
          const pipeline = create(new Set([1, 2, 3,]));
          expect(pipeline.getSize()).toEqual(3);
        });
        it('map', () => {
          const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
          const pipeline = create(map);
          expect(pipeline.getSize()).toEqual(3);
        });
        it('generator', () => {
          const pipeline = create(function * (): Iterable<number> {
            yield 1;
            yield 2;
            yield 3;
          });
          expect(pipeline.getSize()).toEqual(3);
        });
      });
    });
  });
}
