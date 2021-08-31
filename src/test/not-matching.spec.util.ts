import { IHasNotMatching } from '../collection.interface';
import { Iterateable } from '../types';

export function testNotMatching(create: <T>(iterable: Iterateable<T>) => IHasNotMatching<T>): void {
  describe('notMatching(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const collection = create([
          'index.html',
          'style.css',
          'script.js',
        ]);
        const called: string[] = Array.from(collection
          .notMatching(/\.css$/)
        );
        expect(called[0]).toEqual('index.html');
        expect(called[1]).toEqual('script.js');
      });
      it('set', () => {
        const collection = create(new Set([
          'index.html',
          'style.css',
          'script.js',
        ]));
        const called: string[] = Array.from(collection
          .notMatching(/\.css$/)
        );
        expect(called[0]).toEqual('index.html');
        expect(called[1]).toEqual('script.js');
      });
      it('map', () => {
        const map = new Map([
          [1, 'index.html',],
          [2, 'style.css',],
          [3, 'script.js',],
        ]);
        const pipeline = create(() => map.values());
        const called: string[] = Array.from(pipeline
          .notMatching(/\.css$/)
        );
        expect(called[0]).toEqual('index.html');
        expect(called[1]).toEqual('script.js');
      });
      it('generator', () => {
        const collection = create(function * () {
          yield 'index.html';
          yield 'style.css';
          yield 'script.js';
        });
        const called: string[] = Array.from(collection
          .notMatching(/\.css$/)
        );
        expect(called[0]).toEqual('index.html');
        expect(called[1]).toEqual('script.js');
      });
    });
  });

}
