import { collect, Collection, lazyCollect, LazyCollection } from '../src';
import { performance } from 'perf_hooks';

interface SpecOptions { name: string, fn: () => void; }
class Spec {
  public readonly name: string;
  public readonly fn: (() => unknown);
  constructor(options: SpecOptions) {
    const { name, fn, } = options;
    this.name = name;
    this.fn = fn;
  }
}

interface BenchmarkOptions { name: string, specs: (ops: number) => SpecOptions[]; }
class Benchmark {
  public readonly name: string;
  public readonly specs: ((ops: number) => Spec[]);

  constructor(options: BenchmarkOptions ) {
    const { name, specs, } = options;
    this.name = name;
    this.specs = (ops: number) => specs(ops).map(specOpts => new Spec(specOpts));
  }
}

interface CreateSpecs {
  (args: {
    array: Array<number>,
    collection: Collection<number>,
    lazy: LazyCollection<number>
  }): SpecOptions[]
}
function createSpecs(specsFactory: CreateSpecs): BenchmarkOptions['specs'] {
  return function(ops: number): SpecOptions[] {
    const array = Array.from({ length: ops, }, (_, i) => i + 1);
    const collection = collect(array);
    const lazy = lazyCollect(array);
    const specs = specsFactory({ array, collection, lazy, });
    return specs;
  };
}


const fmt = Intl.NumberFormat();
function run(maxops: number, benchmarks: Benchmark[]) {
  // run benchmarks
  interface IBenchmarkStats { name: string; groups: Map<string, IGroupStats>; }
  interface IGroupStats { name: string; opssec: number; runs: number, }
  const stats = new Map<string, IBenchmarkStats>();
  for (const benchmark of benchmarks) {
    let benchStat: IBenchmarkStats;
    if (stats.has(benchmark.name)) {
      benchStat = stats.get(benchmark.name)!;
    } else {
      benchStat = { name: benchmark.name, groups: new Map(), };
      stats.set(benchmark.name, benchStat);
    }

    for (let ops = 1; ops < maxops; ops += 1){
      for (const spec of benchmark.specs(ops)) {
        const start = performance.now();
        spec.fn();
        const end = performance.now();
        const delta = end - start;
        let groupStat: IGroupStats;
        if (benchStat.groups.has(spec.name)) {
          groupStat = benchStat.groups.get(spec.name)!;
          groupStat.opssec = ((ops / delta) + (groupStat.opssec * groupStat.runs)) / (groupStat.runs + 1);
          groupStat.runs += 1;
        } else {
          groupStat = { name: spec.name, opssec: ops / delta, runs: 1, };
          benchStat.groups.set(spec.name, groupStat);
        }
      }
    }
  }

  // compile stats
  interface ICompiledGroupStats { name: string, rank: number, opsec: number, opsecStr: string }
  interface ICompiledBenchStats { name: string, groups: ICompiledGroupStats[] }
  const compiledBenches = [];
  for (const benchStat of stats.values()) {
    const compiledBench: ICompiledBenchStats = { name: benchStat.name, groups: [], };
    for (const groupStat of benchStat.groups.values()) {
      compiledBench.groups.push({
        name: groupStat.name,
        rank: 0,
        opsec: groupStat.opssec,
        opsecStr: fmt.format(Math.round(groupStat.opssec)),
      });
    }

    // sort and rank
    compiledBench.groups = compiledBench
      .groups
      .sort((a, b) => b.opsec - a.opsec)
      .map((g, i) => ({ ...g, rank: i + 1,}));

    compiledBenches.push(compiledBench);
  }

  console.table(compiledBenches
    .flatMap(bench => bench
      .groups
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(({ opsec, ...g }) => ({ benchmark: bench.name, ...g, }))));
}

const benchForEach = new Benchmark({
  name: 'forEach',
  specs: createSpecs(({ array, collection, lazy, }) => [
    { name: 'Lazy', fn: () => lazy.forEach(n => n + 1), },
    { name: 'Array', fn: () => array.forEach(n => n + 1), },
    { name: 'Collection', fn: () => collection.forEach(n => n + 1), },
  ]),
});

const benchMap = new Benchmark({
  name: 'map',
  specs: createSpecs(({ array, collection, lazy, }) => [
    { name: 'Lazy', fn: () => lazy.map(n => n + 1).toArray(), },
    { name: 'Array', fn: () => array.map(n => n + 1), },
    { name: 'Collection', fn: () => collection.map(n => n + 1), },
  ]),
});

const benchFlatMap = new Benchmark({
  name: 'flatMap',
  specs: createSpecs(({ array, collection, lazy, }) => [
    { name: 'Lazy', fn: () => lazy.flatMap(n => [n + 1,]).toArray(), },
    { name: 'Array', fn: () => array.flatMap(n => [n + 1,]), },
    { name: 'Collection', fn: () => collection.flatMap(n => [n + 1,]), },
  ]),
});

const benchFilter = new Benchmark({
  name: 'filter',
  specs: createSpecs(({ array, collection, lazy, }) => [
    { name: 'Lazy', fn: () => lazy.filter(n => n > 1).toArray(), },
    { name: 'Array', fn: () => array.filter(n => n > 1), },
    { name: 'Collection', fn: () => collection.filter(n => n > 1), },
  ]),
});

const benchReduce = new Benchmark({
  name: 'reduce',
  specs: createSpecs(({ array, collection, lazy, }) => [
    { name: 'Lazy', fn: () => lazy.reduce((n, a) => n + a, 0), },
    { name: 'Array', fn: () => array.reduce((n, a) => n + a, 0), },
    { name: 'Collection', fn: () => collection.reduce((n, a) => n + a, 0), },
  ]),
});

const benchReduceRight = new Benchmark({
  name: 'reduceRight',
  specs: createSpecs(({ array, collection, lazy, }) => [
    { name: 'Lazy', fn: () => lazy.reduceRight((n, a) => n + a, 0), },
    { name: 'Array', fn: () => array.reduceRight((n, a) => n + a, 0), },
    { name: 'Collection', fn: () => collection.reduceRight((n, a) => n + a, 0), },
  ]),
});

const benchFind = new Benchmark({
  name: 'find',
  specs: createSpecs(({ array, collection, lazy, }) => {
    const mid = Math.floor((array.length / 2));
    const target = array[mid]!;
    return [
      { name: 'Lazy', fn: () => lazy.find((value) => value === target), },
      { name: 'Array', fn: () => array.find((value) => value === target), },
      { name: 'Collection', fn: () => collection.find((value) => value === target), },
    ];
  }),
});

const benchFindIndex = new Benchmark({
  name: 'findIndex',
  specs: createSpecs(({ array, collection, lazy, }) => {
    const mid = Math.floor((array.length / 2));
    const target = array[mid]!;
    return [
      { name: 'Lazy', fn: () => lazy.findIndex((value) => value === target), },
      { name: 'Array', fn: () => array.findIndex((value) => value === target), },
      { name: 'Collection', fn: () => collection.findIndex((value) => value === target), },
    ];
  }),
});

const benchIndexOf = new Benchmark({
  name: 'indexOf',
  specs: createSpecs(({ array, collection, lazy, }) => {
    const mid = Math.floor((array.length / 2));
    const target = array[mid]!;
    return [
      { name: 'Lazy', fn: () => lazy.indexOf(target), },
      { name: 'Array', fn: () => array.indexOf(target), },
      { name: 'Collection', fn: () => collection.indexOf(target), },
    ];
  }),
});

new Benchmark({
  name: 'map',
  specs: createSpecs(({ array, collection, lazy, }) => [
    { name: 'Lazy', fn: () => lazy.map(n => n + 1).toArray(), },
    { name: 'Array', fn: () => array.map(n => n + 1), },
    { name: 'Collection', fn: () => collection.map(n => n + 1), },
  ]),
});


console.log('---------- optimising run');

// first run - let everything optimise
// otherwise numbers are wildly inconsistent
run(20_000, [
  benchForEach,
  benchFlatMap,
  benchMap,
  benchFilter,
  benchFind,
  benchReduce,
  benchReduceRight,
  benchFindIndex,
  benchIndexOf,
]);

console.log('---------- benchmark run');

// subsequent runs - everything is optimised by now
run(20_000, [
  benchForEach,
  benchFlatMap,
  benchMap,
  benchFilter,
  benchFind,
  benchReduce,
  benchReduceRight,
  benchFindIndex,
  benchIndexOf,
]);

