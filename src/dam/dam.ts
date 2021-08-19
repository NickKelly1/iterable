import { GetURI, HKT, Kind, URIs } from '../HKT';
import { Repeatable } from '../repeatable/repeatable';
import { Pipelineable } from '../utils/types';
import { $TODO } from '../utils/utility-types';

// declare URI
export const DamURI = 'Dam';
export type DamURI = typeof DamURI;

// register for usage as higher kind type
declare module '../HKT' {
  interface URIToKind<A> {
    readonly [DamURI]: Dam<A>;
  }
}

/**
 * Iterable Dam
 *
 * Items rest calmy in the dam until the foodgates open.
 *
 *  - memory: light
 *  - cpu: heavy
 *
 * Items are created on-demand when an endpoint function like toArray(),
 * toSet(), item(...), or getSize(...) are called.
 * Items are otherwise not stored in the Dam's memory
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
 * new Dam(map.values());
 * ```
 *
 * Good:
 * ```ts
 * const map = new Map([[1, {}, [2, {}], [3, {}]]);
 * new Dam(() => map.values())
 * ```
 */
export class Dam<T> extends Repeatable<T> implements HKT<DamURI, T> {
  public override readonly URI = DamURI;

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
  static record<T>(iterable: Iterable<T>): Dam<T> {
    return new Dam<T>(Array.from(iterable));
  }

  /**
   * Collect the Dam's contents
   *
   * Runs all transformations and rebases to an array of the resulting items
   */
  rebase<H1 extends URIs = GetURI<this>>(this: Kind<H1, T>): Kind<H1, T> {
    return new (this.constructor as $TODO)((this as Dam<T>).toArray());
  }
}
