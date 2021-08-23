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
