# @nkp/iterable

[![npm version](https://badge.fury.io/js/%40nkp%2Fiterable.svg)](https://www.npmjs.com/package/@nkp/iterable)
[![Node.js Package](https://github.com/NickKelly1/nkp-iterable/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/NickKelly1/nkp-iterable/actions/workflows/npm-publish.yml)
![Known Vulnerabilities](https://snyk.io/test/github/NickKelly1/nkp-iterable/badge.svg)

Collection utility classes for synchronous and lazy iteration over iterables like arrays, sets, maps and generators.

Uses the `@nkp/maybe` library for extracting values.

Extendable via higher kind types.

Exposes three utility classes, `River`, `Dam` and `Bucket`.

## Table of contents

- [Installation](#installation)
  - [npm](#npm)
  - [yarn](#yarn)
  - [exports](#exports)
- [Collection Types](#collection-types)
  - [River](#river)
  - [Dam](#dam)
  - [Bucket](#bucket)
- [Usage](#usage)
  - [Methods](#methods)
    - [concat](#concat)
    - [every](#every)
    - [exclude](#exclude)
    - [excludeFirst](#excludefirst)
    - [excludeMatching](#excludematching)
    - [excludeNull](#excludenull)
    - [excludeNullable](#excludenullable)
    - [excludeUndefined](#excludeundefined)
    - [filter](#filter)
    - [first](#first)
    - [flat](#flat)
    - [flatMap](#flatMap)
    - [flatSome](#flatSome)
    - [forEach](#forEach)
    - [join](#join)
    - [pick](#pick)
    - [pickFirst](#pickfirst)
    - [pickMatching](#pickmatching)
    - [push](#push)
    - [reduce](#reduce)
    - [reduceRight](#reduceright)
    - [reverse](#reverse)
    - [slice](#slice)
    - [some](#some)
    - [sort](#sort)
    - [toArray](#toarray)
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

**type** | `River` | `Dam` | `Bucket` |
--- | --- | --- | --- |
**similar to** | array | generator | generator |
**memory** | heavy | light | light |
**cpu** | light | heavy | light |
**exhausts** | no | no | yes |

### River

- **memory**: heavy
- **cpu**: light
- **exhausts**: no

`River` is the most familiar iterable type.

Like an array, `River's` items exist in memory at all times.

`Rivers` are memory heavy and cpu light.

`River's` flow methods, `map`, `filter`, `pick`, `exclude`, cause instantaneous trasnformation of it's internal items, as opposed to `Dam` which only runs transformations when items are requested.

```ts
import { toRiver } from '@nkp/iterable';

const river = toRiver([1, 2, 3, 4]);
let called = false;

river               // River [1, 2, 3, 4]
  .map(n => {
    called = true;
    n + 1;
  })                // River [2, 3, 4, 5]
  .exclude(2)       // River [3, 4, 5]
  .pick(3, 4)       // River [3, 4]
  .sort(-1);        // River [4, 3]

// transformations have executed upon call
called;             // true

river.toArray();    // Array [4, 3]
```

### Dam

- **memory**: light
- **cpu**: heavy
- **exhausts**: no

`Dam` is a lazy stream.

`Dam` does not store its items in memory, only a reference to the initial iterable provided to it.

`Dam` stores transformations and doesn't execute them until the caller requests data from it.

```ts
import { toDam } from '@nkp/iterable';

const dam = toDam([1, 2, 3, 4]);
let called = false;

dam                 // Dam [1, 2, 3, 4]
  .map(n => {
    called = true;
    n + 1;
  })                // Dam [2, 3, 4, 5]
  .exclude(2)       // Dam [3, 4, 5]
  .pick(3, 4)       // Dam [3, 4]
  .sort(-1);        // Dam [4, 3]

// transformations have not executed yet
called;             // false

dam.toArray();      // Array [4, 3]

// now that data has been requeted, all transformations have run
called; // true
```

`Dam` is considered heavy on CPU because every time data is requested, every transformation must run again.

```ts
const dam = new Dam([1, 2, 3])
  .map(n => n + 1)
  .exclude(4)
  .sort();        // Dam [2, 3]

dam.toArray();    // all transformations run on [1, 2, 3]
dam.toArray();    // all transformations run on [1, 2, 3] (again)
dam.item(1);      // all transformations run on [1, 2, 3] (again)
// heavy on CPU for frequent data request
```

### Bucket

- **cpu**: light
- **memory**: light
- **exhausts**: yes

`Bucket` is like `Dam` but once emptied it cannot be reused.

`Bucket` issuitable for `IterableIterator` like iterables that do not cycle such as:

- `Array.prototype.vaues`
- `Set.prototype.vaues`
- `Map.prototype.vaues`
- `Map.prototype.keys`
- `Map.prototype.entries`

`IterableIterator's` are as the same suggests, both iterable and iterators. They have a `next` function used to retrieve the next value, but also a `[Symbol.iterator]` function to return an iterator, usually referentially itself.

If a bucket has not been exhausted, it's remaining contents can be collected into a `River` or `Dam` by calling `bucket.toRiver()` or `bucket.toDam()`

```ts
import { Bucket, toBucket } from '@nkp/iterable';

const bucket: Bucket = toBucket(new Set([1, 2, 3, 4]).values());
let called = false;

bucket            // Bucket [1, 2, 3, 4]
  .map(n => {
    called = true;
    n + 1;
  })              // Bucket [2, 3, 4, 5]
  .exclude(2)     // Bucket [3, 4, 5]
  .pick(3, 4)     // Bucket [3, 4]
  .sort(-1);      // Bucket [4, 3]

// transformations have not executed yet
called;           // false

bucket.toArray(); // Array [4, 3]

// now that data has been requeted, all transformations have run
called;           // true

// the buckets inner iterable has been exhaused so the bucket is done
bucket.toArray(); // Array []
```

`Bucket` does not expose additional helpers methods, like `Dam`, to access individual items because such methods would cause irreversible mutation and on the inner iterable and may return different values on every call. Instead, `Bucket` exposts itself as an iterable with a `next()` method.

## Usage

### Methods

#### concat

Concatenate an iterable onto the end of the pipeline.

Unlike `Array.protototype.concat`, `concat` only accepts a single array argument and does not accept spread arguments for consistent behavior. For spread arguments use [push](#push);

```ts
// signature

interface Pipeline<T> {
  concat(iterable: Iterable<T>): Pipeline<T>;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

toRiver([1, 2]).concat([3, 4]); // River [1, 2, 3, 4]
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### every

Returns `true` if the callback returns truthy for every value in the pipeline.

Sibling of [some](#some).

```ts
// signature

interface Pipeline<T> {
  every(callbackfn: ((item: T) => boolean)): boolean;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

toRiver([1, 2]).every(Boolean); // true
toRiver([0, 1]).every(Boolean); // false - 0 is falsy
toRiver([0, 1]).every(n => n >= 0); // true
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### exclude

Filters items out of the pipeline if they match any of the given values.

```ts
// signature

interface Pipeline<T> {
  exclude(...values: T[]): Pipeline<T>;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

toRiver([1, 2, 3]).exclude(1, 2); // River [3]
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### excludeFirst

Removes the first `n` items from the pipeline.

```ts
// signature

interface Pipeline<T> {
  excludeFirst(count?: number): Pipeline<T>;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

toRiver([1, 2, 3]).excludeFirst(2); // River [3]
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### excludeMatching

Removes items matching the given regex from the pipeline.

```ts
// signature

interface Pipeline<T> {
  excludeMatching(regex: RegExp): Pipeline<T>;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

const river = toRiver(['index.html', 'style.css', 'script.js']);

const remaining = river.excludeMatching(/\.css$/);

remaining; // River ['index.html', 'script.js']
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### excludeNull

Removes all null values from the pipeline.

```ts
// signature

interface Pipeline<T> {
  excludeNull(): Pipeline<T>;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

const river = toRiver([1, null, 3]);

river.excludeNull(); // River [1, 3]
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### excludeNullable

Removes all null and undefined values from the pipeline.

```ts
// signature

interface Pipeline<T> {
  excludeNullable(): Pipeline<T>;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

const river: River<number> = toRiver([1, null, undefined, 3]);

river.excludeNullable(); // River [1, 3]
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### excludeUndefined

Removes all undefined values from the pipeline.

```ts
// signature

interface Pipeline<T> {
  excludeUndefined(): Pipeline<T>;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

const river = toRiver([1, undefined, 3]);

river.excludeUndefined(); // River [1, 3]
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### filter

Removes items from a pipeline if their callback returns falsy.

Similar to `Array.prototype.filter`.

```ts
// signature

interface Pipeline<T> {
  filter(callbackfn: ((item: T) => boolean)): Pipeline<T>;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

const pipeline = toRiver([1, 2, 3]);

pipeline.filter(n => n > 1); // [2, 3]
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### first

Get the first item from the pipeline.

Returns a `Maybe` (either `Some` or `None`) as the first item may not exist.

```ts
// signature

interface Pipeline<T> {
  first(): Maybe<T>;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

const pipeline = toRiver([1, 2, 3]);

pipeline.first(); // Some<1>
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### flat

Flattens a nested pipeline, where the nested values may by any iterable

Similar to `Array.prototype.flat`.

```ts
// signature

interface Pipeline<T> {
  flat(): T extends Iterable<infer U>
    ? Pipeline<U>
    : never;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

const pipeline = toRiver([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

pipeline.flat(); // River [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### flatMap

Map pipeline items to iterables and flatten back into the original pipeline kind.

Similar to `Array.prototype.flatMap`.

```ts
// signature

interface Pipeline<T> {
  flatMap<U>(callbackfn: ((item: T) => Iterable<U>)): Pipeline<U>;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

const river = toRiver([1, 2, 3]);

river.map(toRiver); // River [River [1], River [2], River [3]]

river.flatMap(toRiver); // River [1, 2, 3]

river.map(toRiver).flat(); // River [1, 2, 3]
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### flatSome

Flatten `Some` values and filter out `None`'s from the pipeline.

The pipeline must be of type `Maybe`.

```ts
// signature

interface Pipeline<T> {
  flatSome(): T extends Maybe<infer U> ? Pipeline<U> : never;
}
```

```ts
// usage

import { Maybe } from '@nkp/maybe';
import { toRiver } from '@nkp/iterable';

const river = toRiver([Maybe.some(1), Maybe.none, Maybe.some(3)]);

river.flatSome(toRiver); // River [1, 3]
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### forEach

Provide a callback to run for each item in the pipeline.

Similar to `Array.prototype.forEach`.

```ts
// signature

interface Pipeline<T> {
  forEach(callbackfn: ((item: T) => unknown)): void;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

const river = toRiver([1, 2, 3]);

river.forEach(n => console.log(n)); // 1, 2, 3
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### join

Stringify and join array elements with a separator.

Similar to `Array.prototype.join`.

```ts
// signature

interface Pipeline<T> {
  join(separator?: string): string;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

const river = toRiver(['hello', 'world']);

river.join(' '); //  'hello world'
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### map

May items in the pipeline;

Similar to `Array.prototype.map`.

```ts
// signature

interface Pipeline<T> {
  map<U>(callbackfn: ((item: T) => U)): Pipeline<U>;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

const river = toRiver([1, 2, 3]);

river.map(n => n + 1); // River [1, 2, 3]
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### pick

Filter out items that don't match one of the given values from the pipeline.

```ts
// signature

interface Pipeline<T> {
  pick(...values: T): Pipeline<T>;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

const river = toRiver([1, 2, 3]);

river.pick(1, 2); // River [1, 2]
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### pickFirst

Keep only the first `n` items in the pipeline.

```ts
// signature

interface Pipeline<T> {
  pickFirst(count?: number): Pipeline<T>;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

const river = toRiver([1, 2, 3]);

river.pickFirst(2); // River [1, 2]
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### pickMatching

Keeps only items matching the given regex from the pipeline.

```ts
// signature

interface Pipeline<T> {
  pickMatching(regex: RegExp): Pipeline<T>;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

const river = toRiver(['index.html', 'style.css', 'script.js']);

river.excludeMatching(/\.css$/); // River ['style.css']
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### push

Push items onto the end of the pipeline.

Similar to `Array.prototype.push`.

```ts
// signature

interface Pipeline<T> {
  push(...items: T[]): Pipeline<T>;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

const river = toRiver([1, 2, 3]);

river.push(4, 5); // River [1, 2, 3, 4, 5]
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### reduce

Reduce the pipeline to a single value.

Similar to `Array.prototype.reduce`.

```ts
// signature

interface Pipeline<T> {
  reduce<U>((next: T, accumulator: U) => U, initialValue: U): U;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

const river = toRiver([1, 2, 3]);

// sum the pipeline from left-to-right
river.reduce((next, acc) => acc + next, 0); // 6
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### reduceRight

Reduce the pipeline to a single value, from right to left.

Similar to `Array.prototype.reduceRight`.

```ts
// signature

interface Pipeline<T> {
  reduceRight<U>((next: T, accumulator: U) => U, initialValue: U): U;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

const river = toRiver([1, 2, 3]);

// stringify and concatenate the pipeline items from right-to-left
river.reduceRight((next, acc) => acc + String(next), ''); // '321'
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### reverse

Reverse elements in the pipeline.

Similar to `Array.prototype.reverse`, but does not mutate the callee.

```ts
// signature

interface Pipeline<T> {
  reverse(): Pipeline<T>;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

const river = toRiver([1, 2, 3]);

river.reverse(); // River [3, 2, 1]

river; // River [1, 2, 3]
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### slice

Slice elements from the pipeline from `start` to `end`.

Similar to `Array.prototype.slice`.

```ts
// signature

interface Pipeline<T> {
  slice(from: number, to?: number): Pipeline<T>;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

const river = toRiver([0, 1, 2, 3, 4]);

// from index 2, ending before index 4
river.slice(2, 4); // River [2, 3]
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### some

Returns `true` if the callback returns truthy for any value in the pipeline.

Sibling of [every](#every).

```ts
// signature

interface Pipeline<T> {
  every(callbackfn: ((item: T) => boolean)): boolean;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

toRiver([1, 2]).some(Boolean); // true
toRiver([0, 1]).some(Boolean); // true
toRiver([0, 0]).some(Boolean); // false
toRiver([0, false]).some(Boolean); // false
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### sort

Sorts items in the pipeline with sensible defaults.

Similar to `Array.prototype.sort`, but sorts numerically by default, not alphabetically, and does not mutate the callee.

```ts
// signature

interface Pipeline<T> {
  sort(direction:
    | 'asc' | 'ASC'
    | 'desc' | 'DESC'
    | 1 | '1'
    | -1 | '-1'
    | ((a: T, b: T) => number)
  ): Pipeline<T>;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

// numeric only
const numeric =   toRiver([1, 4, BigInt(3), 2]);
numeric.sort(-1); // River [4, BigInt(3), 2, 1]
numeric.sort(1);  // River [1, 2, BigInt(3), 4]
numeric;          // River [1, 4, BigInt(3), 2]

// alphabetical only - sort by char code
const alpha =     toRiver(['a', 'c', 'B', 'd']);
alpha.sort(-1);   // River ['d', 'c', 'a', 'B']
alpha.sort(1);    // River ['B', 'a', 'c', 'd']
alpha;            // River ['a', 'c', 'B', 'd']

// alphabetic and numeric
// sorts numerically, then alphabetically
const alpha =     toRiver([1, 'a', 3, 'c', 2, 'b']);
alpha.sort(-1);   // River ['c', 'b', 'a', 3, 2, 1]
alpha.sort(1);    // River [1, 2, 3, 'a', 'b', 'c']
alpha;            // River [1, 'a', 3, 'c', 2, 'b']
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### toArray

Transform the pipeline to an Array.

```ts
// signature

interface Pipeline<T> {
  toArray(): T[];
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

const river = toRiver([1, 2, 3]);

river.toArray(); // Array [1, 2, 3]
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### toSet

Transform the pipeline to an ES6 Set.

```ts
// signature

interface Pipeline<T> {
  toSet(): Set<T>;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

const river = toRiver([1, 2, 3, 3]);

river.toSet(); // Set [1, 2, 3]
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### unique

Filter the pipeline to only include unique values.

```ts
// signature

interface Pipeline<T> {
  unique(): Pipeline<T>;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

const river = toRiver([1, 2, 2]);

river.unique(); // River<[1, 2]>
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### unshift

Shift values onto the front of the pipeline

Similar to `Array.prototype.shift`.

```ts
// signature

interface Pipeline<T> {
  unshift(...values:T []): Pipeline<T>;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

const river = toRiver([1, 2, 3]);

river.shift(-1, -2, -3); // River [-1, -2, -3, 1, 2, 3]
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### zipLong

Join two pipelines by index.
The resulting pipeline ends when the final living input pipeline ends.

```ts
// signature

import { Maybe } from '@nkp/maybe';

interface Pipeline<T> {
  zipLong(iterable: Iterable<U>): Pipeline<[Maybe<T>, Maybe<U>]>;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

const river = toRiver([1, 2, 3]);

river.zipLong([-1, -2, -3, -4]);
// River<[
//  [Some<1>, Some<-1>,],
//  [Some<2>, Some<-2>,],
//  [Some<3>, Some<-3>,],
//  [None, Some<-4>,],
// ]>
```

Available in:

- `River`
- `Dam`
- `Bucket`

#### zipShort

Join two pipelines by index.
The resulting pipeline ends when the first input pipeline ends.

```ts
// signature

interface Pipeline<T> {
  zipShort(iterable: Iterable<U>): Pipeline<[T, U]>;
}
```

```ts
// usage

import { toRiver } from '@nkp/iterable';

const river = toRiver([1, 2, 3]);

river.zipLong([-1, -2, -3, -4]);
// River<[
//  [1, -1,],
//  [2, -2,],
//  [3, -3,],
// ]>
```

Available in:

- `River`
- `Dam`
- `Bucket`

## Publishing a new version

To a release a new version:

1. Update the version number in package.json
2. Push the new version to the `master` branch on GitHub
3. Create a `new release` on GitHub for the latest version

This will trigger a GitHub action that tests and publishes the npm package.
