export interface IterableCreator<T> { (): Iterable<T>; }
export type Pipelineable<T> =
  | Iterable<T>
  | IterableCreator<T>
;
