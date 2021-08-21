import { Maybe } from '@nkp/maybe';
import { HKT, Kind, URIs } from './HKT';
import { Pipeline } from './pipeline';
import { Dam } from './dam';
import { Pipelineable, unpipeline } from './types';
import { River } from './river';

// declare URI
export const BucketURI = 'Bucket';
export type BucketURI = typeof BucketURI;

// register for usage as higher kind type
declare module './HKT' {
  interface URIToKind<A> {
    readonly [BucketURI]: Bucket<A>;
  }
}

/**
 * Iterable Bucket
 *
 * Items are at rest rest until they are poured out
 * Once emptied the Bucket cannot be replayed
 *
 *  - memory: light
 *  - cpu: light
 *
 * Items are created on-demand when an endpoint function like exhaust(),
 * toArray(), toSet() are called
 * Items are otherwise not stored in the Bucket's memory
 *
 * Primarily for use with exhaustable iterators like:
 *  - Array.prototype.values
 *  - Set.prototype.values
 *  - Map.prototype.keys
 *  - Map.prototype.values
 *  - Map.prototype.entries
 *  - ...
 * as these iterators, once exhausted, cannot be reset to their initial state
 * and will stop producing values
 *
 * Good:
 * ```ts
 * const map = new Map([[1, {}, [2, {}], [3, {}]]);
 * new Bucket(map.values())
 * ```
 */
export class Bucket<T> extends Pipeline<T> implements IterableIterator<T>, HKT<BucketURI, T> {
  public readonly URI = BucketURI;

  /**
   * Only use one iterable
   *
   * Once it's exhausted, we're done
   *
   * Even if the underlying iterator is repeatable, do not repeat it
   * That way we're always light-weight and our behavior is reproducable
   */
  protected readonly iterable: Iterator<T>;

  constructor(root: Pipelineable<T>) {
    super();
    this.iterable = unpipeline(root)[Symbol.iterator]();
  }

  /**
   * @inheritdoc
   */
  [Symbol.iterator](): IterableIterator<T> {
    return this;
  }

  /**
   * @inheritdoc
   */
  next(...args: [] | [undefined]): IteratorResult<T> {
    return this.iterable.next(...args);
  }

  /**
   * Take the next value
   */
  take<H1 extends URIs>(this: Kind<H1, T>): Maybe<T> {
    const self = this as Bucket<T>;
    const next = self.next();
    if (next.done) return Maybe.none;
    return Maybe.some(next.value);
  }

  /**
   * Exhaust the pipeline
   *
   * @param callbackfn
   */
  exhaust<H1 extends URIs>(
    this: Kind<H1, T>,
    callbackfn: (item: T, i: number, stop: () => void) => unknown,
  ): void {
    let stopped = false;
    const stop = () => { stopped = true; };
    let i = 0;
    for (const item of this) {
      callbackfn(item, i, stop);
      if (stopped) break;
      i += 1;
    }
  }

  /**
   * Convert the bucket into a dam
   *
   * @returns
   */
  toDam<S extends URIs>(this: Kind<S, T>): Dam<T> {
    return new Dam(this.toArray());
  }

  /**
   * Convert the Bucket into a River
   *
   * @returns
   */
  toRiver<S extends URIs>(this: Kind<S, T>): River<T> {
    return new River(this.toArray());
  }
}
