import { collect, lazyCollect } from '../src';

function * generator(ops: number): Iterable<number> {
  for (let i = 0; i < ops; i += 1) {
    const radians = i * Math.PI / 100;
    yield Math.floor((100 * Math.sin(radians)));
  }
}

interface IBenchmark {
  name: string;
  ops: number;
  run(): unknown;
}

class BenchmarkCollectionMap implements IBenchmark {
  name = 'Collection:map';
  constructor(public readonly ops: number) {}
  run(): Iterable<number> {
    return collect(generator(this.ops))
      .map(n => n + 1);
  }
}

class BenchmarkLazyCollectionMap implements IBenchmark {
  name = 'LazyCollection:map';
  constructor(public readonly ops: number) {}
  run(): Iterable<number> {
    return lazyCollect(generator(this.ops))
      .map(n => n + 1)
      .toArray();
  }
}

class BenchmarkArrayMap implements IBenchmark {
  name = 'Array:map';
  constructor(public readonly ops: number) {}
  run(): Iterable<number> {
    return [...generator(this.ops),]
      .map(n => n + 1);
  }
}

class BenchmarkCollectionFlatMap implements IBenchmark {
  name = 'Collection:flatMap';
  constructor(public readonly ops: number) {}
  run(): Iterable<number> {
    return collect(generator(this.ops))
      .flatMap(n => [n + 1,])
      .toArray();
  }
}

class BenchmarkLazyCollectionFlatMap implements IBenchmark {
  name = 'LazyCollection:flatMap';
  constructor(public readonly ops: number) {}
  run(): Iterable<number> {
    return lazyCollect(generator(this.ops))
      .flatMap(n => [n + 1,])
      .toArray();
  }
}

class BenchmarkArrayFlatMap implements IBenchmark {
  name = 'Array:flatMap';
  constructor(public readonly ops: number) {}
  run(): Iterable<number> {
    return [...generator(this.ops),]
      .flatMap(n => [n + 1,]);
  }
}

class BenchmarkCollectionFilter implements IBenchmark {
  name = 'Collection:filter';
  constructor(public readonly ops: number) {}
  run(): Iterable<number> {
    return collect(generator(this.ops))
      .filter(n => n > 0)
      .toArray();
  }
}

class BenchmarkLazyCollectionFilter implements IBenchmark {
  name = 'LazyCollection:filter';
  constructor(public readonly ops: number) {}
  run(): Iterable<number> {
    return lazyCollect(generator(this.ops))
      .filter(n => n > 0)
      .toArray();
  }
}

class BenchmarkArrayFilter implements IBenchmark {
  name = 'Array:filter';
  constructor(public readonly ops: number) {}
  run(): Iterable<number> {
    return [...generator(this.ops),]
      .filter(n => n > 0);
  }
}


function run(...benchmarks: IBenchmark[]) {
  const results: {
    name: string,
    duration: number,
    opssec: number,
  }[] = [];

  for (const bench of benchmarks) {
    const start = performance.now();
    bench.run();
    const end = performance.now();
    const duration = Math.round(end - start);
    const opssec = Math.round(bench.ops / duration);
    results.push({
      name: bench.name,
      duration,
      opssec,
    });
  }

  // take averages
  interface Average { name: string; opssecs: number[]; }
  const averages = new Map<string, Average>();
  for (const result of results) {
    let average = averages.get(result.name);
    if (!average) {
      average = { name: result.name, opssecs: [], };
      averages.set(result.name, average);
    }
    average.opssecs.push(result.opssec);
  }

  // log averages
  console.table(Array
    .from(averages.values())
    .map((v) => ({
      name: v.name,
      rank: 0,
      oppsec: Math.round(v.opssecs.reduce((n, a) => n + a, 0) / v.opssecs.length),
      runs: v.opssecs.length,
    }))
    .sort((a, b) => b.oppsec - a.oppsec)
    .map((v, i) => ({ ...v, rank: i, })));
}

function mod(number: number, modulo: number) {
  const result = ((number % modulo ) + modulo ) % modulo;
  return result;
}

function cycle<U>(arr: U[], by: number): U[] {
  const _arr: U[] = [];
  for (let i = 0; i < arr.length; i += 1) {
    _arr.push(arr[mod(i - by, arr.length)]!);
  }
  return _arr;
}

function combine<T>(...args: (() => T)[]): T[] {
  const _combinations: T[] = [];

  for (let i = 0; i < args.length; i += 1) {
    _combinations.push(...cycle(args.map(arg => arg()), i));
  }

  return [..._combinations, ..._combinations.reverse(),];
}

run(...combine(
  () => new BenchmarkArrayMap(250_000),
  () => new BenchmarkCollectionMap(250_000),
  () => new BenchmarkLazyCollectionMap(250_000),

  () => new BenchmarkLazyCollectionMap(250_000),
  () => new BenchmarkCollectionMap(250_000),
  () => new BenchmarkArrayMap(250_000),
));

//   new BenchmarkArrayMap(100_000),
//   new BenchmarkCollectionMap(100_000),
//   new BenchmarkLazyCollectionMap(100_000),
//   new BenchmarkLazyCollectionMap(100_000),
//   new BenchmarkCollectionMap(100_000),
//   new BenchmarkArrayMap(100_000),

//   new BenchmarkArrayMap(100_000),
//   new BenchmarkCollectionMap(100_000),
//   new BenchmarkLazyCollectionMap(100_000),
//   new BenchmarkLazyCollectionMap(100_000),
//   new BenchmarkCollectionMap(100_000),
//   new BenchmarkArrayMap(100_000),

//   new BenchmarkCollectionMap(100_000),
//   new BenchmarkLazyCollectionMap(100_000),
//   new BenchmarkArrayMap(100_000),
//   new BenchmarkCollectionMap(100_000),
//   new BenchmarkLazyCollectionMap(100_000),
//   new BenchmarkArrayMap(100_000),

//   new BenchmarkArrayMap(100_000),
//   new BenchmarkCollectionMap(100_000),
//   new BenchmarkLazyCollectionMap(100_000),
//   new BenchmarkArrayMap(100_000),
//   new BenchmarkCollectionMap(100_000),
//   new BenchmarkLazyCollectionMap(100_000),
// );

// run(
//   new BenchmarkArrayFlatMap(100_000),
//   new BenchmarkCollectionFlatMap(100_000),
//   new BenchmarkLazyCollectionFlatMap(100_000),

//   new BenchmarkArrayFlatMap(100_000),
//   new BenchmarkCollectionFlatMap(100_000),
//   new BenchmarkLazyCollectionFlatMap(100_000),
//   new BenchmarkLazyCollectionFlatMap(100_000),
//   new BenchmarkCollectionFlatMap(100_000),
//   new BenchmarkArrayFlatMap(100_000),

//   new BenchmarkArrayFlatMap(100_000),
//   new BenchmarkCollectionFlatMap(100_000),
//   new BenchmarkLazyCollectionFlatMap(100_000),
//   new BenchmarkLazyCollectionFlatMap(100_000),
//   new BenchmarkCollectionFlatMap(100_000),
//   new BenchmarkArrayFlatMap(100_000),

//   new BenchmarkCollectionFlatMap(100_000),
//   new BenchmarkLazyCollectionFlatMap(100_000),
//   new BenchmarkArrayFlatMap(100_000),
//   new BenchmarkCollectionFlatMap(100_000),
//   new BenchmarkLazyCollectionFlatMap(100_000),
//   new BenchmarkArrayFlatMap(100_000),

//   new BenchmarkArrayFlatMap(100_000),
//   new BenchmarkCollectionFlatMap(100_000),
//   new BenchmarkLazyCollectionFlatMap(100_000),
//   new BenchmarkArrayFlatMap(100_000),
//   new BenchmarkCollectionFlatMap(100_000),
//   new BenchmarkLazyCollectionFlatMap(100_000),
// );


