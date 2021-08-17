import { Maybe } from '@nkp/maybe';
import { Kind, URIS } from '../HKT';
import { Pipeline } from '../pipeline/pipeline';
import { Pipelineable } from '../utils/types';
import { $TODO } from '../utils/utility-types';

// declare URI
export const URI_LAKE = 'Lake';
export type URI_LAKE = typeof URI_LAKE;

// register for usage as higher kind type
declare module '../HKT' {
  interface URIToKind<A> {
    readonly [URI_LAKE]: Lake<A>;
  }
}

/**
 * Iterable Lake
 *
 * Items rest calmy in the lake until the foodgates open.
 *
 *  - memory: light
 *  - cpu: heavy
 *
 * Items are created on-demand when an endpoint function
 * like toArray(), toSet(), item(...), or getSize(...) are called.
 * Items are otherwise not stored in memory
 *
 * Do ! NOT ! use directly with exhaustive iterators like:
 *  - Array.prototype.values
 *  - Set.prototype.values
 *  - Map.prototype.keys
 *  - Map.prototype.values
 *  - Map.prototype.entries
 *  - ...
 * as these iterators, once exhausted, cannot be reset to their initial state
 * and will stop producing values
 *
 * However, you may use a factory function that returns an iterator
 *
 * Bad:
 * ```ts
 * const map = new Map([[1, {}, [2, {}], [3, {}]])
 * new Lake(map.values());
 * ```
 *
 * Good:
 * ```ts
 * const map = new Map([[1, {}, [2, {}], [3, {}]]);
 * new Lake(() => map.values())
 * ```
 */
export class Lake<T> extends Pipeline<T> {
  public override readonly _URI = URI_LAKE;

  constructor(protected readonly root: Pipelineable<T>) {
    super();
  }

  /**
   * Create a Repeatable from a recording
   *
   * @param Iterable
   * @param
   * @param T
   */
  static record<T>(iterable: Iterable<T>): Lake<T> {
    return new Lake<T>(Array.from(iterable));
  }

  /**
   * @inheritdoc
   */
  * [Symbol.iterator](): IterableIterator<T> {
    switch (typeof this.root) {
    case 'function':
      yield * this.root();
      break;
    case 'object':
      yield * this.root;
      break;
    }
  }

  /**
   * Collect the lakes contents
   *
   * Runs all transformations and rebases to an array of the resulting items
   */
  rebase<S extends URIS>(this: Kind<S, T>): Kind<S, T> {
    return new (this.constructor as $TODO)(this.toArray());
  }

  /**
   * Fire callback for each element of the Pipeline
   *
   * @param callbackfn
   */
  forEach<S extends URIS>(
    this: Kind<S, T>,
    callbackfn: (item: T, i: number, stop: () => void) => unknown,
  ): Kind<S, T> {
    let stopped = false;
    const stop = () => { stopped = true; };
    let i = 0;
    for (const item of this) {
      i += 1;
      callbackfn(item, i, stop);
      if (stopped) break;
    }
    return this;
  }

  /**
   * Get the first value
   *
   * @returns
   */
  first(): Maybe<T> {
    return this.item(0);
  }

  /**
   * Get the current size of the pipeline if run
   */
  getSize(): number {
    if (Array.isArray(this.root)) return this.root.length;
    if (this.root instanceof Set) return this.root.size;
    if (this.root instanceof Map) return this.root.size;
    let i = 0;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _ of this) { i += 1; }
    return i;
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
  item(index: number): Maybe<T> {
    // shortcut for arrays
    if (Array.isArray(this.root)) {
      if (index >= 0) {
        if (index >= this.root.length) return Maybe.none;
        return Maybe.some(this.root[index]);
      } else {
        if (-index > this.root.length) return Maybe.none;
        return Maybe.some(this.root[this.root.length - index]);
      }
    }

    let i = 0;
    if (i >= 0) {
      // seek to index
      for (const item of this) {
        if (i === index) return Maybe.some(item);
        i += 1;
      }
      return Maybe.none;
    } else {
      // i is negative
      // collect as array and reverse index
      const arr = (this as Kind<URI_LAKE, T>).toArray();
      if (-index > arr.length) return Maybe.none;
      return Maybe.some(arr[arr.length - index]!);
    }
  }
}
