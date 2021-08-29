# @nkp/iterable

[![npm version](https://badge.fury.io/js/%40nkp%2Fiterable.svg)](https://www.npmjs.com/package/@nkp/iterable)
[![Node.js Package](https://github.com/NickKelly1/nkp-iterable/actions/workflows/release.yml/badge.svg)](https://github.com/NickKelly1/nkp-iterable/actions/workflows/release.yml)
![Known Vulnerabilities](https://snyk.io/test/github/NickKelly1/nkp-iterable/badge.svg)

Collection utility classes for synchronous and lazy iteration over iterables like arrays, sets, maps and generators.

@nkp/iterable exposes two main utility classes, `Collection` and `LazyCollection`.

## Table of contents

- [Installation](#installation)
  - [npm](#npm)
  - [yarn](#yarn)
  - [exports](#exports)
- [Benchmarks](#benchmarks)
- [Array Holes](#array-hols)
- [Collection Types](#collection-types)
  - [Collection](#collection)
  - [LazyCollection](#lazy)
- [Usage](#usage)
  - [Methods](#methods)
    - [at](#at)
    - [btw](#btw)
    - [concat](#concat)
    - [every](#every)
    - [exclude](#exclude)
    - [filter](#filter)
    - [find](#find)
    - [findIndex](#find-index)
    - [first](#first)
    - [flat](#flat)
    - [flatMap](#flat-map)
    - [flatSome](#flat-some)
    - [forEach](#forEach)
    - [forkFlat](#fork-flat)
    - [forkMap](#fork-map)
    - [getSize](#get-size)
    - [forkOn](#fork-on)
    - [getSize](#get-size)
    - [gt](#gt)
    - [gte](#gte)
    - [indexOf](#index-of)
    - [join](#join)
    - [lt](#lt)
    - [lte](#lte)
    - [map](#map)
    - [matching](#matching)
    - [notMatching](#not-matching)
    - [notNull](#not-null)
    - [notNullable](#not-nullable)
    - [notUndefined](#not-undefined)
    - [pick](#pick)
    - [precat](#precat)
    - [push](#push)
    - [reduce](#reduce)
    - [reduceRight](#reduce-right)
    - [reverse](#reverse)
    - [skip](#skip)
    - [slice](#slice)
    - [some](#some)
    - [sort](#sort)
    - [take](#take)
    - [tap](#tap)
    - [tapSelf](#tap-self)
    - [toArray](#to-array)
    - [toMap](#to-map)
    - [toSet](#to-set)
    - [unique](#unique)
    - [unshift](#unshift)
    - [zipLong](#zip-long)
    - [zipShort](#zip-short)

- [Publishing a new version](#publishing-a-new-version)

## Installation

### NPM

```sh
npm install @nkp/iterable
```

### Yarn

```sh
yarn add @nkp/iterable
```

### Exports

`@nkp/iterable` targets CommonJS and ES modules. To utilise ES modules consider using a bundler like `webpack` or `rollup`.

## Benchmarks

---------- optimising run
┌─────────┬───────────────┬──────────────┬──────┬─────────────┐
│ (index) │   benchmark   │     name     │ rank │  opsecStr   │
├─────────┼───────────────┼──────────────┼──────┼─────────────┤
│    0    │   'forEach'   │ 'Collection' │  1   │ '1,088,146' │
│    1    │   'forEach'   │   'Array'    │  2   │ '1,084,480' │
│    2    │   'forEach'   │    'Lazy'    │  3   │  '651,001'  │
│    3    │   'flatMap'   │ 'Collection' │  1   │  '33,634'   │
│    4    │   'flatMap'   │    'Lazy'    │  2   │   '6,650'   │
│    5    │   'flatMap'   │   'Array'    │  3   │   '4,563'   │
│    6    │     'map'     │   'Array'    │  1   │  '147,261'  │
│    7    │     'map'     │ 'Collection' │  2   │  '146,167'  │
│    8    │     'map'     │    'Lazy'    │  3   │  '10,835'   │
│    9    │   'filter'    │ 'Collection' │  1   │  '144,131'  │
│   10    │   'filter'    │   'Array'    │  2   │  '88,189'   │
│   11    │   'filter'    │    'Lazy'    │  3   │  '10,725'   │
│   12    │    'find'     │   'Array'    │  1   │  '936,494'  │
│   13    │    'find'     │ 'Collection' │  2   │  '889,193'  │
│   14    │    'find'     │    'Lazy'    │  3   │  '405,979'  │
│   15    │   'reduce'    │   'Array'    │  1   │  '734,285'  │
│   16    │   'reduce'    │ 'Collection' │  2   │  '661,910'  │
│   17    │   'reduce'    │    'Lazy'    │  3   │  '25,304'   │
│   18    │ 'reduceRight' │   'Array'    │  1   │  '669,591'  │
│   19    │ 'reduceRight' │ 'Collection' │  2   │  '533,460'  │
│   20    │ 'reduceRight' │    'Lazy'    │  3   │   '7,451'   │
│   21    │  'findIndex'  │   'Array'    │  1   │  '969,338'  │
│   22    │  'findIndex'  │ 'Collection' │  2   │  '898,335'  │
│   23    │  'findIndex'  │    'Lazy'    │  3   │  '420,154'  │
│   24    │   'indexOf'   │   'Array'    │  1   │ '1,538,413' │
│   25    │   'indexOf'   │    'Lazy'    │  2   │ '1,483,643' │
│   26    │   'indexOf'   │ 'Collection' │  3   │ '1,452,005' │
└─────────┴───────────────┴──────────────┴──────┴─────────────┘

---------- benchmark run
┌─────────┬───────────────┬──────────────┬──────┬─────────────┐
│ (index) │   benchmark   │     name     │ rank │  opsecStr   │
├─────────┼───────────────┼──────────────┼──────┼─────────────┤
│    0    │   'forEach'   │ 'Collection' │  1   │ '1,134,659' │
│    1    │   'forEach'   │   'Array'    │  2   │ '1,133,094' │
│    2    │   'forEach'   │    'Lazy'    │  3   │  '340,639'  │
│    3    │   'flatMap'   │ 'Collection' │  1   │  '33,583'   │
│    4    │   'flatMap'   │    'Lazy'    │  2   │   '6,562'   │
│    5    │   'flatMap'   │   'Array'    │  3   │   '4,541'   │
│    6    │     'map'     │ 'Collection' │  1   │  '145,656'  │
│    7    │     'map'     │   'Array'    │  2   │  '137,510'  │
│    8    │     'map'     │    'Lazy'    │  3   │  '10,659'   │
│    9    │   'filter'    │ 'Collection' │  1   │  '143,612'  │
│   10    │   'filter'    │   'Array'    │  2   │  '79,243'   │
│   11    │   'filter'    │    'Lazy'    │  3   │  '10,606'   │
│   12    │    'find'     │   'Array'    │  1   │  '971,365'  │
│   13    │    'find'     │ 'Collection' │  2   │  '925,742'  │
│   14    │    'find'     │    'Lazy'    │  3   │  '447,489'  │
│   15    │   'reduce'    │ 'Collection' │  1   │  '780,162'  │
│   16    │   'reduce'    │   'Array'    │  2   │  '728,186'  │
│   17    │   'reduce'    │    'Lazy'    │  3   │  '24,942'   │
│   18    │ 'reduceRight' │ 'Collection' │  1   │  '533,160'  │
│   19    │ 'reduceRight' │   'Array'    │  2   │  '478,091'  │
│   20    │ 'reduceRight' │    'Lazy'    │  3   │   '7,497'   │
│   21    │  'findIndex'  │   'Array'    │  1   │  '970,189'  │
│   22    │  'findIndex'  │ 'Collection' │  2   │  '901,645'  │
│   23    │  'findIndex'  │    'Lazy'    │  3   │  '446,089'  │
│   24    │   'indexOf'   │   'Array'    │  1   │ '1,543,753' │
│   25    │   'indexOf'   │    'Lazy'    │  2   │ '1,506,553' │
│   26    │   'indexOf'   │ 'Collection' │  3   │ '1,461,690' │
└─────────┴───────────────┴──────────────┴──────┴─────────────┘

## Array Holes

`@nkp/iterable` assumes that the iterables fed to them do **not** have holes.

For consistent behaivour you should not use `@nkp/iterable` with holey arrays.

Because `@nkp/iterable` assumes hole-less arrays, the `Collection` class is faster than the native `Array` class for a large variety of common operations like `filter` and `map`.

## Collection types

**type** | `Collection` | `LazyCollection` |
--- | --- | --- |
**similar to** | array | generator |
**speed** | fast | slow |
**memory** | heavy | light |

### Collection

- **speed**: fast
- **memory**: heavy

`Collection` is similar to the native JavaScript `Array` class.

Like an array, `Collection's` items exist in memory at all times.

`Collection` is memory heavy and *very* fast. `Collection` is even faster than the native JavaScript `Array` class in many situations.

`Collection's` methods cause instantaneous transformations of it's internal items, as opposed to `LazyCollection` which only runs transformations when items are requested.

```ts
import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3, 4]);
let called = false;

collection            // Collection [1, 2, 3, 4]
  .map(n => {
    called = true;
    n + 1;
  })                  // Collection [2, 3, 4, 5]
  .exclude(2)         // Collection [3, 4, 5]
  .pick(3, 4)         // Collection [3, 4]
  .sort(-1);          // Collection [4, 3]

// transformations have executed upon call
called;               // true

collection.toArray(); // Array [4, 3]
```

### LazyCollection

- **speed**: slow
- **memory**: light

`LazyCollection` is a lazy stream that's only calculated when items are requested.

`LazyCollection` does not store its items in memory, only a reference to the initial iterable provided to it.

`LazyCollection` stores transformations and doesn't execute them until the caller requests data from it.

```ts
import { collectLazy } from '@nkp/iterable';

// generator
function * input(): IterableIterator<number> {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
}
const lazy = collectLazy(input);
let called = false;

lazy                // LazyCollection [input]
  .map(n => {
    called = true;
    n + 1;
  })                // LazyCollection [input]
  .exclude(2)       // LazyCollection [input]
  .pick(3, 4)       // LazyCollection [input]
  .sort(-1);        // LazyCollection [input]

// transformations have not executed yet
called;             // false

lazy.toArray();     // Array [4, 3]

// now that data has been requeted, all transformations have run
// and the results have been cached in-case of re-run
called;             // true
lazy;               // LazyCollection [4, 3]
```

Internally, items are cached
    1. when `LazyCollection` requires all items in memory for a transformation
    2. when the items are requested from the callee

```ts
const input = [1, 2, 3];
const lazy = new LazyCollection(input)
  .map(n => n + 1)
  .exclude(4)
  .sort();        // LazyCollection [input]

lazy.toArray();    // all transformations run on [1, 2, 3]
lazy.toArray();    // cached results are returned, transformations do not run again
lazy.item(1);      // cached results are returned, transformations do not run again
```

## Usage

### Methods

#### at

Get the item at a specified index.

Providing a negative index searches the collection from back-to-front.

Similar to `Array.prototype.at` but returns `Maybe<T>` instead of `T`.

```ts
// signature

import { Maybe } from '@nkp/maybe';

interface IHasAt<T> extends Iterable<T> {
  at(index: number): Maybe<T>;
}

```

```ts
// usage

import { collect } from '@nkp/iterable';

collect([1, 2]).at(0);    // Some [1]
collect([1, 2]).at(-1);   // Some [-2]
collect([1, 2]).at(2);    // None
collect([1, 2]).at(-3);   // None
```

#### btw

Filter in items between the two limits.

```ts
// signature

import { Betweenable } from '@nkp/iterable';

interface IHasBtw<T> extends Iterable<T> {
  btw(left: Betweenable, right: Betweenable): IHasBtw<T>;
}
```

#### concat

Concatenate an iterable onto the end of the collection.

Unlike `Array.protototype.concat`, `IHasConcat` only accepts a single array argument and does not accept spread arguments for consistent behavior. For spread arguments use [push](#push);

```ts
// signature

import { Iterateable } from '@nkp/iterable';

interface IHasConcat<T> extends Iterable<T> {
  concat(concat: Iterateable<T>): IHasConcat<T>;
}

```

```ts
// usage

import { collect } from '@nkp/iterable';

collect([1, 2]).concat([3, 4]); // Collection [1, 2, 3, 4]
```

#### every

Returns `true` if the callback returns truthy for every value in the collection.

Similar to `Array.prototype.every` and sibling of [some](#some).

```ts
// signature

interface IHasEvery<T> extends Iterable<T> {
  every(callbackfn: ((value: T, currentIndex: number) => boolean)): boolean;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

collect([1, 2]).every(Boolean);     // true
collect([0, 1]).every(Boolean);     // false - 0 is falsy
collect([0, 1]).every(n => n >= 0); // true
```

#### exclude

Filters items out of the collection if they match any of the given values.

```ts
// signature

interface IHasExclude<T> extends Iterable<T> {
  exclude(...remove: T[]): IHasExclude<T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

collect([1, 2, 3]).exclude(1, 2); // Collection [3]
```

#### filter

Removes items from a collection if their callback returns falsy.

Similar to `Array.prototype.filter`.

```ts
// signature

interface IHasFilter<T> extends Iterable<T> {
  filter<U extends T>(callbackfn: ((value: T, currentIndex: number) => value is U)): IHasFilter<U>;
  filter(callbackfn: (value: T, currentIndex: number) => boolean): IHasFilter<T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

collection.filter(n => n > 1); // Collection [2, 3]
```

#### find

Find the item in the collection.

Similar to `Array.prototype.find` but returns `Maybe<T>` instead of `T | undefined`.

```ts
// signature

import { Maybe } from '@nkp/maybe';

interface IHasFind<T> extends Iterable<T> {
  find(callbackfn: (value: T, currentIndex: number) => boolean): Maybe<T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

collection.find(3); // Some [3]
collection.find(4); // None
```

#### findIndex

Find the index of an item in the collection.

Similar to `Array.prototype.findIndex` but returns `Maybe<number>` instead of `number`.

```ts
// signature

import { Maybe } from '@nkp/maybe';

interface IHasFindIndex<T> extends Iterable<T> {
  findIndex(callbackfn: (value: T, currentIndex: number) => boolean): Maybe<number>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

collection.findIndex(3); // Some [2]
collection.findIndex(4); // None
```

#### first

Get the first item from the collection.

Returns `Some<T>` if the item exists, otherwise returns `None`.

```ts
// signature

import { Maybe } from '@nkp/maybe';

interface IHasFirst<T> extends Iterable<T> {
  first(): Maybe<T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const someCollection = collect([1, 2, 3]);
someCollection.first(); // Some [1]

const noneCollection = collect([]);
noneCollection.first(); // None
```

#### flat

Flattens a nested collection where the nested values may by any iterable.

Similar to `Array.prototype.flat`.

```ts
// signature

interface IHasFlat<T> extends Iterable<T> {
  flat<U>(this: IHasFlat<Iterable<U>>): IHasFlat<U>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

collection.flat(); // Collection [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

#### flatMap

Map the collections items to iterables and flatten them into single collection.

Similar to `Array.prototype.flatMap`.

```ts
// signature

interface IHasFlatMap<T> extends Iterable<T> {
  flatMap<U>(callbackfn: (value: T, currentIndex: number) => Iterateable<U>): IHasFlatMap<U>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

collection.map(collect); // Collection [Collection [1], Collection [2], Collection [3]]

collection.flatMap(collect); // Collection [1, 2, 3]

collection.map(collect).flat(); // Collection [1, 2, 3]
```

#### flatSome

Flatten `Some` values and filter out `None`'s from the collection.

The pipeline must be of type `Maybe`.

```ts
// signature

import { Some, None, Maybe } from '@nkp/iterable';

interface IHasFlatSome<T> extends Iterable<T> {
  flatSome<U>(this: IHasFlatSome<Some<U>>): IHasFlatSome<U>;
  flatSome<U>(this: IHasFlatSome<Maybe<U>>): IHasFlatSome<U>;
  flatSome(this: IHasFlatSome<None>): IHasFlatSome<never>;
}
```

```ts
// usage

import { Maybe } from '@nkp/maybe';
import { collect } from '@nkp/iterable';

const collection = collect([Maybe.some(1), Maybe.none, Maybe.some(3)]);

collection.flatSome(); // Collection [1, 3]
```

#### forEach

Provide a callback to run for each item in the collection.

Similar to `Array.prototype.forEach`.

```ts
// signature

interface IHasForEach<T> extends Iterable<T> {
  forEach(callbackfn: ((value: T, index: number) => unknown)): void;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

collection.forEach(n => console.log(n)); // 1, 2, 3
```

#### forkFlat

Fork the collection to split and operate on it's parts independently then flatten the results together.

```ts
// signature

interface IHasForkFlat<T> extends Iterable<T> {
  forkFlat<R>(...forks: readonly (Unary<this, Iterateable<R>>)[]): IHasForkFlat<R>;
}
```

```ts
// usage

import { path } from 'path';
import { collect } from '@nkp/iterable';

const collection = collect(['index.html', 'script.js', 'style.css']);

collection.forkFlat(
  (html) => html.matching(/\.html$/).map(file => path.join('public', file)),
  (scripts) => scripts.matching(/\.js$/).map(file => path.join('public', 'scripts', file)),
  (styles) => styles.matching(/\.css$/).map(file => path.join('public', 'styles', file)),
) 
  // Collection [
  //  'public/index.html',
  //  'public/scripts/script.js',
  //  'public/styles/style.css'
  // ]
```

#### forkMap

Fork the collection to split and operate on it's parts independently then join the results into a tuple (array) and return a single-value collection with the tuple as it's only value.

Similar to `Promise.all`, but for collections.

```ts
// signature

interface IHasForkMap<T> extends Iterable<T> {
  forkMap<M extends Record<PropertyKey, Unary<this, unknown>>>(forks: M): IHasForkMap<{ [K in keyof M]: ReturnType<M[K]> }>;
  forkMap<R1>(...splits: readonly [Unary<this, R1>]): IHasForkMap<[R1]>
  forkMap<R1, R2>(...splits: readonly [Unary<this, R1>, Unary<this, R2>]): IHasForkMap<[R1, R2]>
  forkMap<R1, R2, R3>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>]): IHasForkMap<[R1, R2, R3]>
  forkMap<R1, R2, R3, R4>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>]): IHasForkMap<[R1, R2, R3, R4]>
  forkMap<R1, R2, R3, R4, R5>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>]): IHasForkMap<[R1, R2, R3, R4, R5]>
  forkMap<R1, R2, R3, R4, R5, R6>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>]): IHasForkMap<[R1, R2, R3, R4, R5, R6]>
  forkMap<R1, R2, R3, R4, R5, R6, R7>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>]): IHasForkMap<[R1, R2, R3, R4, R5, R6, R7]>
  forkMap<R1, R2, R3, R4, R5, R6, R7, R8>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>]): IHasForkMap<[R1, R2, R3, R4, R5, R6, R7, R8]>
  forkMap<R1, R2, R3, R4, R5, R6, R7, R8, R9>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>, Unary<this, R9>]): IHasForkMap<[R1, R2, R3, R4, R5, R6, R7, R8, R9]>
  forkMap<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>, Unary<this, R9>, Unary<this, R10>]): IHasForkMap<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10]>
  forkMap<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>, Unary<this, R9>, Unary<this, R10>, Unary<this, R11>]): IHasForkMap<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11]>
  forkMap<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>, Unary<this, R9>, Unary<this, R10>, Unary<this, R11>, Unary<this, R12>]): IHasForkMap<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12]>
  forkMap<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>, Unary<this, R9>, Unary<this, R10>, Unary<this, R11>, Unary<this, R12>, Unary<this, R13>]): IHasForkMap<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13]>
  forkMap<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>, Unary<this, R9>, Unary<this, R10>, Unary<this, R11>, Unary<this, R12>, Unary<this, R13>, Unary<this, R14>]): IHasForkMap<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14]>
  forkMap<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>, Unary<this, R9>, Unary<this, R10>, Unary<this, R11>, Unary<this, R12>, Unary<this, R13>, Unary<this, R14>, Unary<this, R15>]): IHasForkMap<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15]>
  forkMap<R>(...splits: readonly (Unary<this, R>)[]): IHasForkMap<R[]>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect(['index.html', 'script.js', 'style.css']);

collection
  .forkMap(
    (html) => html.matching(/\.html$/),
    (scripts) => scripts.matching(/\.js$/),
    (styles) => styles.matching(/\.css$/),
  )
  /**
   * 
   * Collection [[
   *  Collection ['index.html'],
   *  Collection ['script.js'],
   *  Collection ['style.css']
   * ]]
   */
  .first()
  /**
   * Some [[
   *  Collection ['index.html'],
   *  Collection ['script.js'],
   *  Collection ['style.css']
   * ]]
   */
  .map(([html, scripts, stypes]) => {
    // ...
  })
```

#### forkOn

Fork the collection into nested collections based on the value returned by the callback.

```ts
// signature

interface IHasForkOn<T> extends Iterable<T> {
  forkOn<R>(callbackfn: ((value: T, index: number) => R)): IHasForkOn<IHasForkOn<T>>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([
  'contact/index.html',
  'contact/script.js',
  'contact/style.css',
  'about/index.html',
  'about/script.js',
  'about/style.css',
]);

collection
  .forkOn(
    // fork on the directory name
    (html) => html.match(/(.*)[\\/][^\\/\.]*\.html$/).first().value,
    (scripts) => scripts.match(/(.*)[\\/][^\\/\.]*\.js$/).first().value,
    (styles) => styles.match(/(.*)[\\/][^\\/\.]*\.css$/).first().value,
  )
  /**
   * 
   * Collection [
   *  Collection [
   *    'contact/index.html'
   *    'contact/script.js'
   *    'contact/style.css'
   *  ],
   *  Collection [
   *    'about/index.html'
   *    'about/script.js'
   *    'about/style.css'
   *  ],
   * ]
   */
```

#### getSize

Get the size of the collection.

Similar to `Array.prototype.length`.

```ts
// signature

interface IHasGetSize<T> extends Iterable<T> {
  getSize(): number;
}
```

```ts
import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

collection.getSize(); // 3;
```

#### gt

Keep items greater-than the given value.

```ts
// signature

import { Orderable } from '@nkp/iterable';

interface IHasGt<T> extends Iterable<T> {
  gt(value: Orderable): IHasGt<T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

collection.gt(2); // Collection [3]
```

#### gte

Keep items greater-than or equal-to the given value.

```ts
// signature

import { Orderable } from '@nkp/iterable';

interface IHasGte<T> extends Iterable<T> {
  gte(value: Orderable): IHasGte<T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

collection.gte(2); // Collection [2, 3]
```

#### indexOf

Get the index of the item in the collection.

```ts
// signature

import { Maybe } from '@nkp/maybe';

interface IHasIndexOf<T> extends Iterable<T> {
  indexOf(value: T): Maybe<number>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

collection.indexOf(2); // Some [1]
collection.indexOf(4); // None
```

#### join

Stringify and join collection items with a separator.

Similar to `Array.prototype.join`.

```ts
// signature

interface IHasJoin<T> extends Iterable<T> {
  join(separator?: string): string;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect(['hello', 'world']);

collection.join(' '); //  'hello world'
```

#### lt

Keep items less-than the given value.

```ts
// signature

import { Orderable } from '@nkp/iterable';

interface IHasLt<T> extends Iterable<T> {
  lt(value: Orderable): IHasLt<T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

collection.lt(2); // Collection [1]
```

#### lte

Keep items less-than or equal-to the given value.

```ts
// signature

import { Orderable } from '@nkp/iterable';

interface IHasLte<T> extends Iterable<T> {
  lte(value: Orderable): IHasLte<T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

collection.lte(2); // Collection [1, 2]
```

#### map

Map items in the collection.

Similar to `Array.prototype.map`.

```ts
// signature

interface IHasMap<T> extends Iterable<T> {
  map<U>(callbackfn: ((value: T, index: number) => U)): IHasMap<U>;
}

```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

collection.map(n => n + 1); // Collection [1, 2, 3]
```

#### matching

Keeps only items matching the given regex.

```ts
// signature

interface IHasMatching<T> extends IHasForEach<T> {
  matching(regexp: RegExp | string): IHasMatching<T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect(['index.html', 'style.css', 'script.js']);

collection.matching(/\.css$/); // Collection ['style.css']
```

#### notMatching

Removes items matching the given regex from the collection.

```ts
// signature

interface IHasNotMatching<T> extends Iterable<T> {
  notMatching(regexp: RegExp | string): IHasNotMatching<T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect(['index.html', 'style.css', 'script.js']);

collection.notMatching(/\.css$/); // Collection ['index.html', 'script.js']
```

#### notNull

Remove `null` values from the collection.

```ts
// signature

interface IHasNotNull<T> extends Iterable<T> {
  notNull(): IHasNotNull<T extends null ? never : T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, null, 3]);

collection.notNull(); // Collection [1, 3]
```

#### notNullable

Remove `null` and `undefined` values from the collection.

```ts
// signature

interface IHasNotNullable<T> extends Iterable<T> {
  notNullable(): IHasNotNullable<NonNullable<T>>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection: Collection<number> = collect([1, null, undefined, 3]);

collection.notNullable(); // Collection [1, 3]
```

#### notUndefined

Removes `undefined` values from the collection.

```ts
// signature

interface IHasNotUndefined<T> extends Iterable<T> {
  notUndefined(): IHasNotUndefined<T extends undefined ? never : T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, undefined, 3]);

collection.notUndefined(); // Collection [1, 3]
```

#### pick

Keep only matching items in the collection.

```ts
// signature

interface CollectionLike<T> {
  pick(...values: T): CollectionLike<T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

collection.pick(1, 2); // Collection [1, 2]
```

#### precat

Concatenate an iterable onto the start of the collection.

```ts
// signature

import { Iterateable } from '@nkp/iterable';

export interface IHasPrecat<T> extends Iterable<T> {
  precat(precat: Iterateable<T>): IHasPrecat<T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

collect([1, 2]).concat([3, 4]); // Collection [1, 2, 3, 4]
```

#### push

Push items onto the end of the collection.

Similar to `Array.prototype.push`.

```ts
// signature

interface IHasPush<T> extends Iterable<T> {
  push(...pushed: T[]): IHasPush<T>;
}

```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

collection.push(4, 5); // Collection [1, 2, 3, 4, 5]
```

#### reduce

Reduce the collection to a single value.

Similar to `Array.prototype.reduce`.

```ts
// signature

interface IHasReduce<T> extends Iterable<T> {
  reduce<U>(callbackfn: ((previousValue: T, currentValue: U, currentIndex: number) => U), initial: U,): U;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

// sum the pipeline from left-to-right
collection.reduce((next, acc) => acc + next, 0); // 6
```

#### reduceRight

Reduce the collection to a single value, from right to left.

Similar to `Array.prototype.reduceRight`.

```ts
// signature

interface IHasReduceRight<T> extends Iterable<T> {
  reduceRight<U>(callbackfn: ((previousValue: T, currentValue: U, currentIndex: number) => U), initial: U,): U;
}

```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

// stringify and concatenate the pipeline items from right-to-left
collection.reduceRight((next, acc) => acc + String(next), ''); // '321'
```

#### reverse

Reverse items in the collection.

Similar to `Array.prototype.reverse` but does not mutate the callee.

```ts
// signature

interface IHasReverse<T> extends Iterable<T> {
  reverse(): IHasReverse<T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

collection.reverse(); // Collection [3, 2, 1]

// not mutated
collection;           // Collection [1, 2, 3]
```

#### skip

Removes the first `n` items from the collection.

```ts
// signature

interface IHasSkip<T> extends Iterable<T> {
  skip(count?: number): IHasSkip<T>;
}

```

```ts
// usage

import { collect } from '@nkp/iterable';

collect([1, 2, 3]).skip(2); // Collection [3]
```

#### slice

Slice elements from the pipeline from `start` to `end`.

Similar to `Array.prototype.slice`.

```ts
// signature

interface IHasSlice<T> extends Iterable<T> {
  slice(start?: number, end?: number): IHasSlice<T>;
}

```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([0, 1, 2, 3, 4]);

// from index 2, ending before index 4
collection.slice(2, 4); // Collection [2, 3]
```

#### some

Returns `true` if the callback returns truthy for any value in the collection.

Similar to `Array.prototype.some`. Sibling of [every](#every).

```ts
// signature

interface IHasSome<T> extends Iterable<T> {
  some(callbackfn: (value: T, currentIndex: number) => boolean): boolean;
}

```

```ts
// usage

import { collect } from '@nkp/iterable';

collect([1, 2]).some(Boolean); // true
collect([0, 1]).some(Boolean); // true
collect([0, 0]).some(Boolean); // false
collect([0, false]).some(Boolean); // false
```

#### sort

Sorts items in the collection with sensible defaults.

Similar to `Array.prototype.sort` but sorts numerically by default instead of alphabetically and does not mutate the callee.

```ts
// signature

import { SortDirection } from '@nkp/sort';

interface IHasSort<T> extends Iterable<T> {
  sort(sort: SortDirection<T>): IHasSort<T>;
}

/**
 * type SortDirection<T> =
 *   | 'asc' | 'ASC'
 *   | 'desc' | 'DESC'
 *   | 1 | '1'
 *   | -1 | '-1'
 *   | ((a: T, b: T) => number)
 */

```

```ts
// usage

import { collect } from '@nkp/iterable';

// numeric only
const numeric =   collect([1, 4, BigInt(3), 2]);
// ascending
numeric.sort(1);  // Collection [1, 2, BigInt(3), 4]
// descending
numeric.sort(-1); // Collection [4, BigInt(3), 2, 1]

// alphabetical only - sorts by char code
const alpha =     collect(['a', 'c', 'B', 'd']);
// ascending
alpha.sort(1);    // Collection ['B', 'a', 'c', 'd']
// descending
alpha.sort(-1);   // Collection ['d', 'c', 'a', 'B']

// alphabetic and numeric
// sorts numerically then alphabetically
const alpha =     collect([1, 'a', 3, 'c', 2, 'b']);
// ascending
alpha.sort(1);    // Collection [1, 2, 3, 'a', 'b', 'c']
// desecending
alpha.sort(-1);   // Collection ['c', 'b', 'a', 3, 2, 1]
```

#### take

Keep only the first `n` items in the collection.

```ts
// signature

interface IHasTake<T> extends Iterable<T> {
  take(count?: number): IHasTake<T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

collection.take(2); // Collection [1, 2]
```

### tap

Execute a callback for each item in the collection without changing the collection.

Useful for logging.

Similar to `Array.prototype.forEach` but returns the collection.

```ts
// signature

interface IHasTap<T> extends Iterable<T> {
  tap(callbackfn: ((value: T, index: number) => unknown)): this;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

collection
  .tap((value, i) => console.log(`${i}: ${value}`));
  // 0: 1
  // 1: 2
  // 2: 3
  .map((value) => {
    // ...
  });
```

### tapSelf

Execute a callback with a reference to the collection itself.

Returns the collection itself.

Useful for logging.

```ts
// signature

interface IHasTapSelf<T> extends Iterable<T> {
  tapSelf(callbackfn: ((self: IHasTapSelf<T>) => unknown)): this;
}

```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

collection
  .map((value) => value + 1)
  .tapSelf((c) => console.log(`Right now the collection is: ${c.toString()}`))
  .map((value) => {
    // ...
  });
```

#### toArray

Transform the collection into n array.

```ts
// signature

interface IHasToArray<T> extends Iterable<T> {
  toArray(): Array<T>
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

collection.toArray(); // Array [1, 2, 3]
```

#### toSet

Transform the collection into an ES6 set.

```ts
// signature

interface IHasToSet<T> extends Iterable<T> {
  toSet(): Set<T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3, 3]);

collection.toSet(); // Set [1, 2, 3]
```

#### toMap

Transform the collection into an ES6 map.

```ts
// signature

interface IHasToMap<T> extends Iterable<T> {
  toMap<K, V>(this: IHasToMap<[K, V]>): Map<K, V>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect<[number, number]>([[1, 1], [2, 2], [3, 3]]);

collection.toMap(); // Map [[1, 1], [2, 2], [3, 3]]
```

#### unique

Filter the collection to only include unique values.

```ts
// signature

interface IHasUnique<T> extends Iterable<T> {
  unique(): IHasUnique<T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 2]);

collection.unique(); // Collection [1, 2]
```

#### unshift

Shift values onto the front of the collection.

Similar to `Array.prototype.shift`.

```ts
// signature

interface IHasUnshift<T> extends Iterable<T> {
  unshift(...unshifted: T[]): IHasUnshift<T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

collection.shift(-1, -2, -3); // Collection [-1, -2, -3, 1, 2, 3]
```

#### zipLong

Join the collection with an iterable, by index.

The resulting collection terminates with the final input iterable.

```ts
// signature

import { Iterateable } from '@nkp/iterateable';
import { Maybe } from '@nkp/maybe';

interface IHasZipLong<T> extends Iterable<T> {
  zipLong<U>(right: Iterateable<U>): IHasZipLong<[Maybe<T>, Maybe<U>]>;
}

```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

collection.zipLong([-1, -2, -3, -4]);
// Collection<[
//  [Some<1>, Some<-1>,],
//  [Some<2>, Some<-2>,],
//  [Some<3>, Some<-3>,],
//  [None, Some<-4>,],
// ]>
```

#### zipShort

Join the collection with an iterable, by index.

The resulting collection terminates with the first input iterable.

```ts
// signature

import { Iterateable } from '@nkp/iterable';

export interface IHasZipShort<T> extends Iterable<T> {
  zipShort<U>(right: Iterateable<U>): IHasZipShort<[T, U]>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

collection.zipLong([-1, -2, -3, -4]);
// Collection<[
//  [1, -1,],
//  [2, -2,],
//  [3, -3,],
// ]>
```

## Publishing a new version

To a release a new version:

1. Update the version number in package.json
2. Push the new version to the `master` branch on GitHub
3. Create a `new release` on GitHub for the latest version

This will trigger a GitHub action that tests and publishes the npm package.
