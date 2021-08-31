import { IHasMatchFlat } from '../collection.interface';
import { Iterateable } from '../types';

export function testMatchFlat(create: <T>(iterable: Iterateable<T>) => IHasMatchFlat<T>): void {
  describe('matchFlat(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const collection = create([
          'index.html',
          'style.css',
          'script.js',
        ]);
        const called: RegExpMatchArray[] = Array.from(collection
          .matchFlat(/\.(html|js)$/)
        );
        expect(called.length).toEqual(2);
        expect(called[0]![0]).toEqual('.html');
        expect(called[0]![1]).toEqual('html');
        expect(called[1]![0]).toEqual('.js');
        expect(called[1]![1]).toEqual('js');
      });
      it('set', () => {
        const collection = create(new Set([
          'index.html',
          'style.css',
          'script.js',
        ]));
        const called: RegExpMatchArray[] = Array.from( collection
          .matchFlat(/\.(html|js)$/)
        );
        expect(called.length).toEqual(2);
        expect(called[0]![0]).toEqual('.html');
        expect(called[0]![1]).toEqual('html');
        expect(called[1]![0]).toEqual('.js');
        expect(called[1]![1]).toEqual('js');
      });
      it('map', () => {
        const map = new Map([
          [1, 'index.html',],
          [2, 'style.css',],
          [3, 'script.js',],
        ]);
        const collection = create(() => map.values());
        const called: RegExpMatchArray[] = Array.from( collection
          .matchFlat(/\.(html|js)$/)
        );
        expect(called.length).toEqual(2);
        expect(called[0]![0]).toEqual('.html');
        expect(called[0]![1]).toEqual('html');
        expect(called[1]![0]).toEqual('.js');
        expect(called[1]![1]).toEqual('js');
      });
      it('generator', () => {
        const collection = create(function * () {
          yield 'index.html';
          yield 'style.css';
          yield 'script.js';
        });
        const called: RegExpMatchArray[] = Array.from( collection
          .matchFlat(/\.(html|js)$/)
        );
        expect(called.length).toEqual(2);
        expect(called[0]![0]).toEqual('.html');
        expect(called[0]![1]).toEqual('html');
        expect(called[1]![0]).toEqual('.js');
        expect(called[1]![1]).toEqual('js');
      });
    });
  });
}
