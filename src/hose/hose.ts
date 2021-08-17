import { Maybe } from '@nkp/maybe';
import { HKT, Kind, URIs } from '../HKT';
import { Pipeline } from '../pipeline/pipeline';
import { Lake } from '../lake/lake';
import { Pipelineable, unpipeline } from '../utils/types';
import { River } from '../river/river';

// declare URI
export const HoseURI = 'Hose';
export type HoseURI = typeof HoseURI;

// register for usage as higher kind type
declare module '../HKT' {
  interface URIToKind<A> {
    readonly [HoseURI]: Hose<A>;
  }
}

/**
 * Iterable Hose
 *
 * Items rest calmy in the lake and shuts off once completed
 * Once completed it cannot be restarted
 *
 *  - memory: light
 *  - cpu: light
 *
 * Items are created on-demand when an endpoint function
 * like exhaust(), toArray(), toSet()
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
 * new Hose(map.values());
 * ```
 *
 * Good:
 * ```ts
 * const map = new Map([[1, {}, [2, {}], [3, {}]]);
 * new Hose(() => map.values())
 * ```
 */
export class Hose<T> extends Pipeline<T> implements IterableIterator<T>, HKT<HoseURI, T> {
  public readonly URI = HoseURI;

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
    const self = this as Hose<T>;
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
   * Convert the hose into a lake
   *
   * @returns
   */
  toLake<S extends URIs>(this: Kind<S, T>): Lake<T> {
    return new Lake(this.toArray());
  }

  /**
   * Convert the hose into a river
   *
   * @returns
   */
  toRiver<S extends URIs>(this: Kind<S, T>): River<T> {
    return new River(this.toArray());
  }
}
