/* eslint-disable max-len */
import { Maybe, MaybeLike, NoneLike, SomeLike } from '@nkp/maybe';
import { Betweenable, Iterateable, Orderable, SortDirection, Unary } from './types';

export interface IHasAt<T> extends Iterable<T> {
  at(index: number): Maybe<T>;
}

export interface IHasBtw<T> extends Iterable<T> {
  btw(left: Betweenable, right: Betweenable): IHasBtw<T>;
}

export interface IHasCompact<T> extends Iterable<T> {
  compact(): IHasCompact<NonNullable<T>>;
}

export interface IHasConcat<T> extends Iterable<T> {
  concat(concat: Iterateable<T>): IHasConcat<T>;
}

export interface IHasEvery<T> extends Iterable<T> {
  every(callbackfn: ((value: T, currentIndex: number) => boolean)): boolean;
}

export interface IHasExclude<T> extends Iterable<T> {
  exclude(...remove: readonly T[]): IHasExclude<T>;
}

export interface IHasFilter<T> extends Iterable<T> {
  filter<U extends T>(callbackfn: ((value: T, currentIndex: number) => value is U)): IHasFilter<U>;
  filter(callbackfn: (value: T, currentIndex: number) => boolean): IHasFilter<T>;
}

export interface IHasFind<T> extends Iterable<T> {
  find(callbackfn: (value: T, currentIndex: number) => boolean): Maybe<T>;
}

export interface IHasFindIndex<T> extends Iterable<T> {
  findIndex(callbackfn: (value: T, currentIndex: number) => boolean): Maybe<number>;
}

export interface IHasFirst<T> extends Iterable<T> {
  first(): Maybe<T>;
}

export interface IHasFlat<T> extends Iterable<T> {
  flat<U>(this: IHasFlat<Iterable<U>>): IHasFlat<U>;
}

export interface IHasFlatMap<T> extends Iterable<T> {
  flatMap<U>(callbackfn: (value: T, currentIndex: number) => Iterateable<U>): IHasFlatMap<U>;
}

export interface IHasFlatSome<T> extends Iterable<T> {
  flatSome<U>(this: IHasFlatSome<SomeLike<U>>): IHasFlatSome<U>;
  flatSome<U>(this: IHasFlatSome<MaybeLike<U>>): IHasFlatSome<U>;
  flatSome(this: IHasFlatSome<NoneLike>): IHasFlatSome<never>;
}

export interface IHasMapSome<T> extends Iterable<T> {
  mapSome<U>(callbackfn: (value: T, currentIndex: number) => MaybeLike<U>): IHasFlatSome<U>;
}

export interface IHasForEach<T> extends Iterable<T> {
  forEach(callbackfn: ((value: T, index: number) => unknown)): void;
}

export interface IHasGetSize<T> extends Iterable<T> {
  getSize(): number;
}

export interface IHasGt<T> extends Iterable<T> {
  gt(value: Orderable): IHasGt<T>;
}

export interface IHasGte<T> extends Iterable<T> {
  gte(value: Orderable): IHasGte<T>;
}

export interface IHasIndexOf<T> extends Iterable<T> {
  indexOf(value: T): Maybe<number>;
}

export interface IHasJoin<T> extends Iterable<T> {
  join(separator?: string): string;
}

export interface IHasLt<T> extends Iterable<T> {
  lt(value: Orderable): IHasLt<T>;
}

export interface IHasLte<T> extends Iterable<T> {
  lte(value: Orderable): IHasLte<T>;
}

export interface IHasMap<T> extends Iterable<T> {
  map<U>(callbackfn: ((value: T, index: number) => U)): IHasMap<U>;
}

export interface IHasMapSelf<T> extends Iterable<T> {
  mapSelf<U>(callbackfn: ((self: this) => U)): U;
}

export interface IHasPluck<T> extends Iterable<T> {
  pluck<K extends keyof T>(key: K): IHasPluck<T[K]>;
}

export interface IHasMatch<T> extends Iterable<T> {
  match(regexp: string | RegExp): IHasMatch<Maybe<RegExpMatchArray>>;
}

export interface IHasMatchFlat<T> extends Iterable<T> {
  matchFlat(regexp: string | RegExp): IHasMatch<RegExpMatchArray>;
}

export interface IHasMatching<T> extends Iterable<T> {
  matching(regexp: RegExp | string): IHasMatching<T>;
}

export interface IHasNotMatching<T> extends Iterable<T> {
  notMatching(regexp: RegExp | string): IHasNotMatching<T>;
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
  pick(...keep: readonly T[]): IHasPick<T>;
}

export interface IHasPrecat<T> extends Iterable<T> {
  precat(precat: Iterateable<T>): IHasPrecat<T>;
}

export interface IHasPush<T> extends Iterable<T> {
  push(...pushed: readonly T[]): IHasPush<T>;
}

export interface IHasReduce<T> extends Iterable<T> {
  reduce<U>(callbackfn: ((previousValue: T, currentValue: U, currentIndex: number) => U), initial: U,): U;
}

export interface IHasReduceRight<T> extends Iterable<T> {
  reduceRight<U>(callbackfn: ((previousValue: T, currentValue: U, currentIndex: number) => U), initial: U,): U;
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

export interface IHasTap<T> extends Iterable<T> {
  tap(callbackfn: ((value: T, index: number) => unknown)): this;
}

export interface IHasTapSelf<T> extends Iterable<T> {
  tapSelf(callbackfn: ((self: IHasTapSelf<T>) => unknown)): this;
}

export interface IHasToArray<T> extends Iterable<T> {
  toArray(): Array<T>
}

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
  unshift(...unshifted: readonly T[]): IHasUnshift<T>;
}

export interface IHasZipLong<T> extends Iterable<T> {
  zipLong<U>(right: Iterateable<U>): IHasZipLong<[Maybe<T>, Maybe<U>]>;
}

export interface IHasZip<T> extends Iterable<T> {
  zip<U>(right: Iterateable<U>): IHasZip<[T, U]>;
}

export interface IHasPartition<T> extends Iterable<T> {
  partition<R>(callbackfn: ((value: T, index: number) => R)): IHasPartition<IHasPartition<T>>;
}

export interface IHasForkFlat<T> extends Iterable<T> {
  forkFlat<R>(...forks: readonly (Unary<this, Iterateable<R>>)[]): IHasForkFlat<R>;
}

export interface IHasAll<T> extends Iterable<T> {
  all<M extends Record<PropertyKey, Unary<this, unknown>>>(splits: M): IHasAll<{ [K in keyof M]: ReturnType<M[K]> }>;
  all<R1>(...splits: readonly [Unary<this, R1>]): IHasAll<[R1]>
  all<R1, R2>(...splits: readonly [Unary<this, R1>, Unary<this, R2>]): IHasAll<[R1, R2]>
  all<R1, R2, R3>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>]): IHasAll<[R1, R2, R3]>
  all<R1, R2, R3, R4>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>]): IHasAll<[R1, R2, R3, R4]>
  all<R1, R2, R3, R4, R5>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>]): IHasAll<[R1, R2, R3, R4, R5]>
  all<R1, R2, R3, R4, R5, R6>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>]): IHasAll<[R1, R2, R3, R4, R5, R6]>
  all<R1, R2, R3, R4, R5, R6, R7>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>]): IHasAll<[R1, R2, R3, R4, R5, R6, R7]>
  all<R1, R2, R3, R4, R5, R6, R7, R8>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>]): IHasAll<[R1, R2, R3, R4, R5, R6, R7, R8]>
  all<R1, R2, R3, R4, R5, R6, R7, R8, R9>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>, Unary<this, R9>]): IHasAll<[R1, R2, R3, R4, R5, R6, R7, R8, R9]>
  all<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>, Unary<this, R9>, Unary<this, R10>]): IHasAll<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10]>
  all<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>, Unary<this, R9>, Unary<this, R10>, Unary<this, R11>]): IHasAll<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11]>
  all<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>, Unary<this, R9>, Unary<this, R10>, Unary<this, R11>, Unary<this, R12>]): IHasAll<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12]>
  all<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>, Unary<this, R9>, Unary<this, R10>, Unary<this, R11>, Unary<this, R12>, Unary<this, R13>]): IHasAll<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13]>
  all<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>, Unary<this, R9>, Unary<this, R10>, Unary<this, R11>, Unary<this, R12>, Unary<this, R13>, Unary<this, R14>]): IHasAll<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14]>
  all<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>, Unary<this, R9>, Unary<this, R10>, Unary<this, R11>, Unary<this, R12>, Unary<this, R13>, Unary<this, R14>, Unary<this, R15>]): IHasAll<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15]>
  all<R>(...splits: readonly (Unary<this, R>)[]): IHasAll<R[]>;
}

export interface ICollection<T> extends
  Iterable<T>
  , IHasAll<T>
  , IHasAt<T>
  , IHasBtw<T>
  , IHasCompact<T>
  , IHasConcat<T>
  , IHasEvery<T>
  , IHasExclude<T>
  , IHasFilter<T>
  , IHasFind<T>
  , IHasFindIndex<T>
  , IHasFirst<T>
  , IHasFlat<T>
  , IHasFlatMap<T>
  , IHasFlatSome<T>
  , IHasForEach<T>
  , IHasForkFlat<T>
  , IHasGetSize<T>
  , IHasGt<T>
  , IHasGte<T>
  , IHasIndexOf<T>
  , IHasJoin<T>
  , IHasLt<T>
  , IHasLte<T>
  , IHasMap<T>
  , IHasMapSelf<T>
  , IHasMapSome<T>
  , IHasMatch<T>
  , IHasMatchFlat<T>
  , IHasMatching<T>
  , IHasNotMatching<T>
  , IHasNotNull<T>
  , IHasNotNullable<T>
  , IHasNotUndefined<T>
  , IHasPartition<T>
  , IHasPick<T>
  , IHasPluck<T>
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
  , IHasZip<T>
  , IHasZipLong<T>
  {

  btw(left: Betweenable, right: Betweenable): ICollection<T>;
  compact(): ICollection<NonNullable<T>>;
  concat(concat: Iterateable<T>): ICollection<T>;
  exclude(...values: readonly T[]): ICollection<T>;
  filter<U extends T>(callbackfn: ((value: T, currentIndex: number) => value is U)): ICollection<U>;
  filter(callbackfn: (value: T, currentIndex: number) => boolean): ICollection<T>;
  flat<U>(this: ICollection<Iterable<U>>): ICollection<U>;
  mapSome<U>(callbackfn: (value: T, currentIndex: number) => MaybeLike<U>): ICollection<U>;
  flatMap<U>(callbackfn: (value: T, currentIndex: number) => Iterateable<U>): ICollection<U>;
  flatSome<U>(this: ICollection<SomeLike<U>>): ICollection<U>;
  flatSome<U>(this: ICollection<MaybeLike<U>>): ICollection<U>;
  flatSome(this: ICollection<NoneLike>): ICollection<never>;
  lt(value: Orderable): ICollection<T>;
  lte(value: Orderable): ICollection<T>;
  gt(value: Orderable): ICollection<T>;
  gte(value: Orderable): ICollection<T>;
  map<U>(callbackfn: ((value: T, index: number) => U)): ICollection<U>;
  match(regexp: string | RegExp): ICollection<Maybe<RegExpMatchArray>>;
  matchFlat(regexp: string | RegExp): ICollection<RegExpMatchArray>;
  matching(regexp: RegExp | string): ICollection<T>;
  notMatching(regexp: RegExp | string): ICollection<T>;
  notNull(): ICollection<T extends null ? never : T>;
  notNullable(): ICollection<NonNullable<T>>;
  notUndefined(): ICollection<T extends undefined ? never : T>;
  pick(...keep: readonly T[]): ICollection<T>;
  pluck<K extends keyof T>(key: K): ICollection<T[K]>;
  precat(precat: Iterateable<T>): ICollection<T>;
  push(...pushed: readonly T[]): ICollection<T>;
  reverse(): ICollection<T>;
  skip(count?: number): ICollection<T>;
  slice(start?: number, end?: number): ICollection<T>;
  sort(sort: SortDirection<T>): ICollection<T>;
  take(count?: number): ICollection<T>;
  unique(): ICollection<T>;
  unshift(...unshifted: readonly T[]): ICollection<T>;
  zipLong<U>(right: Iterateable<U>): ICollection<[Maybe<T>, Maybe<U>]>;
  zip<U>(right: Iterateable<U>): ICollection<[T, U]>;
  partition<R>(callbackfn: ((value: T, index: number) => R)): ICollection<ICollection<T>>;
  forkFlat<R>(...forks: readonly (Unary<this, Iterateable<R>>)[]): ICollection<R>;
  all<M extends Record<PropertyKey, Unary<this, unknown>>>(splits: M): ICollection<{ [K in keyof M]: ReturnType<M[K]> }>;
  all<R1>(...splits: readonly [Unary<this, R1>]): ICollection<[R1]>
  all<R1, R2>(...splits: readonly [Unary<this, R1>, Unary<this, R2>]): ICollection<[R1, R2]>
  all<R1, R2, R3>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>]): ICollection<[R1, R2, R3]>
  all<R1, R2, R3, R4>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>]): ICollection<[R1, R2, R3, R4]>
  all<R1, R2, R3, R4, R5>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>]): ICollection<[R1, R2, R3, R4, R5]>
  all<R1, R2, R3, R4, R5, R6>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>]): ICollection<[R1, R2, R3, R4, R5, R6]>
  all<R1, R2, R3, R4, R5, R6, R7>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>]): ICollection<[R1, R2, R3, R4, R5, R6, R7]>
  all<R1, R2, R3, R4, R5, R6, R7, R8>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>]): ICollection<[R1, R2, R3, R4, R5, R6, R7, R8]>
  all<R1, R2, R3, R4, R5, R6, R7, R8, R9>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>, Unary<this, R9>]): ICollection<[R1, R2, R3, R4, R5, R6, R7, R8, R9]>
  all<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>, Unary<this, R9>, Unary<this, R10>]): ICollection<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10]>
  all<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>, Unary<this, R9>, Unary<this, R10>, Unary<this, R11>]): ICollection<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11]>
  all<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>, Unary<this, R9>, Unary<this, R10>, Unary<this, R11>, Unary<this, R12>]): ICollection<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12]>
  all<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>, Unary<this, R9>, Unary<this, R10>, Unary<this, R11>, Unary<this, R12>, Unary<this, R13>]): ICollection<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13]>
  all<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>, Unary<this, R9>, Unary<this, R10>, Unary<this, R11>, Unary<this, R12>, Unary<this, R13>, Unary<this, R14>]): ICollection<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14]>
  all<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15>(...splits: readonly [Unary<this, R1>, Unary<this, R2>, Unary<this, R3>, Unary<this, R4>, Unary<this, R5>, Unary<this, R6>, Unary<this, R7>, Unary<this, R8>, Unary<this, R9>, Unary<this, R10>, Unary<this, R11>, Unary<this, R12>, Unary<this, R13>, Unary<this, R14>, Unary<this, R15>]): ICollection<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15]>
  all<R>(...splits: readonly (Unary<this, R>)[]): ICollection<R[]>;
}
