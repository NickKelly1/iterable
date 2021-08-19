import { Bucket } from './bucket';

describe('Bucket', () => {
  it('should flatten itself', () => {
    const c1 = new Bucket([1, 2, 3,]);
    const c2 = new Bucket(c1);
    for (const next of c2) {
      expect(typeof next).toEqual('number');
    }
  });

  describe('run(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Bucket([1, 2, 3,]);
        const called: number[] = [];
        pipeline.exhaust(item => { called.push(item); });
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(3);
      });
      it('set', () => {
        const pipeline = new Bucket(new Set([1, 2, 3,]));
        const called: number[] = [];
        pipeline.exhaust(item => { called.push(item); });
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(3);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = new Bucket(map);
        const called: [number, number][] = [];
        pipeline.exhaust(item => { called.push(item); });
        expect(called[0]).toEqual([1, 1,]);
        expect(called[1]).toEqual([2, 2,]);
        expect(called[2]).toEqual([3, 3,]);
      });
      it('generator', () => {
        const pipeline = new Bucket(function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        });
        const called: number[] = [];
        pipeline.exhaust(item => { called.push(item); });
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(3);
      });
    });
  });

  describe('map(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Bucket([1, 2, 3,]).map(n => n + 1);
        const called: number[] = [];
        pipeline.exhaust(item => { called.push(item); });
        expect(called[0]).toEqual(2);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(4);
      });
      it('set', () => {
        const pipeline = new Bucket(new Set([1, 2, 3,])).map(n => n + 1);
        const called: number[] = [];
        pipeline.exhaust(item => { called.push(item); });
        expect(called[0]).toEqual(2);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(4);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = new Bucket(map).map<[number, number]>(
          ([a, b,]) => ([a + 1, b + 1,]));
        const called: [number, number][] = [];
        pipeline.exhaust(item => { called.push(item); });
        expect(called[0]).toEqual([2, 2,]);
        expect(called[1]).toEqual([3, 3,]);
        expect(called[2]).toEqual([4, 4,]);
      });
      it('generator', () => {
        const pipeline = new Bucket(function * (): Iterable<number> {
          yield 1;
          yield 2;
          yield 3;
        }).map(n => n + 1);
        const called: number[] = [];
        pipeline.exhaust(item => { called.push(item); });
        expect(called[0]).toEqual(2);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(4);
      });
    });
  });

  describe('filter(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Bucket([1, 2, 3,]).filter((v) => v !== 2);
        const called: number[] = [];
        pipeline.exhaust(item => { called.push(item); });
        expect(called[1]).toEqual(3);
      });
      it('set', () => {
        const pipeline = new Bucket(new Set([1, 2, 3,])).filter((v) => v !== 2);
        const called: number[] = [];
        pipeline.exhaust(item => { called.push(item); });
        expect(called[1]).toEqual(3);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = new Bucket(map).filter(([v,]) => v !== 2);
        const called: [number, number][] = [];
        pipeline.exhaust(item => { called.push(item); });
        expect(called[1]).toEqual([3, 3,]);
      });
      it('generator', () => {
        const pipeline = new Bucket(function * (): Iterable<number> {
          yield 1;
          yield 2;
          yield 3;
        }).filter((v) => v !== 2);
        const called: number[] = [];
        pipeline.exhaust(item => { called.push(item); });
        expect(called[1]).toEqual(3);
      });
    });
  });

  describe('exclude(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Bucket([1, 2, 3,]).exclude(1, 2);
        const called: number[] = [];
        pipeline.exhaust(item => { called.push(item); });
        expect(called[0]).toEqual(3);
      });
      it('set', () => {
        const pipeline = new Bucket(new Set([1, 2, 3,])).exclude(1, 3);
        const called: number[] = [];
        pipeline.exhaust(item => { called.push(item); });
        expect(called[0]).toEqual(2);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = new Bucket(() => map.values()).exclude(3, 1);
        const called: number[] = [];
        pipeline.exhaust(item => { called.push(item); });
        expect(called[0]).toEqual(2);
      });
      it('generator', () => {
        const pipeline = new Bucket(function * (): Iterable<number> {
          yield 1;
          yield 2;
          yield 3;
        }).exclude(2);
        const called: number[] = [];
        pipeline.exhaust(item => { called.push(item); });
        expect(called[1]).toEqual(3);
      });
    });
  });

  describe('pick(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Bucket([1, 2, 3,]).pick(1, 3);
        const called: number[] = [];
        pipeline.exhaust(item => { called.push(item); });
        expect(called[1]).toEqual(3);
      });
      it('set', () => {
        const pipeline = new Bucket(new Set([1, 2, 3,])).pick(1, 3);
        const called: number[] = [];
        pipeline.exhaust(item => { called.push(item); });
        expect(called[1]).toEqual(3);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = new Bucket(map.values()).pick(3, 1);
        const called: number[] = [];
        pipeline.exhaust(item => { called.push(item); });
        expect(called[1]).toEqual(3);
      });
      it('generator', () => {
        const pipeline = new Bucket(function * (): Iterable<number> {
          yield 1;
          yield 2;
          yield 3;
        }).pick(2);
        const called: number[] = [];
        pipeline.exhaust(item => { called.push(item); });
        expect(called[0]).toEqual(2);
      });
    });
  });
});
