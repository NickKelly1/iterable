import { Maybe } from '@nkp/maybe';
import { GetURI, Kind, URIs } from '../HKT';
import { Pipelineable, unpipeline } from '../utils/types';
import { $TODO } from '../utils/utility-types';

// declare URI
export const PipelineURI = 'Pipeline';
export type PipelineURI = typeof PipelineURI;

// register for usage as higher kind type
declare module '../HKT' {
  interface URIToKind<A> {
    readonly [PipelineURI]: Pipeline<A>;
  }
}

/**
 * Extendable base Pipeline
 *
 * To extend, register your subclass as a higher kind type - view ./HKT.ts
 */
export abstract class Pipeline<T> implements Iterable<T> {
  public abstract readonly URI: URIs = PipelineURI;
  public readonly __T!: T;

  /**
   * Iterate over the instance
   */
  abstract [Symbol.iterator](): IterableIterator<T>;

  /**
   * Map the pipeline
   *
   * Map within pipeline kind S from T to U
   *
   * @param callbackfn
   * @returns
   */
  map<U, H1 extends URIs = GetURI<this>>(
    this: Kind<H1, T>,
    callbackfn: (value: T, currentIndex: number) => U
  ): Kind<H1, U> {
    const self = this;
    // const self = this;
    function * iteratorable (): Iterable<U> {
      let i = 0;
      for (const item of self) {
        yield callbackfn(item, i);
        i += 1;
      }
    }
    return new (this.constructor as $TODO)(iteratorable) as Kind<H1, U>;
  }

  /**
   * Flat map the pipeline
   *
   * Flatly map pipeline kind S to V, and type T to U
   *
   * @param callbackfn
   * @returns
   */
  flatMap<U, H1 extends URIs = GetURI<this>>(
    this: Kind<H1, T>,
    callbackfn: (value: T, currentIndex: number) => Pipelineable<U>,
  ): Kind<H1, U> {
    const self = this;
    const iteratorable = function * (): Iterable<U> {
      let i = 0;
      for (const item of self) {
        yield * unpipeline(callbackfn(item, i));
        i += 1;
      }
    };
    return new (this.constructor as $TODO)(iteratorable) as Kind<H1, U>;
  }

  /**
   * Flatten the pipeline
   *
   * @param this
   * @returns
   */
  flat<H1 extends URIs = GetURI<this>>(
    this: Kind<H1, Iterable<T>>,
  ): Kind<H1, T> {
    const self = this;
    const iteratorable = function * (): Iterable<T> {
      for (const item of self) {
        yield * item;
      }
    };
    return new (this.constructor as $TODO)(iteratorable) as Kind<H1, T>;
  }

  /**
   * Filter the pipeline
   *
   * @param callbackfn
   * @returns
   */
  filter<H1 extends URIs = GetURI<this>>(
    this: Kind<H1, T>,
    callbackfn: (value: T, currentIndex: number) => boolean
  ): Kind<H1, T> {
    const self = this;
    function * iteratorable (): Iterable<T> {
      let i = 0;
      for (const item of self) {
        if (callbackfn(item, i)) yield item;
        i += 1;
      }
    }
    return new (this.constructor as $TODO)(iteratorable);
  }

  /**
   * Filter out the specific values
   *
   * @param value
   */
  exclude<H1 extends URIs = GetURI<this>>(
    this: Kind<H1, T>,
    ...values: T[]
  ): Kind<H1, T> {
    const _values = new Set(values);
    return this.filter((item) => !_values.has(item));
  }

  /**
   * Exclude items that test positive
   *
   * @param this
   * @param test
   * @returns
   */
  excludeTest<H1 extends URIs = GetURI<this>>(
    this: Kind<H1, T>,
    test: RegExp,
  ): Kind<H1, T> {
    return this.filter(item => !test.test(String(item)));
  }

  /**
   * Exclude undefined values from the pipeline
   *
   * @param this
   * @returns
   */
  excludeUndefined<H1 extends URIs = GetURI<this>>(
    this: Kind<H1, T>,
  ): Kind<H1, T extends undefined ? never : T> {
    return this.exclude(undefined as unknown as T) as Kind<H1, T extends undefined ? never : T>;
  }

  /**
   * Exclude null values from the pipeline
   *
   * @param this
   * @returns
   */
  excludeNull<H1 extends URIs = GetURI<this>>(
    this: Kind<H1, T>,
  ): Kind<H1, T extends null ? never : T> {
    return this.exclude(null as unknown as T) as Kind<H1, T extends null ? never : T>;
  }

  /**
   * Exclude nullable values from the pipeline
   *
   * @param this
   * @returns
   */
  excludeNullable<H1 extends URIs = GetURI<this>>(
    this: Kind<H1, T>,
  ): Kind<H1, NonNullable<T>> {
    return this.filter(item =>
      item !== (null as unknown as T)
      && item !== (undefined as unknown as T)) as Kind<H1, NonNullable<T>>;
  }

  /**
   * Filter in the specific value
   *
   * @param value
   */
  pick<H1 extends URIs = GetURI<this>>(
    this: Kind<H1, T>,
    ...values: T[]
  ): Kind<H1, T> {
    const _values = new Set(values);
    return this.filter((item) => _values.has(item));
  }

  /**
   * Pick items that test positive
   *
   * @param this
   * @param test
   * @returns
   */
  pickTest<H1 extends URIs = GetURI<this>>(
    this: Kind<H1, T>,
    test: RegExp,
  ): Kind<H1, T> {
    return this.filter(item => test.test(String(item)));
  }

  /**
   * Pick only the Some values
   */
  extractSome<U, H1 extends URIs = GetURI<this>>(
    this: Kind<H1, Maybe<U>>,
  ): Kind<H1, U> {
    return this
      .filter(item => item.isSome())
      .map(item => item.value!);
  }

  /**
   * Push items onto the pipeline
   *
   * @returns
   */
  push<H1 extends URIs = GetURI<this>>(
    this: Kind<H1, T>,
    ...pushed: T[]
  ): Kind<H1, T> {
    const self = this;
    function * pushIterator (): Iterable<T> {
      yield * self;
      yield * pushed;
    }
    return new (this.constructor as $TODO)(pushIterator);
  }

  /**
   * Concatenate items onto the pipeline
   *
   * @returns
   */
  concat<H1 extends URIs = GetURI<this>>(
    this: Kind<H1, T>,
    items: Iterable<T>
  ): Kind<H1, T> {
    return this.push(...items);
  }

  /**
   * Unshift items onto the pipeline
   *
   * @returns
   */
  unshift<H1 extends URIs = GetURI<this>>(
    this: Kind<H1, T>,
    ...unshifted: T[]
  ): Kind<H1, T> {
    const self = this;
    function * pushIterator (): Iterable<T> {
      yield * unshifted;
      yield * self;
    }
    return new (this.constructor as $TODO)(pushIterator);
  }

  /**
   * Sort items on the the pipeline
   *
   * Has sensible deafaults
   *
   * @param sort
   * @returns
   */
  sort<H1 extends URIs = GetURI<this>>(
    this: Kind<H1, T>,
    sort:
      | 'asc' | 'ASC'
      | 'desc' | 'DESC'
      | 1 | '1'
      | -1 | '-1'
      | ((a: T, b: T) => number)
  ): Kind<H1, T> {
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

    return new (this.constructor as $TODO)(iteratorable);
  }

  /**
   * Reverse the pipeline
   *
   * @param this
   * @param
   * @returns
   */
  reverse<H1 extends URIs = GetURI<this>>(
    this: Kind<H1, T>,
  ): Kind<H1, T> {
    const self = this as Pipeline<T>;
    function * iteratorable(): Iterable<T> {
      const arr: T[] = self.toArray().reverse();
      yield * arr;
    }
    return new (this.constructor as $TODO)(iteratorable);
  }

  /**
   * Slice values from the pipeline
   *
   * @param this
   * @param start
   * @param end
   * @returns
   */
  slice<H1 extends URIs = GetURI<this>>(
    this: Kind<H1, T>,
    start?: number,
    end?: number,
  ): Kind<H1, T> {
    const self = this as Pipeline<T>;
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
    return new (this.constructor as $TODO)(iteratorable);
  }

  /**
   * Zip with another iterable, stopping on first empty result
   *
   * @param this
   * @param right
   * @returns
   */
  zipShort<U, H1 extends URIs = GetURI<this>>(
    this: Kind<H1, T>,
    right: Iterable<U>,
  ): Kind<H1, [T, U]> {
    const self = this as Pipeline<T>;
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
    return new (this.constructor as $TODO)(iteratorable);
  }

  /**
   * Zip with another iterable, stopping on last empty result
   *
   * @param this
   * @param right
   * @returns
   */
  zipLong<U, H1 extends URIs = GetURI<this>>(
    this: Kind<H1, T>,
    right: Iterable<U>,
  ): Kind<H1, [Maybe<T>, Maybe<U>]> {
    const self = this as Pipeline<T>;
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
    return new (this.constructor as $TODO)(iteratorable);
  }

  /**
   * Reduce the pipeline
   *
   * @param this
   * @param
   * @returns
   */
  reduce<U, H1 extends URIs = GetURI<this>>(
    this: Kind<H1, T>,
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
  reduceRight<U, H1 extends URIs = GetURI<this>>(
    this: Kind<H1, T>,
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
  join<H1 extends URIs = GetURI<this>>(
    this: Kind<H1, T>,
    separator?: string,
  ): string {
    let result = '';
    let first = false;
    for (const item of this) {
      if (first && separator) {
        result += separator + String(item);
        first = false;
      }
      else result += String(item);
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
  every<H1 extends URIs = GetURI<this>>(
    this: Kind<H1, T>,
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
  some<H1 extends URIs = GetURI<this>>(
    this: Kind<H1, T>,
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
   * Trasnform the Pipeline to an array
   *
   * @returns
   */
  toArray<H1 extends URIs = GetURI<this>>(this: Kind<H1, T>): T[] {
    const array: T[] = Array.from(this);
    return array;
  }

  /**
   * Trasnform the Pipeline to an array
   *
   * @returns
   */
  toSet<H1 extends URIs = GetURI<this>>(this: Kind<H1, T>): Set<T> {
    const set: Set<T> = new Set(Array.from(this));
    return set;
  }
}


function smartSort(direction: -1 | 1) {
  return function sort<T>(a: T, b: T): number {
    if (a === b) return 0;
    if (a < b) return -direction;
    if (a > b) return direction;
    return 0;
  };
}
