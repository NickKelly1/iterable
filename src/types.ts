import { Collection } from './collection';
import { LazyCollection } from './lazy-collection';

export interface IterableCreator<T> {
  ():
    | Array<T>
    | ReadonlyArray<T>
    | Collection<T>
    | Iterable<T>
    | LazyCollection<T>
    | Set<T>
}

export type Iterateable<T> =
  | IterableCreator<T>
  | Array<T>
  | ReadonlyArray<T>
  | Collection<T>
  | Iterable<T>
  | LazyCollection<T>
  | Set<T>
;

export type Orderable = number | Date;
export type BetweenableArray = [ value: Orderable, inclusive?: boolean ];
export type BetweenableObject = { value: Orderable; inclusive?: boolean; };
export type Betweenable =
  | Orderable
  | BetweenableArray
  | BetweenableObject
;

export type SortDirection<T> =
  | 'asc' | 'ASC'
  | 'desc' | 'DESC'
  | 1 | '1'
  | -1 | '-1'
  | ((a: T, b: T) => number)
;

export interface Unary<T, R> { (arg: T): R; }
