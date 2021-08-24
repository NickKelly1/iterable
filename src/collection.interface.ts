import { Maybe, None, Some } from '@nkp/maybe';
import { Betweenable, Iterateable, Orderable, SortDirection } from './types';

// TODO: test
export interface IHasAt<T> extends Iterable<T> {
  at(index: number): Maybe<T>;
}

// TODO: test
export interface IHasBtw<T> extends Iterable<T> {
  btw(left: Betweenable, right: Betweenable): IHasBtw<T>;
}

export interface IHasConcat<T> extends Iterable<T> {
  concat(concat: Iterateable<T>): IHasConcat<T>;
}

export interface IHasEvery<T> extends Iterable<T> {
  every(callbackfn: (value: T, currentIndex: number) => boolean): boolean;
}

export interface IHasExclude<T> extends Iterable<T> {
  exclude(...remove: T[]): IHasExclude<T>;
}

export interface IHasFilter<T> extends Iterable<T> {
  filter<U extends T>(callbackfn: ((value: T, currentIndex: number) => value is U)): IHasFilter<U>;
  filter(callbackfn: (value: T, currentIndex: number) => boolean): IHasFilter<T>;
}

// TODO: test
export interface IHasFind<T> extends Iterable<T> {
  find(callbackfn: (value: T, currentIndex: number) => boolean): Maybe<T>;
}

// TODO: test
export interface IHasFindIndex<T> extends Iterable<T> {
  findIndex(callbackfn: (value: T, currentIndex: number) => boolean): Maybe<number>;
}

export interface IHasFlat<T> extends Iterable<T> {
  flat<U>(this: IHasFlat<Iterable<U>>): IHasFlat<U>;
}

export interface IHasFlatMap<T> extends Iterable<T> {
  flatMap<U>(callbackfn: (value: T, currentIndex: number) => Iterateable<U>): IHasFlatMap<U>;
}

export interface IHasFlatSome<T> extends Iterable<T> {
  flatSome<U>(this: IHasFlatSome<Some<U>>): IHasFlatSome<U>;
  flatSome<U>(this: IHasFlatSome<Maybe<U>>): IHasFlatSome<U>;
  flatSome(this: IHasFlatSome<None>): IHasFlatSome<never>;
}

export interface IHasForEach<T> extends Iterable<T> {
  forEach(callbackfn: ((item: T, index: number) => unknown)): void;
}

// TODO: test
export interface IHasGetSize<T> extends Iterable<T> {
  getSize(): number;
}

// TODO: test
export interface IHasGt<T> extends Iterable<T> {
  gt(value: Orderable): IHasGt<T>;
}

// TODO: test
export interface IHasGte<T> extends Iterable<T> {
  gte(value: Orderable): IHasGte<T>;
}

// TODO: test
export interface IHasIndexOf<T> extends Iterable<T> {
  indexOf(value: T): Maybe<number>;
}

export interface IHasJoin<T> extends Iterable<T> {
  join(separator?: string): string;
}

// TODO: test
export interface IHasLt<T> extends Iterable<T> {
  lt(value: Orderable): IHasLt<T>;
}

// TODO: test
export interface IHasLte<T> extends Iterable<T> {
  lte(value: Orderable): IHasLte<T>;
}

export interface IHasMap<T> extends Iterable<T> {
  map<U>(callbackfn: ((item: T, index: number) => U)): IHasMap<U>;
}

export interface IHasMatching<T> extends IHasForEach<T> {
  matching(regexp: RegExp): IHasMatching<T>;
}

export interface IHasNotMatching<T> extends Iterable<T> {
  notMatching(regexp: RegExp): IHasNotMatching<T>;
}

export interface IHasNotNull<T> extends Iterable<T> {
  notNull(): IHasNotNull<T extends null ? never : T>;
}

export interface IHasNotNullable<T> extends Iterable<T> {
  notNullable(): IHasNotNullable<NonNullable<T>>;
}

export interface IHasNotUndefined<T> extends Iterable<T> {
  notUndefined(): IHasNotUndefined<T extends undefined ? never : T>;
}

export interface IHasPick<T> extends Iterable<T> {
  pick(...keep: T[]): IHasPick<T>;
}

// TODO: test
export interface IHasPrecat<T> extends Iterable<T> {
  precat(precat: Iterateable<T>): IHasPrecat<T>;
}

export interface IHasPush<T> extends Iterable<T> {
  push(...pushed: T[]): IHasPush<T>;
}

export interface IHasReduce<T> extends Iterable<T> {
  reduce<U>( callbackfn: ((previousValue: T, currentValue: U, currentIndex: number) => U), initial: U,): U;
}

export interface IHasReduceRight<T> extends Iterable<T> {
  reduceRight<U>( callbackfn: ((previousValue: T, currentValue: U, currentIndex: number) => U), initial: U,): U;
}

export interface IHasReverse<T> extends Iterable<T> {
  reverse(): IHasReverse<T>;
}

export interface IHasSkip<T> extends Iterable<T> {
  skip(count?: number): IHasSkip<T>;
}

export interface IHasSlice<T> extends Iterable<T> {
  slice(start?: number, end?: number): IHasSlice<T>;
}

export interface IHasSome<T> extends Iterable<T> {
  some(callbackfn: (value: T, currentIndex: number) => boolean): boolean;
}

export interface IHasSort<T> extends Iterable<T> {
  sort(sort: SortDirection<T>): IHasSort<T>;
}

export interface IHasTake<T> extends Iterable<T> {
  take(count?: number): IHasTake<T>;
}

// TODO: test
export interface IHasTap<T> extends Iterable<T> {
  tap(callbackfn: ((item: T, index: number) => unknown)): this;
}

// TODO: test
export interface IHasTapSelf<T> extends Iterable<T> {
  tapSelf(callbackfn: ((self: IHasTapSelf<T>) => unknown)): this;
}

export interface IHasToArray<T> extends Iterable<T> {
  toArray(): Array<T>
}

// TODO: test
export interface IHasToMap<T> extends Iterable<T> {
  toMap<K, V>(this: IHasToMap<[K, V]>): Map<K, V>;
}

export interface IHasToSet<T> extends Iterable<T> {
  toSet(): Set<T>;
}

export interface IHasUnique<T> extends Iterable<T> {
  unique(): IHasUnique<T>;
}

export interface IHasUnshift<T> extends Iterable<T> {
  unshift(...unshifted: T[]): IHasUnshift<T>;
}

export interface IHasZipLong<T> extends Iterable<T> {
  zipLong<U>(right: Iterateable<U>): IHasZipLong<[Maybe<T>, Maybe<U>]>;
}

export interface IHasZipShort<T> extends Iterable<T> {
  zipShort<U>(right: Iterateable<U>): IHasZipShort<[T, U]>;
}


export interface ICollection<T> extends
  Iterable<T>
  , IHasAt<T>
  , IHasBtw<T>
  , IHasConcat<T>
  , IHasEvery<T>
  , IHasExclude<T>
  , IHasFilter<T>
  , IHasFind<T>
  , IHasFindIndex<T>
  , IHasFlat<T>
  , IHasFlatMap<T>
  , IHasFlatSome<T>
  , IHasForEach<T>
  , IHasGetSize<T>
  , IHasGt<T>
  , IHasGte<T>
  , IHasIndexOf<T>
  , IHasJoin<T>
  , IHasLt<T>
  , IHasLte<T>
  , IHasMap<T>
  , IHasNotMatching<T>
  , IHasNotNull<T>
  , IHasNotNullable<T>
  , IHasNotUndefined<T>
  , IHasPick<T>
  , IHasPrecat<T>
  , IHasPush<T>
  , IHasReduce<T>
  , IHasReduceRight<T>
  , IHasReverse<T>
  , IHasSkip<T>
  , IHasSlice<T>
  , IHasSome<T>
  , IHasSort<T>
  , IHasTake<T>
  , IHasTap<T>
  , IHasTapSelf<T>
  , IHasToArray<T>
  , IHasToMap<T>
  , IHasToSet<T>
  , IHasUnique<T>
  , IHasUnshift<T>
  , IHasZipLong<T>
  , IHasZipShort<T> {

  btw(left: Betweenable, right: Betweenable): ICollection<T>;
  concat(concat: Iterateable<T>): ICollection<T>;
  exclude(...remove: T[]): ICollection<T>;
  filter<U extends T>(callbackfn: ((value: T, currentIndex: number) => value is U)): ICollection<U>;
  filter(callbackfn: (value: T, currentIndex: number) => boolean): ICollection<T>;
  flat<U>(this: ICollection<Iterable<U>>): ICollection<U>;
  flatMap<U>(callbackfn: (value: T, currentIndex: number) => Iterateable<U>): ICollection<U>;
  flatSome<U>(this: ICollection<Some<U>>): ICollection<U>;
  flatSome<U>(this: ICollection<Maybe<U>>): ICollection<U>;
  flatSome(this: ICollection<None>): ICollection<never>;
  lt(value: Orderable): ICollection<T>;
  lte(value: Orderable): ICollection<T>;
  gt(value: Orderable): ICollection<T>;
  gte(value: Orderable): ICollection<T>;
  map<U>(callbackfn: ((item: T, index: number) => U)): ICollection<U>;
  matching(regexp: RegExp): ICollection<T>;
  notMatching(regexp: RegExp): ICollection<T>;
  notNull(): ICollection<T extends null ? never : T>;
  notNullable(): ICollection<NonNullable<T>>;
  notUndefined(): ICollection<T extends undefined ? never : T>;
  pick(...keep: T[]): ICollection<T>;
  precat(precat: Iterateable<T>): ICollection<T>;
  push(...pushed: T[]): ICollection<T>;
  reverse(): ICollection<T>;
  skip(count?: number): ICollection<T>;
  slice(start?: number, end?: number): ICollection<T>;
  sort(sort: SortDirection<T>): ICollection<T>;
  take(count?: number): ICollection<T>;
  unique(): ICollection<T>;
  unshift(...unshifted: T[]): ICollection<T>;
  zipLong<U>(right: Iterateable<U>): ICollection<[Maybe<T>, Maybe<U>]>;
  zipShort<U>(right: Iterateable<U>): ICollection<[T, U]>;
}
