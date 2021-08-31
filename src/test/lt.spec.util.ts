import { IHasLt } from '../collection.interface';
import { Iterateable } from '../types';

export function testLt(create: <T>(iterable: Iterateable<T>) => IHasLt<T>): void {
  describe('lt(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const numbers = create([
          1,
          2,
          3,
          4,
          5,
        ]);
        const dates = create([
          new Date('1990-01-01'),
          new Date('2000-01-01'),
          new Date('2010-01-01'),
          new Date('2020-01-01'),
          new Date('2030-01-01'),
        ]);
        testBench(numbers, dates);
      });
      it('set', () => {
        const numbers = create(new Set([
          1,
          2,
          3,
          4,
          5,
        ]));
        const dates = create(new Set([
          new Date('1990-01-01'),
          new Date('2000-01-01'),
          new Date('2010-01-01'),
          new Date('2020-01-01'),
          new Date('2030-01-01'),
        ]));
        testBench(numbers, dates);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,], [4, 4,], [5, 5,],]);
        const numbers = create(() => map.values());
        const dates = create(() => new Map([
          [1, new Date('1990-01-01'),],
          [2, new Date('2000-01-01'),],
          [3, new Date('2010-01-01'),],
          [4, new Date('2020-01-01'),],
          [5, new Date('2030-01-01'),],
        ]).values());
        testBench(numbers, dates);
      });
      it('generator', () => {
        const numbers = create(function * (): Iterable<number> {
          yield 1;
          yield 2;
          yield 3;
          yield 4;
          yield 5;
        });
        const dates = create(function * () {
          yield new Date('1990-01-01');
          yield new Date('2000-01-01');
          yield new Date('2010-01-01');
          yield new Date('2020-01-01');
          yield new Date('2030-01-01');
        });
        testBench(numbers, dates);
      });
    });
  });
}

function testBench(numbers: IHasLt<number>, dates: IHasLt<Date>) {
  expect(Array.from(numbers.lt(3))).toEqual([1, 2,]);

  expect(Array.from(dates.lt(new Date('2010-01-01'))))
    .toEqual([
      new Date('1990-01-01'),
      new Date('2000-01-01'),
    ]);
}
