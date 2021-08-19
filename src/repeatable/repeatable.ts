import { Maybe } from '@nkp/maybe';
import { GetURI, Kind, URIs } from '../HKT';
import { Pipeline } from '../pipeline/pipeline';
import { Pipelineable, unpipeline } from '../utils/types';

// declare URI
export const RepeatableURI = 'Repeatable';
export type RepeatableURI = typeof RepeatableURI;

// register for usage as higher kind type
declare module '../HKT' {
  interface URIToKind<A> {
    readonly [RepeatableURI]: Repeatable<A>;
  }
}

/**
 * Extendable base Pipeline
 *
 * To extend, register your subclass as a higher kind type - view ./HKT.ts
 */
export abstract class Repeatable<T> extends Pipeline<T> {
  public abstract override readonly URI: URIs = RepeatableURI;
  public override readonly __T!: T;


  protected abstract readonly root: Pipelineable<T>;

  /**
   * Get the iterable instance
   *
   * @returns
   */
  protected getIterable(): Iterable<T> {
    return unpipeline((this as Repeatable<T>).root);
  }

  /**
   * @inheritdoc
   */
  * [Symbol.iterator](): IterableIterator<T> {
    yield * this.getIterable();
  }


  /**
   * Fire callback for each element of the Pipeline
   *
   * @param callbackfn
   */
  forEach<H1 extends URIs = GetURI<this>>(
    this: Kind<H1, T>,
    callbackfn: (item: T, i: number, stop: () => void) => unknown,
  ): Kind<H1, T> {
    const iterable = (this as Repeatable<T>).getIterable();
    let stopped = false;
    const stop = () => { stopped = true; };
    let i = 0;
    for (const item of iterable) {
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
  first<H1 extends URIs = GetURI<this>>(this: Kind<H1, T>): Maybe<T> {
    return (this as Repeatable<T>).at(0);
  }

  /**
   * Find an item in the iterable
   */
  find<H1 extends URIs = GetURI<this>>(
    this: Kind<H1, T>,
    callbackfn: (value: T, currentIndex: number) => boolean,
  ): Maybe<T> {
    const iterable = (this as Repeatable<T>).getIterable();
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
  getSize<H1 extends URIs = GetURI<this>>(this: Kind<H1, T>): number {
    const self = this as Repeatable<T>;
    const iterable = unpipeline(self.root);
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
  findIndex<H1 extends URIs = GetURI<this>>(
    this: Kind<H1, T>,
    callbackfn: (value: T, currentIndex: number) => boolean,
  ): Maybe<number> {
    const iterable = (this as Repeatable<T>).getIterable();
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
  indexOf<H1 extends URIs = GetURI<this>>(
    this: Kind<H1, T>,
    value: T,
  ): Maybe<number> {
    const self = this as Repeatable<T>;
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
      const arr = (this as Repeatable<T>).toArray();
      if (-index > arr.length) return Maybe.none;
      return Maybe.some(arr[arr.length - index]!);
    }
  }
}

