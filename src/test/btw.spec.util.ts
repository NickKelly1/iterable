import { IHasBtw } from '../collection.interface';
import { Iterateable } from '../types';

export function testBtw(create: <T>(iterable: Iterateable<T>) => IHasBtw<T>): void {
  describe('btw(...)', () => {
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

function testBench(numbers: IHasBtw<number>, dates: IHasBtw<Date>) {
  expect(Array.from(numbers.btw(2, 4))).toEqual([2, 3, 4,]);
  expect(Array.from(numbers.btw([2, false,], 4))).toEqual([3, 4,]);
  expect(Array.from(numbers.btw([2, true,], 4))).toEqual([2, 3, 4,]);
  expect(Array.from(numbers.btw(2, [4, false,]))).toEqual([2, 3,]);
  expect(Array.from(numbers.btw(2, [4, true,]))).toEqual([2, 3, 4,]);
  expect(Array.from(numbers.btw({ value: 2, }, 4))).toEqual([2, 3, 4,]);
  expect(Array.from(numbers.btw({ value: 2, inclusive: false, }, 4))).toEqual([3, 4,]);
  expect(Array.from(numbers.btw({ value: 2, inclusive: true, }, 4))).toEqual([2, 3, 4,]);
  expect(Array.from(numbers.btw(2, { value: 4, }))).toEqual([2, 3, 4,]);
  expect(Array.from(numbers.btw(2, { value: 4, inclusive: false, }))).toEqual([2, 3,]);
  expect(Array.from(numbers.btw(2, { value: 4, inclusive: true, }))).toEqual([2, 3, 4,]);

  expect(Array.from(dates.btw(
    new Date('2000-01-01'),
    new Date('2020-01-01'))))
    .toEqual([
      new Date('2000-01-01'),
      new Date('2010-01-01'),
      new Date('2020-01-01'),]);

  expect(Array.from(dates.btw(
    [new Date('2000-01-01'), false,],
    new Date('2020-01-01'))))
    .toEqual([
      new Date('2010-01-01'),
      new Date('2020-01-01'),]);

  expect(Array.from(dates.btw(
    [new Date('2000-01-01'), true,],
    new Date('2020-01-01'))))
    .toEqual([
      new Date('2000-01-01'),
      new Date('2010-01-01'),
      new Date('2020-01-01'),]);

  expect(Array.from(dates.btw(
    new Date('2000-01-01'),
    [new Date('2020-01-01'), false,])))
    .toEqual([
      new Date('2000-01-01'),
      new Date('2010-01-01'),]);

  expect(Array.from(dates.btw(
    new Date('2000-01-01'),
    [new Date('2020-01-01'), true,])))
    .toEqual([
      new Date('2000-01-01'),
      new Date('2010-01-01'),
      new Date('2020-01-01'),]);

  expect(Array.from(dates.btw(
    { value: new Date('2000-01-01'), },
    new Date('2020-01-01'))))
    .toEqual([
      new Date('2000-01-01'),
      new Date('2010-01-01'),
      new Date('2020-01-01'),]);

  expect(Array.from(dates.btw(
    { value: new Date('2000-01-01'), inclusive: false, },
    new Date('2020-01-01'))))
    .toEqual([
      new Date('2010-01-01'),
      new Date('2020-01-01'),]);

  expect(Array.from(dates.btw(
    { value: new Date('2000-01-01'), inclusive: true, },
    new Date('2020-01-01'))))
    .toEqual([
      new Date('2000-01-01'),
      new Date('2010-01-01'),
      new Date('2020-01-01'),]);

  expect(Array.from(dates.btw(
    new Date('2000-01-01'),
    { value: new Date('2020-01-01'), })))
    .toEqual([
      new Date('2000-01-01'),
      new Date('2010-01-01'),
      new Date('2020-01-01'),]);

  expect(Array.from(dates.btw(
    new Date('2000-01-01'),
    { value: new Date('2020-01-01'), inclusive: false, })))
    .toEqual([
      new Date('2000-01-01'),
      new Date('2010-01-01'),]);

  expect(Array.from(dates.btw(
    new Date('2000-01-01'),
    { value: new Date('2020-01-01'), inclusive: true, })))
    .toEqual([
      new Date('2000-01-01'),
      new Date('2010-01-01'),
      new Date('2020-01-01'),]);
}
