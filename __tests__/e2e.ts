import { Maybe } from '@nkp/maybe';
import { collect } from '../src';

describe('e2e', () => {
  it('group files by extension', () => {
    const collection = collect([
      'contact/index.html',
      'contact/script.js',
      'contact/style.css',
      'about/index.html',
      'about/script.js',
      'about/style.css',
    ]);

    const grouped = collection.mapSome((file) => Maybe
      .some(file)
      // match the file extension
      .match(/\.[^.]*$/)
      // extract the file extension
      .at(0)
      // return the file and its extension
      .map((ext) => ({ file, ext, }))
    )
      // group elements by their extension
      .partition(({ ext, }) => ext)
      // map file extension and the list of files
      .mapSome((group) => group
        .at(0)
        .map((first) => ({
          ext: first.ext,
          files: group.map(item => item.file),
        }))
      );

    expect(grouped
      .toArray()
      .map((c => ({
        ...c,
        files: c.files.toArray(),
      })))).toEqual([
      {
        ext: '.html',
        files: [
          'contact/index.html',
          'about/index.html',
        ],
      },
      {
        ext: '.js',
        files: [
          'contact/script.js',
          'about/script.js',
        ],
      },
      {
        ext: '.css',
        files: [
          'contact/style.css',
          'about/style.css',
        ],
      },
    ]);
  });
});
