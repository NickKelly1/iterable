import { Betweenable, BetweenableObject, Iterateable } from './types';

/**
 * Sort with the given direction
 *
 * @param direction
 * @returns
 */
export function smartSort(direction: -1 | 1) {
  return function sort<T>(a: T, b: T): number {
    if (a === b) return 0;
    if (a < b) return -direction;
    if (a > b) return direction;
    return 0;
  };
}

/**
 * Convert the iterateable to iterable
 *
 * @param iterateable
 * @returns
 */
export function toIterable<T>(iterateable: Iterateable<T>): Iterable<T> {
  if (typeof iterateable === 'function') return iterateable();
  return iterateable;
}

/**
 * Normalize the betweenable
 */
export function toBetweenable(input: Betweenable): Required<BetweenableObject> {
  let inclusive = true;
  let value: number;
  if (typeof input === 'number')  value = input;
  else if (input instanceof Date) value = input.valueOf();
  else if (Array.isArray(input)) {
    const inputValue = input[0]!;
    if (typeof inputValue === 'number')  value = inputValue;
    else if (inputValue instanceof Date) value = inputValue.valueOf();
    inclusive = input[1] ?? true;
  }
  else {
    const inputValue = input.value!;
    if (typeof inputValue === 'number')  value = inputValue;
    else if (inputValue instanceof Date) value = inputValue.valueOf();
    inclusive = input.inclusive ?? true;
  }
  return {
    value: value!,
    inclusive,
  };
}
