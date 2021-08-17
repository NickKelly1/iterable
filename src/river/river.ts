import { Maybe } from '@nkp/maybe';
import { HKT, Kind, URIs } from '../HKT';
import { Pipeline } from '../pipeline/pipeline';
import { Pipelineable } from '../utils/types';

// declare URI
export const RiverURI = 'River';
export type RiverURI = typeof RiverURI;

// register for usage as higher kind type
declare module '../HKT' {
  interface URIToKind<A> {
    readonly [RiverURI]: River<A>;
  }
}

/**
 * Iterable River
 *
 * Items are always flowing down the river.
 *
 *  - memory: heavy
 *  - cpu: light
 *
 * Items are written to and held in memory, versus the lake
 * where they're created only on-demand.
 */
export class River<T> extends Pipeline<T> implements HKT<RiverURI, T> {
  public override readonly URI = RiverURI;

  protected readonly root: T[];

  constructor(root: Pipelineable<T>) {
    super();
    if (typeof root === 'function') root = root();
    if (Array.isArray(root)) this.root = root;
    else this.root = Array.from(root);
  }

  /**
   * @inheritdoc
   */
  * [Symbol.iterator](): IterableIterator<T> {
    yield * this.root;
  }


  /**
   * Fire callback for each element of the Pipeline
   *
   * @param callbackfn
   */
  forEach<H1 extends URIs>(
    this: Kind<H1, T>,
    callbackfn: (item: T, i: number, stop: () => void) => unknown
  ): Kind<H1, T> {
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
    return this.root.length;
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
  item<H1 extends URIs>(
    this: Kind<H1, T>,
    index: number
  ): Maybe<T> {
    const self = this as River<T>;
    if (index >= 0) {
      if (index >= self.root.length) return Maybe.none;
      return Maybe.some(self.root[index]!);
    } else {
      if (-index > self.root.length) return Maybe.none;
      return Maybe.some(self.root[self.root.length - index]!);
    }
  }
}
