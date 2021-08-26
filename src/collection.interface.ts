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

// TODO: test
export interface ForkHasFork<T, R> { (collection: IHasFork<T> ): R; }
interface IHasFork<T> {
  fork<R1>(...forks: readonly [ForkHasFork<T, Iterateable<R1>>]): IHasFork<R1>
  fork<R1, R2>(...forks: readonly [ForkHasFork<T, Iterateable<R1>>, ForkHasFork<T, Iterateable<R2>>]): IHasFork<R1 | R2>
  fork<R1, R2, R3>(...forks: readonly [ForkHasFork<T, Iterateable<R1>>, ForkHasFork<T, Iterateable<R2>>, ForkHasFork<T, Iterateable<R3>>]): IHasFork<R1 | R2 | R3>
  fork<R1, R2, R3, R4>(...forks: readonly [ForkHasFork<T, Iterateable<R1>>, ForkHasFork<T, Iterateable<R2>>, ForkHasFork<T, Iterateable<R3>>, ForkHasFork<T, Iterateable<R4>>]): IHasFork<R1 | R2 | R3 | R4>
  fork<R1, R2, R3, R4, R5>(...forks: readonly [ForkHasFork<T, Iterateable<R1>>, ForkHasFork<T, Iterateable<R2>>, ForkHasFork<T, Iterateable<R3>>, ForkHasFork<T, Iterateable<R4>>, ForkHasFork<T, Iterateable<R5>>]): IHasFork<R1 | R2 | R3 | R4 | R5>
  fork<R1, R2, R3, R4, R5, R6>(...forks: readonly [ForkHasFork<T, Iterateable<R1>>, ForkHasFork<T, Iterateable<R2>>, ForkHasFork<T, Iterateable<R3>>, ForkHasFork<T, Iterateable<R4>>, ForkHasFork<T, Iterateable<R5>>, ForkHasFork<T, Iterateable<R6>>]): IHasFork<R1 | R2 | R3 | R4 | R5 | R6>
  fork<R1, R2, R3, R4, R5, R6, R7>(...forks: readonly [ForkHasFork<T, Iterateable<R1>>, ForkHasFork<T, Iterateable<R2>>, ForkHasFork<T, Iterateable<R3>>, ForkHasFork<T, Iterateable<R4>>, ForkHasFork<T, Iterateable<R5>>, ForkHasFork<T, Iterateable<R6>>, ForkHasFork<T, Iterateable<R7>>]): IHasFork<R1 | R2 | R3 | R4 | R5 | R6 | R7>
  fork<R1, R2, R3, R4, R5, R6, R7, R8>(...forks: readonly [ForkHasFork<T, Iterateable<R1>>, ForkHasFork<T, Iterateable<R2>>, ForkHasFork<T, Iterateable<R3>>, ForkHasFork<T, Iterateable<R4>>, ForkHasFork<T, Iterateable<R5>>, ForkHasFork<T, Iterateable<R6>>, ForkHasFork<T, Iterateable<R7>>, ForkHasFork<T, Iterateable<R8>>]): IHasFork<R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8>
  fork<R1, R2, R3, R4, R5, R6, R7, R8, R9>(...forks: readonly [ForkHasFork<T, Iterateable<R1>>, ForkHasFork<T, Iterateable<R2>>, ForkHasFork<T, Iterateable<R3>>, ForkHasFork<T, Iterateable<R4>>, ForkHasFork<T, Iterateable<R5>>, ForkHasFork<T, Iterateable<R6>>, ForkHasFork<T, Iterateable<R7>>, ForkHasFork<T, Iterateable<R8>>, ForkHasFork<T, Iterateable<R9>>]): IHasFork<R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9>
  fork<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(...forks: readonly [ForkHasFork<T, Iterateable<R1>>, ForkHasFork<T, Iterateable<R2>>, ForkHasFork<T, Iterateable<R3>>, ForkHasFork<T, Iterateable<R4>>, ForkHasFork<T, Iterateable<R5>>, ForkHasFork<T, Iterateable<R6>>, ForkHasFork<T, Iterateable<R7>>, ForkHasFork<T, Iterateable<R8>>, ForkHasFork<T, Iterateable<R9>>, ForkHasFork<T, Iterateable<R10>>]): IHasFork<R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10>
  fork<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(...forks: readonly [ForkHasFork<T, Iterateable<R1>>, ForkHasFork<T, Iterateable<R2>>, ForkHasFork<T, Iterateable<R3>>, ForkHasFork<T, Iterateable<R4>>, ForkHasFork<T, Iterateable<R5>>, ForkHasFork<T, Iterateable<R6>>, ForkHasFork<T, Iterateable<R7>>, ForkHasFork<T, Iterateable<R8>>, ForkHasFork<T, Iterateable<R9>>, ForkHasFork<T, Iterateable<R10>>, ForkHasFork<T, Iterateable<R11>>]): IHasFork<R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11>
  fork<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(...forks: readonly [ForkHasFork<T, Iterateable<R1>>, ForkHasFork<T, Iterateable<R2>>, ForkHasFork<T, Iterateable<R3>>, ForkHasFork<T, Iterateable<R4>>, ForkHasFork<T, Iterateable<R5>>, ForkHasFork<T, Iterateable<R6>>, ForkHasFork<T, Iterateable<R7>>, ForkHasFork<T, Iterateable<R8>>, ForkHasFork<T, Iterateable<R9>>, ForkHasFork<T, Iterateable<R10>>, ForkHasFork<T, Iterateable<R11>>, ForkHasFork<T, Iterateable<R12>>]): IHasFork<R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11 | R12>
  fork<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13>(...forks: readonly [ForkHasFork<T, Iterateable<R1>>, ForkHasFork<T, Iterateable<R2>>, ForkHasFork<T, Iterateable<R3>>, ForkHasFork<T, Iterateable<R4>>, ForkHasFork<T, Iterateable<R5>>, ForkHasFork<T, Iterateable<R6>>, ForkHasFork<T, Iterateable<R7>>, ForkHasFork<T, Iterateable<R8>>, ForkHasFork<T, Iterateable<R9>>, ForkHasFork<T, Iterateable<R10>>, ForkHasFork<T, Iterateable<R11>>, ForkHasFork<T, Iterateable<R12>>, ForkHasFork<T, Iterateable<R13>>]): IHasFork<R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11 | R12 | R13>
  fork<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14>(...forks: readonly [ForkHasFork<T, Iterateable<R1>>, ForkHasFork<T, Iterateable<R2>>, ForkHasFork<T, Iterateable<R3>>, ForkHasFork<T, Iterateable<R4>>, ForkHasFork<T, Iterateable<R5>>, ForkHasFork<T, Iterateable<R6>>, ForkHasFork<T, Iterateable<R7>>, ForkHasFork<T, Iterateable<R8>>, ForkHasFork<T, Iterateable<R9>>, ForkHasFork<T, Iterateable<R10>>, ForkHasFork<T, Iterateable<R11>>, ForkHasFork<T, Iterateable<R12>>, ForkHasFork<T, Iterateable<R13>>, ForkHasFork<T, Iterateable<R14>>]): IHasFork<R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11 | R12 | R13 | R14>
  fork<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15>(...forks: readonly [ForkHasFork<T, Iterateable<R1>>, ForkHasFork<T, Iterateable<R2>>, ForkHasFork<T, Iterateable<R3>>, ForkHasFork<T, Iterateable<R4>>, ForkHasFork<T, Iterateable<R5>>, ForkHasFork<T, Iterateable<R6>>, ForkHasFork<T, Iterateable<R7>>, ForkHasFork<T, Iterateable<R8>>, ForkHasFork<T, Iterateable<R9>>, ForkHasFork<T, Iterateable<R10>>, ForkHasFork<T, Iterateable<R11>>, ForkHasFork<T, Iterateable<R12>>, ForkHasFork<T, Iterateable<R13>>, ForkHasFork<T, Iterateable<R14>>, ForkHasFork<T, Iterateable<R15>>]): IHasFork<R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11 | R12 | R13 | R14 | R15>
  fork<R>(...forks: readonly (ForkHasFork<T, Iterateable<R>>)[]): IHasFork<R>
  fork<R>(...forks: readonly (ForkHasFork<T, Iterateable<R>>)[]): IHasFork<R>;
}

// TODO: test
export interface ForkHasSplit<T, R> { (collection: IHasSplit<T> ): R; }
interface IHasSplit<T> {
  split<R1>(...splits: readonly [ForkHasSplit<T, R1>]): IHasSplit<[R1]>
  split<R1, R2>(...splits: readonly [ForkHasSplit<T, R1>, ForkHasSplit<T, R2>]): IHasSplit<[R1, R2]>
  split<R1, R2, R3>(...splits: readonly [ForkHasSplit<T, R1>, ForkHasSplit<T, R2>, ForkHasSplit<T, R3>]): IHasSplit<[R1, R2, R3]>
  split<R1, R2, R3, R4>(...splits: readonly [ForkHasSplit<T, R1>, ForkHasSplit<T, R2>, ForkHasSplit<T, R3>, ForkHasSplit<T, R4>]): IHasSplit<[R1, R2, R3, R4]>
  split<R1, R2, R3, R4, R5>(...splits: readonly [ForkHasSplit<T, R1>, ForkHasSplit<T, R2>, ForkHasSplit<T, R3>, ForkHasSplit<T, R4>, ForkHasSplit<T, R5>]): IHasSplit<[R1, R2, R3, R4, R5]>
  split<R1, R2, R3, R4, R5, R6>(...splits: readonly [ForkHasSplit<T, R1>, ForkHasSplit<T, R2>, ForkHasSplit<T, R3>, ForkHasSplit<T, R4>, ForkHasSplit<T, R5>, ForkHasSplit<T, R6>]): IHasSplit<[R1, R2, R3, R4, R5, R6]>
  split<R1, R2, R3, R4, R5, R6, R7>(...splits: readonly [ForkHasSplit<T, R1>, ForkHasSplit<T, R2>, ForkHasSplit<T, R3>, ForkHasSplit<T, R4>, ForkHasSplit<T, R5>, ForkHasSplit<T, R6>, ForkHasSplit<T, R7>]): IHasSplit<[R1, R2, R3, R4, R5, R6, R7]>
  split<R1, R2, R3, R4, R5, R6, R7, R8>(...splits: readonly [ForkHasSplit<T, R1>, ForkHasSplit<T, R2>, ForkHasSplit<T, R3>, ForkHasSplit<T, R4>, ForkHasSplit<T, R5>, ForkHasSplit<T, R6>, ForkHasSplit<T, R7>, ForkHasSplit<T, R8>]): IHasSplit<[R1, R2, R3, R4, R5, R6, R7, R8]>
  split<R1, R2, R3, R4, R5, R6, R7, R8, R9>(...splits: readonly [ForkHasSplit<T, R1>, ForkHasSplit<T, R2>, ForkHasSplit<T, R3>, ForkHasSplit<T, R4>, ForkHasSplit<T, R5>, ForkHasSplit<T, R6>, ForkHasSplit<T, R7>, ForkHasSplit<T, R8>, ForkHasSplit<T, R9>]): IHasSplit<[R1, R2, R3, R4, R5, R6, R7, R8, R9]>
  split<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(...splits: readonly [ForkHasSplit<T, R1>, ForkHasSplit<T, R2>, ForkHasSplit<T, R3>, ForkHasSplit<T, R4>, ForkHasSplit<T, R5>, ForkHasSplit<T, R6>, ForkHasSplit<T, R7>, ForkHasSplit<T, R8>, ForkHasSplit<T, R9>, ForkHasSplit<T, R10>]): IHasSplit<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10]>
  split<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(...splits: readonly [ForkHasSplit<T, R1>, ForkHasSplit<T, R2>, ForkHasSplit<T, R3>, ForkHasSplit<T, R4>, ForkHasSplit<T, R5>, ForkHasSplit<T, R6>, ForkHasSplit<T, R7>, ForkHasSplit<T, R8>, ForkHasSplit<T, R9>, ForkHasSplit<T, R10>, ForkHasSplit<T, R11>]): IHasSplit<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11]>
  split<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(...splits: readonly [ForkHasSplit<T, R1>, ForkHasSplit<T, R2>, ForkHasSplit<T, R3>, ForkHasSplit<T, R4>, ForkHasSplit<T, R5>, ForkHasSplit<T, R6>, ForkHasSplit<T, R7>, ForkHasSplit<T, R8>, ForkHasSplit<T, R9>, ForkHasSplit<T, R10>, ForkHasSplit<T, R11>, ForkHasSplit<T, R12>]): IHasSplit<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12]>
  split<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13>(...splits: readonly [ForkHasSplit<T, R1>, ForkHasSplit<T, R2>, ForkHasSplit<T, R3>, ForkHasSplit<T, R4>, ForkHasSplit<T, R5>, ForkHasSplit<T, R6>, ForkHasSplit<T, R7>, ForkHasSplit<T, R8>, ForkHasSplit<T, R9>, ForkHasSplit<T, R10>, ForkHasSplit<T, R11>, ForkHasSplit<T, R12>, ForkHasSplit<T, R13>]): IHasSplit<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13]>
  split<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14>(...splits: readonly [ForkHasSplit<T, R1>, ForkHasSplit<T, R2>, ForkHasSplit<T, R3>, ForkHasSplit<T, R4>, ForkHasSplit<T, R5>, ForkHasSplit<T, R6>, ForkHasSplit<T, R7>, ForkHasSplit<T, R8>, ForkHasSplit<T, R9>, ForkHasSplit<T, R10>, ForkHasSplit<T, R11>, ForkHasSplit<T, R12>, ForkHasSplit<T, R13>, ForkHasSplit<T, R14>]): IHasSplit<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14]>
  split<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15>(...splits: readonly [ForkHasSplit<T, R1>, ForkHasSplit<T, R2>, ForkHasSplit<T, R3>, ForkHasSplit<T, R4>, ForkHasSplit<T, R5>, ForkHasSplit<T, R6>, ForkHasSplit<T, R7>, ForkHasSplit<T, R8>, ForkHasSplit<T, R9>, ForkHasSplit<T, R10>, ForkHasSplit<T, R11>, ForkHasSplit<T, R12>, ForkHasSplit<T, R13>, ForkHasSplit<T, R14>, ForkHasSplit<T, R15>]): IHasSplit<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15]>
  split<R>(...splits: readonly (ForkHasSplit<T, R>)[]): IHasSplit<R[]>;
}


export interface ForkICollection<T, R> { (collection: ICollection<T> ): R; }
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
  , IHasZipShort<T>
  , IHasFork<T>
  , IHasSplit<T>
  {

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
  fork<R1>(...forks: readonly [ForkICollection<T, Iterateable<R1>>]): IHasFork<R1>
  fork<R1, R2>(...forks: readonly [ForkICollection<T, Iterateable<R1>>, ForkICollection<T, Iterateable<R2>>]): IHasFork<R1 | R2>
  fork<R1, R2, R3>(...forks: readonly [ForkICollection<T, Iterateable<R1>>, ForkICollection<T, Iterateable<R2>>, ForkICollection<T, Iterateable<R3>>]): IHasFork<R1 | R2 | R3>
  fork<R1, R2, R3, R4>(...forks: readonly [ForkICollection<T, Iterateable<R1>>, ForkICollection<T, Iterateable<R2>>, ForkICollection<T, Iterateable<R3>>, ForkICollection<T, Iterateable<R4>>]): IHasFork<R1 | R2 | R3 | R4>
  fork<R1, R2, R3, R4, R5>(...forks: readonly [ForkICollection<T, Iterateable<R1>>, ForkICollection<T, Iterateable<R2>>, ForkICollection<T, Iterateable<R3>>, ForkICollection<T, Iterateable<R4>>, ForkICollection<T, Iterateable<R5>>]): IHasFork<R1 | R2 | R3 | R4 | R5>
  fork<R1, R2, R3, R4, R5, R6>(...forks: readonly [ForkICollection<T, Iterateable<R1>>, ForkICollection<T, Iterateable<R2>>, ForkICollection<T, Iterateable<R3>>, ForkICollection<T, Iterateable<R4>>, ForkICollection<T, Iterateable<R5>>, ForkICollection<T, Iterateable<R6>>]): IHasFork<R1 | R2 | R3 | R4 | R5 | R6>
  fork<R1, R2, R3, R4, R5, R6, R7>(...forks: readonly [ForkICollection<T, Iterateable<R1>>, ForkICollection<T, Iterateable<R2>>, ForkICollection<T, Iterateable<R3>>, ForkICollection<T, Iterateable<R4>>, ForkICollection<T, Iterateable<R5>>, ForkICollection<T, Iterateable<R6>>, ForkICollection<T, Iterateable<R7>>]): IHasFork<R1 | R2 | R3 | R4 | R5 | R6 | R7>
  fork<R1, R2, R3, R4, R5, R6, R7, R8>(...forks: readonly [ForkICollection<T, Iterateable<R1>>, ForkICollection<T, Iterateable<R2>>, ForkICollection<T, Iterateable<R3>>, ForkICollection<T, Iterateable<R4>>, ForkICollection<T, Iterateable<R5>>, ForkICollection<T, Iterateable<R6>>, ForkICollection<T, Iterateable<R7>>, ForkICollection<T, Iterateable<R8>>]): IHasFork<R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8>
  fork<R1, R2, R3, R4, R5, R6, R7, R8, R9>(...forks: readonly [ForkICollection<T, Iterateable<R1>>, ForkICollection<T, Iterateable<R2>>, ForkICollection<T, Iterateable<R3>>, ForkICollection<T, Iterateable<R4>>, ForkICollection<T, Iterateable<R5>>, ForkICollection<T, Iterateable<R6>>, ForkICollection<T, Iterateable<R7>>, ForkICollection<T, Iterateable<R8>>, ForkICollection<T, Iterateable<R9>>]): IHasFork<R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9>
  fork<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(...forks: readonly [ForkICollection<T, Iterateable<R1>>, ForkICollection<T, Iterateable<R2>>, ForkICollection<T, Iterateable<R3>>, ForkICollection<T, Iterateable<R4>>, ForkICollection<T, Iterateable<R5>>, ForkICollection<T, Iterateable<R6>>, ForkICollection<T, Iterateable<R7>>, ForkICollection<T, Iterateable<R8>>, ForkICollection<T, Iterateable<R9>>, ForkICollection<T, Iterateable<R10>>]): IHasFork<R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10>
  fork<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(...forks: readonly [ForkICollection<T, Iterateable<R1>>, ForkICollection<T, Iterateable<R2>>, ForkICollection<T, Iterateable<R3>>, ForkICollection<T, Iterateable<R4>>, ForkICollection<T, Iterateable<R5>>, ForkICollection<T, Iterateable<R6>>, ForkICollection<T, Iterateable<R7>>, ForkICollection<T, Iterateable<R8>>, ForkICollection<T, Iterateable<R9>>, ForkICollection<T, Iterateable<R10>>, ForkICollection<T, Iterateable<R11>>]): IHasFork<R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11>
  fork<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(...forks: readonly [ForkICollection<T, Iterateable<R1>>, ForkICollection<T, Iterateable<R2>>, ForkICollection<T, Iterateable<R3>>, ForkICollection<T, Iterateable<R4>>, ForkICollection<T, Iterateable<R5>>, ForkICollection<T, Iterateable<R6>>, ForkICollection<T, Iterateable<R7>>, ForkICollection<T, Iterateable<R8>>, ForkICollection<T, Iterateable<R9>>, ForkICollection<T, Iterateable<R10>>, ForkICollection<T, Iterateable<R11>>, ForkICollection<T, Iterateable<R12>>]): IHasFork<R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11 | R12>
  fork<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13>(...forks: readonly [ForkICollection<T, Iterateable<R1>>, ForkICollection<T, Iterateable<R2>>, ForkICollection<T, Iterateable<R3>>, ForkICollection<T, Iterateable<R4>>, ForkICollection<T, Iterateable<R5>>, ForkICollection<T, Iterateable<R6>>, ForkICollection<T, Iterateable<R7>>, ForkICollection<T, Iterateable<R8>>, ForkICollection<T, Iterateable<R9>>, ForkICollection<T, Iterateable<R10>>, ForkICollection<T, Iterateable<R11>>, ForkICollection<T, Iterateable<R12>>, ForkICollection<T, Iterateable<R13>>]): IHasFork<R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11 | R12 | R13>
  fork<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14>(...forks: readonly [ForkICollection<T, Iterateable<R1>>, ForkICollection<T, Iterateable<R2>>, ForkICollection<T, Iterateable<R3>>, ForkICollection<T, Iterateable<R4>>, ForkICollection<T, Iterateable<R5>>, ForkICollection<T, Iterateable<R6>>, ForkICollection<T, Iterateable<R7>>, ForkICollection<T, Iterateable<R8>>, ForkICollection<T, Iterateable<R9>>, ForkICollection<T, Iterateable<R10>>, ForkICollection<T, Iterateable<R11>>, ForkICollection<T, Iterateable<R12>>, ForkICollection<T, Iterateable<R13>>, ForkICollection<T, Iterateable<R14>>]): IHasFork<R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11 | R12 | R13 | R14>
  fork<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15>(...forks: readonly [ForkICollection<T, Iterateable<R1>>, ForkICollection<T, Iterateable<R2>>, ForkICollection<T, Iterateable<R3>>, ForkICollection<T, Iterateable<R4>>, ForkICollection<T, Iterateable<R5>>, ForkICollection<T, Iterateable<R6>>, ForkICollection<T, Iterateable<R7>>, ForkICollection<T, Iterateable<R8>>, ForkICollection<T, Iterateable<R9>>, ForkICollection<T, Iterateable<R10>>, ForkICollection<T, Iterateable<R11>>, ForkICollection<T, Iterateable<R12>>, ForkICollection<T, Iterateable<R13>>, ForkICollection<T, Iterateable<R14>>, ForkICollection<T, Iterateable<R15>>]): IHasFork<R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11 | R12 | R13 | R14 | R15>
  fork<R>(...forks: readonly (ForkICollection<T, Iterateable<R>>)[]): IHasFork<R>
  fork<R>(...forks: readonly (ForkICollection<T, Iterateable<R>>)[]): IHasFork<R>;
  split<R1>(...splits: readonly [ForkHasSplit<T, R1>]): IHasSplit<[R1]>
  split<R1, R2>(...splits: readonly [ForkICollection<T, R1>, ForkICollection<T, R2>]): IHasSplit<[R1, R2]>
  split<R1, R2, R3>(...splits: readonly [ForkICollection<T, R1>, ForkICollection<T, R2>, ForkICollection<T, R3>]): IHasSplit<[R1, R2, R3]>
  split<R1, R2, R3, R4>(...splits: readonly [ForkICollection<T, R1>, ForkICollection<T, R2>, ForkICollection<T, R3>, ForkICollection<T, R4>]): IHasSplit<[R1, R2, R3, R4]>
  split<R1, R2, R3, R4, R5>(...splits: readonly [ForkICollection<T, R1>, ForkICollection<T, R2>, ForkICollection<T, R3>, ForkICollection<T, R4>, ForkICollection<T, R5>]): IHasSplit<[R1, R2, R3, R4, R5]>
  split<R1, R2, R3, R4, R5, R6>(...splits: readonly [ForkICollection<T, R1>, ForkICollection<T, R2>, ForkICollection<T, R3>, ForkICollection<T, R4>, ForkICollection<T, R5>, ForkICollection<T, R6>]): IHasSplit<[R1, R2, R3, R4, R5, R6]>
  split<R1, R2, R3, R4, R5, R6, R7>(...splits: readonly [ForkICollection<T, R1>, ForkICollection<T, R2>, ForkICollection<T, R3>, ForkICollection<T, R4>, ForkICollection<T, R5>, ForkICollection<T, R6>, ForkICollection<T, R7>]): IHasSplit<[R1, R2, R3, R4, R5, R6, R7]>
  split<R1, R2, R3, R4, R5, R6, R7, R8>(...splits: readonly [ForkICollection<T, R1>, ForkICollection<T, R2>, ForkICollection<T, R3>, ForkICollection<T, R4>, ForkICollection<T, R5>, ForkICollection<T, R6>, ForkICollection<T, R7>, ForkICollection<T, R8>]): IHasSplit<[R1, R2, R3, R4, R5, R6, R7, R8]>
  split<R1, R2, R3, R4, R5, R6, R7, R8, R9>(...splits: readonly [ForkICollection<T, R1>, ForkICollection<T, R2>, ForkICollection<T, R3>, ForkICollection<T, R4>, ForkICollection<T, R5>, ForkICollection<T, R6>, ForkICollection<T, R7>, ForkICollection<T, R8>, ForkICollection<T, R9>]): IHasSplit<[R1, R2, R3, R4, R5, R6, R7, R8, R9]>
  split<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(...splits: readonly [ForkICollection<T, R1>, ForkICollection<T, R2>, ForkICollection<T, R3>, ForkICollection<T, R4>, ForkICollection<T, R5>, ForkICollection<T, R6>, ForkICollection<T, R7>, ForkICollection<T, R8>, ForkICollection<T, R9>, ForkICollection<T, R10>]): IHasSplit<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10]>
  split<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(...splits: readonly [ForkICollection<T, R1>, ForkICollection<T, R2>, ForkICollection<T, R3>, ForkICollection<T, R4>, ForkICollection<T, R5>, ForkICollection<T, R6>, ForkICollection<T, R7>, ForkICollection<T, R8>, ForkICollection<T, R9>, ForkICollection<T, R10>, ForkICollection<T, R11>]): IHasSplit<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11]>
  split<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(...splits: readonly [ForkICollection<T, R1>, ForkICollection<T, R2>, ForkICollection<T, R3>, ForkICollection<T, R4>, ForkICollection<T, R5>, ForkICollection<T, R6>, ForkICollection<T, R7>, ForkICollection<T, R8>, ForkICollection<T, R9>, ForkICollection<T, R10>, ForkICollection<T, R11>, ForkICollection<T, R12>]): IHasSplit<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12]>
  split<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13>(...splits: readonly [ForkICollection<T, R1>, ForkICollection<T, R2>, ForkICollection<T, R3>, ForkICollection<T, R4>, ForkICollection<T, R5>, ForkICollection<T, R6>, ForkICollection<T, R7>, ForkICollection<T, R8>, ForkICollection<T, R9>, ForkICollection<T, R10>, ForkICollection<T, R11>, ForkICollection<T, R12>, ForkICollection<T, R13>]): IHasSplit<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13]>
  split<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14>(...splits: readonly [ForkICollection<T, R1>, ForkICollection<T, R2>, ForkICollection<T, R3>, ForkICollection<T, R4>, ForkICollection<T, R5>, ForkICollection<T, R6>, ForkICollection<T, R7>, ForkICollection<T, R8>, ForkICollection<T, R9>, ForkICollection<T, R10>, ForkICollection<T, R11>, ForkICollection<T, R12>, ForkICollection<T, R13>, ForkICollection<T, R14>]): IHasSplit<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14]>
  split<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15>(...splits: readonly [ForkICollection<T, R1>, ForkICollection<T, R2>, ForkICollection<T, R3>, ForkICollection<T, R4>, ForkICollection<T, R5>, ForkICollection<T, R6>, ForkICollection<T, R7>, ForkICollection<T, R8>, ForkICollection<T, R9>, ForkICollection<T, R10>, ForkICollection<T, R11>, ForkICollection<T, R12>, ForkICollection<T, R13>, ForkICollection<T, R14>, ForkICollection<T, R15>]): IHasSplit<[R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15]>
  split<R>(...splits: readonly (ForkICollection<T, R>)[]): IHasSplit<R[]>;
}
