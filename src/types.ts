export interface IterableCreator<T> { (): Iterable<T>; }
export type Iterateable<T> =
  | Iterable<T>
  | IterableCreator<T>
;

export type Orderable = number | Date;
export type Betweenable =
  | Orderable
  | [ value: Orderable, inclusive?: boolean ]
  | { value: Orderable; inclusive?: boolean; }
;

export type SortDirection<T> =
  | 'asc' | 'ASC'
  | 'desc' | 'DESC'
  | 1 | '1'
  | -1 | '-1'
  | ((a: T, b: T) => number)
;
