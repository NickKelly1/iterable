import { IHasMatching } from '../collection.interface';
import { Iterateable } from '../types';

export function testMatching(create: <T>(iterable: Iterateable<T>) => IHasMatching<T>): void {
  describe('matching(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const pipeline = create([
          'index.html',
          'style.css',
          'script.js',
        ]);
        const called: string[] = [];
        pipeline
          .matching(/\.(html|js)$/)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual('index.html');
        expect(called[1]).toEqual('script.js');
      });
      it('set', () => {
        const pipeline = create(new Set([
          'index.html',
          'style.css',
          'script.js',
        ]));
        const called: string[] = [];
        pipeline
          .matching(/\.(html|js)$/)
          .forEach(item => called.push(item));
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
        const called: string[] = [];
        pipeline
          .matching(/\.(html|js)$/)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual('index.html');
        expect(called[1]).toEqual('script.js');
      });
      it('generator', () => {
        const pipeline = create(function * () {
          yield 'index.html';
          yield 'style.css';
          yield 'script.js';
        });
        const called: string[] = [];
        pipeline
          .matching(/\.(html|js)$/)
          .forEach(item => called.push(item));
        expect(called[0]).toEqual('index.html');
        expect(called[1]).toEqual('script.js');
      });
    });
  });
}
