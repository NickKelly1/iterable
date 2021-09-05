/* eslint-disable max-len */
import { Maybe, MaybeLike, NoneLike, SomeLike } from '@nkp/maybe';
import { smartSort, toBetweenable, toIterable } from './utils';
import { $ANY, $TODO } from './utility-types';
import { Betweenable, Iterateable, Orderable, SortDirection, Unary } from './types';
import { ICollection } from './collection.interface';

/**
 * Lazy Collection
 */
export class LazyCollection<T> implements ICollection<T> {
  protected _cache: Maybe<T[]> = Maybe.none;

  /**
   * Create a new LazyCollection
   */
  static from<T>(pipelineable: Iterateable<T>): LazyCollection<T> {
    return new LazyCollection(pipelineable);
  }

  /**
   * Create a LazyCollection
   *
   * @param root
   */
  constructor(protected readonly root: Iterateable<T>) {
    // pre-cache if possible
    if (Array.isArray(root)) {
      this._cache = Maybe.some(root);
    }
  }

  /**
   * Get the iterable instance
   *
   * @returns
   */
  protected getIterable(): Iterable<T> {
    if (this._cache.isSome()) {
      return this._cache.value[Symbol.iterator]();
    }
    return toIterable(this.root);
  }

  /**
   * @inheritdoc
   */
  * [Symbol.iterator](): IterableIterator<T> {
    yield * this.getIterable();
  }

  /**
   * Execute a side-effect callback on the collection itself
   *
   * Return the original collection
   *
   * @param callbackfn
   * @returns
   */
  tapSelf(callbackfn: (self: LazyCollection<T>) => unknown): this {
    callbackfn(this);
    return this;
  }

  /**
   * If transformations have not been cached, cache them
   *
   * Otherwise, return the cached results
   *
   * @returns
   */
  protected _ensureCache(): T[] {
    if (this._cache.isNone()) {
      this._cache = Maybe.some(Array.from(toIterable(this.root)));
    }
    return this._cache.value;
  }

  /**
   * Execute a side-effect callback for each item in the collection
   *
   * Return the original collection
   *
   * @param callbackfn
   * @returns
   */
  tap(callbackfn: (item: T, i: number) => unknown): this {
    this
      ._ensureCache()
      .forEach(function tapItem (item, index) {
        callbackfn(item, index);
      });
    return this;
  }

  /**
   * Fire callback for each element of the Pipeline
   *
   * @param callbackfn
   */
  forEach(callbackfn: (item: T, i: number) => unknown): void {
    this
      ._ensureCache()
      .forEach(function tapItem (item, index) {
        callbackfn(item, index);
      });
  }

  /**
   * Exclude falsy values from the collection
   *
   * @param this
   * @returns
   */
  compact(): LazyCollection<NonNullable<T>> {
    return this.filter(Boolean) as $TODO<$ANY>;
  }

  /**
   * Partition the collection grouping by callback return value
   *
   * @param forks
   */
  partition<R>(callbackfn: ((value: T, index: number) => R)): LazyCollection<LazyCollection<T>> {
    const self = this;
    function * Iterateable(): IterableIterator<LazyCollection<T>> {
      // need to collect all results to group them
      const groups = new Map<R, T[]>();
      const items = self._ensureCache();
      items.forEach((item, i) => {
        const identifier = callbackfn(item, i);
        if (groups.has(identifier)) { groups.get(identifier)!.push(item); }
        else { groups.set(identifier, [item,]); }
      });
      for (const group of groups.values()) {
        yield new LazyCollection(group);
      }
    }
    return new LazyCollection(Iterateable);
  }

  /**
   * Fork into separate collections which can be transformed separately
   * Combine and flatten into a resulting collection
   *
   * @param forks
   */
  forkFlat<R>(...forks: readonly (Unary<this, Iterateable<R>>)[]): LazyCollection<R> {
    const combined = this
      // split forks
      .all(...forks)
      .flat()
      // normalize
      .map((splits) => new LazyCollection(splits))
      // join results
      .flat();
    return combined;
  }

  /**
   * Split the collection apart and return a collection with only 1 item - the result of the splits
   *
   * Similar to Promise.all
   */
  all<M extends Record<PropertyKey, Unary<this, unknown>>>(forks: M): LazyCollection<{ [K in keyof M]: ReturnType<M[K]> }>;
  all<R1>(...splits: readonly [Unary<this, R1>]): LazyCollection<[R1]>
  all<R1, R2>(...splits: readonly [Unary<this, R1>, Unary<this, R2>]): LazyCollection<[R1, R2]>
  all<R1, R2, R3>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>]): LazyCollection<[R1, R2, R3]>
  all<R1, R2, R3, R4>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>]): LazyCollection<[R1, R2, R3, R4]>
  all<R1, R2, R3, R4, R5>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>]): LazyCollection<[R1, R2, R3, R4, R5]>
  all<R1, R2, R3, R4, R5, R6>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>]): LazyCollection<[R1, R2, R3, R4, R5, R6]>
  all<R1, R2, R3, R4, R5, R6, R7>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>]): LazyCollection<[R1, R2, R3, R4, R5, R6, R7]>
  all<R1, R2, R3, R4, R5, R6, R7, R8>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>]): LazyCollection<[R1, R2, R3, R4, R5, R6, R7, R8]>
  all<R1, R2, R3, R4, R5, R6, R7, R8, R9>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>, Unary<this, R9>]): LazyCollection<[R1, R2, R3, R4, R5, R6, R7, R8, R9]>
  all<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>, Unary<this, R9>, Unary<this, R10>]): LazyCollection<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10]>
  all<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>, Unary<this, R9>, Unary<this, R10>, Unary<this, R11>]): LazyCollection<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11]>
  all<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>, Unary<this, R9>, Unary<this, R10>, Unary<this, R11>, Unary<this, R12>]): LazyCollection<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12]>
  all<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>, Unary<this, R9>, Unary<this, R10>, Unary<this, R11>, Unary<this, R12>, Unary<this, R13>]): LazyCollection<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13]>
  all<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>, Unary<this, R9>, Unary<this, R10>, Unary<this, R11>, Unary<this, R12>, Unary<this, R13>, Unary<this, R14>]): LazyCollection<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14]>
  all<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>, Unary<this, R9>, Unary<this, R10>, Unary<this, R11>, Unary<this, R12>, Unary<this, R13>, Unary<this, R14>, Unary<this, R15>]): LazyCollection<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15]>
  all<R>(...splits: readonly (Unary<this, R>)[]): LazyCollection<R[]>
  all(mapOrFunction?: (Unary<this, unknown> | Record<PropertyKey, Unary<this, unknown>>), ...rest: Unary<this, unknown>[]): $ANY {

    if (!mapOrFunction)
      throw new TypeError('[@nkp/iterable::LazyCollection.all]: you must provide an object or at least one function');

    const self = this;
    if (typeof mapOrFunction === 'object') {
      const mapping = mapOrFunction as Record<PropertyKey, Unary<this, unknown>>;
      // given a map
      const iterateable = function * iterateable(): Iterable<Record<string, unknown>> {
        const mappedResults: Record<PropertyKey, $ANY> = {};
        Object.keys(mapping).map(key => {
          mappedResults[key] = mapping[key]!(self);
        });
        yield mappedResults;
      };
      return new LazyCollection(iterateable);
    }

    const zeroFn = mapOrFunction as Unary<this, unknown>;
    // given an array of functions
    // given an array
    const fns = [zeroFn, ...rest,] as Unary<this, unknown>[];
    const iterateable = function * iterateable(): Iterable<unknown[]> {
      const mapResults = fns.map((split) => split(self));
      yield mapResults;
    };
    return new LazyCollection(iterateable);
  }


  /**
   * Get the first value
   *
   * @returns
   */
  first(): Maybe<T> {
    const first = this[Symbol.iterator]().next();
    if (first.done) return Maybe.none;
    return Maybe.some(first.value);
  }

  /**
   * Map the pipeline
   *
   * Map within pipeline kind S from T to U
   *
   * @param callbackfn
   * @returns
   */
  map<U>(callbackfn: (value: T, currentIndex: number) => U): LazyCollection<U> {
    const self = this;
    function * iterable (): Iterable<U> {
      let i = 0;
      for (const item of self) {
        yield callbackfn(item, i);
        i += 1;
      }
    }
    return new LazyCollection(iterable);
  }

  /**
   * Map this instance
   *
   * @param callbackfn
   * @returns
   */
  mapSelf<U>(callbackfn: (self: this) => U): U {
    return callbackfn(this);
  }

  /**
   * Flat map the pipeline
   *
   * Flatly map pipeline kind S to V, and type T to U
   *
   * @param callbackfn
   * @returns
   */
  flatMap<U>(callbackfn: (value: T, currentIndex: number) => Iterateable<U>): LazyCollection<U> {
    const self = this;
    const iterable = function * (): Iterable<U> {
      let i = 0;
      for (const item of self) {
        yield * toIterable(callbackfn(item, i));
        i += 1;
      }
    };
    return new LazyCollection(iterable);
  }

  /**
   * Flatten the pipeline
   *
   * @param this
   * @returns
   */
  flat<U>(this: LazyCollection<Iterable<U>>): LazyCollection<U>
  flat(this: LazyCollection<T>): LazyCollection<T>
  flat<U>(this: LazyCollection<U | Iterable<U>>): LazyCollection<U> {
    const self = this;
    const iterable = function * (): Iterable<U> {
      for (const item of self) {
        if (item
          && typeof (item as Iterable<U>)[Symbol.iterator] === 'function'
        ) {
          // item is an iterator - we can flatten
          yield * item as Iterable<U>;
        }
        else {
          // item is NOT an iterator - we cannot flatten
          yield item as U;
        }
      }
    };
    return new LazyCollection(iterable);
  }

  /**
   * Map the collection to Some and then filter and flatten to the containing value
   *
   * @param callbackfn
   * @returns
   */
  mapSome<U>(callbackfn: (value: T, currentIndex: number) => MaybeLike<U>): LazyCollection<U> {
    const self = this;
    const iterable = function * (): Iterable<U> {
      let i = 0;
      for (const item of self) {
        const next = callbackfn(item, i);
        if (next.isSome()) yield next.value;
        i += 1;
      }
    };
    return new LazyCollection(iterable);
  }

  /**
   * Pick only the Some values
   */
  flatSome<U>(this: LazyCollection<SomeLike<U>>,): LazyCollection<U>
  flatSome<U>(this: LazyCollection<MaybeLike<U>>,): LazyCollection<U>
  flatSome(this: LazyCollection<NoneLike>,): LazyCollection<never>
  flatSome<U>(this: LazyCollection<MaybeLike<U>>): LazyCollection<U> {
    return this
      .filter((maybe): maybe is SomeLike<U> => maybe.isSome())
      .map(item => item.value);
  }

  /**
   * Filter the pipeline
   *
   * @param callbackfn
   * @returns
   */
  filter<U extends T>(callbackfn: ((value: T, currentIndex: number) => value is U)): LazyCollection<U>
  filter(callbackfn: (value: T, currentIndex: number) => boolean): LazyCollection<T>
  filter(callbackfn: (value: T, currentIndex: number) => boolean): LazyCollection<T> {
    const self = this;
    function * iteratorable (): Iterable<T> {
      let i = 0;
      for (const item of self) {
        if (callbackfn(item, i)) yield item;
        i += 1;
      }
    }
    return new LazyCollection(iteratorable);
  }

  /**
   * Filter out the specific values
   *
   * @param value
   */
  exclude( ...values: readonly T[]): LazyCollection<T> {
    if (values.length === 0) {
      return new LazyCollection(this);
    }
    if (values.length === 1) {
      return this.filter((item) => item !== values[0]);
    }
    const _values = new Set(values);
    return this.filter((item) => !_values.has(item));
  }

  /**
   * Exclude the first "count" items of the pipeline
   *
   * @param this
   * @param count
   * @returns
   */
  skip(count?: number): LazyCollection<T> {
    const _count = count ?? 1;
    const self = this;
    function * iteratorable (): Iterable<T> {
      let i = 0;
      for (const item of self) {
        if (!(i < _count)) yield item;
        i += 1;
      }
    }
    return new LazyCollection(iteratorable);
  }

  /**
   * Exclude items that test positive
   *
   * @param this
   * @param regex
   * @returns
   */
  notMatching(regexp: RegExp | string): LazyCollection<T> {
    const _regex = typeof regexp === 'string'
      ? new RegExp(regexp)
      : regexp;
    return this.filter(item => !_regex.test(String(item)));
  }

  /**
   * Exclude undefined values from the pipeline
   *
   * @param this
   * @returns
   */
  notUndefined(): LazyCollection<T extends undefined ? never : T> {
    return this.exclude(undefined as $TODO<$ANY>) as $TODO<$ANY>;
  }

  /**
   * Exclude null values from the pipeline
   *
   * @param this
   * @returns
   */
  notNull(): LazyCollection<T extends null ? never : T> {
    return this.exclude(null as $TODO<$ANY>) as $TODO<$ANY>;
  }

  /**
   * Exclude nullable values from the pipeline
   *
   * @param this
   * @returns
   */
  notNullable(): LazyCollection<NonNullable<T>> {
    return this.filter(item => item != null) as $TODO<$ANY>;
  }

  /**
   * Filter in the specific value
   *
   * @param value
   */
  pick( ...values: readonly T[]): LazyCollection<T> {
    if (values.length === 0) {
      return new LazyCollection([]);
    }
    if (values.length === 1) {
      return this.filter((item) => item === values[0]);
    }
    const _values = new Set(values);
    return this.filter((item) => _values.has(item));
  }

  /**
   * Pluck the key from the values
   *
   * @param value
   */
  pluck<K extends keyof T>(key: K): LazyCollection<T[K]> {
    const self = this;
    function * iterateable(): Iterable<T[K]> {
      for (const item of self) {
        yield item[key]!;
      }
    }
    return new LazyCollection(iterateable);
  }

  /**
   * Match items against the regex
   *
   * Keep only matching items
   *
   * @param regexp
   * @returns
   */
  match(regexp: string | RegExp): LazyCollection<Maybe<RegExpMatchArray>> {
    const self = this;
    function * iterateable(): Iterable<Maybe<RegExpMatchArray>> {
      for (const item of self) {
        const result = String(item).match(regexp);
        if (result) yield Maybe.some(result);
        else yield Maybe.none;
      }
    }
    return new LazyCollection(iterateable);
  }

  /**
   * Match items against the regex
   *
   * Keep only matching items
   *
   * @param regexp
   * @returns
   */
  matchFlat(regexp: string | RegExp): LazyCollection<RegExpMatchArray> {
    const self = this;
    function * iterateable(): Iterable<RegExpMatchArray> {
      for (const item of self) {
        const result = String(item).match(regexp);
        if (result) yield result;
      }
    }
    return new LazyCollection(iterateable);
  }


  /**
   * Pick items that test positive
   *
   * @param this
   * @param regex
   * @returns
   */
  matching(regexp:  RegExp | string): LazyCollection<T> {
    const _regex = typeof regexp === 'string'
      ? new RegExp(regexp)
      : regexp;
    return this.filter(item => _regex.test(String(item)));
  }

  /**
   * Pick the first "count" items of the pipeline
   *
   * @param this
   * @param count
   * @returns
   */
  take(count?: number): LazyCollection<T> {
    const _count = count ?? 1;
    const self = this;
    function * iteratorable (): Iterable<T> {
      let i = 0;
      for (const item of self) {
        if (!(i >= _count)) yield item;
        i += 1;
      }
    }
    return new LazyCollection(iteratorable);
  }

  /**
   * Push items onto the pipeline
   *
   * @returns
   */
  push(...pushed: readonly T[]): LazyCollection<T> {
    const self = this;
    function * iteratorable (): Iterable<T> {
      yield * self;
      yield * pushed;
    }
    return new LazyCollection(iteratorable);
  }

  /**
   * Concatenate items onto the pipeline
   *
   * @returns
   */
  concat(items: Iterable<T>): LazyCollection<T> {
    return this.push(...items);
  }

  /**
   * Unshift items onto the pipeline
   *
   * @returns
   */
  unshift(...unshifted: readonly T[]): LazyCollection<T> {
    const self = this;
    function * iteratorable (): Iterable<T> {
      yield * unshifted;
      yield * self;
    }
    return new LazyCollection(iteratorable);
  }

  /**
   * Concatenate items onto the pipeline
   *
   * @param precat
   * @returns
   */
  precat(precat: Iterateable<T>): LazyCollection<T> {
    const self = this;
    function * iteratorable (): Iterable<T> {
      yield * toIterable(precat);
      yield * self;
    }
    return new LazyCollection(iteratorable);
  }

  /**
   * Sort items on the the pipeline
   *
   * Has sensible deafaults
   *
   * @param sort
   * @returns
   */
  sort(sort: SortDirection<T>): LazyCollection<T> {
    const self = this;

    let direction: 1 | -1 = 1;
    if (typeof sort === 'string') {
      const _sort = sort.toLowerCase().trim();
      if (_sort === 'asc') direction = 1;
      if (_sort === '1') direction = 1;
      if (_sort === 'desc') direction = -1;
      if (_sort === '-1') direction = -1;
    }
    else if (sort === 1) direction = 1;
    else if (sort === -1) direction = -1;

    const sortFn = typeof sort === 'function' ? sort : smartSort(direction);

    const iteratorable = function * (): Iterable<T> {
      // need to get the whole collection to sort
      // so may as-well cache it not already
      const items: T[] = Array
        .from(self._ensureCache())
        .sort(sortFn);
      yield * items;
    };

    return new LazyCollection(iteratorable);
  }

  /**
   * Reverse the pipeline
   *
   * @param this
   * @param
   * @returns
   */
  reverse(): LazyCollection<T> {
    const self = this;
    function * iteratorable(): Iterable<T> {
      // need to get the whole collection to sort
      // so may as-well cache it if not already
      const arr: T[] = Array
        .from(self._ensureCache())
        .reverse();
      yield * arr;
    }
    return new LazyCollection(iteratorable);
  }

  /**
   * Slice values from the pipeline
   *
   * @param this
   * @param start
   * @param end
   * @returns
   */
  slice(start?: number, end?: number): LazyCollection<T> {
    const self = this;
    const _start = start ?? 0;
    const _end = end;
    const doesEnd = end !== undefined;
    function * iteratorable(): Iterable<T> {
      let i = 0;
      for (const item of self) {
        if (doesEnd && (i >= (_end as number))) break;
        if (i >= _start) yield item;
        i += 1;
      }
    }
    return new LazyCollection(iteratorable);
  }

  /**
   * Zip with another iterable, stopping on first empty result
   *
   * @param this
   * @param right
   * @returns
   */
  zip<U>(right: Iterable<U>): LazyCollection<[T, U]> {
    const self = this;
    function * iteratorable (): Iterable<[T, U]> {
      const _left = self[Symbol.iterator]();
      const _right = right[Symbol.iterator]();
      while (true) {
        const _nextLeft = _left.next();
        const _nextRight = _right.next();
        if (_nextLeft.done || _nextRight.done) {
          // done
          break;
        }
        yield [_nextLeft.value, _nextRight.value,];
      }
    }
    return new LazyCollection(iteratorable);
  }

  /**
   * Zip with another iterable, stopping on last empty result
   *
   * @param this
   * @param right
   * @returns
   */
  zipLong<U>(right: Iterable<U>): LazyCollection<[Maybe<T>, Maybe<U>]> {
    const self = this;
    const iteratorable = function * (): Iterable<[Maybe<T>, Maybe<U>]> {
      const _left = self[Symbol.iterator]();
      const _right = right[Symbol.iterator]();
      while (true) {
        const _nextLeft = _left.next();
        const _nextRight = _right.next();
        if (_nextLeft.done && _nextRight.done) {
          // done
          break;
        }
        else if (_nextLeft.done) {
          // only left done
          yield [Maybe.none, Maybe.some(_nextRight.value),];
        }
        else if (_nextRight.done) {
          // only left done
          yield [Maybe.some(_nextLeft.value), Maybe.none,];
        }
        else {
          // neither done
          yield [Maybe.some(_nextLeft.value), Maybe.some(_nextRight.value),];
        }
      }
    };
    return new LazyCollection(iteratorable);
  }

  /**
   * Reduce the pipeline
   *
   * @param this
   * @param
   * @returns
   */
  reduce<U>(
    callbackfn: ((previousValue: T, currentValue: U, currentIndex: number) => U),
    initial: U,
  ): U {
    let current: U = initial;
    let i = 0;
    for (const item of this) {
      current = callbackfn(item, current, i),
      i += 1;
    }
    return current;
  }

  /**
   * Reduce Right the pipeline
   *
   * @param this
   * @param
   * @returns
   */
  reduceRight<U>(
    callbackfn: ((previousValue: T, currentValue: U, currentIndex: number) => U),
    initial: U,
  ): U {
    let current: U = initial;
    let i = 0;
    for (const item of this.reverse()) {
      current = callbackfn(item, current, i),
      i += 1;
    }
    return current;
  }

  /**
   * Join the pipeline into a string
   *
   * @param this
   * @param
   * @returns
   */
  join(separator?: string): string {
    let result = '';
    let first = true;
    for (const item of this) {
      if (!first && separator) {
        result += separator + String(item);
      } else {
        first = false;
        result += String(item);
      }
    }
    return result;
  }

  /**
   * Is every callback true?
   *
   * @param this
   * @param callbackfn
   * @returns
   */
  every(callbackfn: (value: T, currentIndex: number) => boolean): boolean {
    let i = 0;
    for (const item of this) {
      if (!callbackfn(item, i)) return false;
      i += 1;
    }
    return true;
  }

  /**
   * Is some value true?
   *
   * @param this
   * @param callbackfn
   * @returns
   */
  some(callbackfn: (value: T, currentIndex: number) => boolean): boolean {
    let i = 0;
    for (const item of this) {
      if (callbackfn(item, i)) return true;
      i += 1;
    }
    return false;
  }

  /**
   * Remove non-unique items from the pipeline
   *
   * @param this
   * @returns
   */
  unique(): LazyCollection<T> {
    return new LazyCollection(this.toSet());
  }

  /**
   * Find an item in the iterable
   */
  find(callbackfn: (value: T, currentIndex: number) => boolean): Maybe<T> {
    const arr = this._ensureCache();
    let result: Maybe<T> = Maybe.none;
    arr.find(function findItem(item, index) {
      if (callbackfn(item, index)) {
        result = Maybe.some(item);
        return true;
      }
      return false;
    });
    return result;
  }

  /**
   * Get the current size of the pipeline if run
   */
  getSize(): number {
    return this
      ._ensureCache()
      .length;
  }

  /**
   * Find an index of an item in the iterable
   */
  findIndex(callbackfn: (value: T, currentIndex: number) => boolean): Maybe<number> {
    const arr = this._ensureCache();
    let result: Maybe<number> = Maybe.none;
    arr.findIndex(function findItemIndex(item, index) {
      if (callbackfn(item, index)) {
        result = Maybe.some(index);
        return true;
      }
      return false;
    });
    return result;
  }

  /**
   * Get the index of a value
   */
  indexOf(value: T): Maybe<number> {
    const result = this._ensureCache().indexOf(value);
    if (result === -1) return Maybe.none;
    return Maybe.some(result);
  }

  /**
   * Keep only values less than the given value
   *
   * @param value
   * @returns
   */
  lt(value: Orderable): LazyCollection<T> {
    const _value = Number(value);
    return this.filter(item => {
      const number = Number(item);
      if (Number.isNaN(item)) return false;
      return number < _value;
    });
  }

  /**
   * Keep only values less than or equal to the given value
   *
   * @param value
   * @returns
   */
  lte(value: Orderable): LazyCollection<T> {
    const _value = Number(value);
    return this.filter(item => {
      const number = Number(item);
      if (Number.isNaN(item)) return false;
      return number <= _value;
    });
  }

  /**
   * Filter in values less than the given value
   *
   * @param value
   * @returns
   */
  gt(value: Orderable): LazyCollection<T> {
    const _value = Number(value);
    return this.filter(item => {
      const number = Number(item);
      if (Number.isNaN(item)) return false;
      return number > _value;
    });
  }

  /**
   * Keep only values greater than or equal to the given value
   *
   * @param value
   * @returns
   */
  gte(value: Orderable): LazyCollection<T> {
    const _value = Number(value);
    return this.filter(item => {
      const number = Number(item);
      if (Number.isNaN(item)) return false;
      return number >= _value;
    });
  }

  /**
   * Filter in values less than the given value
   *
   * @param value
   * @returns
   */
  btw(left: Betweenable, right: Betweenable): LazyCollection<T> {
    const _left = toBetweenable(left);
    const _right = toBetweenable(right);

    return this.filter(item => {
      const number = Number(item);
      if (Number.isNaN(item)) return false;
      return ((_left.inclusive
        ? number >= _left.value
        : number > _left.value)
      && (_right.inclusive
        ? number <= _right.value
        : number <_right.value));
    });
  }


  /**
   * Get the n'th item in the pipeline if run
   *
   * iterates over the entire iterable until the index
   * this is a heavy operation
   *
   * if you need index access, consider using @nkp/collection
   * or arrays instead
   *
   * @param index
   * @returns
   */
  at(index: number): Maybe<T> {
    const arr = this._ensureCache();

    // shortcut for arrays
    if (index >= 0) {
      if (index >= arr.length) return Maybe.none;
      return Maybe.some(arr[index]!);
    }

    if (-index > arr.length) return Maybe.none;
    return Maybe.some(arr[arr.length + index]!);
  }

  /**
   * Trasnform the Pipeline to an array
   *
   * @returns
   */
  toArray(): T[] {
    return this._ensureCache();
  }

  /**
   * Trasnform the Pipeline to an array
   *
   * @returns
   */
  toSet(): Set<T> {
    return new Set(this._ensureCache());
  }

  /**
   * Transform the LazyCollection into a Map
   *
   * @param this
   */
  toMap<K, V>(this: LazyCollection<[K, V]>): Map<K, V> {
    return new Map(this._ensureCache());
  }

  /**
   * Write the collection to string
   */
  toString(): string {
    // first 3 items
    const size = this.getSize();
    const display = this.slice(0, 3);

    if (size === 0)
      return `[object ${this.constructor.name} (${this.getSize()}) {}]`;

    if (size <= 3)
      return `[object ${this.constructor.name} (${this.getSize()}) { ${display.join(', ')} }]`;

    return `[object ${this.constructor.name} (${this.getSize()}) { ${display.join(', ')}... }]`;
  }
}

