import { Collection } from './collection';
import { LazyCollection } from './lazy-collection';
import { Pipelineable } from './types';


/**
 * Create a Collcetion
 *
 * @param value
 * @returns
 */
export function collect<T>(value: Pipelineable<T>): Collection<T> {
  return Collection.from(value);
}

/**
 * Create a Lazy Collection
 *
 * @param value
 * @returns
 */
export function collectLazy<T>(value: Pipelineable<T>): LazyCollection<T> {
  return LazyCollection.from(value);
}
