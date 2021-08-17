# @nkp/iterable

[![npm version](https://badge.fury.io/js/%40nkp%2Fiterable.svg)](https://www.npmjs.com/package/@nkp/iterable)
[![Node.js Package](https://github.com/NickKelly1/nkp-iterable/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/NickKelly1/nkp-iterable/actions/workflows/npm-publish.yml)
![Known Vulnerabilities](https://snyk.io/test/github/NickKelly1/nkp-iterable/badge.svg)

Collection utility classes for synchronous and lazy iteration over iterables like arrays, sets, maps and generators.

Uses the `@nkp/maybe` library for extracting values.

Extendable via higher kind types.

Exposes three utility classes, `River`, `Lake` and `Hose`.

## Collection types

type | river | lake | hose |
--- | --- | --- | --- |
**similar to** | array | generator | generator |
**cpu** | light | heavy | light |
**memory** | heavy | light | light |
**exhausts** | yes | yes | no |

### River

`River` is the most familiar iterable type.
Like an array its items exist in memory at all times.
Rivers are memory heavy and cpu light. River's flow methods, `map`, `filter`, `pick`, `exclude`, cause instantaneous trasnformation of it's items as opposed to a `Lake` which only runs transforms when items are requested.

- cpu: light
- memory: light
- exhausts: no

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

### Lake

- cpu: heavy
- memory: light
- exhausts: no

`Lake` is a kind of lazy stream. `Lake` does not store its items in memory, only a reference to the initial iterable provided to it.
`Lake` stores transformations and doesn't execute them until the caller requests data from it.

```ts
import { Lake, toLake } from '@nkp/iterable';

const lake: Lake = toLake([1, 2, 3, 4]);
let called = false;

lake
  .map(n => {
    called = true;
    n + 1;
  })
  .exclude(2)
  .pick(3, 4)
  .sort(-1);

// transformations have not executed yet
console.log(called); // false

lake.toArray(); // [4, 3]

// now that data has been requeted, all transformations have run
console.log(console.log(called)); // true
```

`Lake` is considered heavy on CPU because every time data is requested, every transformation must run again.

```ts
const lake = new Lake([1, 2, 3]).map(n => n + 1).exclude(4).sort();
lake.toArray(); // all transformations run on [1, 2, 3]
lake.toArray(); // all transformations run on [1, 2, 3] (again)
lake.item(1); // all transformations run on [1, 2, 3] (again)
// heavy on CPU for frequent data request
```

### Hose

- cpu: heavy
- memory: light
- exhausts: yes

Hose is like `Lake` but once shuts off after completion and cannot restart. It's suitable for iterables that not cycle, lke:

- `Array.prototype.vaues`
- `Set.prototype.vaues`
- `Map.prototype.vaues`
- `Map.prototype.keys`
- `Map.prototype.entries`

If a hose has not been exhausted, it's remaining contents can be collected into a `River` or `Lake` by calling `Hose.prototype.toRiver()` or `Hose.prototype.toLake()`

```ts
import { Hose, toHose } from '@nkp/iterable';

const hose: Hose = toHose(new Set([1, 2, 3, 4]).values());
let called = false;

hose
  .map(n => {
    called = true;
    n + 1;
  })
  .exclude(2)
  .pick(3, 4)
  .sort(-1);

// transformations have not executed yet
console.log(called); // false

hose.toArray(); // [4, 3]

// now that data has been requeted, all transformations have run
console.log(console.log(called)); // true

// the hoses inner iterable has been exhaused so the hose is done
console.log(hose.toArray()); // []
```

`Hose` does not expose additional helpers methods, like `Lake`, to access individual items because such methods would cause irreversible mutation and on the inner iterable and may return different values on every call. Instead, `Hose` exposts itself as an iterable with a `next()` method.

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
