import { River } from './river';
import { Bucket } from './bucket';
import { Dam } from './dam';
import { Pipelineable } from './types';

export * from './pipeline';
export * from './types';
export * from './river';
export * from './dam';
export * from './bucket';

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
