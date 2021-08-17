import { Maybe } from '@nkp/maybe';
import { Pipeline } from '../pipeline/pipeline';
import { Pipelineable } from '../utils/types';

// declare URI
export const URI_RIVER = 'River';
export type URI_RIVER = typeof URI_RIVER;

// register for usage as higher kind type
declare module '../HKT' {
  interface URIToKind<A> {
    readonly [URI_RIVER]: River<A>;
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
export class River<T> extends Pipeline<T> {
  public override readonly _URI = URI_RIVER;

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
  forEach(callbackfn: (item: T, i: number, stop: () => void) => unknown): void {
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
  item(index: number): Maybe<T> {
    if (index >= 0) {
      if (index >= this.root.length) return Maybe.none;
      return Maybe.some(this.root[index]!);
    } else {
      if (-index > this.root.length) return Maybe.none;
      return Maybe.some(this.root[this.root.length - index]!);
    }
  }
}
