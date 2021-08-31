import { Maybe } from '@nkp/maybe';
import { IHasMatch } from '../collection.interface';
import { Iterateable } from '../types';

export function testMatch(create: <T>(iterable: Iterateable<T>) => IHasMatch<T>): void {
  describe('match(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const collection = create([
          'index.html',
          'style.css',
          'script.js',
        ]);
        const called: Maybe<RegExpMatchArray>[] = Array.from(collection
          .match(/\.(html|js)$/)
        );
        expect(called[0]!.isSome()).toEqual(true);
        expect(called[0]!.unwrap()[0]).toEqual('.html');
        expect(called[0]!.unwrap()[1]).toEqual('html');
        expect(called[2]!.isSome()).toEqual(true);
        expect(called[2]!.unwrap()[0]).toEqual('.js');
        expect(called[2]!.unwrap()[1]).toEqual('js');
      });
      it('set', () => {
        const collection = create(new Set([
          'index.html',
          'style.css',
          'script.js',
        ]));
        const called: Maybe<RegExpMatchArray>[] = Array.from( collection
          .match(/\.(html|js)$/)
        );
        expect(called[0]!.isSome()).toEqual(true);
        expect(called[0]!.unwrap()[0]).toEqual('.html');
        expect(called[0]!.unwrap()[1]).toEqual('html');
        expect(called[2]!.isSome()).toEqual(true);
        expect(called[2]!.unwrap()[0]).toEqual('.js');
        expect(called[2]!.unwrap()[1]).toEqual('js');
      });
      it('map', () => {
        const map = new Map([
          [1, 'index.html',],
          [2, 'style.css',],
          [3, 'script.js',],
        ]);
        const collection = create(() => map.values());
        const called: Maybe<RegExpMatchArray>[] = Array.from( collection
          .match(/\.(html|js)$/)
        );
        expect(called[0]!.isSome()).toEqual(true);
        expect(called[0]!.unwrap()[0]).toEqual('.html');
        expect(called[0]!.unwrap()[1]).toEqual('html');
        expect(called[2]!.isSome()).toEqual(true);
        expect(called[2]!.unwrap()[0]).toEqual('.js');
        expect(called[2]!.unwrap()[1]).toEqual('js');
      });
      it('generator', () => {
        const collection = create(function * () {
          yield 'index.html';
          yield 'style.css';
          yield 'script.js';
        });
        const called: Maybe<RegExpMatchArray>[] = Array.from( collection
          .match(/\.(html|js)$/)
        );
        expect(called[0]!.isSome()).toEqual(true);
        expect(called[0]!.unwrap()[0]).toEqual('.html');
        expect(called[0]!.unwrap()[1]).toEqual('html');
        expect(called[2]!.isSome()).toEqual(true);
        expect(called[2]!.unwrap()[0]).toEqual('.js');
        expect(called[2]!.unwrap()[1]).toEqual('js');
      });
    });
  });
}
