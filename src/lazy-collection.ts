import { Maybe, None, Some } from '@nkp/maybe';
import { smartSort } from './utils';
import { Pipelineable, unpipeline } from './types';
import { $ANY, $TODO } from './utility-types';

/**
 * Lazy Collection
 */
export class LazyCollection<T> implements Iterable<T> {
  /**
   * Create a new LazyCollection
   */
  static from<T>(pipelineable: Pipelineable<T>): LazyCollection<T> {
    return new LazyCollection(pipelineable);
  }

  /**
   * Create a LazyCollection
   *
   * @param pipelineable
   */
  constructor(protected readonly pipelineable: Pipelineable<T>) {
    //
  }

  /**
   * Get the iterable instance
   *
   * @returns
   */
  protected getIterable(): Iterable<T> {
    return unpipeline(this.pipelineable);
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
   * Fire callback for each element of the Pipeline
   *
   * @param callbackfn
   */
  forEach(callbackfn: (item: T, i: number) => unknown): LazyCollection<T> {
    let i = 0;
    for (const item of this) {
      i += 1;
      callbackfn(item, i);
    }
    return this;
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
   * Flat map the pipeline
   *
   * Flatly map pipeline kind S to V, and type T to U
   *
   * @param callbackfn
   * @returns
   */
  flatMap<U>(callbackfn: (value: T, currentIndex: number) => Pipelineable<U>): LazyCollection<U> {
    const self = this;
    const iterable = function * (): Iterable<U> {
      let i = 0;
      for (const item of self) {
        yield * unpipeline(callbackfn(item, i));
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
   * Pick only the Some values
   */
  flatSome<U>(this: LazyCollection<Some<U>>,): LazyCollection<U>
  flatSome<U>(this: LazyCollection<Maybe<U>>,): LazyCollection<U>
  flatSome(this: LazyCollection<None>,): LazyCollection<None>
  flatSome<U>(this: LazyCollection<Maybe<U>>): LazyCollection<U> {
    return this
      .filter(Maybe.isSome)
      .map(item => item.value) as LazyCollection<U>;
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
  exclude( ...values: T[]): LazyCollection<T> {
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
  notMatching(regex: RegExp): LazyCollection<T> {
    return this.filter(item => !regex.test(String(item)));
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
    return this.filter(item => item != (null as $TODO<$ANY>)) as $TODO<$ANY>;
  }

  /**
   * Filter in the specific value
   *
   * @param value
   */
  pick( ...values: T[]): LazyCollection<T> {
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
   * Pick items that test positive
   *
   * @param this
   * @param regex
   * @returns
   */
  matching(regex: RegExp): LazyCollection<T> {
    return this.filter(item => regex.test(String(item)));
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
  push(...pushed: T[]): LazyCollection<T> {
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
  unshift(...unshifted: T[]): LazyCollection<T> {
    const self = this;
    function * iteratorable (): Iterable<T> {
      yield * unshifted;
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
  sort(
    sort:
      | 'asc' | 'ASC'
      | 'desc' | 'DESC'
      | 1 | '1'
      | -1 | '-1'
      | ((a: T, b: T) => number)
  ): LazyCollection<T> {
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
      const items: T[] = [];
      for (const item of self) {
        items.push(item);
      }
      items.sort(sortFn);
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
      const arr: T[] = self.toArray().reverse();
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
  zipShort<U>(right: Iterable<U>): LazyCollection<[T, U]> {
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
  every(
    callbackfn: (value: T, currentIndex: number) => boolean,
  ): boolean {
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
  some(
    callbackfn: (value: T, currentIndex: number) => boolean,
  ): boolean {
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
    const iterable = this.getIterable();
    let i = 0;
    for (const item of iterable) {
      if (callbackfn(item, i)) return Maybe.some(item);
      i += 1;
    }
    return Maybe.none;
  }

  /**
   * Get the current size of the pipeline if run
   */
  getSize(): number {
    const iterable = this.getIterable();
    if (Array.isArray(iterable)) return iterable.length;
    if (iterable instanceof Set) return iterable.size;
    if (iterable instanceof Map) return iterable.size;
    let i = 0;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _ of iterable) { i += 1; }
    return i;
  }

  /**
   * Find an index of an item in the iterable
   */
  findIndex(callbackfn: (value: T, currentIndex: number) => boolean): Maybe<number> {
    const iterable = this.getIterable();
    let i = 0;
    for (const item of iterable) {
      if (callbackfn(item, i)) return Maybe.some(i);
      i += 1;
    }
    return Maybe.none;
  }

  /**
   * Get the index of a value
   */
  indexOf(value: T): Maybe<number> {
    const self = this;
    const iterable = self.getIterable();

    // shortcut for arrays
    if (Array.isArray(iterable)) {
      const index = iterable.indexOf(value);
      if (index !== -1) return Maybe.some(index);
      return Maybe.none;
    } else {
      let i = 0;
      for (const item of iterable) {
        if (item === value) return Maybe.some(i);
        i += 1;
      }
      return Maybe.none;
    }
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
    const iterable = this.getIterable();

    // shortcut for arrays
    if (Array.isArray(iterable)) {
      if (index >= 0) {
        if (index >= iterable.length) return Maybe.none;
        return Maybe.some(iterable[index]);
      } else {
        if (-index > iterable.length) return Maybe.none;
        return Maybe.some(iterable[iterable.length - index]);
      }
    }

    // long route for non-arrays
    let i = 0;
    if (i >= 0) {
      // seek to index
      for (const item of iterable) {
        if (i === index) return Maybe.some(item);
        i += 1;
      }
      return Maybe.none;
    } else {
      // i is negative
      // collect as array and reverse index
      const arr = this.toArray();
      if (-index > arr.length) return Maybe.none;
      return Maybe.some(arr[arr.length - index]!);
    }
  }

  /**
   * Trasnform the Pipeline to an array
   *
   * @returns
   */
  toArray(): T[] {
    const array: T[] = Array.from(this);
    return array;
  }

  /**
   * Trasnform the Pipeline to an array
   *
   * @returns
   */
  toSet(): Set<T> {
    const set: Set<T> = new Set(Array.from(this));
    return set;
  }

  /**
   * Transform the LazyCollection into a Map
   *
   * @param this
   */
  toMap<K, V>(this: LazyCollection<[K, V]>): Map<K, V> {
    return new Map(this);
  }
}
