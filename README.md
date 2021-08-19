# @nkp/iterable

[![npm version](https://badge.fury.io/js/%40nkp%2Fiterable.svg)](https://www.npmjs.com/package/@nkp/iterable)
[![Node.js Package](https://github.com/NickKelly1/nkp-iterable/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/NickKelly1/nkp-iterable/actions/workflows/npm-publish.yml)
![Known Vulnerabilities](https://snyk.io/test/github/NickKelly1/nkp-iterable/badge.svg)

Collection utility classes for synchronous and lazy iteration over iterables like arrays, sets, maps and generators.

Uses the `@nkp/maybe` library for extracting values.

Extendable via higher kind types.

Exposes three utility classes, `River`, `Dam` and `Bucket`.

## Collection types

type | river | dam | bucket |
--- | --- | --- | --- |
**similar to** | array | generator | generator |
**cpu** | light | heavy | light |
**memory** | heavy | light | light |
**exhausts** | yes | yes | no |

### River

`River` is the most familiar iterable type.
Like an array its items exist in memory at all times.
Rivers are memory heavy and cpu light. River's flow methods, `map`, `filter`, `pick`, `exclude`, cause instantaneous trasnformation of it's items as opposed to a `Dam` which only runs transforms when items are requested.

- **cpu**: light
- **memory**: light
- **exhausts**: no

```ts
import { River, toRiver } from '@nkp/iterable';

const river: River = toRiver([1, 2, 3, 4]);
let called = false;

river
  .map(n => {
    called = true;
    n + 1;
  })
  .exclude(2)
  .pick(3, 4)
  .sort(-1);

// transformations have executed upon call
console.log(called); // true

console.log(river.toArray()); // [4, 3]
```

### Dam

- **cpu**: light
- **memory**: light
- **exhausts**: no

`Dam` is a kind of lazy stream. `Dam` does not store its items in memory, only a reference to the initial iterable provided to it.
`Dam` stores transformations and doesn't execute them until the caller requests data from it.

```ts
import { Dam, toDam } from '@nkp/iterable';

const dam: Dam = toDam([1, 2, 3, 4]);
let called = false;

dam
  .map(n => {
    called = true;
    n + 1;
  })
  .exclude(2)
  .pick(3, 4)
  .sort(-1);

// transformations have not executed yet
console.log(called); // false

dam.toArray(); // [4, 3]

// now that data has been requeted, all transformations have run
console.log(console.log(called)); // true
```

`Dam` is considered heavy on CPU because every time data is requested, every transformation must run again.

```ts
const dam = new Dam([1, 2, 3]).map(n => n + 1).exclude(4).sort();
dam.toArray(); // all transformations run on [1, 2, 3]
dam.toArray(); // all transformations run on [1, 2, 3] (again)
dam.item(1); // all transformations run on [1, 2, 3] (again)
// heavy on CPU for frequent data request
```

### Bucket

- **cpu**: heavy
- **memory**: light
- **exhausts**: yes

`Bucket` is like `Dam` but once emptied replayed. It's suitable for iterables that do not cycle such as:

- `Array.prototype.vaues`
- `Set.prototype.vaues`
- `Map.prototype.vaues`
- `Map.prototype.keys`
- `Map.prototype.entries`

If a bucket has not been exhausted, it's remaining contents can be collected into a `River` or `Dam` by calling `bucket.toRiver()` or `bucket.toDam()`

```ts
import { Bucket, toBucket } from '@nkp/iterable';

const bucket: Bucket = toBucket(new Set([1, 2, 3, 4]).values());
let called = false;

bucket
  .map(n => {
    called = true;
    n + 1;
  })
  .exclude(2)
  .pick(3, 4)
  .sort(-1);

// transformations have not executed yet
console.log(called); // false

bucket.toArray(); // [4, 3]

// now that data has been requeted, all transformations have run
console.log(console.log(called)); // true

// the buckets inner iterable has been exhaused so the bucket is done
console.log(bucket.toArray()); // []
```

`Bucket` does not expose additional helpers methods, like `Dam`, to access individual items because such methods would cause irreversible mutation and on the inner iterable and may return different values on every call. Instead, `Bucket` exposts itself as an iterable with a `next()` method.

## Usage

### map

Maps the pipelines values using the callback provided.

```ts
import { River, toRiver } from '@nkp/iterable';
const river = toRiver([1, 2, 3]);
console.log(river.map(n => n + 1).toArray()); // [2, 3, 4]
```

### flatMap

Maps the pipelines values to another pipeline type using the callback provided, then flattens into a single pipeline.

```ts
import { River, toRiver } from '@nkp/iterable';
const river = toRiver([1, 2, 3]);
river
  .map(toRiver)
  .forEach((innerRiver) => console.log(innerRiver)) // [River 1], [River 2], [River 3]

river
  .flatMap(toRiver)
  .forEach((innerRiver) => console.log(innerRiver)) // 1, 2, 3
```

### flatten

Flattens a nested pipeline.

```ts
import { River, toRiver } from '@nkp/iterable';

const pipeline: River<River<number>> = toRiver([1, 2, 3]).map(toRiver);
const flat: River<number> = pipeline.flatten();
```

### filter

Removes items from a pipeline using a callback.

```ts
import { River, toRiver } from '@nkp/iterable';

const not1 = (n) => n !== 1
const pipeline: River<number> = toRiver([1, 2, 3]).filter(not1);
console.log(pipeline.toArray()); // [1, 2]
```

### exclude

Removes items from a pipeline using by values.

```ts
import { River, toRiver } from '@nkp/iterable';

const not1 = (n) => n !== 1
const pipeline: River<number> = toRiver([1, 2, 3]).exclude(1, 2);
console.log(pipeline.toArray()); // [3]
```

### pick

Keeps items from a pipeline using by values.

```ts
import { River, toRiver } from '@nkp/iterable';

const not1 = (n) => n !== 1
const pipeline: River<number> = toRiver([1, 2, 3]).pick(1, 2);
console.log(pipeline.toArray()); // [1, 2]
```

### sort

Sorts items in the river with sensible defaults unlike Array.prototype.sort.

```ts
import { River, toRiver } from '@nkp/iterable';

const not1 = (n) => n !== 1
const pipeline: River<number> = toRiver([1, 3, 2]);
console.log(pipeline.sort(-1).toArray()); // [3, 2, 1]
console.log(pipeline.sort(1).toArray()); // [1, 2, 3]
```

## Releasing a new version

To a release a new version:

1. Update the version number in package.json
2. Push the new version to the `master` branch on GitHub
3. Create a `new release` on GitHub for the latest version

This will trigger a GitHub action that tests and publishes the npm package.
