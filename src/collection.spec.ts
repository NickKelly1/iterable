import { Maybe } from '@nkp/maybe';
import { Collection } from './collection';

describe('Collection', () => {
  it('should flatten on construction', () => {
    const c1 = new Collection([1, 2, 3,]);
    const c2 = new Collection(c1);
    for (const next of c2) {
      expect(typeof next).toEqual('number');
    }
  });

  describe('forEach(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Collection([1, 2, 3,]);
        const called: number[] = [];
        pipeline
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(3);
      });
      it('set', () => {
        const pipeline = new Collection(new Set([1, 2, 3,]));
        const called: number[] = [];
        pipeline
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(3);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = new Collection(map);
        const called: [number, number][] = [];
        pipeline
          .forEach(item => called.push(item));
        expect(called[0]).toEqual([1, 1,]);
        expect(called[1]).toEqual([2, 2,]);
        expect(called[2]).toEqual([3, 3,]);
      });
      it('generator', () => {
        const pipeline = new Collection(function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        });
        const called: number[] = [];
        pipeline
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(3);
      });
    });
  });

  describe('first(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Collection([1, 2, 3,]);
        expect(pipeline.first().value).toEqual(1);
      });
      it('set', () => {
        const pipeline = new Collection(new Set([1, 2, 3,]));
        expect(pipeline.first().value).toEqual(1);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = new Collection(map);
        expect(pipeline.first().value).toEqual([1, 1,]);
      });
      it('generator', () => {
        const pipeline = new Collection(function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        });
        expect(pipeline.first().value).toEqual(1);
      });
    });
  });

  describe('map(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Collection([1, 2, 3,]);
        const called: number[] = [];
        pipeline
          .map(n => n + 1)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(2);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(4);
      });
      it('set', () => {
        const pipeline = new Collection(new Set([1, 2, 3,]));
        const called: number[] = [];
        pipeline
          .map(n => n + 1)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(2);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(4);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = new Collection(map);
        const called: [number, number][] = [];
        pipeline
          .map<[number, number]>(([a, b,]) => ([a + 1, b + 1,]))
          .forEach(item => called.push(item));
        expect(called[0]).toEqual([2, 2,]);
        expect(called[1]).toEqual([3, 3,]);
        expect(called[2]).toEqual([4, 4,]);
      });
      it('generator', () => {
        const pipeline = new Collection(function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        });
        const called: number[] = [];
        pipeline
          .map(n => n + 1)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(2);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(4);
      });
    });
  });

  describe('flatMap(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Collection([1, 2, 3,]);
        const called: number[] = [];
        pipeline
          .flatMap(n => new Collection([n, n + 1, n + 2,]))
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(3);

        expect(called[3]).toEqual(2);
        expect(called[4]).toEqual(3);
        expect(called[5]).toEqual(4);

        expect(called[6]).toEqual(3);
        expect(called[7]).toEqual(4);
        expect(called[8]).toEqual(5);
      });
      it('set', () => {
        const pipeline = new Collection(new Set([1, 2, 3,]));
        const called: number[] = [];
        pipeline
          .flatMap(n => new Collection([n, n + 1, n + 2,]))
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(3);

        expect(called[3]).toEqual(2);
        expect(called[4]).toEqual(3);
        expect(called[5]).toEqual(4);

        expect(called[6]).toEqual(3);
        expect(called[7]).toEqual(4);
        expect(called[8]).toEqual(5);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 3,], [2, 5,], [3, 9,],]);
        const pipeline = new Collection(map);
        const called: [number, number][] = [];
        pipeline
          .flatMap(([a, b,]) => new Collection<[number, number]>([
            [a, b,],
            [a + 1, b + 1,],
            [a + 2, b + 2,],
          ]))
          .forEach(item => called.push(item));
        expect(called[0]).toEqual([1, 3,]);
        expect(called[1]).toEqual([2, 4,]);
        expect(called[2]).toEqual([3, 5,]);

        expect(called[3]).toEqual([2, 5,]);
        expect(called[4]).toEqual([3, 6,]);
        expect(called[5]).toEqual([4, 7,]);

        expect(called[6]).toEqual([3, 9,]);
        expect(called[7]).toEqual([4, 10,]);
        expect(called[8]).toEqual([5, 11,]);
      });
      it('generator', () => {
        const pipeline = new Collection(function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        });
        const called: number[] = [];
        pipeline
          .flatMap(n => new Collection([n, n + 1, n + 2,]))
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(3);

        expect(called[3]).toEqual(2);
        expect(called[4]).toEqual(3);
        expect(called[5]).toEqual(4);

        expect(called[6]).toEqual(3);
        expect(called[7]).toEqual(4);
        expect(called[8]).toEqual(5);
      });
    });
  });

  describe('flat(...)', () => {
    describe('should work on', () => {
      it('self', () => {
        const pipeline = new Collection([
          new Collection([1, 2, 3,]),
          new Collection([2, 3, 4,]),
          new Collection([3, 4, 5,]),
        ]);
        const called: number[] = [];
        pipeline
          .flat()
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(3);

        expect(called[3]).toEqual(2);
        expect(called[4]).toEqual(3);
        expect(called[5]).toEqual(4);

        expect(called[6]).toEqual(3);
        expect(called[7]).toEqual(4);
        expect(called[8]).toEqual(5);
      });
      it('array', () => {
        const pipeline = new Collection([
          [1, 2, 3,],
          [2, 3, 4,],
          [3, 4, 5,],
        ]);
        const called: number[] = [];
        pipeline
          .flat()
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(3);

        expect(called[3]).toEqual(2);
        expect(called[4]).toEqual(3);
        expect(called[5]).toEqual(4);

        expect(called[6]).toEqual(3);
        expect(called[7]).toEqual(4);
        expect(called[8]).toEqual(5);
      });
      it('set', () => {
        const pipeline = new Collection([
          new Set([1, 2, 3,]),
          new Set([2, 3, 4,]),
          new Set([3, 4, 5,]),
        ]);
        const called: number[] = [];
        pipeline
          .flat()
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(3);

        expect(called[3]).toEqual(2);
        expect(called[4]).toEqual(3);
        expect(called[5]).toEqual(4);

        expect(called[6]).toEqual(3);
        expect(called[7]).toEqual(4);
        expect(called[8]).toEqual(5);
      });
      it('map', () => {
        const pipeline = new Collection([
          new Map([[1, 3,], [2, 4,], [3, 5,],]),
          new Map([[2, 5,], [3, 6,], [4, 7,],]),
          new Map([[3, 9,], [4, 10,], [5, 11,],]),
        ]);
        const called: [number, number][] = [];
        pipeline
          .flat()
          .forEach(item => called.push(item));
        expect(called[0]).toEqual([1, 3,]);
        expect(called[1]).toEqual([2, 4,]);
        expect(called[2]).toEqual([3, 5,]);

        expect(called[3]).toEqual([2, 5,]);
        expect(called[4]).toEqual([3, 6,]);
        expect(called[5]).toEqual([4, 7,]);

        expect(called[6]).toEqual([3, 9,]);
        expect(called[7]).toEqual([4, 10,]);
        expect(called[8]).toEqual([5, 11,]);
      });
      it('generator', () => {
        const pipeline = new Collection(function * (): Iterable<Iterable<number>> {
          yield (function * iterable1(): Iterable<number> {
            yield 1; yield 2; yield 3;
          })();

          yield (function * iterable2(): Iterable<number> {
            yield 2; yield 3; yield 4;
          })();

          yield (function * iterable3(): Iterable<number> {
            yield 3; yield 4; yield 5;
          })();
        });
        const called: number[] = [];
        pipeline
          .flat()
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(3);

        expect(called[3]).toEqual(2);
        expect(called[4]).toEqual(3);
        expect(called[5]).toEqual(4);

        expect(called[6]).toEqual(3);
        expect(called[7]).toEqual(4);
        expect(called[8]).toEqual(5);
      });
    });
  });

  describe('flatSome(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Collection<Maybe<number>>([
          Maybe.some(1),
          Maybe.none,
          Maybe.some(3),
        ]);
        const called: number[] = [];
        pipeline
          .flatSome()
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
      it('set', () => {
        const pipeline = new Collection<Maybe<number>>(new Set([
          Maybe.some(1),
          Maybe.none,
          Maybe.some(3),
        ]));
        const called: number[] = [];
        pipeline
          .flatSome()
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
      it('map', () => {
        const map = new Map<number, Maybe<number>>([
          [1, Maybe.some(1),],
          [2, Maybe.none,],
          [3, Maybe.some(3),],
        ]);
        const pipeline = new Collection(() => map.values());
        const called: number[] = [];
        pipeline
          .flatSome()
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
      it('generator', () => {
        const pipeline = new Collection(function * (): Iterable<Maybe<number>> {
          yield Maybe.some(1); yield Maybe.none; yield Maybe.some(3);
        });
        const called: number[] = [];
        pipeline
          .flatSome()
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
    });
  });

  describe('filter(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Collection([1, 2, 3,]);
        const called: number[] = [];
        pipeline
          .filter((v) => v !== 2)
          .forEach(item => called.push(item));
        expect(called[1]).toEqual(3);
      });
      it('set', () => {
        const pipeline = new Collection(new Set([1, 2, 3,]));
        const called: number[] = [];
        pipeline
          .filter((v) => v !== 2)
          .forEach(item => called.push(item));
        expect(called[1]).toEqual(3);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = new Collection(map);
        const called: [number, number][] = [];
        pipeline
          .filter(([v,]) => v !== 2)
          .forEach(item => called.push(item));
        expect(called[1]).toEqual([3, 3,]);
      });
      it('generator', () => {
        const pipeline = new Collection(function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        });
        const called: number[] = [];
        pipeline
          .filter((v) => v !== 2)
          .forEach(item => called.push(item));
        expect(called[1]).toEqual(3);
      });
    });
  });

  describe('exclude(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Collection([1, 2, 3,]);
        const called: number[] = [];
        pipeline
          .exclude(1, 2)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(3);
      });
      it('set', () => {
        const pipeline = new Collection(new Set([1, 2, 3,]));
        const called: number[] = [];
        pipeline
          .exclude(1, 3)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(2);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = new Collection(() => map.values());
        const called: number[] = [];
        pipeline
          .exclude(3, 1)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(2);
      });
      it('generator', () => {
        const pipeline = new Collection(function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        });
        const called: number[] = [];
        pipeline
          .exclude(2)
          .forEach(item => called.push(item));
        expect(called[1]).toEqual(3);
      });
    });
  });

  describe('skip(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Collection([1, 2, 3,]);
        const called: number[] = [];
        pipeline
          .skip(2)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(3);
      });
      it('set', () => {
        const pipeline = new Collection(new Set([1, 2, 3,]));
        const called: number[] = [];
        pipeline
          .skip(2)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(3);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = new Collection(map);
        const called: [number, number][] = [];
        pipeline
          .skip(2)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual([3, 3,]);
      });
      it('generator', () => {
        const pipeline = new Collection(function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        });
        const called: number[] = [];
        pipeline
          .skip(2)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(3);
      });
    });
  });

  describe('notMatching(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Collection([
          'index.html',
          'style.css',
          'script.js',
        ]);
        const called: string[] = [];
        pipeline
          .notMatching(/\.css$/)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual('index.html');
        expect(called[1]).toEqual('script.js');
      });
      it('set', () => {
        const pipeline = new Collection(new Set([
          'index.html',
          'style.css',
          'script.js',
        ]));
        const called: string[] = [];
        pipeline
          .notMatching(/\.css$/)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual('index.html');
        expect(called[1]).toEqual('script.js');
      });
      it('map', () => {
        const map = new Map([
          [1, 'index.html',],
          [2, 'style.css',],
          [3, 'script.js',],
        ]);
        const pipeline = new Collection(() => map.values());
        const called: string[] = [];
        pipeline
          .notMatching(/\.css$/)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual('index.html');
        expect(called[1]).toEqual('script.js');
      });
      it('generator', () => {
        const pipeline = new Collection(function * () {
          yield 'index.html';
          yield 'style.css';
          yield 'script.js';
        });
        const called: string[] = [];
        pipeline
          .notMatching(/\.css$/)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual('index.html');
        expect(called[1]).toEqual('script.js');
      });
    });
  });

  describe('notUndefined(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Collection([1, undefined, 3,]);
        const called: number[] = [];
        pipeline
          .notUndefined()
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
      it('set', () => {
        const pipeline = new Collection(new Set([1, undefined, 3,]));
        const called: number[] = [];
        pipeline
          .notUndefined()
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
      it('map', () => {
        const map = new Map<number, number | undefined>([
          [1, 1,],
          [2, undefined,],
          [3, 3,],
        ]);
        const pipeline = new Collection(() => map.values());
        const called: number[] = [];
        pipeline
          .notUndefined()
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
      it('generator', () => {
        const pipeline = new Collection(function * (): Iterable<number | undefined> {
          yield 1; yield undefined; yield 3;
        });
        const called: number[] = [];
        pipeline
          .notUndefined()
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
    });
  });

  describe('notNull(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Collection([1, null, 3,]);
        const called: number[] = [];
        pipeline
          .notNull()
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
      it('set', () => {
        const pipeline = new Collection(new Set([1, null, 3,]));
        const called: number[] = [];
        pipeline
          .notNull()
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
      it('map', () => {
        const map = new Map<number, number | null>([
          [1, 1,],
          [2, null,],
          [3, 3,],
        ]);
        const pipeline = new Collection(() => map.values());
        const called: number[] = [];
        pipeline
          .notNull()
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
      it('generator', () => {
        const pipeline = new Collection(function * (): Iterable<number | null> {
          yield 1; yield null; yield 3;
        });
        const called: number[] = [];
        pipeline
          .notNull()
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
    });
  });

  describe('notNullable(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Collection([1, null, undefined, 3,]);
        const called: number[] = [];
        pipeline
          .notNullable()
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
      it('set', () => {
        const pipeline = new Collection(new Set([1, null, undefined, 3,]));
        const called: number[] = [];
        pipeline
          .notNullable()
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
      it('map', () => {
        const map = new Map<number, number | null | undefined>([
          [1, 1,],
          [2, null, ],
          [3, undefined, ],
          [4, 3,],
        ]);
        const pipeline = new Collection(() => map.values());
        const called: number[] = [];
        pipeline
          .notNullable()
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
      it('generator', () => {
        const pipeline = new Collection(function * (): Iterable<number | null | undefined> {
          yield 1; yield null; yield undefined; yield 3;
        });
        const called: number[] = [];
        pipeline
          .notNullable()
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
      });
    });
  });

  describe('pick(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Collection([1, 2, 3,]);
        const called: number[] = [];
        pipeline
          .pick(1, 3)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(undefined);
      });
      it('set', () => {
        const pipeline = new Collection(new Set([1, 2, 3,]));
        const called: number[] = [];
        pipeline
          .pick(1, 3)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(undefined);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = new Collection(() => map.values());
        const called: number[] = [];
        pipeline
          .pick(3, 1)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(undefined);
      });
      it('generator', () => {
        const pipeline = new Collection(function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        });
        const called: number[] = [];
        pipeline
          .pick(3, 1)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(undefined);
      });
    });
  });

  describe('matching(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Collection([
          'index.html',
          'style.css',
          'script.js',
        ]);
        const called: string[] = [];
        pipeline
          .matching(/\.(html|js)$/)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual('index.html');
        expect(called[1]).toEqual('script.js');
      });
      it('set', () => {
        const pipeline = new Collection(new Set([
          'index.html',
          'style.css',
          'script.js',
        ]));
        const called: string[] = [];
        pipeline
          .matching(/\.(html|js)$/)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual('index.html');
        expect(called[1]).toEqual('script.js');
      });
      it('map', () => {
        const map = new Map([
          [1, 'index.html',],
          [2, 'style.css',],
          [3, 'script.js',],
        ]);
        const pipeline = new Collection(() => map.values());
        const called: string[] = [];
        pipeline
          .matching(/\.(html|js)$/)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual('index.html');
        expect(called[1]).toEqual('script.js');
      });
      it('generator', () => {
        const pipeline = new Collection(function * () {
          yield 'index.html';
          yield 'style.css';
          yield 'script.js';
        });
        const called: string[] = [];
        pipeline
          .matching(/\.(html|js)$/)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual('index.html');
        expect(called[1]).toEqual('script.js');
      });
    });
  });

  describe('take(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Collection([1, 2, 3,]);
        const called: number[] = [];
        pipeline
          .take(2)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(undefined);
      });
      it('set', () => {
        const pipeline = new Collection(new Set([1, 2, 3,]));
        const called: number[] = [];
        pipeline
          .take(2)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(undefined);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = new Collection(map);
        const called: [number, number][] = [];
        pipeline
          .take(2)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual([1, 1,]);
        expect(called[1]).toEqual([2, 2,]);
        expect(called[2]).toEqual(undefined);
      });
      it('generator', () => {
        const pipeline = new Collection(function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        });
        const called: number[] = [];
        pipeline
          .take(2)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(undefined);
      });
    });
  });

  describe('push(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Collection([1, 2, 3,]);
        const called: number[] = [];
        pipeline
          .push(4, 5)
          .forEach(item => called.push(item));
        expect(called[3]).toEqual(4);
        expect(called[4]).toEqual(5);
      });
      it('set', () => {
        const pipeline = new Collection(new Set([1, 2, 3,]));
        const called: number[] = [];
        pipeline
          .push(4, 5)
          .forEach(item => called.push(item));
        expect(called[3]).toEqual(4);
        expect(called[4]).toEqual(5);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = new Collection(() => map.values());
        const called: number[] = [];
        pipeline
          .push(4, 5)
          .forEach(item => called.push(item));
        expect(called[3]).toEqual(4);
        expect(called[4]).toEqual(5);
      });
      it('generator', () => {
        const generator = function * (): Iterable<number> {
          yield 1;
          yield 2;
          yield 3;
        };
        const pipeline = new Collection(generator);
        const called: number[] = [];
        pipeline
          .push(4, 5)
          .forEach(item => called.push(item));
        expect(called[3]).toEqual(4);
        expect(called[4]).toEqual(5);
      });
    });
  });


  describe('concat(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Collection([1, 2, 3,]);
        const called: number[] = [];
        pipeline
          .concat([4, 5,])
          .forEach(item => called.push(item));
        expect(called[3]).toEqual(4);
        expect(called[4]).toEqual(5);
      });
      it('set', () => {
        const pipeline = new Collection(new Set([1, 2, 3,]));
        const called: number[] = [];
        pipeline
          .concat([4, 5,])
          .forEach(item => called.push(item));
        expect(called[3]).toEqual(4);
        expect(called[4]).toEqual(5);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = new Collection(() => map.values());
        const called: number[] = [];
        pipeline
          .concat([4, 5,])
          .forEach(item => called.push(item));
        expect(called[3]).toEqual(4);
        expect(called[4]).toEqual(5);
      });
      it('generator', () => {
        const generator = function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        };
        const pipeline = new Collection(generator);
        const called: number[] = [];
        pipeline
          .concat([4, 5,])
          .forEach(item => called.push(item));
        expect(called[3]).toEqual(4);
        expect(called[4]).toEqual(5);
      });
    });
  });

  describe('unshift(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Collection([1, 2, 3,]);
        const called: number[] = [];
        pipeline
          .unshift(4, 5)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(4);
        expect(called[1]).toEqual(5);
      });
      it('set', () => {
        const pipeline = new Collection(new Set([1, 2, 3,]));
        const called: number[] = [];
        pipeline
          .unshift(4, 5)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(4);
        expect(called[1]).toEqual(5);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = new Collection(() => map.values());
        const called: number[] = [];
        pipeline
          .unshift(4, 5)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(4);
        expect(called[1]).toEqual(5);
      });
      it('generator', () => {
        const generator = function * (): Iterable<number> {
          yield 1;
          yield 2;
          yield 3;
        };
        const pipeline = new Collection(generator);
        const called: number[] = [];
        pipeline
          .unshift(4, 5)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(4);
        expect(called[1]).toEqual(5);
      });
    });
  });

  describe('sort(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const arr = [1, 3, 2,];
        expect(new Collection(arr).sort(-1).toArray()).toEqual([3, 2, 1,]);
        expect(new Collection(arr).sort(1).toArray()).toEqual([1, 2, 3,]);
        expect(new Collection(arr).sort('desc').toArray()).toEqual([3, 2, 1,]);
        expect(new Collection(arr).sort('asc').toArray()).toEqual([1, 2, 3,]);
        expect(new Collection(arr).sort('DESC').toArray()).toEqual([3, 2, 1,]);
        expect(new Collection(arr).sort('ASC').toArray()).toEqual([1, 2, 3,]);
        expect(new Collection(arr).sort('-1').toArray()).toEqual([3, 2, 1,]);
        expect(new Collection(arr).sort('1').toArray()).toEqual([1, 2, 3,]);
      });
      it('set', () => {
        const set = new Set([1, 3, 2,]);
        expect(new Collection(set).sort(-1).toArray()).toEqual([3, 2, 1,]);
        expect(new Collection(set).sort(1).toArray()).toEqual([1, 2, 3,]);
        expect(new Collection(set).sort('desc').toArray()).toEqual([3, 2, 1,]);
        expect(new Collection(set).sort('asc').toArray()).toEqual([1, 2, 3,]);
        expect(new Collection(set).sort('DESC').toArray()).toEqual([3, 2, 1,]);
        expect(new Collection(set).sort('ASC').toArray()).toEqual([1, 2, 3,]);
        expect(new Collection(set).sort('-1').toArray()).toEqual([3, 2, 1,]);
        expect(new Collection(set).sort('1').toArray()).toEqual([1, 2, 3,]);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [3, 3,], [2, 2,],]);
        expect(new Collection(() => map.values()).sort(-1).toArray()).toEqual([3, 2, 1,]);
        expect(new Collection(() => map.values()).sort(1).toArray()).toEqual([1, 2, 3,]);
        expect(new Collection(() => map.values()).sort('desc').toArray()).toEqual([3, 2, 1,]);
        expect(new Collection(() => map.values()).sort('asc').toArray()).toEqual([1, 2, 3,]);
        expect(new Collection(() => map.values()).sort('DESC').toArray()).toEqual([3, 2, 1,]);
        expect(new Collection(() => map.values()).sort('ASC').toArray()).toEqual([1, 2, 3,]);
        expect(new Collection(() => map.values()).sort('-1').toArray()).toEqual([3, 2, 1,]);
        expect(new Collection(() => map.values()).sort('1').toArray()).toEqual([1, 2, 3,]);
      });
      it('generator', () => {
        const generator = function * (): Iterable<number> {
          yield 1;
          yield 3;
          yield 2;
        };
        expect(new Collection(generator).sort(-1).toArray()).toEqual([3, 2, 1,]);
        expect(new Collection(generator).sort(1).toArray()).toEqual([1, 2, 3,]);
        expect(new Collection(generator).sort('desc').toArray()).toEqual([3, 2, 1,]);
        expect(new Collection(generator).sort('asc').toArray()).toEqual([1, 2, 3,]);
        expect(new Collection(generator).sort('DESC').toArray()).toEqual([3, 2, 1,]);
        expect(new Collection(generator).sort('ASC').toArray()).toEqual([1, 2, 3,]);
        expect(new Collection(generator).sort('-1').toArray()).toEqual([3, 2, 1,]);
        expect(new Collection(generator).sort('1').toArray()).toEqual([1, 2, 3,]);
      });
    });
  });

  describe('reverse(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Collection([1, 2, 3,]);
        const called: number[] = [];
        pipeline
          .reverse()
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(3);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(1);
      });
      it('set', () => {
        const pipeline = new Collection(new Set([1, 2, 3,]));
        const called: number[] = [];
        pipeline
          .reverse()
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(3);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(1);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = new Collection(() => map.values());
        const called: number[] = [];
        pipeline
          .reverse()
          .forEach(item => called.push(item));
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
        const pipeline = new Collection(generator);
        const called: number[] = [];
        pipeline
          .reverse()
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(3);
        expect(called[1]).toEqual(2);
        expect(called[2]).toEqual(1);
      });
    });
  });

  describe('slice(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Collection([1, 2, 3, 4, 5,]);
        const called: number[] = [];
        pipeline
          .slice(1, 4)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(2);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(4);
        expect(called[3]).toEqual(undefined);
      });
      it('set', () => {
        const pipeline = new Collection(new Set([1, 2, 3, 4, 5,]));
        const called: number[] = [];
        pipeline
          .slice(1, 4)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(2);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(4);
        expect(called[3]).toEqual(undefined);
      });
      it('map', () => {
        const map = new Map<number, number>([
          [1, 1,],
          [2, 2,],
          [3, 3,],
          [4, 4,],
          [5, 5,],
        ]);
        const pipeline = new Collection(() => map.values());
        const called: number[] = [];
        pipeline
          .slice(1, 4)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(2);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(4);
        expect(called[3]).toEqual(undefined);
      });
      it('generator', () => {
        const generator = function * (): Iterable<number> {
          yield 1;
          yield 2;
          yield 3;
          yield 4;
          yield 5;
        };
        const pipeline = new Collection(generator);
        const called: number[] = [];
        pipeline
          .slice(1, 4)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(2);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(4);
        expect(called[3]).toEqual(undefined);
      });
    });
  });

  describe('zipShort(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Collection([1, 2, 3,]);
        const called: [number, number][] = [];
        pipeline
          .zipShort([4, 5, 6, 7,])
          .forEach(item => called.push(item));
        expect(called[0]).toEqual([1, 4,]);
        expect(called[1]).toEqual([2, 5,]);
        expect(called[2]).toEqual([3, 6,]);
        expect(called[3]).toEqual(undefined);
      });
      it('set', () => {
        const pipeline = new Collection(new Set([1, 2, 3,]));
        const called: [number, number][] = [];
        pipeline
          .zipShort([4, 5, 6, 7,])
          .forEach(item => called.push(item));
        expect(called[0]).toEqual([1, 4,]);
        expect(called[1]).toEqual([2, 5,]);
        expect(called[2]).toEqual([3, 6,]);
        expect(called[3]).toEqual(undefined);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = new Collection(() => map.values());
        const called: [number, number][] = [];
        pipeline
          .zipShort([4, 5, 6, 7,])
          .forEach(item => called.push(item));
        expect(called[0]).toEqual([1, 4,]);
        expect(called[1]).toEqual([2, 5,]);
        expect(called[2]).toEqual([3, 6,]);
        expect(called[3]).toEqual(undefined);
      });
      it('generator', () => {
        const generator = function * (): Iterable<number> {
          yield 1;
          yield 2;
          yield 3;
        };
        const pipeline = new Collection(generator);
        const called: [number, number][] = [];
        pipeline
          .zipShort([4, 5, 6, 7,])
          .forEach(item => called.push(item));
        expect(called[0]).toEqual([1, 4,]);
        expect(called[1]).toEqual([2, 5,]);
        expect(called[2]).toEqual([3, 6,]);
        expect(called[3]).toEqual(undefined);
      });
    });
  });

  describe('zipLong(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Collection([1, 2, 3,]);
        const called: [Maybe<number>, Maybe<number>][] = [];
        pipeline
          .zipLong([4, 5, 6, 7,])
          .forEach(item => called.push(item));
        expect(called[0]).toEqual([Maybe.some(1), Maybe.some(4),]);
        expect(called[1]).toEqual([Maybe.some(2), Maybe.some(5),]);
        expect(called[2]).toEqual([Maybe.some(3), Maybe.some(6),]);
        expect(called[3]).toEqual([Maybe.none, Maybe.some(7),]);
        expect(called[4]).toEqual(undefined);
      });
      it('set', () => {
        const pipeline = new Collection(new Set([1, 2, 3,]));
        const called: [Maybe<number>, Maybe<number>][] = [];
        pipeline
          .zipLong([4, 5, 6, 7,])
          .forEach(item => called.push(item));
        expect(called[0]).toEqual([Maybe.some(1), Maybe.some(4),]);
        expect(called[1]).toEqual([Maybe.some(2), Maybe.some(5),]);
        expect(called[2]).toEqual([Maybe.some(3), Maybe.some(6),]);
        expect(called[3]).toEqual([Maybe.none, Maybe.some(7),]);
        expect(called[4]).toEqual(undefined);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = new Collection(() => map.values());
        const called: [Maybe<number>, Maybe<number>][] = [];
        pipeline
          .zipLong([4, 5, 6, 7,])
          .forEach(item => called.push(item));
        expect(called[0]).toEqual([Maybe.some(1), Maybe.some(4),]);
        expect(called[1]).toEqual([Maybe.some(2), Maybe.some(5),]);
        expect(called[2]).toEqual([Maybe.some(3), Maybe.some(6),]);
        expect(called[3]).toEqual([Maybe.none, Maybe.some(7),]);
        expect(called[4]).toEqual(undefined);
      });
      it('generator', () => {
        const generator = function * (): Iterable<number> {
          yield 1;
          yield 2;
          yield 3;
        };
        const pipeline = new Collection(generator);
        const called: [Maybe<number>, Maybe<number>][] = [];
        pipeline
          .zipLong([4, 5, 6, 7,])
          .forEach(item => called.push(item));
        expect(called[0]).toEqual([Maybe.some(1), Maybe.some(4),]);
        expect(called[1]).toEqual([Maybe.some(2), Maybe.some(5),]);
        expect(called[2]).toEqual([Maybe.some(3), Maybe.some(6),]);
        expect(called[3]).toEqual([Maybe.none, Maybe.some(7),]);
        expect(called[4]).toEqual(undefined);
      });
    });
  });

  describe('reduce(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Collection([1, 2, 3,]);
        const result = pipeline.reduce((n, a) => String(a) + String(n), '');
        expect(result).toEqual('123');
      });
      it('set', () => {
        const pipeline = new Collection(new Set([1, 2, 3,]));
        const result = pipeline.reduce((n, a) => String(a) + String(n), '');
        expect(result).toEqual('123');
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = new Collection(map);
        const result = pipeline.reduce(([na, nb,], a) => String(a) + String(na + nb), '');
        expect(result).toEqual('246');
      });
      it('generator', () => {
        const pipeline = new Collection(function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        });
        const result = pipeline.reduce((n, a) => String(a) + String(n), '');
        expect(result).toEqual('123');
      });
    });
  });

  describe('reduceRight(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Collection([1, 2, 3,]);
        const result = pipeline.reduceRight((n, a) => String(a) + String(n), '');
        expect(result).toEqual('321');
      });
      it('set', () => {
        const pipeline = new Collection(new Set([1, 2, 3,]));
        const result = pipeline.reduceRight((n, a) => String(a) + String(n), '');
        expect(result).toEqual('321');
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = new Collection(map);
        const result = pipeline.reduceRight(([na, nb,], a) => String(a) + String(na + nb), '');
        expect(result).toEqual('642');
      });
      it('generator', () => {
        const pipeline = new Collection(function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        });
        const result = pipeline.reduceRight((n, a) => String(a) + String(n), '');
        expect(result).toEqual('321');
      });
    });
  });

  describe('join(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Collection([1, 2, 3,]);
        const result = pipeline.join('-');
        expect(result).toEqual('1-2-3');
      });
      it('set', () => {
        const pipeline = new Collection(new Set([1, 2, 3,]));
        const result = pipeline.join('-');
        expect(result).toEqual('1-2-3');
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = new Collection(() => map.values());
        const result = pipeline.join('-');
        expect(result).toEqual('1-2-3');
      });
      it('generator', () => {
        const pipeline = new Collection(function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        });
        const result = pipeline.join('-');
        expect(result).toEqual('1-2-3');
      });
    });
  });

  describe('every(...)', () => {
    describe('should work on', () => {
      it('array (+)', () => {
        const pipeline = new Collection([true, 1, ' ',]);
        const result = pipeline.every(Boolean);
        expect(result).toBe(true);
      });
      it('array (-)', () => {
        const pipeline = new Collection([true, 0, ' ',]);
        const result = pipeline.every(Boolean);
        expect(result).toBe(false);
      });
      it('set (+)', () => {
        const pipeline = new Collection(new Set([true, 1, ' ',]));
        const result = pipeline.every(Boolean);
        expect(result).toBe(true);
      });
      it('set (-)', () => {
        const pipeline = new Collection(new Set([true, 0, ' ',]));
        const result = pipeline.every(Boolean);
        expect(result).toBe(false);
      });
      it('map (+)', () => {
        const entries: [number, boolean | string | number][] = [
          [1, true,],
          [2, 1,],
          [3, ' ',],
        ];
        const map: Map<number, boolean | string | number> = new Map(entries);
        const pipeline = new Collection(() => map.values());
        const result = pipeline.every(Boolean);
        expect(result).toBe(true);
      });
      it('map (-)', () => {
        const entries: [number, boolean | string | number][] = [
          [1, true,],
          [2, 0,],
          [3, ' ',],
        ];
        const map: Map<number, boolean | string | number> = new Map(entries);
        const pipeline = new Collection(() => map.values());
        const result = pipeline.every(Boolean);
        expect(result).toBe(false);
      });
      it('generator (+)', () => {
        const pipeline = new Collection(function * (): Iterable<number | string | boolean> {
          yield true; yield 1; yield ' ';
        });
        const result = pipeline.every(Boolean);
        expect(result).toBe(true);
      });
      it('generator (-)', () => {
        const pipeline = new Collection(function * (): Iterable<number | string | boolean> {
          yield true; yield 1; yield '';
        });
        const result = pipeline.every(Boolean);
        expect(result).toBe(false);
      });
    });
  });

  describe('some(...)', () => {
    describe('should work on', () => {
      it('array (+)', () => {
        const pipeline = new Collection([false, 0, ' ',]);
        const result = pipeline.some(Boolean);
        expect(result).toBe(true);
      });
      it('array (-)', () => {
        const pipeline = new Collection([false, 0, '',]);
        const result = pipeline.some(Boolean);
        expect(result).toBe(false);
      });
      it('set (+)', () => {
        const pipeline = new Collection(new Set([false, 0, ' ',]));
        const result = pipeline.some(Boolean);
        expect(result).toBe(true);
      });
      it('set (-)', () => {
        const pipeline = new Collection(new Set([false, 0, '',]));
        const result = pipeline.some(Boolean);
        expect(result).toBe(false);
      });
      it('map (+)', () => {
        const entries: [number, boolean | string | number][] = [
          [1, false,],
          [2, 0,],
          [3, ' ',],
        ];
        const map: Map<number, boolean | string | number> = new Map(entries);
        const pipeline = new Collection(() => map.values());
        const result = pipeline.some(Boolean);
        expect(result).toBe(true);
      });
      it('map (-)', () => {
        const entries: [number, boolean | string | number][] = [
          [1, false,],
          [2, 0,],
          [3, '',],
        ];
        const map: Map<number, boolean | string | number> = new Map(entries);
        const pipeline = new Collection(() => map.values());
        const result = pipeline.some(Boolean);
        expect(result).toBe(false);
      });
      it('generator (+)', () => {
        const pipeline = new Collection(function * (): Iterable<number | string | boolean> {
          yield false; yield 0; yield ' ';
        });
        const result = pipeline.some(Boolean);
        expect(result).toBe(true);
      });
      it('generator (-)', () => {
        const pipeline = new Collection(function * (): Iterable<number | string | boolean> {
          yield false; yield 0; yield '';
        });
        const result = pipeline.some(Boolean);
        expect(result).toBe(false);
      });
    });
  });

  describe('unique(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Collection([1, 1, 3,]);
        const called: number[] = [];
        pipeline
          .unique()
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(undefined);
      });
      it('set', () => {
        const pipeline = new Collection(new Set([1, 1, 3,]));
        const called: number[] = [];
        pipeline
          .unique()
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(undefined);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 1,], [3, 3,],]);
        const pipeline = new Collection(() => map.values());
        const called: number[] = [];
        pipeline
          .unique()
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(undefined);
      });
      it('generator', () => {
        const generator = function * (): Iterable<number> {
          yield 1; yield 1; yield 3;
        };
        const pipeline = new Collection(generator);
        const called: number[] = [];
        pipeline
          .unique()
          .forEach(item => called.push(item));
        expect(called[0]).toEqual(1);
        expect(called[1]).toEqual(3);
        expect(called[2]).toEqual(undefined);
      });
    });
  });

  describe('toArray(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Collection([1, 2, 3,]);
        expect(pipeline.toArray()).toEqual([1, 2, 3,]);
      });
      it('set', () => {
        const pipeline = new Collection(new Set([1, 2, 3,]));
        expect(pipeline.toArray()).toEqual([1, 2, 3,]);
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = new Collection(map);
        expect(pipeline.toArray()).toEqual([[1, 1,], [2, 2,], [3, 3,],]);
      });
      it('generator', () => {
        const generator = function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        };
        const pipeline = new Collection(generator);
        expect(pipeline.toArray()).toEqual([1, 2, 3,]);
      });
    });
  });

  describe('toSet(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = new Collection([1, 2, 3,]);
        expect(pipeline.toSet()).toEqual(new Set([1, 2, 3,]));
      });
      it('set', () => {
        const pipeline = new Collection(new Set([1, 2, 3,]));
        expect(pipeline.toSet()).toEqual(new Set([1, 2, 3,]));
      });
      it('map', () => {
        const map = new Map<number, number>([[1, 1,], [2, 2,], [3, 3,],]);
        const pipeline = new Collection(map);
        expect(pipeline.toSet()).toEqual(new Set([[1, 1,], [2, 2,], [3, 3,],]));
      });
      it('generator', () => {
        const generator = function * (): Iterable<number> {
          yield 1; yield 2; yield 3;
        };
        const pipeline = new Collection(generator);
        expect(pipeline.toSet()).toEqual(new Set([1, 2, 3,]));
      });
    });
  });
});
