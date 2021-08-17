import { River } from './river/river';
import { Hose } from './hose/hose';
import { Lake } from './lake/lake';
import { Pipelineable } from './utils/types';

export * from './pipeline/pipeline';
export * from './utils/types';
export * from './river/river';
export * from './lake/lake';
export * from './hose/hose';

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
 * Create a hose
 *
 * @param value
 * @returns
 */
export function toHose<T>(value: Pipelineable<T>): Hose<T> {
  return new Hose(value);
}

/**
 * Creat a lake
 *
 * @param value
 * @returns
 */
export function toLake<T>(value: Lake<T>): Lake<T> {
  return new Lake(value);
}
