import { Collection } from './collection';
import { LazyCollection } from './lazy-collection';
import { Iterateable } from './types';

export * from './types';
export * from './collection';
export * from './collection.interface';
export * from './lazy-collection';

/**
 * Create a Collcetion
 *
 * @param value
 * @returns
 */
export function collect<T>(value: Iterateable<T>): Collection<T> {
  return Collection.from(value);
}

/**
 * Create a Lazy Collection
 *
 * @param value
 * @returns
 */
export function lazyCollect<T>(value: Iterateable<T>): LazyCollection<T> {
  return LazyCollection.from(value);
}
