import { Maybe } from '@nkp/maybe';
import { Kind, URIS } from '../HKT';
import { Pipeline } from '../pipeline/pipeline';
import { Lake } from '../lake/lake';
import { Pipelineable } from '../utils/types';
import { River } from '../river/river';

// declare URI
export const URI_HOSE = 'Hose';
export type URI_HOSE = typeof URI_HOSE;

// register for usage as higher kind type
declare module '../HKT' {
  interface URIToKind<A> {
    readonly [URI_HOSE]: Hose<A>;
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
export class Hose<T> extends Pipeline<T> implements IterableIterator<T> {
  public readonly _URI = URI_HOSE;

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
    switch (typeof root) {
    case 'function':
      this.iterable = root()[Symbol.iterator]();
      break;
    case 'object':
      this.iterable = root[Symbol.iterator]();
      break;
    }
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
  take(): Maybe<T> {
    const next = this.next();
    if (next.done) return Maybe.none;
    return Maybe.some(next.value);
  }

  /**
   * Exhaust the pipeline
   *
   * @param callbackfn
   */
  exhaust(callbackfn: (item: T, i: number, stop: () => void) => unknown): void {
    let stopped = false;
    const stop = () => { stopped = true; };
    let i = 0;
    for (const item of this) {
      i += 1;
      callbackfn(item, i, stop);
      if (stopped) break;
    }
  }

  /**
   * Convert the hose into a lake
   *
   * @returns
   */
  toLake<S extends URIS = this['_URI']>(this: Kind<S, T>): Lake<T> {
    return new Lake(this.toArray());
  }

  /**
   * Convert the hose into a river
   *
   * @returns
   */
  toRiver<S extends URIS = this['_URI']>(this: Kind<S, T>): River<T> {
    return new River(this.toArray());
  }
}
