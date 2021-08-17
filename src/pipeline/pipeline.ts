import { Kind, URIS } from '../HKT';
import { $TODO } from '../utils/utility-types';


/**
 * Extendable base Pipeline
 *
 * To extend, register your subclass as a higher kind type - view ./HKT.ts
 */
export abstract class Pipeline<T> implements Iterable<T> {
  public abstract readonly _URI: URIS;
  public readonly _T!: T;

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
  map<U, S extends URIS = this['_URI']>(
    this: Kind<S, T>,
    callbackfn: (item: T) => U
  ): Kind<S, U> {
    const self = this;
    // const self = this;
    const iteratorable = function * (): Iterable<U> {
      for (const item of self) {
        yield callbackfn(item);
      }
    };
    return new (this.constructor as $TODO)(iteratorable) as Kind<S, U>;
  }

  /**
   * Flat map the pipeline
   *
   * Flatly map pipeline kind S to V, and type T to U
   *
   * @param callbackfn
   * @returns
   */
  flatMap<U, V extends URIS = this['_URI'], S extends URIS = this['_URI']>(
    this: Kind<S, T>,
    callbackfn: (item: T) => Kind<V, U>,
  ): Kind<S, U> {
    const self = this;
    const iteratorable = function * (): Iterable<U> {
      for (const item of self) {
        yield * callbackfn(item);
      }
    };
    return new (this.constructor as $TODO)(iteratorable) as Kind<S, U>;
  }

  /**
   * Flatten the pipeline
   *
   * @param this
   * @returns
   */
  flatten<U, V extends URIS = this['_URI'], S extends URIS = this['_URI']>(
    this: Kind<S, Kind<V, U>>,
  ): Kind<V, U> {
    const self = this;
    const iteratorable = function * (): Iterable<U> {
      for (const item of self) {
        yield * item;
      }
    };
    return new (this.constructor as $TODO)(iteratorable) as Kind<V, U>;
  }

  /**
   * Filter the pipeline
   *
   * @param callbackfn
   * @returns
   */
  filter<S extends URIS = this['_URI']>(this: Kind<S, T>, callbackfn: (item: T) => boolean): Kind<S, T> {
    const self = this;
    const iteratorable = function * () {
      for (const item of self) {
        if (callbackfn(item)) yield item;
      }
    };
    return new (this.constructor as $TODO)(iteratorable);
  }

  /**
   * Filter out the specific values
   *
   * @param value
   */
  exclude<S extends URIS = this['_URI']>(this: Kind<S, T>, ...values: T[]): Kind<S, T> {
    const _values = new Set(values);
    return this.filter((item) => !_values.has(item));
  }

  /**
   * Filter in the specific value
   *
   * @param value
   */
  pick<S extends URIS = this['_URI']>(this: Kind<S, T>, ...values: T[]): Kind<S, T> {
    const _values = new Set(values);
    return this.filter((item) => _values.has(item));
  }

  /**
   * Push items onto the pipeline
   *
   * @returns
   */
  push<S extends URIS = this['_URI']>(this: Kind<S, T>, ...pushed: T[]): Kind<S, T> {
    const self = this;
    const pushIterator = function * () {
      yield * self;
      yield * pushed;
    };
    return new (this.constructor as $TODO)(pushIterator);
  }

  /**
   * Concatenate items onto the pipeline
   *
   * @returns
   */
  concat<S extends URIS = this['_URI']>(this: Kind<S, T>, items: Iterable<T>): Kind<S, T> {
    return this.push(...items);
  }

  /**
   * Sort items on the the pipeline
   *
   * Has sensible deafaults
   *
   * @param sort
   * @returns
   */
  sort<S extends URIS = this['_URI']>(
    this: Kind<S, T>,
    sort:
      | 'asc' | 'ASC'
      | 'desc' | 'DESC'
      | 1 | '1'
      | -1 | '-1'
      | ((a: T, b: T) => number)
  ): Kind<S, T> {
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

    const iteratorable = function * () {
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
   * Trasnform the collection to an array
   *
   * @returns
   */
  toArray<S extends URIS = this['_URI']>(this: Kind<S, T>): T[] {
    const array: T[] = Array.from(this);
    return array;
  }

  /**
   * Trasnform the collection to an array
   *
   * @returns
   */
  toSet<S extends URIS = this['_URI']>(this: Kind<S, T>): Set<T> {
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
