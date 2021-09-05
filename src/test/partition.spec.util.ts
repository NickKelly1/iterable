import { IHasPartition } from '../collection.interface';
import { Iterateable } from '../types';

function testBench(collection: IHasPartition<string>) {
  const regex = /^pages.*[\\/]([^\\/]*)\.([^.]*)$/;
  const byPage = collection.partition((value) => value.match(regex)?.[1]);
  const byExt = collection.partition((value) => value.match(regex)?.[2]);
  expect(Array
    .from(byPage)
    .map(nested => Array.from(nested)))
    .toEqual([
      [
        'pages/home.html',
        'pages/home.css',
        'pages/home.js',
      ],
      [
        'pages/info/about.html',
        'pages/info/about.css',
        'pages/info/about.js',
      ],
      [
        'pages/info/contact.html',
        'pages/info/contact.css',
        'pages/info/contact.js',
      ],
    ]);

  expect(Array
    .from(byExt)
    .map(nested => Array.from(nested)))
    .toEqual([
      [
        'pages/home.html',
        'pages/info/about.html',
        'pages/info/contact.html',
      ],
      [
        'pages/home.css',
        'pages/info/about.css',
        'pages/info/contact.css',
      ],
      [
        'pages/home.js',
        'pages/info/about.js',
        'pages/info/contact.js',
      ],
    ]);
}

export function testPartition(create: <T>(iterable: Iterateable<T>) => IHasPartition<T>): void {
  describe('partition(...)', () => {
    describe('should work on', () => {
      it('array', () => {
        const collection = create([
          'pages/home.html',
          'pages/home.css',
          'pages/home.js',
          'pages/info/about.html',
          'pages/info/about.css',
          'pages/info/about.js',
          'pages/info/contact.html',
          'pages/info/contact.css',
          'pages/info/contact.js',
        ]);
        testBench(collection);
      });
      it('set', () => {
        const collection = create(new Set([
          'pages/home.html',
          'pages/home.css',
          'pages/home.js',
          'pages/info/about.html',
          'pages/info/about.css',
          'pages/info/about.js',
          'pages/info/contact.html',
          'pages/info/contact.css',
          'pages/info/contact.js',
        ]));
        testBench(collection);
      });
      it('map', () => {
        const map = new Map<number, string>([
          [1, 'pages/home.html',],
          [2, 'pages/home.css',],
          [3, 'pages/home.js',],
          [4, 'pages/info/about.html',],
          [5, 'pages/info/about.css',],
          [6, 'pages/info/about.js',],
          [7, 'pages/info/contact.html',],
          [8, 'pages/info/contact.css',],
          [9, 'pages/info/contact.js',],
        ]);
        const collection = create(() => map.values());
        testBench(collection);
      });
      it('generator', () => {
        const collection = create(function * () {
          yield 'pages/home.html';
          yield 'pages/home.css';
          yield 'pages/home.js';
          yield 'pages/info/about.html';
          yield 'pages/info/about.css';
          yield 'pages/info/about.js';
          yield 'pages/info/contact.html';
          yield 'pages/info/contact.css';
          yield 'pages/info/contact.js';
        });
        testBench(collection);
      });
    });
  });
}
