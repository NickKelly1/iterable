import { IHasSome } from '../collection.interface';
import { Iterateable } from '../types';

export function testSome(create: <T>(iterable: Iterateable<T>) => IHasSome<T>): void {
  describe('some(...)', () => {
    describe('should work on', () => {
      it('array (+)', () => {
        const pipeline = create([false, 0, ' ',]);
        const result = pipeline.some(Boolean);
        expect(result).toBe(true);
      });
      it('array (-)', () => {
        const pipeline = create([false, 0, '',]);
        const result = pipeline.some(Boolean);
        expect(result).toBe(false);
      });
      it('set (+)', () => {
        const pipeline = create(new Set([false, 0, ' ',]));
        const result = pipeline.some(Boolean);
        expect(result).toBe(true);
      });
      it('set (-)', () => {
        const pipeline = create(new Set([false, 0, '',]));
        const result = pipeline.some(Boolean);
        expect(result).toBe(false);
      });
      it('map (+)', () => {
        const entries: [number, boolean | string | number][] = [
          [1, false,],
          [2, 0,],
          [3, ' ',],
        ];
        const map: Map<number, boolean | string | number> = new Map(entries);
        const pipeline = create(() => map.values());
        const result = pipeline.some(Boolean);
        expect(result).toBe(true);
      });
      it('map (-)', () => {
        const entries: [number, boolean | string | number][] = [
          [1, false,],
          [2, 0,],
          [3, '',],
        ];
        const map: Map<number, boolean | string | number> = new Map(entries);
        const pipeline = create(() => map.values());
        const result = pipeline.some(Boolean);
        expect(result).toBe(false);
      });
      it('generator (+)', () => {
        const pipeline = create(function * (): Iterable<number | string | boolean> {
          yield false; yield 0; yield ' ';
        });
        const result = pipeline.some(Boolean);
        expect(result).toBe(true);
      });
      it('generator (-)', () => {
        const pipeline = create(function * (): Iterable<number | string | boolean> {
          yield false; yield 0; yield '';
        });
        const result = pipeline.some(Boolean);
        expect(result).toBe(false);
      });
    });
  });

}
