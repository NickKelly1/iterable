import { IHasEvery } from '../collection.interface';
import { Iterateable } from '../types';

export function testEvery(create: <T>(iterable: Iterateable<T>) => IHasEvery<T>): void {
  describe('every(...)', () => {
    describe('should work on', () => {
      it('array (+)', () => {
        const pipeline = create([true, 1, ' ',]);
        const result = pipeline.every(Boolean);
        expect(result).toBe(true);
      });
      it('array (-)', () => {
        const pipeline = create([true, 0, ' ',]);
        const result = pipeline.every(Boolean);
        expect(result).toBe(false);
      });
      it('set (+)', () => {
        const pipeline = create(new Set([true, 1, ' ',]));
        const result = pipeline.every(Boolean);
        expect(result).toBe(true);
      });
      it('set (-)', () => {
        const pipeline = create(new Set([true, 0, ' ',]));
        const result = pipeline.every(Boolean);
        expect(result).toBe(false);
      });
      it('map (+)', () => {
        const entries: [number, boolean | string | number][] = [
          [1, true,],
          [2, 1,],
          [3, ' ',],
        ];
        const map: Map<number, boolean | string | number> = new Map(entries);
        const pipeline = create(() => map.values());
        const result = pipeline.every(Boolean);
        expect(result).toBe(true);
      });
      it('map (-)', () => {
        const entries: [number, boolean | string | number][] = [
          [1, true,],
          [2, 0,],
          [3, ' ',],
        ];
        const map: Map<number, boolean | string | number> = new Map(entries);
        const pipeline = create(() => map.values());
        const result = pipeline.every(Boolean);
        expect(result).toBe(false);
      });
      it('generator (+)', () => {
        const pipeline = create(function * (): Iterable<number | string | boolean> {
          yield true; yield 1; yield ' ';
        });
        const result = pipeline.every(Boolean);
        expect(result).toBe(true);
      });
      it('generator (-)', () => {
        const pipeline = create(function * (): Iterable<number | string | boolean> {
          yield true; yield 1; yield '';
        });
        const result = pipeline.every(Boolean);
        expect(result).toBe(false);
      });
    });
  });

}
