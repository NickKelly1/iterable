export interface IterableCreator<T> { (): Iterable<T>; }
export type Pipelineable<T> =
  | Iterable<T>
  | IterableCreator<T>
;


export function unpipeline<T>(pipelineable: Pipelineable<T>): Iterable<T> {
  if (typeof pipelineable === 'function') return pipelineable();
  return pipelineable;
}
