/**
 * implementation of high-kind types from fp-ts
 *
 * solves the problem of generics which are themselves generic,
 * for which we want to give a provide generic parameter
 * for example
 *  ```ts
 *  type Lift = <U, H extends Unary<?>(arg: U): H<U>;
 * ```
 * doesnt work in TypeScript
 *
 * resources:
 * - https://github.com/gcanti/fp-ts
 * - https://github.com/microsoft/TypeScript/issues/1213#issuecomment-696307564
 * - https://github.com/microsoft/TypeScript/issues/1213#issuecomment-415694540
 * - https://medium.com/@gcanti/higher-kinded-types-in-typescript-static-and-fantasy-land-d41c361d0dbe
 */

// map of URI's to unary generics
// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-unused-vars
export interface URIToKind<A> {
  // 'Exhaustable': 'Exhaustable<A>'
  // 'Repeatabl'' 'Repeatable<A>'
  // ...
}

// signature of a higher kind type
export interface HKT<URI, A> {
  readonly _URI: URI;
  readonly _A: A;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type URIS = keyof URIToKind<any>;

// If this is a URI, extract it from the URI map (URIToKind)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Kind<URI extends URIS, A> = URI extends URIS ? URIToKind<A>[URI] : any;


/**
 * step 1. create your class
 * ```ts
 * class MyClass {
 *  //
 * }
 * ```
 *
 * step 2. define your URI name
 * ```ts
 * step 2. define your URI's name
 * export const URI = 'myUri';
 * export type URI = typeof URI;
 * ```
 *
 * step 3. register your type
 * ```
 * declare module '@nkp/iterable/HKT' {
 *    interface URIToKind<A> {
 *      readonly [URI]: MyClass
 *    }
 * }
 * ```
 */
