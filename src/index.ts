import { River } from './river/river';
import { Bucket } from './bucket/bucket';
import { Dam } from './dam/dam';
import { Pipelineable } from './utils/types';

export * from './pipeline/pipeline';
export * from './utils/types';
export * from './river/river';
export * from './dam/dam';
export * from './bucket/bucket';

/**
 * Create a river
 *
 * @param value
 * @returns
 */
export function toRiver<T>(value: Pipelineable<T>): River<T> {
  return new River(value);
}

/**
 * Create a bucket
 *
 * @param value
 * @returns
 */
export function toBucket<T>(value: Pipelineable<T>): Bucket<T> {
  return new Bucket(value);
}

/**
 * Creat a dam
 *
 * @param value
 * @returns
 */
export function toDam<T>(value: Pipelineable<T>): Dam<T> {
  return new Dam(value);
}
