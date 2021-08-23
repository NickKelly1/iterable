# @nkp/iterable

[![npm version](https://badge.fury.io/js/%40nkp%2Fiterable.svg)](https://www.npmjs.com/package/@nkp/iterable)
[![Node.js Package](https://github.com/NickKelly1/nkp-iterable/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/NickKelly1/nkp-iterable/actions/workflows/npm-publish.yml)
![Known Vulnerabilities](https://snyk.io/test/github/NickKelly1/nkp-iterable/badge.svg)

Collection utility classes for synchronous and lazy iteration over iterables like arrays, sets, maps and generators.

Exposes two utility classes, `Collection`, `LazyCollection`.

## Table of contents

- [Installation](#installation)
  - [npm](#npm)
  - [yarn](#yarn)
  - [exports](#exports)
- [Collection Types](#collection-types)
  - [Collection](#collection)
  - [LazyCollection](#lazy)
- [Usage](#usage)
  - [Methods](#methods)
    - [at](#at)
    - [concat](#concat)
    - [every](#every)
    - [exclude](#exclude)
    - [skip](#skip)
    - [notMatching](#notMatching)
    - [notNull](#notNull)
    - [notNullable](#notNullable)
    - [notUndefined](#notUndefined)
    - [filter](#filter)
    - [find](#find)
    - [findIndex](#findIndex)
    - [first](#first)
    - [flat](#flat)
    - [flatMap](#flatMap)
    - [flatSome](#flatSome)
    - [forEach](#forEach)
    - [indexOf](#indexOf)
    - [join](#join)
    - [pick](#pick)
    - [take](#take)
    - [matching](#matching)
    - [push](#push)
    - [reduce](#reduce)
    - [reduceRight](#reduceright)
    - [reverse](#reverse)
    - [slice](#slice)
    - [some](#some)
    - [sort](#sort)
    - [toArray](#toarray)
    - [toMap](#tomap)
    - [toSet](#toset)
    - [unique](#unique)
    - [unshift](#unshift)
    - [zipLong](#ziplong)
    - [zipShort](#zipshort)
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

## Collection types

**type** | `Collection` | `LazyCollection` |
--- | --- | --- | --- |
**similar to** | array | generator |
**memory** | heavy | light |
**cpu** | light | heavy |

### Collection

- **memory**: heavy
- **cpu**: light

`Collection` is the most familiar iterable type.

Like an array, `Collection's` items exist in memory at all times.

`Collection` is memory heavy and cpu light.

`Collection's` methods cause instantaneous trasnformation of it's internal items, as opposed to `LazyCollection` which only runs transformations when items are requested.

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

- **memory**: light
- **cpu**: heavy
- **exhausts**: no

`LazyCollection` is a lazy stream that's only calculated when items are requested.

`LazyCollection` does not store its items in memory, only a reference to the initial iterable provided to it.

`LazyCollection` stores transformations and doesn't execute them until the caller requests data from it.

```ts
import { collectLazy } from '@nkp/iterable';

const lazy = collectLazy([1, 2, 3, 4]);
let called = false;

lazy                 // LazyCollection [1, 2, 3, 4]
  .map(n => {
    called = true;
    n + 1;
  })                // LazyCollection [2, 3, 4, 5]
  .exclude(2)       // LazyCollection [3, 4, 5]
  .pick(3, 4)       // LazyCollection [3, 4]
  .sort(-1);        // LazyCollection [4, 3]

// transformations have not executed yet
called;             // false

lazy.toArray();      // Array [4, 3]

// now that data has been requeted, all transformations have run
called; // true
```

`LazyCollection` is considered heavy on CPU because every time data is requested, every transformation must run again.

```ts
const lazy = new LazyCollection([1, 2, 3])
  .map(n => n + 1)
  .exclude(4)
  .sort();        // LazyCollection [2, 3]

lazy.toArray();    // all transformations run on [1, 2, 3]
lazy.toArray();    // all transformations run on [1, 2, 3] (again)
lazy.item(1);      // all transformations run on [1, 2, 3] (again)
// heavy on CPU for frequent data request
```

## Usage

### Methods

#### at

Get the item at a specified index.

Providing a negative index searches the collection from backt-to-front.

Similar to `Array.prototype.at`

```ts
// signature

interface CollectionLike<T> {
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

#### concat

Concatenate an iterable onto the end of the collection.

Unlike `Array.protototype.concat`, `concat` only accepts a single array argument and does not accept spread arguments for consistent behavior. For spread arguments use [push](#push);

```ts
// signature

interface CollectionLike<T> {
  concat(iterable: Iterable<T>): CollectionLike<T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

collect([1, 2]).concat([3, 4]); // Collection [1, 2, 3, 4]
```

#### every

Returns `true` if the callback returns truthy for every value in the collection.

Sibling of [some](#some).

```ts
// signature

interface CollectionLike<T> {
  every(callbackfn: ((item: T) => boolean)): boolean;
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

interface CollectionLike<T> {
  exclude(...values: T[]): CollectionLike<T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

collect([1, 2, 3]).exclude(1, 2); // Collection [3]
```

#### skip

Removes the first `n` items from the collection.

```ts
// signature

interface CollectionLike<T> {
  skip(count?: number): CollectionLike<T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

collect([1, 2, 3]).skip(2); // Collection [3]
```

#### notMatching

Removes items matching the given regex from the collection.

```ts
// signature

interface CollectionLike<T> {
  notMatching(regex: RegExp): CollectionLike<T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect(['index.html', 'style.css', 'script.js']);

const remaining = collection.notMatching(/\.css$/);

remaining; // Collection ['index.html', 'script.js']
```

#### notNull

Removes `null` values from the collection.

```ts
// signature

interface CollectionLike<T> {
  notNull(): CollectionLike<T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, null, 3]);

collection.notNull(); // Collection [1, 3]
```

#### notNullable

Removes all `null` and `undefined` values from the collection.

```ts
// signature

interface CollectionLike<T> {
  notNullable(): CollectionLike<T>;
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

interface CollectionLike<T> {
  notUndefined(): CollectionLike<T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, undefined, 3]);

collection.notUndefined(); // Collection [1, 3]
```

Available in:

- `Collection`
- `LazyCollection`
- `Bucket`

#### filter

Removes items from a collection if their callback returns falsy.

Similar to `Array.prototype.filter`.

```ts
// signature

interface CollectionLike<T> {
  filter(callbackfn: ((item: T) => boolean)): CollectionLike<T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const pipeline = collect([1, 2, 3]);

pipeline.filter(n => n > 1); // Collection [2, 3]
```

#### first

Get the first item from the collection.

Returns a `Maybe` (either `Some` or `None`) as the first item may not exist.

```ts
// signature

interface CollectionLike<T> {
  first(): Maybe<T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const pipeline = collect([1, 2, 3]);

pipeline.first(); // Some [1]
```

#### flat

Flattens a nested collection, where the nested values may by any iterable.

Similar to `Array.prototype.flat`.

```ts
// signature

interface CollectionLike<T> {
  flat<U>(this: CollectionLike<Iterable<U>>): CollectionLike<U>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const pipeline = collect([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

pipeline.flat(); // Collection [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

#### flatMap

Map the collections items to iterables and flatten back into a collection.

Similar to `Array.prototype.flatMap`.

```ts
// signature

interface CollectionLike<T> {
  flatMap<U>(callbackfn: ((item: T) => Iterable<U>)): CollectionLike<U>;
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

interface CollectionLike<T> {
  flatSome(): T extends Maybe<infer U> ? Pipeline<U> : never;
}
```

```ts
// usage

import { Maybe } from '@nkp/maybe';
import { collect } from '@nkp/iterable';

const collection = collect([Maybe.some(1), Maybe.none, Maybe.some(3)]);

collection.flatSome(collect); // Collection [1, 3]
```

#### find

Find the item in the collection.

Similar to `Array.prototype.find`.

```ts
// signature

interface CollectionLike<T> {
  find(value: T): Maybe<T>;
}
```

```ts
// usage

import { Maybe } from '@nkp/maybe';
import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

collection.find(3); // Some [3]
collection.find(4); // None
```

#### forEach

Provide a callback to run for each item in the collection.

Similar to `Array.prototype.forEach`.

```ts
// signature

interface CollectionLike<T> {
  forEach(callbackfn: ((item: T) => unknown)): void;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

collection.forEach(n => console.log(n)); // 1, 2, 3
```

#### findIndex

Find the index of an item in the collection.

Similar to `Array.prototype.findIndex`.

```ts
// signature

interface CollectionLike<T> {
  findIndex(value: T): Maybe<number>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

collection.findIndex(3); // Some [2]
collection.findIndex(4); // None
```

#### join

Stringify and join collection items with a separator.

Similar to `Array.prototype.join`.

```ts
// signature

interface CollectionLike<T> {
  join(separator?: string): string;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect(['hello', 'world']);

collection.join(' '); //  'hello world'
```

#### map

Map items in the collection.

Similar to `Array.prototype.map`.

```ts
// signature

interface CollectionLike<T> {
  map<U>(callbackfn: ((item: T) => U)): CollectionLike<U>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

collection.map(n => n + 1); // Collection [1, 2, 3]
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

#### take

Keep only the first `n` items in the collection.

```ts
// signature

interface CollectionLike<T> {
  take(count?: number): CollectionLike<T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

collection.take(2); // Collection [1, 2]
```

#### matching

Keeps only items matching the given regex.

```ts
// signature

interface CollectionLike<T> {
  matching(regex: RegExp): CollectionLike<T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect(['index.html', 'style.css', 'script.js']);

collection.matching(/\.css$/); // Collection ['style.css']
```

#### push

Push items onto the end of the collection.

Similar to `Array.prototype.push`.

```ts
// signature

interface CollectionLike<T> {
  push(...items: T[]): CollectionLike<T>;
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

interface CollectionLike<T> {
  reduce<U>((next: T, accumulator: U) => U, initialValue: U): U;
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

interface CollectionLike<T> {
  reduceRight<U>((next: T, accumulator: U) => U, initialValue: U): U;
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

Similar to `Array.prototype.reverse`, but does not mutate the callee.

```ts
// signature

interface CollectionLike<T> {
  reverse(): CollectionLike<T>;
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

#### slice

Slice elements from the pipeline from `start` to `end`.

Similar to `Array.prototype.slice`.

```ts
// signature

interface CollectionLike<T> {
  slice(from: number, to?: number): CollectionLike<T>;
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

Sibling of [every](#every).

```ts
// signature

interface CollectionLike<T> {
  every(callbackfn: ((item: T) => boolean)): boolean;
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

Similar to `Array.prototype.sort`, but sorts numerically by default, not alphabetically, and does not mutate the callee.

```ts
// signature

interface CollectionLike<T> {
  sort(direction:
    | 'asc' | 'ASC'
    | 'desc' | 'DESC'
    | 1 | '1'
    | -1 | '-1'
    | ((a: T, b: T) => number)
  ): CollectionLike<T>;
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

// numeric only
const numeric =   collect([1, 4, BigInt(3), 2]);
numeric.sort(-1); // Collection [4, BigInt(3), 2, 1]
numeric.sort(1);  // Collection [1, 2, BigInt(3), 4]
numeric;          // Collection [1, 4, BigInt(3), 2]

// alphabetical only - sort by char code
const alpha =     collect(['a', 'c', 'B', 'd']);
alpha.sort(-1);   // Collection ['d', 'c', 'a', 'B']
alpha.sort(1);    // Collection ['B', 'a', 'c', 'd']
alpha;            // Collection ['a', 'c', 'B', 'd']

// alphabetic and numeric
// sorts numerically, then alphabetically
const alpha =     collect([1, 'a', 3, 'c', 2, 'b']);
alpha.sort(-1);   // Collection ['c', 'b', 'a', 3, 2, 1]
alpha.sort(1);    // Collection [1, 2, 3, 'a', 'b', 'c']
alpha;            // Collection [1, 'a', 3, 'c', 2, 'b']
```

#### toArray

Transform the `CollectionLike<T>` to an `Array<T>`.

```ts
// signature

interface CollectionLike<T> {
  toArray(): T[];
}
```

```ts
// usage

import { collect } from '@nkp/iterable';

const collection = collect([1, 2, 3]);

collection.toArray(); // Array [1, 2, 3]
```

#### toSet

Transform the `CollectionLike<T>` to an ES6 `Set<T>`.

```ts
// signature

interface CollectionLike<T> {
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

Transform the `CollectionLike<[K, V]>` to an ES6 `Map<K, V>`.

```ts
// signature

interface CollectionLike<T> {
  toMap<K, V>(this: CollectionLike<[K, V]>): Map<K, V>;
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

interface CollectionLike<T> {
  unique(): CollectionLike<T>;
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

interface CollectionLike<T> {
  unshift(...values:T []): CollectionLike<T>;
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

import { Maybe } from '@nkp/maybe';

interface CollectionLike<T> {
  zipLong(iterable: Iterable<U>): CollectionLike<[Maybe<T>, Maybe<U>]>;
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

Available in:

- `Collection`
- `LazyCollection`
- `Bucket`

#### zipShort

Join the collection with an iterable, by index.

The resulting collection terminates with the first input iterable.

```ts
// signature

interface CollectionLike<T> {
  zipShort(iterable: Iterable<U>): CollectionLike<[T, U]>;
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
