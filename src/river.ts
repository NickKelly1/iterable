import { HKT } from './HKT';
import { Repeatable } from './repeatable';
import { Pipelineable, unpipeline } from './types';

// declare URI
export const RiverURI = 'River';
export type RiverURI = typeof RiverURI;

// register for usage as higher kind type
declare module './HKT' {
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
 * Items are written to and held in memory
 */
export class River<T> extends Repeatable<T> implements HKT<RiverURI, T> {
  public override readonly URI = RiverURI;

  protected readonly root: T[];

  constructor(root: Pipelineable<T>) {
    super();
    const unpiped = unpipeline(root);
    if (Array.isArray(unpiped)) this.root = unpiped;
    else this.root = Array.from(unpiped);
  }
}
