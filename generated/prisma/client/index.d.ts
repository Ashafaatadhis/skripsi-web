
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Owner
 * 
 */
export type Owner = $Result.DefaultSelection<Prisma.$OwnerPayload>
/**
 * Model Kosan
 * 
 */
export type Kosan = $Result.DefaultSelection<Prisma.$KosanPayload>
/**
 * Model Room
 * 
 */
export type Room = $Result.DefaultSelection<Prisma.$RoomPayload>
/**
 * Model Tenant
 * 
 */
export type Tenant = $Result.DefaultSelection<Prisma.$TenantPayload>
/**
 * Model Rental
 * 
 */
export type Rental = $Result.DefaultSelection<Prisma.$RentalPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model Image
 * 
 */
export type Image = $Result.DefaultSelection<Prisma.$ImagePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const RentalStatus: {
  active: 'active',
  cancelled: 'cancelled',
  checked_out: 'checked_out'
};

export type RentalStatus = (typeof RentalStatus)[keyof typeof RentalStatus]


export const PaymentStatus: {
  pending: 'pending',
  paid: 'paid',
  overdue: 'overdue',
  cancelled: 'cancelled'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]

}

export type RentalStatus = $Enums.RentalStatus

export const RentalStatus: typeof $Enums.RentalStatus

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Owners
 * const owners = await prisma.owner.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Owners
   * const owners = await prisma.owner.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.owner`: Exposes CRUD operations for the **Owner** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Owners
    * const owners = await prisma.owner.findMany()
    * ```
    */
  get owner(): Prisma.OwnerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.kosan`: Exposes CRUD operations for the **Kosan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Kosans
    * const kosans = await prisma.kosan.findMany()
    * ```
    */
  get kosan(): Prisma.KosanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.room`: Exposes CRUD operations for the **Room** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rooms
    * const rooms = await prisma.room.findMany()
    * ```
    */
  get room(): Prisma.RoomDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tenant`: Exposes CRUD operations for the **Tenant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tenants
    * const tenants = await prisma.tenant.findMany()
    * ```
    */
  get tenant(): Prisma.TenantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rental`: Exposes CRUD operations for the **Rental** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rentals
    * const rentals = await prisma.rental.findMany()
    * ```
    */
  get rental(): Prisma.RentalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.image`: Exposes CRUD operations for the **Image** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Images
    * const images = await prisma.image.findMany()
    * ```
    */
  get image(): Prisma.ImageDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.6.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Owner: 'Owner',
    Kosan: 'Kosan',
    Room: 'Room',
    Tenant: 'Tenant',
    Rental: 'Rental',
    Payment: 'Payment',
    Image: 'Image'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "owner" | "kosan" | "room" | "tenant" | "rental" | "payment" | "image"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Owner: {
        payload: Prisma.$OwnerPayload<ExtArgs>
        fields: Prisma.OwnerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OwnerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OwnerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload>
          }
          findFirst: {
            args: Prisma.OwnerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OwnerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload>
          }
          findMany: {
            args: Prisma.OwnerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload>[]
          }
          create: {
            args: Prisma.OwnerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload>
          }
          createMany: {
            args: Prisma.OwnerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OwnerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload>[]
          }
          delete: {
            args: Prisma.OwnerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload>
          }
          update: {
            args: Prisma.OwnerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload>
          }
          deleteMany: {
            args: Prisma.OwnerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OwnerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OwnerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload>[]
          }
          upsert: {
            args: Prisma.OwnerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnerPayload>
          }
          aggregate: {
            args: Prisma.OwnerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOwner>
          }
          groupBy: {
            args: Prisma.OwnerGroupByArgs<ExtArgs>
            result: $Utils.Optional<OwnerGroupByOutputType>[]
          }
          count: {
            args: Prisma.OwnerCountArgs<ExtArgs>
            result: $Utils.Optional<OwnerCountAggregateOutputType> | number
          }
        }
      }
      Kosan: {
        payload: Prisma.$KosanPayload<ExtArgs>
        fields: Prisma.KosanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KosanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KosanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KosanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KosanPayload>
          }
          findFirst: {
            args: Prisma.KosanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KosanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KosanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KosanPayload>
          }
          findMany: {
            args: Prisma.KosanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KosanPayload>[]
          }
          create: {
            args: Prisma.KosanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KosanPayload>
          }
          createMany: {
            args: Prisma.KosanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KosanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KosanPayload>[]
          }
          delete: {
            args: Prisma.KosanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KosanPayload>
          }
          update: {
            args: Prisma.KosanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KosanPayload>
          }
          deleteMany: {
            args: Prisma.KosanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KosanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.KosanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KosanPayload>[]
          }
          upsert: {
            args: Prisma.KosanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KosanPayload>
          }
          aggregate: {
            args: Prisma.KosanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKosan>
          }
          groupBy: {
            args: Prisma.KosanGroupByArgs<ExtArgs>
            result: $Utils.Optional<KosanGroupByOutputType>[]
          }
          count: {
            args: Prisma.KosanCountArgs<ExtArgs>
            result: $Utils.Optional<KosanCountAggregateOutputType> | number
          }
        }
      }
      Room: {
        payload: Prisma.$RoomPayload<ExtArgs>
        fields: Prisma.RoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findFirst: {
            args: Prisma.RoomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findMany: {
            args: Prisma.RoomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          create: {
            args: Prisma.RoomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          createMany: {
            args: Prisma.RoomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          delete: {
            args: Prisma.RoomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          update: {
            args: Prisma.RoomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          deleteMany: {
            args: Prisma.RoomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          upsert: {
            args: Prisma.RoomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          aggregate: {
            args: Prisma.RoomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoom>
          }
          groupBy: {
            args: Prisma.RoomGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomCountArgs<ExtArgs>
            result: $Utils.Optional<RoomCountAggregateOutputType> | number
          }
        }
      }
      Tenant: {
        payload: Prisma.$TenantPayload<ExtArgs>
        fields: Prisma.TenantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TenantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TenantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findFirst: {
            args: Prisma.TenantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TenantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findMany: {
            args: Prisma.TenantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          create: {
            args: Prisma.TenantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          createMany: {
            args: Prisma.TenantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TenantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          delete: {
            args: Prisma.TenantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          update: {
            args: Prisma.TenantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          deleteMany: {
            args: Prisma.TenantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TenantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TenantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          upsert: {
            args: Prisma.TenantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          aggregate: {
            args: Prisma.TenantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTenant>
          }
          groupBy: {
            args: Prisma.TenantGroupByArgs<ExtArgs>
            result: $Utils.Optional<TenantGroupByOutputType>[]
          }
          count: {
            args: Prisma.TenantCountArgs<ExtArgs>
            result: $Utils.Optional<TenantCountAggregateOutputType> | number
          }
        }
      }
      Rental: {
        payload: Prisma.$RentalPayload<ExtArgs>
        fields: Prisma.RentalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RentalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RentalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalPayload>
          }
          findFirst: {
            args: Prisma.RentalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RentalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalPayload>
          }
          findMany: {
            args: Prisma.RentalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalPayload>[]
          }
          create: {
            args: Prisma.RentalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalPayload>
          }
          createMany: {
            args: Prisma.RentalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RentalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalPayload>[]
          }
          delete: {
            args: Prisma.RentalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalPayload>
          }
          update: {
            args: Prisma.RentalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalPayload>
          }
          deleteMany: {
            args: Prisma.RentalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RentalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RentalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalPayload>[]
          }
          upsert: {
            args: Prisma.RentalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RentalPayload>
          }
          aggregate: {
            args: Prisma.RentalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRental>
          }
          groupBy: {
            args: Prisma.RentalGroupByArgs<ExtArgs>
            result: $Utils.Optional<RentalGroupByOutputType>[]
          }
          count: {
            args: Prisma.RentalCountArgs<ExtArgs>
            result: $Utils.Optional<RentalCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      Image: {
        payload: Prisma.$ImagePayload<ExtArgs>
        fields: Prisma.ImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          findFirst: {
            args: Prisma.ImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          findMany: {
            args: Prisma.ImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>[]
          }
          create: {
            args: Prisma.ImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          createMany: {
            args: Prisma.ImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ImageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>[]
          }
          delete: {
            args: Prisma.ImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          update: {
            args: Prisma.ImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          deleteMany: {
            args: Prisma.ImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ImageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>[]
          }
          upsert: {
            args: Prisma.ImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImagePayload>
          }
          aggregate: {
            args: Prisma.ImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateImage>
          }
          groupBy: {
            args: Prisma.ImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ImageCountArgs<ExtArgs>
            result: $Utils.Optional<ImageCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    owner?: OwnerOmit
    kosan?: KosanOmit
    room?: RoomOmit
    tenant?: TenantOmit
    rental?: RentalOmit
    payment?: PaymentOmit
    image?: ImageOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type OwnerCountOutputType
   */

  export type OwnerCountOutputType = {
    kosan: number
  }

  export type OwnerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kosan?: boolean | OwnerCountOutputTypeCountKosanArgs
  }

  // Custom InputTypes
  /**
   * OwnerCountOutputType without action
   */
  export type OwnerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OwnerCountOutputType
     */
    select?: OwnerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OwnerCountOutputType without action
   */
  export type OwnerCountOutputTypeCountKosanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KosanWhereInput
  }


  /**
   * Count Type KosanCountOutputType
   */

  export type KosanCountOutputType = {
    rooms: number
    images: number
  }

  export type KosanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rooms?: boolean | KosanCountOutputTypeCountRoomsArgs
    images?: boolean | KosanCountOutputTypeCountImagesArgs
  }

  // Custom InputTypes
  /**
   * KosanCountOutputType without action
   */
  export type KosanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KosanCountOutputType
     */
    select?: KosanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * KosanCountOutputType without action
   */
  export type KosanCountOutputTypeCountRoomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
  }

  /**
   * KosanCountOutputType without action
   */
  export type KosanCountOutputTypeCountImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImageWhereInput
  }


  /**
   * Count Type RoomCountOutputType
   */

  export type RoomCountOutputType = {
    rentals: number
    images: number
  }

  export type RoomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rentals?: boolean | RoomCountOutputTypeCountRentalsArgs
    images?: boolean | RoomCountOutputTypeCountImagesArgs
  }

  // Custom InputTypes
  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomCountOutputType
     */
    select?: RoomCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeCountRentalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RentalWhereInput
  }

  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeCountImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImageWhereInput
  }


  /**
   * Count Type TenantCountOutputType
   */

  export type TenantCountOutputType = {
    rentals: number
  }

  export type TenantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rentals?: boolean | TenantCountOutputTypeCountRentalsArgs
  }

  // Custom InputTypes
  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantCountOutputType
     */
    select?: TenantCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountRentalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RentalWhereInput
  }


  /**
   * Count Type RentalCountOutputType
   */

  export type RentalCountOutputType = {
    payments: number
  }

  export type RentalCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payments?: boolean | RentalCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * RentalCountOutputType without action
   */
  export type RentalCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentalCountOutputType
     */
    select?: RentalCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RentalCountOutputType without action
   */
  export type RentalCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }


  /**
   * Count Type PaymentCountOutputType
   */

  export type PaymentCountOutputType = {
    images: number
  }

  export type PaymentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    images?: boolean | PaymentCountOutputTypeCountImagesArgs
  }

  // Custom InputTypes
  /**
   * PaymentCountOutputType without action
   */
  export type PaymentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentCountOutputType
     */
    select?: PaymentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PaymentCountOutputType without action
   */
  export type PaymentCountOutputTypeCountImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Owner
   */

  export type AggregateOwner = {
    _count: OwnerCountAggregateOutputType | null
    _min: OwnerMinAggregateOutputType | null
    _max: OwnerMaxAggregateOutputType | null
  }

  export type OwnerMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    name: string | null
    phone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OwnerMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    name: string | null
    phone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OwnerCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    name: number
    phone: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OwnerMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OwnerMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OwnerCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OwnerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Owner to aggregate.
     */
    where?: OwnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Owners to fetch.
     */
    orderBy?: OwnerOrderByWithRelationInput | OwnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OwnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Owners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Owners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Owners
    **/
    _count?: true | OwnerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OwnerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OwnerMaxAggregateInputType
  }

  export type GetOwnerAggregateType<T extends OwnerAggregateArgs> = {
        [P in keyof T & keyof AggregateOwner]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOwner[P]>
      : GetScalarType<T[P], AggregateOwner[P]>
  }




  export type OwnerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OwnerWhereInput
    orderBy?: OwnerOrderByWithAggregationInput | OwnerOrderByWithAggregationInput[]
    by: OwnerScalarFieldEnum[] | OwnerScalarFieldEnum
    having?: OwnerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OwnerCountAggregateInputType | true
    _min?: OwnerMinAggregateInputType
    _max?: OwnerMaxAggregateInputType
  }

  export type OwnerGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    name: string
    phone: string | null
    createdAt: Date
    updatedAt: Date
    _count: OwnerCountAggregateOutputType | null
    _min: OwnerMinAggregateOutputType | null
    _max: OwnerMaxAggregateOutputType | null
  }

  type GetOwnerGroupByPayload<T extends OwnerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OwnerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OwnerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OwnerGroupByOutputType[P]>
            : GetScalarType<T[P], OwnerGroupByOutputType[P]>
        }
      >
    >


  export type OwnerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    kosan?: boolean | Owner$kosanArgs<ExtArgs>
    _count?: boolean | OwnerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["owner"]>

  export type OwnerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["owner"]>

  export type OwnerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["owner"]>

  export type OwnerSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OwnerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "name" | "phone" | "createdAt" | "updatedAt", ExtArgs["result"]["owner"]>
  export type OwnerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kosan?: boolean | Owner$kosanArgs<ExtArgs>
    _count?: boolean | OwnerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OwnerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type OwnerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OwnerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Owner"
    objects: {
      kosan: Prisma.$KosanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      name: string
      phone: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["owner"]>
    composites: {}
  }

  type OwnerGetPayload<S extends boolean | null | undefined | OwnerDefaultArgs> = $Result.GetResult<Prisma.$OwnerPayload, S>

  type OwnerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OwnerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OwnerCountAggregateInputType | true
    }

  export interface OwnerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Owner'], meta: { name: 'Owner' } }
    /**
     * Find zero or one Owner that matches the filter.
     * @param {OwnerFindUniqueArgs} args - Arguments to find a Owner
     * @example
     * // Get one Owner
     * const owner = await prisma.owner.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OwnerFindUniqueArgs>(args: SelectSubset<T, OwnerFindUniqueArgs<ExtArgs>>): Prisma__OwnerClient<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Owner that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OwnerFindUniqueOrThrowArgs} args - Arguments to find a Owner
     * @example
     * // Get one Owner
     * const owner = await prisma.owner.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OwnerFindUniqueOrThrowArgs>(args: SelectSubset<T, OwnerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OwnerClient<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Owner that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerFindFirstArgs} args - Arguments to find a Owner
     * @example
     * // Get one Owner
     * const owner = await prisma.owner.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OwnerFindFirstArgs>(args?: SelectSubset<T, OwnerFindFirstArgs<ExtArgs>>): Prisma__OwnerClient<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Owner that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerFindFirstOrThrowArgs} args - Arguments to find a Owner
     * @example
     * // Get one Owner
     * const owner = await prisma.owner.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OwnerFindFirstOrThrowArgs>(args?: SelectSubset<T, OwnerFindFirstOrThrowArgs<ExtArgs>>): Prisma__OwnerClient<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Owners that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Owners
     * const owners = await prisma.owner.findMany()
     * 
     * // Get first 10 Owners
     * const owners = await prisma.owner.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ownerWithIdOnly = await prisma.owner.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OwnerFindManyArgs>(args?: SelectSubset<T, OwnerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Owner.
     * @param {OwnerCreateArgs} args - Arguments to create a Owner.
     * @example
     * // Create one Owner
     * const Owner = await prisma.owner.create({
     *   data: {
     *     // ... data to create a Owner
     *   }
     * })
     * 
     */
    create<T extends OwnerCreateArgs>(args: SelectSubset<T, OwnerCreateArgs<ExtArgs>>): Prisma__OwnerClient<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Owners.
     * @param {OwnerCreateManyArgs} args - Arguments to create many Owners.
     * @example
     * // Create many Owners
     * const owner = await prisma.owner.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OwnerCreateManyArgs>(args?: SelectSubset<T, OwnerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Owners and returns the data saved in the database.
     * @param {OwnerCreateManyAndReturnArgs} args - Arguments to create many Owners.
     * @example
     * // Create many Owners
     * const owner = await prisma.owner.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Owners and only return the `id`
     * const ownerWithIdOnly = await prisma.owner.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OwnerCreateManyAndReturnArgs>(args?: SelectSubset<T, OwnerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Owner.
     * @param {OwnerDeleteArgs} args - Arguments to delete one Owner.
     * @example
     * // Delete one Owner
     * const Owner = await prisma.owner.delete({
     *   where: {
     *     // ... filter to delete one Owner
     *   }
     * })
     * 
     */
    delete<T extends OwnerDeleteArgs>(args: SelectSubset<T, OwnerDeleteArgs<ExtArgs>>): Prisma__OwnerClient<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Owner.
     * @param {OwnerUpdateArgs} args - Arguments to update one Owner.
     * @example
     * // Update one Owner
     * const owner = await prisma.owner.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OwnerUpdateArgs>(args: SelectSubset<T, OwnerUpdateArgs<ExtArgs>>): Prisma__OwnerClient<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Owners.
     * @param {OwnerDeleteManyArgs} args - Arguments to filter Owners to delete.
     * @example
     * // Delete a few Owners
     * const { count } = await prisma.owner.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OwnerDeleteManyArgs>(args?: SelectSubset<T, OwnerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Owners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Owners
     * const owner = await prisma.owner.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OwnerUpdateManyArgs>(args: SelectSubset<T, OwnerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Owners and returns the data updated in the database.
     * @param {OwnerUpdateManyAndReturnArgs} args - Arguments to update many Owners.
     * @example
     * // Update many Owners
     * const owner = await prisma.owner.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Owners and only return the `id`
     * const ownerWithIdOnly = await prisma.owner.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OwnerUpdateManyAndReturnArgs>(args: SelectSubset<T, OwnerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Owner.
     * @param {OwnerUpsertArgs} args - Arguments to update or create a Owner.
     * @example
     * // Update or create a Owner
     * const owner = await prisma.owner.upsert({
     *   create: {
     *     // ... data to create a Owner
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Owner we want to update
     *   }
     * })
     */
    upsert<T extends OwnerUpsertArgs>(args: SelectSubset<T, OwnerUpsertArgs<ExtArgs>>): Prisma__OwnerClient<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Owners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerCountArgs} args - Arguments to filter Owners to count.
     * @example
     * // Count the number of Owners
     * const count = await prisma.owner.count({
     *   where: {
     *     // ... the filter for the Owners we want to count
     *   }
     * })
    **/
    count<T extends OwnerCountArgs>(
      args?: Subset<T, OwnerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OwnerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Owner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OwnerAggregateArgs>(args: Subset<T, OwnerAggregateArgs>): Prisma.PrismaPromise<GetOwnerAggregateType<T>>

    /**
     * Group by Owner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OwnerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OwnerGroupByArgs['orderBy'] }
        : { orderBy?: OwnerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OwnerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOwnerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Owner model
   */
  readonly fields: OwnerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Owner.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OwnerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    kosan<T extends Owner$kosanArgs<ExtArgs> = {}>(args?: Subset<T, Owner$kosanArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KosanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Owner model
   */
  interface OwnerFieldRefs {
    readonly id: FieldRef<"Owner", 'String'>
    readonly email: FieldRef<"Owner", 'String'>
    readonly passwordHash: FieldRef<"Owner", 'String'>
    readonly name: FieldRef<"Owner", 'String'>
    readonly phone: FieldRef<"Owner", 'String'>
    readonly createdAt: FieldRef<"Owner", 'DateTime'>
    readonly updatedAt: FieldRef<"Owner", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Owner findUnique
   */
  export type OwnerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Owner
     */
    omit?: OwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
    /**
     * Filter, which Owner to fetch.
     */
    where: OwnerWhereUniqueInput
  }

  /**
   * Owner findUniqueOrThrow
   */
  export type OwnerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Owner
     */
    omit?: OwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
    /**
     * Filter, which Owner to fetch.
     */
    where: OwnerWhereUniqueInput
  }

  /**
   * Owner findFirst
   */
  export type OwnerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Owner
     */
    omit?: OwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
    /**
     * Filter, which Owner to fetch.
     */
    where?: OwnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Owners to fetch.
     */
    orderBy?: OwnerOrderByWithRelationInput | OwnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Owners.
     */
    cursor?: OwnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Owners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Owners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Owners.
     */
    distinct?: OwnerScalarFieldEnum | OwnerScalarFieldEnum[]
  }

  /**
   * Owner findFirstOrThrow
   */
  export type OwnerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Owner
     */
    omit?: OwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
    /**
     * Filter, which Owner to fetch.
     */
    where?: OwnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Owners to fetch.
     */
    orderBy?: OwnerOrderByWithRelationInput | OwnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Owners.
     */
    cursor?: OwnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Owners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Owners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Owners.
     */
    distinct?: OwnerScalarFieldEnum | OwnerScalarFieldEnum[]
  }

  /**
   * Owner findMany
   */
  export type OwnerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Owner
     */
    omit?: OwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
    /**
     * Filter, which Owners to fetch.
     */
    where?: OwnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Owners to fetch.
     */
    orderBy?: OwnerOrderByWithRelationInput | OwnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Owners.
     */
    cursor?: OwnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Owners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Owners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Owners.
     */
    distinct?: OwnerScalarFieldEnum | OwnerScalarFieldEnum[]
  }

  /**
   * Owner create
   */
  export type OwnerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Owner
     */
    omit?: OwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
    /**
     * The data needed to create a Owner.
     */
    data: XOR<OwnerCreateInput, OwnerUncheckedCreateInput>
  }

  /**
   * Owner createMany
   */
  export type OwnerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Owners.
     */
    data: OwnerCreateManyInput | OwnerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Owner createManyAndReturn
   */
  export type OwnerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Owner
     */
    omit?: OwnerOmit<ExtArgs> | null
    /**
     * The data used to create many Owners.
     */
    data: OwnerCreateManyInput | OwnerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Owner update
   */
  export type OwnerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Owner
     */
    omit?: OwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
    /**
     * The data needed to update a Owner.
     */
    data: XOR<OwnerUpdateInput, OwnerUncheckedUpdateInput>
    /**
     * Choose, which Owner to update.
     */
    where: OwnerWhereUniqueInput
  }

  /**
   * Owner updateMany
   */
  export type OwnerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Owners.
     */
    data: XOR<OwnerUpdateManyMutationInput, OwnerUncheckedUpdateManyInput>
    /**
     * Filter which Owners to update
     */
    where?: OwnerWhereInput
    /**
     * Limit how many Owners to update.
     */
    limit?: number
  }

  /**
   * Owner updateManyAndReturn
   */
  export type OwnerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Owner
     */
    omit?: OwnerOmit<ExtArgs> | null
    /**
     * The data used to update Owners.
     */
    data: XOR<OwnerUpdateManyMutationInput, OwnerUncheckedUpdateManyInput>
    /**
     * Filter which Owners to update
     */
    where?: OwnerWhereInput
    /**
     * Limit how many Owners to update.
     */
    limit?: number
  }

  /**
   * Owner upsert
   */
  export type OwnerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Owner
     */
    omit?: OwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
    /**
     * The filter to search for the Owner to update in case it exists.
     */
    where: OwnerWhereUniqueInput
    /**
     * In case the Owner found by the `where` argument doesn't exist, create a new Owner with this data.
     */
    create: XOR<OwnerCreateInput, OwnerUncheckedCreateInput>
    /**
     * In case the Owner was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OwnerUpdateInput, OwnerUncheckedUpdateInput>
  }

  /**
   * Owner delete
   */
  export type OwnerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Owner
     */
    omit?: OwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
    /**
     * Filter which Owner to delete.
     */
    where: OwnerWhereUniqueInput
  }

  /**
   * Owner deleteMany
   */
  export type OwnerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Owners to delete
     */
    where?: OwnerWhereInput
    /**
     * Limit how many Owners to delete.
     */
    limit?: number
  }

  /**
   * Owner.kosan
   */
  export type Owner$kosanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kosan
     */
    select?: KosanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kosan
     */
    omit?: KosanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KosanInclude<ExtArgs> | null
    where?: KosanWhereInput
    orderBy?: KosanOrderByWithRelationInput | KosanOrderByWithRelationInput[]
    cursor?: KosanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: KosanScalarFieldEnum | KosanScalarFieldEnum[]
  }

  /**
   * Owner without action
   */
  export type OwnerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Owner
     */
    select?: OwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Owner
     */
    omit?: OwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnerInclude<ExtArgs> | null
  }


  /**
   * Model Kosan
   */

  export type AggregateKosan = {
    _count: KosanCountAggregateOutputType | null
    _min: KosanMinAggregateOutputType | null
    _max: KosanMaxAggregateOutputType | null
  }

  export type KosanMinAggregateOutputType = {
    id: string | null
    ownerId: string | null
    name: string | null
    address: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    humanId: string | null
  }

  export type KosanMaxAggregateOutputType = {
    id: string | null
    ownerId: string | null
    name: string | null
    address: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    humanId: string | null
  }

  export type KosanCountAggregateOutputType = {
    id: number
    ownerId: number
    name: number
    address: number
    description: number
    createdAt: number
    updatedAt: number
    humanId: number
    _all: number
  }


  export type KosanMinAggregateInputType = {
    id?: true
    ownerId?: true
    name?: true
    address?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    humanId?: true
  }

  export type KosanMaxAggregateInputType = {
    id?: true
    ownerId?: true
    name?: true
    address?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    humanId?: true
  }

  export type KosanCountAggregateInputType = {
    id?: true
    ownerId?: true
    name?: true
    address?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    humanId?: true
    _all?: true
  }

  export type KosanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Kosan to aggregate.
     */
    where?: KosanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kosans to fetch.
     */
    orderBy?: KosanOrderByWithRelationInput | KosanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KosanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kosans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kosans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Kosans
    **/
    _count?: true | KosanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KosanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KosanMaxAggregateInputType
  }

  export type GetKosanAggregateType<T extends KosanAggregateArgs> = {
        [P in keyof T & keyof AggregateKosan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKosan[P]>
      : GetScalarType<T[P], AggregateKosan[P]>
  }




  export type KosanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KosanWhereInput
    orderBy?: KosanOrderByWithAggregationInput | KosanOrderByWithAggregationInput[]
    by: KosanScalarFieldEnum[] | KosanScalarFieldEnum
    having?: KosanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KosanCountAggregateInputType | true
    _min?: KosanMinAggregateInputType
    _max?: KosanMaxAggregateInputType
  }

  export type KosanGroupByOutputType = {
    id: string
    ownerId: string
    name: string
    address: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    humanId: string
    _count: KosanCountAggregateOutputType | null
    _min: KosanMinAggregateOutputType | null
    _max: KosanMaxAggregateOutputType | null
  }

  type GetKosanGroupByPayload<T extends KosanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KosanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KosanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KosanGroupByOutputType[P]>
            : GetScalarType<T[P], KosanGroupByOutputType[P]>
        }
      >
    >


  export type KosanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    name?: boolean
    address?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    humanId?: boolean
    owner?: boolean | OwnerDefaultArgs<ExtArgs>
    rooms?: boolean | Kosan$roomsArgs<ExtArgs>
    images?: boolean | Kosan$imagesArgs<ExtArgs>
    _count?: boolean | KosanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kosan"]>

  export type KosanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    name?: boolean
    address?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    humanId?: boolean
    owner?: boolean | OwnerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kosan"]>

  export type KosanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    name?: boolean
    address?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    humanId?: boolean
    owner?: boolean | OwnerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kosan"]>

  export type KosanSelectScalar = {
    id?: boolean
    ownerId?: boolean
    name?: boolean
    address?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    humanId?: boolean
  }

  export type KosanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ownerId" | "name" | "address" | "description" | "createdAt" | "updatedAt" | "humanId", ExtArgs["result"]["kosan"]>
  export type KosanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | OwnerDefaultArgs<ExtArgs>
    rooms?: boolean | Kosan$roomsArgs<ExtArgs>
    images?: boolean | Kosan$imagesArgs<ExtArgs>
    _count?: boolean | KosanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type KosanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | OwnerDefaultArgs<ExtArgs>
  }
  export type KosanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | OwnerDefaultArgs<ExtArgs>
  }

  export type $KosanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Kosan"
    objects: {
      owner: Prisma.$OwnerPayload<ExtArgs>
      rooms: Prisma.$RoomPayload<ExtArgs>[]
      images: Prisma.$ImagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ownerId: string
      name: string
      address: string
      description: string | null
      createdAt: Date
      updatedAt: Date
      humanId: string
    }, ExtArgs["result"]["kosan"]>
    composites: {}
  }

  type KosanGetPayload<S extends boolean | null | undefined | KosanDefaultArgs> = $Result.GetResult<Prisma.$KosanPayload, S>

  type KosanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<KosanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: KosanCountAggregateInputType | true
    }

  export interface KosanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Kosan'], meta: { name: 'Kosan' } }
    /**
     * Find zero or one Kosan that matches the filter.
     * @param {KosanFindUniqueArgs} args - Arguments to find a Kosan
     * @example
     * // Get one Kosan
     * const kosan = await prisma.kosan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KosanFindUniqueArgs>(args: SelectSubset<T, KosanFindUniqueArgs<ExtArgs>>): Prisma__KosanClient<$Result.GetResult<Prisma.$KosanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Kosan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KosanFindUniqueOrThrowArgs} args - Arguments to find a Kosan
     * @example
     * // Get one Kosan
     * const kosan = await prisma.kosan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KosanFindUniqueOrThrowArgs>(args: SelectSubset<T, KosanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KosanClient<$Result.GetResult<Prisma.$KosanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Kosan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KosanFindFirstArgs} args - Arguments to find a Kosan
     * @example
     * // Get one Kosan
     * const kosan = await prisma.kosan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KosanFindFirstArgs>(args?: SelectSubset<T, KosanFindFirstArgs<ExtArgs>>): Prisma__KosanClient<$Result.GetResult<Prisma.$KosanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Kosan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KosanFindFirstOrThrowArgs} args - Arguments to find a Kosan
     * @example
     * // Get one Kosan
     * const kosan = await prisma.kosan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KosanFindFirstOrThrowArgs>(args?: SelectSubset<T, KosanFindFirstOrThrowArgs<ExtArgs>>): Prisma__KosanClient<$Result.GetResult<Prisma.$KosanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Kosans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KosanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Kosans
     * const kosans = await prisma.kosan.findMany()
     * 
     * // Get first 10 Kosans
     * const kosans = await prisma.kosan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const kosanWithIdOnly = await prisma.kosan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KosanFindManyArgs>(args?: SelectSubset<T, KosanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KosanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Kosan.
     * @param {KosanCreateArgs} args - Arguments to create a Kosan.
     * @example
     * // Create one Kosan
     * const Kosan = await prisma.kosan.create({
     *   data: {
     *     // ... data to create a Kosan
     *   }
     * })
     * 
     */
    create<T extends KosanCreateArgs>(args: SelectSubset<T, KosanCreateArgs<ExtArgs>>): Prisma__KosanClient<$Result.GetResult<Prisma.$KosanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Kosans.
     * @param {KosanCreateManyArgs} args - Arguments to create many Kosans.
     * @example
     * // Create many Kosans
     * const kosan = await prisma.kosan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KosanCreateManyArgs>(args?: SelectSubset<T, KosanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Kosans and returns the data saved in the database.
     * @param {KosanCreateManyAndReturnArgs} args - Arguments to create many Kosans.
     * @example
     * // Create many Kosans
     * const kosan = await prisma.kosan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Kosans and only return the `id`
     * const kosanWithIdOnly = await prisma.kosan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KosanCreateManyAndReturnArgs>(args?: SelectSubset<T, KosanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KosanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Kosan.
     * @param {KosanDeleteArgs} args - Arguments to delete one Kosan.
     * @example
     * // Delete one Kosan
     * const Kosan = await prisma.kosan.delete({
     *   where: {
     *     // ... filter to delete one Kosan
     *   }
     * })
     * 
     */
    delete<T extends KosanDeleteArgs>(args: SelectSubset<T, KosanDeleteArgs<ExtArgs>>): Prisma__KosanClient<$Result.GetResult<Prisma.$KosanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Kosan.
     * @param {KosanUpdateArgs} args - Arguments to update one Kosan.
     * @example
     * // Update one Kosan
     * const kosan = await prisma.kosan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KosanUpdateArgs>(args: SelectSubset<T, KosanUpdateArgs<ExtArgs>>): Prisma__KosanClient<$Result.GetResult<Prisma.$KosanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Kosans.
     * @param {KosanDeleteManyArgs} args - Arguments to filter Kosans to delete.
     * @example
     * // Delete a few Kosans
     * const { count } = await prisma.kosan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KosanDeleteManyArgs>(args?: SelectSubset<T, KosanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Kosans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KosanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Kosans
     * const kosan = await prisma.kosan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KosanUpdateManyArgs>(args: SelectSubset<T, KosanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Kosans and returns the data updated in the database.
     * @param {KosanUpdateManyAndReturnArgs} args - Arguments to update many Kosans.
     * @example
     * // Update many Kosans
     * const kosan = await prisma.kosan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Kosans and only return the `id`
     * const kosanWithIdOnly = await prisma.kosan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends KosanUpdateManyAndReturnArgs>(args: SelectSubset<T, KosanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KosanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Kosan.
     * @param {KosanUpsertArgs} args - Arguments to update or create a Kosan.
     * @example
     * // Update or create a Kosan
     * const kosan = await prisma.kosan.upsert({
     *   create: {
     *     // ... data to create a Kosan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Kosan we want to update
     *   }
     * })
     */
    upsert<T extends KosanUpsertArgs>(args: SelectSubset<T, KosanUpsertArgs<ExtArgs>>): Prisma__KosanClient<$Result.GetResult<Prisma.$KosanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Kosans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KosanCountArgs} args - Arguments to filter Kosans to count.
     * @example
     * // Count the number of Kosans
     * const count = await prisma.kosan.count({
     *   where: {
     *     // ... the filter for the Kosans we want to count
     *   }
     * })
    **/
    count<T extends KosanCountArgs>(
      args?: Subset<T, KosanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KosanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Kosan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KosanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends KosanAggregateArgs>(args: Subset<T, KosanAggregateArgs>): Prisma.PrismaPromise<GetKosanAggregateType<T>>

    /**
     * Group by Kosan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KosanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends KosanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KosanGroupByArgs['orderBy'] }
        : { orderBy?: KosanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, KosanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKosanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Kosan model
   */
  readonly fields: KosanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Kosan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KosanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends OwnerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OwnerDefaultArgs<ExtArgs>>): Prisma__OwnerClient<$Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    rooms<T extends Kosan$roomsArgs<ExtArgs> = {}>(args?: Subset<T, Kosan$roomsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    images<T extends Kosan$imagesArgs<ExtArgs> = {}>(args?: Subset<T, Kosan$imagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Kosan model
   */
  interface KosanFieldRefs {
    readonly id: FieldRef<"Kosan", 'String'>
    readonly ownerId: FieldRef<"Kosan", 'String'>
    readonly name: FieldRef<"Kosan", 'String'>
    readonly address: FieldRef<"Kosan", 'String'>
    readonly description: FieldRef<"Kosan", 'String'>
    readonly createdAt: FieldRef<"Kosan", 'DateTime'>
    readonly updatedAt: FieldRef<"Kosan", 'DateTime'>
    readonly humanId: FieldRef<"Kosan", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Kosan findUnique
   */
  export type KosanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kosan
     */
    select?: KosanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kosan
     */
    omit?: KosanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KosanInclude<ExtArgs> | null
    /**
     * Filter, which Kosan to fetch.
     */
    where: KosanWhereUniqueInput
  }

  /**
   * Kosan findUniqueOrThrow
   */
  export type KosanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kosan
     */
    select?: KosanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kosan
     */
    omit?: KosanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KosanInclude<ExtArgs> | null
    /**
     * Filter, which Kosan to fetch.
     */
    where: KosanWhereUniqueInput
  }

  /**
   * Kosan findFirst
   */
  export type KosanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kosan
     */
    select?: KosanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kosan
     */
    omit?: KosanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KosanInclude<ExtArgs> | null
    /**
     * Filter, which Kosan to fetch.
     */
    where?: KosanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kosans to fetch.
     */
    orderBy?: KosanOrderByWithRelationInput | KosanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Kosans.
     */
    cursor?: KosanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kosans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kosans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Kosans.
     */
    distinct?: KosanScalarFieldEnum | KosanScalarFieldEnum[]
  }

  /**
   * Kosan findFirstOrThrow
   */
  export type KosanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kosan
     */
    select?: KosanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kosan
     */
    omit?: KosanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KosanInclude<ExtArgs> | null
    /**
     * Filter, which Kosan to fetch.
     */
    where?: KosanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kosans to fetch.
     */
    orderBy?: KosanOrderByWithRelationInput | KosanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Kosans.
     */
    cursor?: KosanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kosans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kosans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Kosans.
     */
    distinct?: KosanScalarFieldEnum | KosanScalarFieldEnum[]
  }

  /**
   * Kosan findMany
   */
  export type KosanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kosan
     */
    select?: KosanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kosan
     */
    omit?: KosanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KosanInclude<ExtArgs> | null
    /**
     * Filter, which Kosans to fetch.
     */
    where?: KosanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kosans to fetch.
     */
    orderBy?: KosanOrderByWithRelationInput | KosanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Kosans.
     */
    cursor?: KosanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kosans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kosans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Kosans.
     */
    distinct?: KosanScalarFieldEnum | KosanScalarFieldEnum[]
  }

  /**
   * Kosan create
   */
  export type KosanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kosan
     */
    select?: KosanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kosan
     */
    omit?: KosanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KosanInclude<ExtArgs> | null
    /**
     * The data needed to create a Kosan.
     */
    data: XOR<KosanCreateInput, KosanUncheckedCreateInput>
  }

  /**
   * Kosan createMany
   */
  export type KosanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Kosans.
     */
    data: KosanCreateManyInput | KosanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Kosan createManyAndReturn
   */
  export type KosanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kosan
     */
    select?: KosanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Kosan
     */
    omit?: KosanOmit<ExtArgs> | null
    /**
     * The data used to create many Kosans.
     */
    data: KosanCreateManyInput | KosanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KosanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Kosan update
   */
  export type KosanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kosan
     */
    select?: KosanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kosan
     */
    omit?: KosanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KosanInclude<ExtArgs> | null
    /**
     * The data needed to update a Kosan.
     */
    data: XOR<KosanUpdateInput, KosanUncheckedUpdateInput>
    /**
     * Choose, which Kosan to update.
     */
    where: KosanWhereUniqueInput
  }

  /**
   * Kosan updateMany
   */
  export type KosanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Kosans.
     */
    data: XOR<KosanUpdateManyMutationInput, KosanUncheckedUpdateManyInput>
    /**
     * Filter which Kosans to update
     */
    where?: KosanWhereInput
    /**
     * Limit how many Kosans to update.
     */
    limit?: number
  }

  /**
   * Kosan updateManyAndReturn
   */
  export type KosanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kosan
     */
    select?: KosanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Kosan
     */
    omit?: KosanOmit<ExtArgs> | null
    /**
     * The data used to update Kosans.
     */
    data: XOR<KosanUpdateManyMutationInput, KosanUncheckedUpdateManyInput>
    /**
     * Filter which Kosans to update
     */
    where?: KosanWhereInput
    /**
     * Limit how many Kosans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KosanIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Kosan upsert
   */
  export type KosanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kosan
     */
    select?: KosanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kosan
     */
    omit?: KosanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KosanInclude<ExtArgs> | null
    /**
     * The filter to search for the Kosan to update in case it exists.
     */
    where: KosanWhereUniqueInput
    /**
     * In case the Kosan found by the `where` argument doesn't exist, create a new Kosan with this data.
     */
    create: XOR<KosanCreateInput, KosanUncheckedCreateInput>
    /**
     * In case the Kosan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KosanUpdateInput, KosanUncheckedUpdateInput>
  }

  /**
   * Kosan delete
   */
  export type KosanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kosan
     */
    select?: KosanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kosan
     */
    omit?: KosanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KosanInclude<ExtArgs> | null
    /**
     * Filter which Kosan to delete.
     */
    where: KosanWhereUniqueInput
  }

  /**
   * Kosan deleteMany
   */
  export type KosanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Kosans to delete
     */
    where?: KosanWhereInput
    /**
     * Limit how many Kosans to delete.
     */
    limit?: number
  }

  /**
   * Kosan.rooms
   */
  export type Kosan$roomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    cursor?: RoomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Kosan.images
   */
  export type Kosan$imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    where?: ImageWhereInput
    orderBy?: ImageOrderByWithRelationInput | ImageOrderByWithRelationInput[]
    cursor?: ImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ImageScalarFieldEnum | ImageScalarFieldEnum[]
  }

  /**
   * Kosan without action
   */
  export type KosanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kosan
     */
    select?: KosanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kosan
     */
    omit?: KosanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KosanInclude<ExtArgs> | null
  }


  /**
   * Model Room
   */

  export type AggregateRoom = {
    _count: RoomCountAggregateOutputType | null
    _avg: RoomAvgAggregateOutputType | null
    _sum: RoomSumAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  export type RoomAvgAggregateOutputType = {
    monthlyPrice: number | null
    quantity: number | null
  }

  export type RoomSumAggregateOutputType = {
    monthlyPrice: number | null
    quantity: number | null
  }

  export type RoomMinAggregateOutputType = {
    id: string | null
    kosanId: string | null
    name: string | null
    monthlyPrice: number | null
    createdAt: Date | null
    updatedAt: Date | null
    humanId: string | null
    quantity: number | null
  }

  export type RoomMaxAggregateOutputType = {
    id: string | null
    kosanId: string | null
    name: string | null
    monthlyPrice: number | null
    createdAt: Date | null
    updatedAt: Date | null
    humanId: string | null
    quantity: number | null
  }

  export type RoomCountAggregateOutputType = {
    id: number
    kosanId: number
    name: number
    monthlyPrice: number
    createdAt: number
    updatedAt: number
    humanId: number
    quantity: number
    facilities: number
    _all: number
  }


  export type RoomAvgAggregateInputType = {
    monthlyPrice?: true
    quantity?: true
  }

  export type RoomSumAggregateInputType = {
    monthlyPrice?: true
    quantity?: true
  }

  export type RoomMinAggregateInputType = {
    id?: true
    kosanId?: true
    name?: true
    monthlyPrice?: true
    createdAt?: true
    updatedAt?: true
    humanId?: true
    quantity?: true
  }

  export type RoomMaxAggregateInputType = {
    id?: true
    kosanId?: true
    name?: true
    monthlyPrice?: true
    createdAt?: true
    updatedAt?: true
    humanId?: true
    quantity?: true
  }

  export type RoomCountAggregateInputType = {
    id?: true
    kosanId?: true
    name?: true
    monthlyPrice?: true
    createdAt?: true
    updatedAt?: true
    humanId?: true
    quantity?: true
    facilities?: true
    _all?: true
  }

  export type RoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Room to aggregate.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rooms
    **/
    _count?: true | RoomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoomAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoomSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomMaxAggregateInputType
  }

  export type GetRoomAggregateType<T extends RoomAggregateArgs> = {
        [P in keyof T & keyof AggregateRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoom[P]>
      : GetScalarType<T[P], AggregateRoom[P]>
  }




  export type RoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithAggregationInput | RoomOrderByWithAggregationInput[]
    by: RoomScalarFieldEnum[] | RoomScalarFieldEnum
    having?: RoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomCountAggregateInputType | true
    _avg?: RoomAvgAggregateInputType
    _sum?: RoomSumAggregateInputType
    _min?: RoomMinAggregateInputType
    _max?: RoomMaxAggregateInputType
  }

  export type RoomGroupByOutputType = {
    id: string
    kosanId: string
    name: string
    monthlyPrice: number
    createdAt: Date
    updatedAt: Date
    humanId: string
    quantity: number
    facilities: string[]
    _count: RoomCountAggregateOutputType | null
    _avg: RoomAvgAggregateOutputType | null
    _sum: RoomSumAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  type GetRoomGroupByPayload<T extends RoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomGroupByOutputType[P]>
            : GetScalarType<T[P], RoomGroupByOutputType[P]>
        }
      >
    >


  export type RoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kosanId?: boolean
    name?: boolean
    monthlyPrice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    humanId?: boolean
    quantity?: boolean
    facilities?: boolean
    rentals?: boolean | Room$rentalsArgs<ExtArgs>
    kosan?: boolean | KosanDefaultArgs<ExtArgs>
    images?: boolean | Room$imagesArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>

  export type RoomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kosanId?: boolean
    name?: boolean
    monthlyPrice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    humanId?: boolean
    quantity?: boolean
    facilities?: boolean
    kosan?: boolean | KosanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>

  export type RoomSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kosanId?: boolean
    name?: boolean
    monthlyPrice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    humanId?: boolean
    quantity?: boolean
    facilities?: boolean
    kosan?: boolean | KosanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>

  export type RoomSelectScalar = {
    id?: boolean
    kosanId?: boolean
    name?: boolean
    monthlyPrice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    humanId?: boolean
    quantity?: boolean
    facilities?: boolean
  }

  export type RoomOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "kosanId" | "name" | "monthlyPrice" | "createdAt" | "updatedAt" | "humanId" | "quantity" | "facilities", ExtArgs["result"]["room"]>
  export type RoomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rentals?: boolean | Room$rentalsArgs<ExtArgs>
    kosan?: boolean | KosanDefaultArgs<ExtArgs>
    images?: boolean | Room$imagesArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kosan?: boolean | KosanDefaultArgs<ExtArgs>
  }
  export type RoomIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kosan?: boolean | KosanDefaultArgs<ExtArgs>
  }

  export type $RoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Room"
    objects: {
      rentals: Prisma.$RentalPayload<ExtArgs>[]
      kosan: Prisma.$KosanPayload<ExtArgs>
      images: Prisma.$ImagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      kosanId: string
      name: string
      monthlyPrice: number
      createdAt: Date
      updatedAt: Date
      humanId: string
      quantity: number
      facilities: string[]
    }, ExtArgs["result"]["room"]>
    composites: {}
  }

  type RoomGetPayload<S extends boolean | null | undefined | RoomDefaultArgs> = $Result.GetResult<Prisma.$RoomPayload, S>

  type RoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomCountAggregateInputType | true
    }

  export interface RoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Room'], meta: { name: 'Room' } }
    /**
     * Find zero or one Room that matches the filter.
     * @param {RoomFindUniqueArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomFindUniqueArgs>(args: SelectSubset<T, RoomFindUniqueArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Room that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomFindUniqueOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomFindFirstArgs>(args?: SelectSubset<T, RoomFindFirstArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Rooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rooms
     * const rooms = await prisma.room.findMany()
     * 
     * // Get first 10 Rooms
     * const rooms = await prisma.room.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomWithIdOnly = await prisma.room.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomFindManyArgs>(args?: SelectSubset<T, RoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Room.
     * @param {RoomCreateArgs} args - Arguments to create a Room.
     * @example
     * // Create one Room
     * const Room = await prisma.room.create({
     *   data: {
     *     // ... data to create a Room
     *   }
     * })
     * 
     */
    create<T extends RoomCreateArgs>(args: SelectSubset<T, RoomCreateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Rooms.
     * @param {RoomCreateManyArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomCreateManyArgs>(args?: SelectSubset<T, RoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rooms and returns the data saved in the database.
     * @param {RoomCreateManyAndReturnArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rooms and only return the `id`
     * const roomWithIdOnly = await prisma.room.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Room.
     * @param {RoomDeleteArgs} args - Arguments to delete one Room.
     * @example
     * // Delete one Room
     * const Room = await prisma.room.delete({
     *   where: {
     *     // ... filter to delete one Room
     *   }
     * })
     * 
     */
    delete<T extends RoomDeleteArgs>(args: SelectSubset<T, RoomDeleteArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Room.
     * @param {RoomUpdateArgs} args - Arguments to update one Room.
     * @example
     * // Update one Room
     * const room = await prisma.room.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomUpdateArgs>(args: SelectSubset<T, RoomUpdateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Rooms.
     * @param {RoomDeleteManyArgs} args - Arguments to filter Rooms to delete.
     * @example
     * // Delete a few Rooms
     * const { count } = await prisma.room.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomDeleteManyArgs>(args?: SelectSubset<T, RoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomUpdateManyArgs>(args: SelectSubset<T, RoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms and returns the data updated in the database.
     * @param {RoomUpdateManyAndReturnArgs} args - Arguments to update many Rooms.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Rooms and only return the `id`
     * const roomWithIdOnly = await prisma.room.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoomUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Room.
     * @param {RoomUpsertArgs} args - Arguments to update or create a Room.
     * @example
     * // Update or create a Room
     * const room = await prisma.room.upsert({
     *   create: {
     *     // ... data to create a Room
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Room we want to update
     *   }
     * })
     */
    upsert<T extends RoomUpsertArgs>(args: SelectSubset<T, RoomUpsertArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomCountArgs} args - Arguments to filter Rooms to count.
     * @example
     * // Count the number of Rooms
     * const count = await prisma.room.count({
     *   where: {
     *     // ... the filter for the Rooms we want to count
     *   }
     * })
    **/
    count<T extends RoomCountArgs>(
      args?: Subset<T, RoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomAggregateArgs>(args: Subset<T, RoomAggregateArgs>): Prisma.PrismaPromise<GetRoomAggregateType<T>>

    /**
     * Group by Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomGroupByArgs['orderBy'] }
        : { orderBy?: RoomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Room model
   */
  readonly fields: RoomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Room.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rentals<T extends Room$rentalsArgs<ExtArgs> = {}>(args?: Subset<T, Room$rentalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RentalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    kosan<T extends KosanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, KosanDefaultArgs<ExtArgs>>): Prisma__KosanClient<$Result.GetResult<Prisma.$KosanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    images<T extends Room$imagesArgs<ExtArgs> = {}>(args?: Subset<T, Room$imagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Room model
   */
  interface RoomFieldRefs {
    readonly id: FieldRef<"Room", 'String'>
    readonly kosanId: FieldRef<"Room", 'String'>
    readonly name: FieldRef<"Room", 'String'>
    readonly monthlyPrice: FieldRef<"Room", 'Int'>
    readonly createdAt: FieldRef<"Room", 'DateTime'>
    readonly updatedAt: FieldRef<"Room", 'DateTime'>
    readonly humanId: FieldRef<"Room", 'String'>
    readonly quantity: FieldRef<"Room", 'Int'>
    readonly facilities: FieldRef<"Room", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * Room findUnique
   */
  export type RoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findUniqueOrThrow
   */
  export type RoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findFirst
   */
  export type RoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findFirstOrThrow
   */
  export type RoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findMany
   */
  export type RoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Rooms to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room create
   */
  export type RoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to create a Room.
     */
    data: XOR<RoomCreateInput, RoomUncheckedCreateInput>
  }

  /**
   * Room createMany
   */
  export type RoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Room createManyAndReturn
   */
  export type RoomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Room update
   */
  export type RoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to update a Room.
     */
    data: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
    /**
     * Choose, which Room to update.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room updateMany
   */
  export type RoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to update.
     */
    limit?: number
  }

  /**
   * Room updateManyAndReturn
   */
  export type RoomUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Room upsert
   */
  export type RoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The filter to search for the Room to update in case it exists.
     */
    where: RoomWhereUniqueInput
    /**
     * In case the Room found by the `where` argument doesn't exist, create a new Room with this data.
     */
    create: XOR<RoomCreateInput, RoomUncheckedCreateInput>
    /**
     * In case the Room was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
  }

  /**
   * Room delete
   */
  export type RoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter which Room to delete.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room deleteMany
   */
  export type RoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rooms to delete
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to delete.
     */
    limit?: number
  }

  /**
   * Room.rentals
   */
  export type Room$rentalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rental
     */
    select?: RentalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rental
     */
    omit?: RentalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalInclude<ExtArgs> | null
    where?: RentalWhereInput
    orderBy?: RentalOrderByWithRelationInput | RentalOrderByWithRelationInput[]
    cursor?: RentalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RentalScalarFieldEnum | RentalScalarFieldEnum[]
  }

  /**
   * Room.images
   */
  export type Room$imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    where?: ImageWhereInput
    orderBy?: ImageOrderByWithRelationInput | ImageOrderByWithRelationInput[]
    cursor?: ImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ImageScalarFieldEnum | ImageScalarFieldEnum[]
  }

  /**
   * Room without action
   */
  export type RoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
  }


  /**
   * Model Tenant
   */

  export type AggregateTenant = {
    _count: TenantCountAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  export type TenantMinAggregateOutputType = {
    id: string | null
    telegramId: string | null
    name: string | null
    phone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TenantMaxAggregateOutputType = {
    id: string | null
    telegramId: string | null
    name: string | null
    phone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TenantCountAggregateOutputType = {
    id: number
    telegramId: number
    name: number
    phone: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TenantMinAggregateInputType = {
    id?: true
    telegramId?: true
    name?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TenantMaxAggregateInputType = {
    id?: true
    telegramId?: true
    name?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TenantCountAggregateInputType = {
    id?: true
    telegramId?: true
    name?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TenantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenant to aggregate.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tenants
    **/
    _count?: true | TenantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenantMaxAggregateInputType
  }

  export type GetTenantAggregateType<T extends TenantAggregateArgs> = {
        [P in keyof T & keyof AggregateTenant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenant[P]>
      : GetScalarType<T[P], AggregateTenant[P]>
  }




  export type TenantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantWhereInput
    orderBy?: TenantOrderByWithAggregationInput | TenantOrderByWithAggregationInput[]
    by: TenantScalarFieldEnum[] | TenantScalarFieldEnum
    having?: TenantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenantCountAggregateInputType | true
    _min?: TenantMinAggregateInputType
    _max?: TenantMaxAggregateInputType
  }

  export type TenantGroupByOutputType = {
    id: string
    telegramId: string | null
    name: string
    phone: string | null
    createdAt: Date
    updatedAt: Date
    _count: TenantCountAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  type GetTenantGroupByPayload<T extends TenantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenantGroupByOutputType[P]>
            : GetScalarType<T[P], TenantGroupByOutputType[P]>
        }
      >
    >


  export type TenantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    name?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rentals?: boolean | Tenant$rentalsArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    name?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    name?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectScalar = {
    id?: boolean
    telegramId?: boolean
    name?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TenantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "telegramId" | "name" | "phone" | "createdAt" | "updatedAt", ExtArgs["result"]["tenant"]>
  export type TenantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rentals?: boolean | Tenant$rentalsArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TenantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TenantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TenantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tenant"
    objects: {
      rentals: Prisma.$RentalPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      telegramId: string | null
      name: string
      phone: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tenant"]>
    composites: {}
  }

  type TenantGetPayload<S extends boolean | null | undefined | TenantDefaultArgs> = $Result.GetResult<Prisma.$TenantPayload, S>

  type TenantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TenantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TenantCountAggregateInputType | true
    }

  export interface TenantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tenant'], meta: { name: 'Tenant' } }
    /**
     * Find zero or one Tenant that matches the filter.
     * @param {TenantFindUniqueArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TenantFindUniqueArgs>(args: SelectSubset<T, TenantFindUniqueArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tenant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TenantFindUniqueOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TenantFindUniqueOrThrowArgs>(args: SelectSubset<T, TenantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tenant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TenantFindFirstArgs>(args?: SelectSubset<T, TenantFindFirstArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tenant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TenantFindFirstOrThrowArgs>(args?: SelectSubset<T, TenantFindFirstOrThrowArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tenants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tenants
     * const tenants = await prisma.tenant.findMany()
     * 
     * // Get first 10 Tenants
     * const tenants = await prisma.tenant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenantWithIdOnly = await prisma.tenant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TenantFindManyArgs>(args?: SelectSubset<T, TenantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tenant.
     * @param {TenantCreateArgs} args - Arguments to create a Tenant.
     * @example
     * // Create one Tenant
     * const Tenant = await prisma.tenant.create({
     *   data: {
     *     // ... data to create a Tenant
     *   }
     * })
     * 
     */
    create<T extends TenantCreateArgs>(args: SelectSubset<T, TenantCreateArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tenants.
     * @param {TenantCreateManyArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TenantCreateManyArgs>(args?: SelectSubset<T, TenantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tenants and returns the data saved in the database.
     * @param {TenantCreateManyAndReturnArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tenants and only return the `id`
     * const tenantWithIdOnly = await prisma.tenant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TenantCreateManyAndReturnArgs>(args?: SelectSubset<T, TenantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tenant.
     * @param {TenantDeleteArgs} args - Arguments to delete one Tenant.
     * @example
     * // Delete one Tenant
     * const Tenant = await prisma.tenant.delete({
     *   where: {
     *     // ... filter to delete one Tenant
     *   }
     * })
     * 
     */
    delete<T extends TenantDeleteArgs>(args: SelectSubset<T, TenantDeleteArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tenant.
     * @param {TenantUpdateArgs} args - Arguments to update one Tenant.
     * @example
     * // Update one Tenant
     * const tenant = await prisma.tenant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TenantUpdateArgs>(args: SelectSubset<T, TenantUpdateArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tenants.
     * @param {TenantDeleteManyArgs} args - Arguments to filter Tenants to delete.
     * @example
     * // Delete a few Tenants
     * const { count } = await prisma.tenant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TenantDeleteManyArgs>(args?: SelectSubset<T, TenantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tenants
     * const tenant = await prisma.tenant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TenantUpdateManyArgs>(args: SelectSubset<T, TenantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenants and returns the data updated in the database.
     * @param {TenantUpdateManyAndReturnArgs} args - Arguments to update many Tenants.
     * @example
     * // Update many Tenants
     * const tenant = await prisma.tenant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tenants and only return the `id`
     * const tenantWithIdOnly = await prisma.tenant.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TenantUpdateManyAndReturnArgs>(args: SelectSubset<T, TenantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tenant.
     * @param {TenantUpsertArgs} args - Arguments to update or create a Tenant.
     * @example
     * // Update or create a Tenant
     * const tenant = await prisma.tenant.upsert({
     *   create: {
     *     // ... data to create a Tenant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tenant we want to update
     *   }
     * })
     */
    upsert<T extends TenantUpsertArgs>(args: SelectSubset<T, TenantUpsertArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantCountArgs} args - Arguments to filter Tenants to count.
     * @example
     * // Count the number of Tenants
     * const count = await prisma.tenant.count({
     *   where: {
     *     // ... the filter for the Tenants we want to count
     *   }
     * })
    **/
    count<T extends TenantCountArgs>(
      args?: Subset<T, TenantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TenantAggregateArgs>(args: Subset<T, TenantAggregateArgs>): Prisma.PrismaPromise<GetTenantAggregateType<T>>

    /**
     * Group by Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TenantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TenantGroupByArgs['orderBy'] }
        : { orderBy?: TenantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TenantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tenant model
   */
  readonly fields: TenantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tenant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TenantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rentals<T extends Tenant$rentalsArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$rentalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RentalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tenant model
   */
  interface TenantFieldRefs {
    readonly id: FieldRef<"Tenant", 'String'>
    readonly telegramId: FieldRef<"Tenant", 'String'>
    readonly name: FieldRef<"Tenant", 'String'>
    readonly phone: FieldRef<"Tenant", 'String'>
    readonly createdAt: FieldRef<"Tenant", 'DateTime'>
    readonly updatedAt: FieldRef<"Tenant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tenant findUnique
   */
  export type TenantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant findUniqueOrThrow
   */
  export type TenantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant findFirst
   */
  export type TenantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant findFirstOrThrow
   */
  export type TenantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant findMany
   */
  export type TenantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenants to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant create
   */
  export type TenantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to create a Tenant.
     */
    data: XOR<TenantCreateInput, TenantUncheckedCreateInput>
  }

  /**
   * Tenant createMany
   */
  export type TenantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tenant createManyAndReturn
   */
  export type TenantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tenant update
   */
  export type TenantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to update a Tenant.
     */
    data: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
    /**
     * Choose, which Tenant to update.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant updateMany
   */
  export type TenantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tenants.
     */
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyInput>
    /**
     * Filter which Tenants to update
     */
    where?: TenantWhereInput
    /**
     * Limit how many Tenants to update.
     */
    limit?: number
  }

  /**
   * Tenant updateManyAndReturn
   */
  export type TenantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * The data used to update Tenants.
     */
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyInput>
    /**
     * Filter which Tenants to update
     */
    where?: TenantWhereInput
    /**
     * Limit how many Tenants to update.
     */
    limit?: number
  }

  /**
   * Tenant upsert
   */
  export type TenantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The filter to search for the Tenant to update in case it exists.
     */
    where: TenantWhereUniqueInput
    /**
     * In case the Tenant found by the `where` argument doesn't exist, create a new Tenant with this data.
     */
    create: XOR<TenantCreateInput, TenantUncheckedCreateInput>
    /**
     * In case the Tenant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
  }

  /**
   * Tenant delete
   */
  export type TenantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter which Tenant to delete.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant deleteMany
   */
  export type TenantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenants to delete
     */
    where?: TenantWhereInput
    /**
     * Limit how many Tenants to delete.
     */
    limit?: number
  }

  /**
   * Tenant.rentals
   */
  export type Tenant$rentalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rental
     */
    select?: RentalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rental
     */
    omit?: RentalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalInclude<ExtArgs> | null
    where?: RentalWhereInput
    orderBy?: RentalOrderByWithRelationInput | RentalOrderByWithRelationInput[]
    cursor?: RentalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RentalScalarFieldEnum | RentalScalarFieldEnum[]
  }

  /**
   * Tenant without action
   */
  export type TenantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
  }


  /**
   * Model Rental
   */

  export type AggregateRental = {
    _count: RentalCountAggregateOutputType | null
    _avg: RentalAvgAggregateOutputType | null
    _sum: RentalSumAggregateOutputType | null
    _min: RentalMinAggregateOutputType | null
    _max: RentalMaxAggregateOutputType | null
  }

  export type RentalAvgAggregateOutputType = {
    monthlyPriceSnapshot: number | null
  }

  export type RentalSumAggregateOutputType = {
    monthlyPriceSnapshot: number | null
  }

  export type RentalMinAggregateOutputType = {
    id: string | null
    humanId: string | null
    roomId: string | null
    tenantId: string | null
    startDate: Date | null
    monthlyPriceSnapshot: number | null
    paidUntil: Date | null
    checkoutDate: Date | null
    status: $Enums.RentalStatus | null
    note: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RentalMaxAggregateOutputType = {
    id: string | null
    humanId: string | null
    roomId: string | null
    tenantId: string | null
    startDate: Date | null
    monthlyPriceSnapshot: number | null
    paidUntil: Date | null
    checkoutDate: Date | null
    status: $Enums.RentalStatus | null
    note: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RentalCountAggregateOutputType = {
    id: number
    humanId: number
    roomId: number
    tenantId: number
    startDate: number
    monthlyPriceSnapshot: number
    paidUntil: number
    checkoutDate: number
    status: number
    note: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RentalAvgAggregateInputType = {
    monthlyPriceSnapshot?: true
  }

  export type RentalSumAggregateInputType = {
    monthlyPriceSnapshot?: true
  }

  export type RentalMinAggregateInputType = {
    id?: true
    humanId?: true
    roomId?: true
    tenantId?: true
    startDate?: true
    monthlyPriceSnapshot?: true
    paidUntil?: true
    checkoutDate?: true
    status?: true
    note?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RentalMaxAggregateInputType = {
    id?: true
    humanId?: true
    roomId?: true
    tenantId?: true
    startDate?: true
    monthlyPriceSnapshot?: true
    paidUntil?: true
    checkoutDate?: true
    status?: true
    note?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RentalCountAggregateInputType = {
    id?: true
    humanId?: true
    roomId?: true
    tenantId?: true
    startDate?: true
    monthlyPriceSnapshot?: true
    paidUntil?: true
    checkoutDate?: true
    status?: true
    note?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RentalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rental to aggregate.
     */
    where?: RentalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rentals to fetch.
     */
    orderBy?: RentalOrderByWithRelationInput | RentalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RentalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rentals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rentals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rentals
    **/
    _count?: true | RentalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RentalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RentalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RentalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RentalMaxAggregateInputType
  }

  export type GetRentalAggregateType<T extends RentalAggregateArgs> = {
        [P in keyof T & keyof AggregateRental]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRental[P]>
      : GetScalarType<T[P], AggregateRental[P]>
  }




  export type RentalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RentalWhereInput
    orderBy?: RentalOrderByWithAggregationInput | RentalOrderByWithAggregationInput[]
    by: RentalScalarFieldEnum[] | RentalScalarFieldEnum
    having?: RentalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RentalCountAggregateInputType | true
    _avg?: RentalAvgAggregateInputType
    _sum?: RentalSumAggregateInputType
    _min?: RentalMinAggregateInputType
    _max?: RentalMaxAggregateInputType
  }

  export type RentalGroupByOutputType = {
    id: string
    humanId: string
    roomId: string
    tenantId: string
    startDate: Date
    monthlyPriceSnapshot: number
    paidUntil: Date | null
    checkoutDate: Date | null
    status: $Enums.RentalStatus
    note: string | null
    createdAt: Date
    updatedAt: Date
    _count: RentalCountAggregateOutputType | null
    _avg: RentalAvgAggregateOutputType | null
    _sum: RentalSumAggregateOutputType | null
    _min: RentalMinAggregateOutputType | null
    _max: RentalMaxAggregateOutputType | null
  }

  type GetRentalGroupByPayload<T extends RentalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RentalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RentalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RentalGroupByOutputType[P]>
            : GetScalarType<T[P], RentalGroupByOutputType[P]>
        }
      >
    >


  export type RentalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    humanId?: boolean
    roomId?: boolean
    tenantId?: boolean
    startDate?: boolean
    monthlyPriceSnapshot?: boolean
    paidUntil?: boolean
    checkoutDate?: boolean
    status?: boolean
    note?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    payments?: boolean | Rental$paymentsArgs<ExtArgs>
    _count?: boolean | RentalCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rental"]>

  export type RentalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    humanId?: boolean
    roomId?: boolean
    tenantId?: boolean
    startDate?: boolean
    monthlyPriceSnapshot?: boolean
    paidUntil?: boolean
    checkoutDate?: boolean
    status?: boolean
    note?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rental"]>

  export type RentalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    humanId?: boolean
    roomId?: boolean
    tenantId?: boolean
    startDate?: boolean
    monthlyPriceSnapshot?: boolean
    paidUntil?: boolean
    checkoutDate?: boolean
    status?: boolean
    note?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rental"]>

  export type RentalSelectScalar = {
    id?: boolean
    humanId?: boolean
    roomId?: boolean
    tenantId?: boolean
    startDate?: boolean
    monthlyPriceSnapshot?: boolean
    paidUntil?: boolean
    checkoutDate?: boolean
    status?: boolean
    note?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RentalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "humanId" | "roomId" | "tenantId" | "startDate" | "monthlyPriceSnapshot" | "paidUntil" | "checkoutDate" | "status" | "note" | "createdAt" | "updatedAt", ExtArgs["result"]["rental"]>
  export type RentalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    payments?: boolean | Rental$paymentsArgs<ExtArgs>
    _count?: boolean | RentalCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RentalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type RentalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $RentalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Rental"
    objects: {
      room: Prisma.$RoomPayload<ExtArgs>
      tenant: Prisma.$TenantPayload<ExtArgs>
      payments: Prisma.$PaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      humanId: string
      roomId: string
      tenantId: string
      startDate: Date
      monthlyPriceSnapshot: number
      paidUntil: Date | null
      checkoutDate: Date | null
      status: $Enums.RentalStatus
      note: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["rental"]>
    composites: {}
  }

  type RentalGetPayload<S extends boolean | null | undefined | RentalDefaultArgs> = $Result.GetResult<Prisma.$RentalPayload, S>

  type RentalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RentalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RentalCountAggregateInputType | true
    }

  export interface RentalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Rental'], meta: { name: 'Rental' } }
    /**
     * Find zero or one Rental that matches the filter.
     * @param {RentalFindUniqueArgs} args - Arguments to find a Rental
     * @example
     * // Get one Rental
     * const rental = await prisma.rental.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RentalFindUniqueArgs>(args: SelectSubset<T, RentalFindUniqueArgs<ExtArgs>>): Prisma__RentalClient<$Result.GetResult<Prisma.$RentalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Rental that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RentalFindUniqueOrThrowArgs} args - Arguments to find a Rental
     * @example
     * // Get one Rental
     * const rental = await prisma.rental.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RentalFindUniqueOrThrowArgs>(args: SelectSubset<T, RentalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RentalClient<$Result.GetResult<Prisma.$RentalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rental that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentalFindFirstArgs} args - Arguments to find a Rental
     * @example
     * // Get one Rental
     * const rental = await prisma.rental.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RentalFindFirstArgs>(args?: SelectSubset<T, RentalFindFirstArgs<ExtArgs>>): Prisma__RentalClient<$Result.GetResult<Prisma.$RentalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rental that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentalFindFirstOrThrowArgs} args - Arguments to find a Rental
     * @example
     * // Get one Rental
     * const rental = await prisma.rental.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RentalFindFirstOrThrowArgs>(args?: SelectSubset<T, RentalFindFirstOrThrowArgs<ExtArgs>>): Prisma__RentalClient<$Result.GetResult<Prisma.$RentalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Rentals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rentals
     * const rentals = await prisma.rental.findMany()
     * 
     * // Get first 10 Rentals
     * const rentals = await prisma.rental.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rentalWithIdOnly = await prisma.rental.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RentalFindManyArgs>(args?: SelectSubset<T, RentalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RentalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Rental.
     * @param {RentalCreateArgs} args - Arguments to create a Rental.
     * @example
     * // Create one Rental
     * const Rental = await prisma.rental.create({
     *   data: {
     *     // ... data to create a Rental
     *   }
     * })
     * 
     */
    create<T extends RentalCreateArgs>(args: SelectSubset<T, RentalCreateArgs<ExtArgs>>): Prisma__RentalClient<$Result.GetResult<Prisma.$RentalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Rentals.
     * @param {RentalCreateManyArgs} args - Arguments to create many Rentals.
     * @example
     * // Create many Rentals
     * const rental = await prisma.rental.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RentalCreateManyArgs>(args?: SelectSubset<T, RentalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rentals and returns the data saved in the database.
     * @param {RentalCreateManyAndReturnArgs} args - Arguments to create many Rentals.
     * @example
     * // Create many Rentals
     * const rental = await prisma.rental.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rentals and only return the `id`
     * const rentalWithIdOnly = await prisma.rental.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RentalCreateManyAndReturnArgs>(args?: SelectSubset<T, RentalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RentalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Rental.
     * @param {RentalDeleteArgs} args - Arguments to delete one Rental.
     * @example
     * // Delete one Rental
     * const Rental = await prisma.rental.delete({
     *   where: {
     *     // ... filter to delete one Rental
     *   }
     * })
     * 
     */
    delete<T extends RentalDeleteArgs>(args: SelectSubset<T, RentalDeleteArgs<ExtArgs>>): Prisma__RentalClient<$Result.GetResult<Prisma.$RentalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Rental.
     * @param {RentalUpdateArgs} args - Arguments to update one Rental.
     * @example
     * // Update one Rental
     * const rental = await prisma.rental.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RentalUpdateArgs>(args: SelectSubset<T, RentalUpdateArgs<ExtArgs>>): Prisma__RentalClient<$Result.GetResult<Prisma.$RentalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Rentals.
     * @param {RentalDeleteManyArgs} args - Arguments to filter Rentals to delete.
     * @example
     * // Delete a few Rentals
     * const { count } = await prisma.rental.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RentalDeleteManyArgs>(args?: SelectSubset<T, RentalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rentals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rentals
     * const rental = await prisma.rental.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RentalUpdateManyArgs>(args: SelectSubset<T, RentalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rentals and returns the data updated in the database.
     * @param {RentalUpdateManyAndReturnArgs} args - Arguments to update many Rentals.
     * @example
     * // Update many Rentals
     * const rental = await prisma.rental.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Rentals and only return the `id`
     * const rentalWithIdOnly = await prisma.rental.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RentalUpdateManyAndReturnArgs>(args: SelectSubset<T, RentalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RentalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Rental.
     * @param {RentalUpsertArgs} args - Arguments to update or create a Rental.
     * @example
     * // Update or create a Rental
     * const rental = await prisma.rental.upsert({
     *   create: {
     *     // ... data to create a Rental
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Rental we want to update
     *   }
     * })
     */
    upsert<T extends RentalUpsertArgs>(args: SelectSubset<T, RentalUpsertArgs<ExtArgs>>): Prisma__RentalClient<$Result.GetResult<Prisma.$RentalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Rentals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentalCountArgs} args - Arguments to filter Rentals to count.
     * @example
     * // Count the number of Rentals
     * const count = await prisma.rental.count({
     *   where: {
     *     // ... the filter for the Rentals we want to count
     *   }
     * })
    **/
    count<T extends RentalCountArgs>(
      args?: Subset<T, RentalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RentalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Rental.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RentalAggregateArgs>(args: Subset<T, RentalAggregateArgs>): Prisma.PrismaPromise<GetRentalAggregateType<T>>

    /**
     * Group by Rental.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RentalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RentalGroupByArgs['orderBy'] }
        : { orderBy?: RentalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RentalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRentalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Rental model
   */
  readonly fields: RentalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Rental.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RentalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    room<T extends RoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomDefaultArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    payments<T extends Rental$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Rental$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Rental model
   */
  interface RentalFieldRefs {
    readonly id: FieldRef<"Rental", 'String'>
    readonly humanId: FieldRef<"Rental", 'String'>
    readonly roomId: FieldRef<"Rental", 'String'>
    readonly tenantId: FieldRef<"Rental", 'String'>
    readonly startDate: FieldRef<"Rental", 'DateTime'>
    readonly monthlyPriceSnapshot: FieldRef<"Rental", 'Int'>
    readonly paidUntil: FieldRef<"Rental", 'DateTime'>
    readonly checkoutDate: FieldRef<"Rental", 'DateTime'>
    readonly status: FieldRef<"Rental", 'RentalStatus'>
    readonly note: FieldRef<"Rental", 'String'>
    readonly createdAt: FieldRef<"Rental", 'DateTime'>
    readonly updatedAt: FieldRef<"Rental", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Rental findUnique
   */
  export type RentalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rental
     */
    select?: RentalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rental
     */
    omit?: RentalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalInclude<ExtArgs> | null
    /**
     * Filter, which Rental to fetch.
     */
    where: RentalWhereUniqueInput
  }

  /**
   * Rental findUniqueOrThrow
   */
  export type RentalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rental
     */
    select?: RentalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rental
     */
    omit?: RentalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalInclude<ExtArgs> | null
    /**
     * Filter, which Rental to fetch.
     */
    where: RentalWhereUniqueInput
  }

  /**
   * Rental findFirst
   */
  export type RentalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rental
     */
    select?: RentalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rental
     */
    omit?: RentalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalInclude<ExtArgs> | null
    /**
     * Filter, which Rental to fetch.
     */
    where?: RentalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rentals to fetch.
     */
    orderBy?: RentalOrderByWithRelationInput | RentalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rentals.
     */
    cursor?: RentalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rentals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rentals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rentals.
     */
    distinct?: RentalScalarFieldEnum | RentalScalarFieldEnum[]
  }

  /**
   * Rental findFirstOrThrow
   */
  export type RentalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rental
     */
    select?: RentalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rental
     */
    omit?: RentalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalInclude<ExtArgs> | null
    /**
     * Filter, which Rental to fetch.
     */
    where?: RentalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rentals to fetch.
     */
    orderBy?: RentalOrderByWithRelationInput | RentalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rentals.
     */
    cursor?: RentalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rentals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rentals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rentals.
     */
    distinct?: RentalScalarFieldEnum | RentalScalarFieldEnum[]
  }

  /**
   * Rental findMany
   */
  export type RentalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rental
     */
    select?: RentalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rental
     */
    omit?: RentalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalInclude<ExtArgs> | null
    /**
     * Filter, which Rentals to fetch.
     */
    where?: RentalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rentals to fetch.
     */
    orderBy?: RentalOrderByWithRelationInput | RentalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rentals.
     */
    cursor?: RentalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rentals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rentals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rentals.
     */
    distinct?: RentalScalarFieldEnum | RentalScalarFieldEnum[]
  }

  /**
   * Rental create
   */
  export type RentalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rental
     */
    select?: RentalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rental
     */
    omit?: RentalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalInclude<ExtArgs> | null
    /**
     * The data needed to create a Rental.
     */
    data: XOR<RentalCreateInput, RentalUncheckedCreateInput>
  }

  /**
   * Rental createMany
   */
  export type RentalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rentals.
     */
    data: RentalCreateManyInput | RentalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Rental createManyAndReturn
   */
  export type RentalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rental
     */
    select?: RentalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Rental
     */
    omit?: RentalOmit<ExtArgs> | null
    /**
     * The data used to create many Rentals.
     */
    data: RentalCreateManyInput | RentalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Rental update
   */
  export type RentalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rental
     */
    select?: RentalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rental
     */
    omit?: RentalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalInclude<ExtArgs> | null
    /**
     * The data needed to update a Rental.
     */
    data: XOR<RentalUpdateInput, RentalUncheckedUpdateInput>
    /**
     * Choose, which Rental to update.
     */
    where: RentalWhereUniqueInput
  }

  /**
   * Rental updateMany
   */
  export type RentalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rentals.
     */
    data: XOR<RentalUpdateManyMutationInput, RentalUncheckedUpdateManyInput>
    /**
     * Filter which Rentals to update
     */
    where?: RentalWhereInput
    /**
     * Limit how many Rentals to update.
     */
    limit?: number
  }

  /**
   * Rental updateManyAndReturn
   */
  export type RentalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rental
     */
    select?: RentalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Rental
     */
    omit?: RentalOmit<ExtArgs> | null
    /**
     * The data used to update Rentals.
     */
    data: XOR<RentalUpdateManyMutationInput, RentalUncheckedUpdateManyInput>
    /**
     * Filter which Rentals to update
     */
    where?: RentalWhereInput
    /**
     * Limit how many Rentals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Rental upsert
   */
  export type RentalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rental
     */
    select?: RentalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rental
     */
    omit?: RentalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalInclude<ExtArgs> | null
    /**
     * The filter to search for the Rental to update in case it exists.
     */
    where: RentalWhereUniqueInput
    /**
     * In case the Rental found by the `where` argument doesn't exist, create a new Rental with this data.
     */
    create: XOR<RentalCreateInput, RentalUncheckedCreateInput>
    /**
     * In case the Rental was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RentalUpdateInput, RentalUncheckedUpdateInput>
  }

  /**
   * Rental delete
   */
  export type RentalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rental
     */
    select?: RentalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rental
     */
    omit?: RentalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalInclude<ExtArgs> | null
    /**
     * Filter which Rental to delete.
     */
    where: RentalWhereUniqueInput
  }

  /**
   * Rental deleteMany
   */
  export type RentalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rentals to delete
     */
    where?: RentalWhereInput
    /**
     * Limit how many Rentals to delete.
     */
    limit?: number
  }

  /**
   * Rental.payments
   */
  export type Rental$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Rental without action
   */
  export type RentalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rental
     */
    select?: RentalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rental
     */
    omit?: RentalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RentalInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    monthsPaid: number | null
    amount: number | null
  }

  export type PaymentSumAggregateOutputType = {
    monthsPaid: number | null
    amount: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    humanId: string | null
    rentalId: string | null
    monthsPaid: number | null
    periodStart: Date | null
    periodEnd: Date | null
    amount: number | null
    paidAt: Date | null
    status: $Enums.PaymentStatus | null
    note: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    humanId: string | null
    rentalId: string | null
    monthsPaid: number | null
    periodStart: Date | null
    periodEnd: Date | null
    amount: number | null
    paidAt: Date | null
    status: $Enums.PaymentStatus | null
    note: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    humanId: number
    rentalId: number
    monthsPaid: number
    periodStart: number
    periodEnd: number
    amount: number
    paidAt: number
    status: number
    note: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    monthsPaid?: true
    amount?: true
  }

  export type PaymentSumAggregateInputType = {
    monthsPaid?: true
    amount?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    humanId?: true
    rentalId?: true
    monthsPaid?: true
    periodStart?: true
    periodEnd?: true
    amount?: true
    paidAt?: true
    status?: true
    note?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    humanId?: true
    rentalId?: true
    monthsPaid?: true
    periodStart?: true
    periodEnd?: true
    amount?: true
    paidAt?: true
    status?: true
    note?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    humanId?: true
    rentalId?: true
    monthsPaid?: true
    periodStart?: true
    periodEnd?: true
    amount?: true
    paidAt?: true
    status?: true
    note?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: string
    humanId: string
    rentalId: string
    monthsPaid: number
    periodStart: Date
    periodEnd: Date
    amount: number
    paidAt: Date | null
    status: $Enums.PaymentStatus
    note: string | null
    createdAt: Date
    updatedAt: Date
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    humanId?: boolean
    rentalId?: boolean
    monthsPaid?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    amount?: boolean
    paidAt?: boolean
    status?: boolean
    note?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rental?: boolean | RentalDefaultArgs<ExtArgs>
    images?: boolean | Payment$imagesArgs<ExtArgs>
    _count?: boolean | PaymentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    humanId?: boolean
    rentalId?: boolean
    monthsPaid?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    amount?: boolean
    paidAt?: boolean
    status?: boolean
    note?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rental?: boolean | RentalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    humanId?: boolean
    rentalId?: boolean
    monthsPaid?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    amount?: boolean
    paidAt?: boolean
    status?: boolean
    note?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rental?: boolean | RentalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    humanId?: boolean
    rentalId?: boolean
    monthsPaid?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    amount?: boolean
    paidAt?: boolean
    status?: boolean
    note?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "humanId" | "rentalId" | "monthsPaid" | "periodStart" | "periodEnd" | "amount" | "paidAt" | "status" | "note" | "createdAt" | "updatedAt", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rental?: boolean | RentalDefaultArgs<ExtArgs>
    images?: boolean | Payment$imagesArgs<ExtArgs>
    _count?: boolean | PaymentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rental?: boolean | RentalDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rental?: boolean | RentalDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      rental: Prisma.$RentalPayload<ExtArgs>
      images: Prisma.$ImagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      humanId: string
      rentalId: string
      monthsPaid: number
      periodStart: Date
      periodEnd: Date
      amount: number
      paidAt: Date | null
      status: $Enums.PaymentStatus
      note: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rental<T extends RentalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RentalDefaultArgs<ExtArgs>>): Prisma__RentalClient<$Result.GetResult<Prisma.$RentalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    images<T extends Payment$imagesArgs<ExtArgs> = {}>(args?: Subset<T, Payment$imagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'String'>
    readonly humanId: FieldRef<"Payment", 'String'>
    readonly rentalId: FieldRef<"Payment", 'String'>
    readonly monthsPaid: FieldRef<"Payment", 'Int'>
    readonly periodStart: FieldRef<"Payment", 'DateTime'>
    readonly periodEnd: FieldRef<"Payment", 'DateTime'>
    readonly amount: FieldRef<"Payment", 'Int'>
    readonly paidAt: FieldRef<"Payment", 'DateTime'>
    readonly status: FieldRef<"Payment", 'PaymentStatus'>
    readonly note: FieldRef<"Payment", 'String'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
    readonly updatedAt: FieldRef<"Payment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment.images
   */
  export type Payment$imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    where?: ImageWhereInput
    orderBy?: ImageOrderByWithRelationInput | ImageOrderByWithRelationInput[]
    cursor?: ImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ImageScalarFieldEnum | ImageScalarFieldEnum[]
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model Image
   */

  export type AggregateImage = {
    _count: ImageCountAggregateOutputType | null
    _min: ImageMinAggregateOutputType | null
    _max: ImageMaxAggregateOutputType | null
  }

  export type ImageMinAggregateOutputType = {
    id: string | null
    url: string | null
    kosanId: string | null
    roomId: string | null
    paymentId: string | null
    createdAt: Date | null
  }

  export type ImageMaxAggregateOutputType = {
    id: string | null
    url: string | null
    kosanId: string | null
    roomId: string | null
    paymentId: string | null
    createdAt: Date | null
  }

  export type ImageCountAggregateOutputType = {
    id: number
    url: number
    kosanId: number
    roomId: number
    paymentId: number
    createdAt: number
    _all: number
  }


  export type ImageMinAggregateInputType = {
    id?: true
    url?: true
    kosanId?: true
    roomId?: true
    paymentId?: true
    createdAt?: true
  }

  export type ImageMaxAggregateInputType = {
    id?: true
    url?: true
    kosanId?: true
    roomId?: true
    paymentId?: true
    createdAt?: true
  }

  export type ImageCountAggregateInputType = {
    id?: true
    url?: true
    kosanId?: true
    roomId?: true
    paymentId?: true
    createdAt?: true
    _all?: true
  }

  export type ImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Image to aggregate.
     */
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     */
    orderBy?: ImageOrderByWithRelationInput | ImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Images
    **/
    _count?: true | ImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ImageMaxAggregateInputType
  }

  export type GetImageAggregateType<T extends ImageAggregateArgs> = {
        [P in keyof T & keyof AggregateImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateImage[P]>
      : GetScalarType<T[P], AggregateImage[P]>
  }




  export type ImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImageWhereInput
    orderBy?: ImageOrderByWithAggregationInput | ImageOrderByWithAggregationInput[]
    by: ImageScalarFieldEnum[] | ImageScalarFieldEnum
    having?: ImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ImageCountAggregateInputType | true
    _min?: ImageMinAggregateInputType
    _max?: ImageMaxAggregateInputType
  }

  export type ImageGroupByOutputType = {
    id: string
    url: string
    kosanId: string | null
    roomId: string | null
    paymentId: string | null
    createdAt: Date
    _count: ImageCountAggregateOutputType | null
    _min: ImageMinAggregateOutputType | null
    _max: ImageMaxAggregateOutputType | null
  }

  type GetImageGroupByPayload<T extends ImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ImageGroupByOutputType[P]>
            : GetScalarType<T[P], ImageGroupByOutputType[P]>
        }
      >
    >


  export type ImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    kosanId?: boolean
    roomId?: boolean
    paymentId?: boolean
    createdAt?: boolean
    kosan?: boolean | Image$kosanArgs<ExtArgs>
    room?: boolean | Image$roomArgs<ExtArgs>
    payment?: boolean | Image$paymentArgs<ExtArgs>
  }, ExtArgs["result"]["image"]>

  export type ImageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    kosanId?: boolean
    roomId?: boolean
    paymentId?: boolean
    createdAt?: boolean
    kosan?: boolean | Image$kosanArgs<ExtArgs>
    room?: boolean | Image$roomArgs<ExtArgs>
    payment?: boolean | Image$paymentArgs<ExtArgs>
  }, ExtArgs["result"]["image"]>

  export type ImageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    kosanId?: boolean
    roomId?: boolean
    paymentId?: boolean
    createdAt?: boolean
    kosan?: boolean | Image$kosanArgs<ExtArgs>
    room?: boolean | Image$roomArgs<ExtArgs>
    payment?: boolean | Image$paymentArgs<ExtArgs>
  }, ExtArgs["result"]["image"]>

  export type ImageSelectScalar = {
    id?: boolean
    url?: boolean
    kosanId?: boolean
    roomId?: boolean
    paymentId?: boolean
    createdAt?: boolean
  }

  export type ImageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url" | "kosanId" | "roomId" | "paymentId" | "createdAt", ExtArgs["result"]["image"]>
  export type ImageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kosan?: boolean | Image$kosanArgs<ExtArgs>
    room?: boolean | Image$roomArgs<ExtArgs>
    payment?: boolean | Image$paymentArgs<ExtArgs>
  }
  export type ImageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kosan?: boolean | Image$kosanArgs<ExtArgs>
    room?: boolean | Image$roomArgs<ExtArgs>
    payment?: boolean | Image$paymentArgs<ExtArgs>
  }
  export type ImageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kosan?: boolean | Image$kosanArgs<ExtArgs>
    room?: boolean | Image$roomArgs<ExtArgs>
    payment?: boolean | Image$paymentArgs<ExtArgs>
  }

  export type $ImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Image"
    objects: {
      kosan: Prisma.$KosanPayload<ExtArgs> | null
      room: Prisma.$RoomPayload<ExtArgs> | null
      payment: Prisma.$PaymentPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      url: string
      kosanId: string | null
      roomId: string | null
      paymentId: string | null
      createdAt: Date
    }, ExtArgs["result"]["image"]>
    composites: {}
  }

  type ImageGetPayload<S extends boolean | null | undefined | ImageDefaultArgs> = $Result.GetResult<Prisma.$ImagePayload, S>

  type ImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ImageCountAggregateInputType | true
    }

  export interface ImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Image'], meta: { name: 'Image' } }
    /**
     * Find zero or one Image that matches the filter.
     * @param {ImageFindUniqueArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ImageFindUniqueArgs>(args: SelectSubset<T, ImageFindUniqueArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Image that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ImageFindUniqueOrThrowArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ImageFindUniqueOrThrowArgs>(args: SelectSubset<T, ImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Image that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageFindFirstArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ImageFindFirstArgs>(args?: SelectSubset<T, ImageFindFirstArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Image that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageFindFirstOrThrowArgs} args - Arguments to find a Image
     * @example
     * // Get one Image
     * const image = await prisma.image.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ImageFindFirstOrThrowArgs>(args?: SelectSubset<T, ImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Images that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Images
     * const images = await prisma.image.findMany()
     * 
     * // Get first 10 Images
     * const images = await prisma.image.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const imageWithIdOnly = await prisma.image.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ImageFindManyArgs>(args?: SelectSubset<T, ImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Image.
     * @param {ImageCreateArgs} args - Arguments to create a Image.
     * @example
     * // Create one Image
     * const Image = await prisma.image.create({
     *   data: {
     *     // ... data to create a Image
     *   }
     * })
     * 
     */
    create<T extends ImageCreateArgs>(args: SelectSubset<T, ImageCreateArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Images.
     * @param {ImageCreateManyArgs} args - Arguments to create many Images.
     * @example
     * // Create many Images
     * const image = await prisma.image.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ImageCreateManyArgs>(args?: SelectSubset<T, ImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Images and returns the data saved in the database.
     * @param {ImageCreateManyAndReturnArgs} args - Arguments to create many Images.
     * @example
     * // Create many Images
     * const image = await prisma.image.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Images and only return the `id`
     * const imageWithIdOnly = await prisma.image.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ImageCreateManyAndReturnArgs>(args?: SelectSubset<T, ImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Image.
     * @param {ImageDeleteArgs} args - Arguments to delete one Image.
     * @example
     * // Delete one Image
     * const Image = await prisma.image.delete({
     *   where: {
     *     // ... filter to delete one Image
     *   }
     * })
     * 
     */
    delete<T extends ImageDeleteArgs>(args: SelectSubset<T, ImageDeleteArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Image.
     * @param {ImageUpdateArgs} args - Arguments to update one Image.
     * @example
     * // Update one Image
     * const image = await prisma.image.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ImageUpdateArgs>(args: SelectSubset<T, ImageUpdateArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Images.
     * @param {ImageDeleteManyArgs} args - Arguments to filter Images to delete.
     * @example
     * // Delete a few Images
     * const { count } = await prisma.image.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ImageDeleteManyArgs>(args?: SelectSubset<T, ImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Images
     * const image = await prisma.image.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ImageUpdateManyArgs>(args: SelectSubset<T, ImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Images and returns the data updated in the database.
     * @param {ImageUpdateManyAndReturnArgs} args - Arguments to update many Images.
     * @example
     * // Update many Images
     * const image = await prisma.image.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Images and only return the `id`
     * const imageWithIdOnly = await prisma.image.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ImageUpdateManyAndReturnArgs>(args: SelectSubset<T, ImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Image.
     * @param {ImageUpsertArgs} args - Arguments to update or create a Image.
     * @example
     * // Update or create a Image
     * const image = await prisma.image.upsert({
     *   create: {
     *     // ... data to create a Image
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Image we want to update
     *   }
     * })
     */
    upsert<T extends ImageUpsertArgs>(args: SelectSubset<T, ImageUpsertArgs<ExtArgs>>): Prisma__ImageClient<$Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageCountArgs} args - Arguments to filter Images to count.
     * @example
     * // Count the number of Images
     * const count = await prisma.image.count({
     *   where: {
     *     // ... the filter for the Images we want to count
     *   }
     * })
    **/
    count<T extends ImageCountArgs>(
      args?: Subset<T, ImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Image.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ImageAggregateArgs>(args: Subset<T, ImageAggregateArgs>): Prisma.PrismaPromise<GetImageAggregateType<T>>

    /**
     * Group by Image.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ImageGroupByArgs['orderBy'] }
        : { orderBy?: ImageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Image model
   */
  readonly fields: ImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Image.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    kosan<T extends Image$kosanArgs<ExtArgs> = {}>(args?: Subset<T, Image$kosanArgs<ExtArgs>>): Prisma__KosanClient<$Result.GetResult<Prisma.$KosanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    room<T extends Image$roomArgs<ExtArgs> = {}>(args?: Subset<T, Image$roomArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    payment<T extends Image$paymentArgs<ExtArgs> = {}>(args?: Subset<T, Image$paymentArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Image model
   */
  interface ImageFieldRefs {
    readonly id: FieldRef<"Image", 'String'>
    readonly url: FieldRef<"Image", 'String'>
    readonly kosanId: FieldRef<"Image", 'String'>
    readonly roomId: FieldRef<"Image", 'String'>
    readonly paymentId: FieldRef<"Image", 'String'>
    readonly createdAt: FieldRef<"Image", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Image findUnique
   */
  export type ImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * Filter, which Image to fetch.
     */
    where: ImageWhereUniqueInput
  }

  /**
   * Image findUniqueOrThrow
   */
  export type ImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * Filter, which Image to fetch.
     */
    where: ImageWhereUniqueInput
  }

  /**
   * Image findFirst
   */
  export type ImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * Filter, which Image to fetch.
     */
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     */
    orderBy?: ImageOrderByWithRelationInput | ImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Images.
     */
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Images.
     */
    distinct?: ImageScalarFieldEnum | ImageScalarFieldEnum[]
  }

  /**
   * Image findFirstOrThrow
   */
  export type ImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * Filter, which Image to fetch.
     */
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     */
    orderBy?: ImageOrderByWithRelationInput | ImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Images.
     */
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Images.
     */
    distinct?: ImageScalarFieldEnum | ImageScalarFieldEnum[]
  }

  /**
   * Image findMany
   */
  export type ImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * Filter, which Images to fetch.
     */
    where?: ImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Images to fetch.
     */
    orderBy?: ImageOrderByWithRelationInput | ImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Images.
     */
    cursor?: ImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Images.
     */
    distinct?: ImageScalarFieldEnum | ImageScalarFieldEnum[]
  }

  /**
   * Image create
   */
  export type ImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * The data needed to create a Image.
     */
    data: XOR<ImageCreateInput, ImageUncheckedCreateInput>
  }

  /**
   * Image createMany
   */
  export type ImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Images.
     */
    data: ImageCreateManyInput | ImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Image createManyAndReturn
   */
  export type ImageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * The data used to create many Images.
     */
    data: ImageCreateManyInput | ImageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Image update
   */
  export type ImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * The data needed to update a Image.
     */
    data: XOR<ImageUpdateInput, ImageUncheckedUpdateInput>
    /**
     * Choose, which Image to update.
     */
    where: ImageWhereUniqueInput
  }

  /**
   * Image updateMany
   */
  export type ImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Images.
     */
    data: XOR<ImageUpdateManyMutationInput, ImageUncheckedUpdateManyInput>
    /**
     * Filter which Images to update
     */
    where?: ImageWhereInput
    /**
     * Limit how many Images to update.
     */
    limit?: number
  }

  /**
   * Image updateManyAndReturn
   */
  export type ImageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * The data used to update Images.
     */
    data: XOR<ImageUpdateManyMutationInput, ImageUncheckedUpdateManyInput>
    /**
     * Filter which Images to update
     */
    where?: ImageWhereInput
    /**
     * Limit how many Images to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Image upsert
   */
  export type ImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * The filter to search for the Image to update in case it exists.
     */
    where: ImageWhereUniqueInput
    /**
     * In case the Image found by the `where` argument doesn't exist, create a new Image with this data.
     */
    create: XOR<ImageCreateInput, ImageUncheckedCreateInput>
    /**
     * In case the Image was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ImageUpdateInput, ImageUncheckedUpdateInput>
  }

  /**
   * Image delete
   */
  export type ImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
    /**
     * Filter which Image to delete.
     */
    where: ImageWhereUniqueInput
  }

  /**
   * Image deleteMany
   */
  export type ImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Images to delete
     */
    where?: ImageWhereInput
    /**
     * Limit how many Images to delete.
     */
    limit?: number
  }

  /**
   * Image.kosan
   */
  export type Image$kosanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kosan
     */
    select?: KosanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kosan
     */
    omit?: KosanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KosanInclude<ExtArgs> | null
    where?: KosanWhereInput
  }

  /**
   * Image.room
   */
  export type Image$roomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    where?: RoomWhereInput
  }

  /**
   * Image.payment
   */
  export type Image$paymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
  }

  /**
   * Image without action
   */
  export type ImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Image
     */
    select?: ImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Image
     */
    omit?: ImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImageInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const OwnerScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    name: 'name',
    phone: 'phone',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OwnerScalarFieldEnum = (typeof OwnerScalarFieldEnum)[keyof typeof OwnerScalarFieldEnum]


  export const KosanScalarFieldEnum: {
    id: 'id',
    ownerId: 'ownerId',
    name: 'name',
    address: 'address',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    humanId: 'humanId'
  };

  export type KosanScalarFieldEnum = (typeof KosanScalarFieldEnum)[keyof typeof KosanScalarFieldEnum]


  export const RoomScalarFieldEnum: {
    id: 'id',
    kosanId: 'kosanId',
    name: 'name',
    monthlyPrice: 'monthlyPrice',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    humanId: 'humanId',
    quantity: 'quantity',
    facilities: 'facilities'
  };

  export type RoomScalarFieldEnum = (typeof RoomScalarFieldEnum)[keyof typeof RoomScalarFieldEnum]


  export const TenantScalarFieldEnum: {
    id: 'id',
    telegramId: 'telegramId',
    name: 'name',
    phone: 'phone',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TenantScalarFieldEnum = (typeof TenantScalarFieldEnum)[keyof typeof TenantScalarFieldEnum]


  export const RentalScalarFieldEnum: {
    id: 'id',
    humanId: 'humanId',
    roomId: 'roomId',
    tenantId: 'tenantId',
    startDate: 'startDate',
    monthlyPriceSnapshot: 'monthlyPriceSnapshot',
    paidUntil: 'paidUntil',
    checkoutDate: 'checkoutDate',
    status: 'status',
    note: 'note',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RentalScalarFieldEnum = (typeof RentalScalarFieldEnum)[keyof typeof RentalScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    humanId: 'humanId',
    rentalId: 'rentalId',
    monthsPaid: 'monthsPaid',
    periodStart: 'periodStart',
    periodEnd: 'periodEnd',
    amount: 'amount',
    paidAt: 'paidAt',
    status: 'status',
    note: 'note',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const ImageScalarFieldEnum: {
    id: 'id',
    url: 'url',
    kosanId: 'kosanId',
    roomId: 'roomId',
    paymentId: 'paymentId',
    createdAt: 'createdAt'
  };

  export type ImageScalarFieldEnum = (typeof ImageScalarFieldEnum)[keyof typeof ImageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'RentalStatus'
   */
  export type EnumRentalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RentalStatus'>
    


  /**
   * Reference to a field of type 'RentalStatus[]'
   */
  export type ListEnumRentalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RentalStatus[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type OwnerWhereInput = {
    AND?: OwnerWhereInput | OwnerWhereInput[]
    OR?: OwnerWhereInput[]
    NOT?: OwnerWhereInput | OwnerWhereInput[]
    id?: UuidFilter<"Owner"> | string
    email?: StringFilter<"Owner"> | string
    passwordHash?: StringFilter<"Owner"> | string
    name?: StringFilter<"Owner"> | string
    phone?: StringNullableFilter<"Owner"> | string | null
    createdAt?: DateTimeFilter<"Owner"> | Date | string
    updatedAt?: DateTimeFilter<"Owner"> | Date | string
    kosan?: KosanListRelationFilter
  }

  export type OwnerOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    kosan?: KosanOrderByRelationAggregateInput
  }

  export type OwnerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: OwnerWhereInput | OwnerWhereInput[]
    OR?: OwnerWhereInput[]
    NOT?: OwnerWhereInput | OwnerWhereInput[]
    passwordHash?: StringFilter<"Owner"> | string
    name?: StringFilter<"Owner"> | string
    phone?: StringNullableFilter<"Owner"> | string | null
    createdAt?: DateTimeFilter<"Owner"> | Date | string
    updatedAt?: DateTimeFilter<"Owner"> | Date | string
    kosan?: KosanListRelationFilter
  }, "id" | "email">

  export type OwnerOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OwnerCountOrderByAggregateInput
    _max?: OwnerMaxOrderByAggregateInput
    _min?: OwnerMinOrderByAggregateInput
  }

  export type OwnerScalarWhereWithAggregatesInput = {
    AND?: OwnerScalarWhereWithAggregatesInput | OwnerScalarWhereWithAggregatesInput[]
    OR?: OwnerScalarWhereWithAggregatesInput[]
    NOT?: OwnerScalarWhereWithAggregatesInput | OwnerScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Owner"> | string
    email?: StringWithAggregatesFilter<"Owner"> | string
    passwordHash?: StringWithAggregatesFilter<"Owner"> | string
    name?: StringWithAggregatesFilter<"Owner"> | string
    phone?: StringNullableWithAggregatesFilter<"Owner"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Owner"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Owner"> | Date | string
  }

  export type KosanWhereInput = {
    AND?: KosanWhereInput | KosanWhereInput[]
    OR?: KosanWhereInput[]
    NOT?: KosanWhereInput | KosanWhereInput[]
    id?: UuidFilter<"Kosan"> | string
    ownerId?: UuidFilter<"Kosan"> | string
    name?: StringFilter<"Kosan"> | string
    address?: StringFilter<"Kosan"> | string
    description?: StringNullableFilter<"Kosan"> | string | null
    createdAt?: DateTimeFilter<"Kosan"> | Date | string
    updatedAt?: DateTimeFilter<"Kosan"> | Date | string
    humanId?: StringFilter<"Kosan"> | string
    owner?: XOR<OwnerScalarRelationFilter, OwnerWhereInput>
    rooms?: RoomListRelationFilter
    images?: ImageListRelationFilter
  }

  export type KosanOrderByWithRelationInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    address?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    humanId?: SortOrder
    owner?: OwnerOrderByWithRelationInput
    rooms?: RoomOrderByRelationAggregateInput
    images?: ImageOrderByRelationAggregateInput
  }

  export type KosanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    humanId?: string
    AND?: KosanWhereInput | KosanWhereInput[]
    OR?: KosanWhereInput[]
    NOT?: KosanWhereInput | KosanWhereInput[]
    ownerId?: UuidFilter<"Kosan"> | string
    name?: StringFilter<"Kosan"> | string
    address?: StringFilter<"Kosan"> | string
    description?: StringNullableFilter<"Kosan"> | string | null
    createdAt?: DateTimeFilter<"Kosan"> | Date | string
    updatedAt?: DateTimeFilter<"Kosan"> | Date | string
    owner?: XOR<OwnerScalarRelationFilter, OwnerWhereInput>
    rooms?: RoomListRelationFilter
    images?: ImageListRelationFilter
  }, "id" | "humanId">

  export type KosanOrderByWithAggregationInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    address?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    humanId?: SortOrder
    _count?: KosanCountOrderByAggregateInput
    _max?: KosanMaxOrderByAggregateInput
    _min?: KosanMinOrderByAggregateInput
  }

  export type KosanScalarWhereWithAggregatesInput = {
    AND?: KosanScalarWhereWithAggregatesInput | KosanScalarWhereWithAggregatesInput[]
    OR?: KosanScalarWhereWithAggregatesInput[]
    NOT?: KosanScalarWhereWithAggregatesInput | KosanScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Kosan"> | string
    ownerId?: UuidWithAggregatesFilter<"Kosan"> | string
    name?: StringWithAggregatesFilter<"Kosan"> | string
    address?: StringWithAggregatesFilter<"Kosan"> | string
    description?: StringNullableWithAggregatesFilter<"Kosan"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Kosan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Kosan"> | Date | string
    humanId?: StringWithAggregatesFilter<"Kosan"> | string
  }

  export type RoomWhereInput = {
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    id?: UuidFilter<"Room"> | string
    kosanId?: UuidFilter<"Room"> | string
    name?: StringFilter<"Room"> | string
    monthlyPrice?: IntFilter<"Room"> | number
    createdAt?: DateTimeFilter<"Room"> | Date | string
    updatedAt?: DateTimeFilter<"Room"> | Date | string
    humanId?: StringFilter<"Room"> | string
    quantity?: IntFilter<"Room"> | number
    facilities?: StringNullableListFilter<"Room">
    rentals?: RentalListRelationFilter
    kosan?: XOR<KosanScalarRelationFilter, KosanWhereInput>
    images?: ImageListRelationFilter
  }

  export type RoomOrderByWithRelationInput = {
    id?: SortOrder
    kosanId?: SortOrder
    name?: SortOrder
    monthlyPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    humanId?: SortOrder
    quantity?: SortOrder
    facilities?: SortOrder
    rentals?: RentalOrderByRelationAggregateInput
    kosan?: KosanOrderByWithRelationInput
    images?: ImageOrderByRelationAggregateInput
  }

  export type RoomWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    humanId?: string
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    kosanId?: UuidFilter<"Room"> | string
    name?: StringFilter<"Room"> | string
    monthlyPrice?: IntFilter<"Room"> | number
    createdAt?: DateTimeFilter<"Room"> | Date | string
    updatedAt?: DateTimeFilter<"Room"> | Date | string
    quantity?: IntFilter<"Room"> | number
    facilities?: StringNullableListFilter<"Room">
    rentals?: RentalListRelationFilter
    kosan?: XOR<KosanScalarRelationFilter, KosanWhereInput>
    images?: ImageListRelationFilter
  }, "id" | "humanId">

  export type RoomOrderByWithAggregationInput = {
    id?: SortOrder
    kosanId?: SortOrder
    name?: SortOrder
    monthlyPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    humanId?: SortOrder
    quantity?: SortOrder
    facilities?: SortOrder
    _count?: RoomCountOrderByAggregateInput
    _avg?: RoomAvgOrderByAggregateInput
    _max?: RoomMaxOrderByAggregateInput
    _min?: RoomMinOrderByAggregateInput
    _sum?: RoomSumOrderByAggregateInput
  }

  export type RoomScalarWhereWithAggregatesInput = {
    AND?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    OR?: RoomScalarWhereWithAggregatesInput[]
    NOT?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Room"> | string
    kosanId?: UuidWithAggregatesFilter<"Room"> | string
    name?: StringWithAggregatesFilter<"Room"> | string
    monthlyPrice?: IntWithAggregatesFilter<"Room"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Room"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Room"> | Date | string
    humanId?: StringWithAggregatesFilter<"Room"> | string
    quantity?: IntWithAggregatesFilter<"Room"> | number
    facilities?: StringNullableListFilter<"Room">
  }

  export type TenantWhereInput = {
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    id?: UuidFilter<"Tenant"> | string
    telegramId?: StringNullableFilter<"Tenant"> | string | null
    name?: StringFilter<"Tenant"> | string
    phone?: StringNullableFilter<"Tenant"> | string | null
    createdAt?: DateTimeFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeFilter<"Tenant"> | Date | string
    rentals?: RentalListRelationFilter
  }

  export type TenantOrderByWithRelationInput = {
    id?: SortOrder
    telegramId?: SortOrderInput | SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    rentals?: RentalOrderByRelationAggregateInput
  }

  export type TenantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    telegramId?: string
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    name?: StringFilter<"Tenant"> | string
    phone?: StringNullableFilter<"Tenant"> | string | null
    createdAt?: DateTimeFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeFilter<"Tenant"> | Date | string
    rentals?: RentalListRelationFilter
  }, "id" | "telegramId">

  export type TenantOrderByWithAggregationInput = {
    id?: SortOrder
    telegramId?: SortOrderInput | SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TenantCountOrderByAggregateInput
    _max?: TenantMaxOrderByAggregateInput
    _min?: TenantMinOrderByAggregateInput
  }

  export type TenantScalarWhereWithAggregatesInput = {
    AND?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    OR?: TenantScalarWhereWithAggregatesInput[]
    NOT?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Tenant"> | string
    telegramId?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    name?: StringWithAggregatesFilter<"Tenant"> | string
    phone?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Tenant"> | Date | string
  }

  export type RentalWhereInput = {
    AND?: RentalWhereInput | RentalWhereInput[]
    OR?: RentalWhereInput[]
    NOT?: RentalWhereInput | RentalWhereInput[]
    id?: UuidFilter<"Rental"> | string
    humanId?: StringFilter<"Rental"> | string
    roomId?: UuidFilter<"Rental"> | string
    tenantId?: UuidFilter<"Rental"> | string
    startDate?: DateTimeFilter<"Rental"> | Date | string
    monthlyPriceSnapshot?: IntFilter<"Rental"> | number
    paidUntil?: DateTimeNullableFilter<"Rental"> | Date | string | null
    checkoutDate?: DateTimeNullableFilter<"Rental"> | Date | string | null
    status?: EnumRentalStatusFilter<"Rental"> | $Enums.RentalStatus
    note?: StringNullableFilter<"Rental"> | string | null
    createdAt?: DateTimeFilter<"Rental"> | Date | string
    updatedAt?: DateTimeFilter<"Rental"> | Date | string
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    payments?: PaymentListRelationFilter
  }

  export type RentalOrderByWithRelationInput = {
    id?: SortOrder
    humanId?: SortOrder
    roomId?: SortOrder
    tenantId?: SortOrder
    startDate?: SortOrder
    monthlyPriceSnapshot?: SortOrder
    paidUntil?: SortOrderInput | SortOrder
    checkoutDate?: SortOrderInput | SortOrder
    status?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    room?: RoomOrderByWithRelationInput
    tenant?: TenantOrderByWithRelationInput
    payments?: PaymentOrderByRelationAggregateInput
  }

  export type RentalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    humanId?: string
    AND?: RentalWhereInput | RentalWhereInput[]
    OR?: RentalWhereInput[]
    NOT?: RentalWhereInput | RentalWhereInput[]
    roomId?: UuidFilter<"Rental"> | string
    tenantId?: UuidFilter<"Rental"> | string
    startDate?: DateTimeFilter<"Rental"> | Date | string
    monthlyPriceSnapshot?: IntFilter<"Rental"> | number
    paidUntil?: DateTimeNullableFilter<"Rental"> | Date | string | null
    checkoutDate?: DateTimeNullableFilter<"Rental"> | Date | string | null
    status?: EnumRentalStatusFilter<"Rental"> | $Enums.RentalStatus
    note?: StringNullableFilter<"Rental"> | string | null
    createdAt?: DateTimeFilter<"Rental"> | Date | string
    updatedAt?: DateTimeFilter<"Rental"> | Date | string
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    payments?: PaymentListRelationFilter
  }, "id" | "humanId">

  export type RentalOrderByWithAggregationInput = {
    id?: SortOrder
    humanId?: SortOrder
    roomId?: SortOrder
    tenantId?: SortOrder
    startDate?: SortOrder
    monthlyPriceSnapshot?: SortOrder
    paidUntil?: SortOrderInput | SortOrder
    checkoutDate?: SortOrderInput | SortOrder
    status?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RentalCountOrderByAggregateInput
    _avg?: RentalAvgOrderByAggregateInput
    _max?: RentalMaxOrderByAggregateInput
    _min?: RentalMinOrderByAggregateInput
    _sum?: RentalSumOrderByAggregateInput
  }

  export type RentalScalarWhereWithAggregatesInput = {
    AND?: RentalScalarWhereWithAggregatesInput | RentalScalarWhereWithAggregatesInput[]
    OR?: RentalScalarWhereWithAggregatesInput[]
    NOT?: RentalScalarWhereWithAggregatesInput | RentalScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Rental"> | string
    humanId?: StringWithAggregatesFilter<"Rental"> | string
    roomId?: UuidWithAggregatesFilter<"Rental"> | string
    tenantId?: UuidWithAggregatesFilter<"Rental"> | string
    startDate?: DateTimeWithAggregatesFilter<"Rental"> | Date | string
    monthlyPriceSnapshot?: IntWithAggregatesFilter<"Rental"> | number
    paidUntil?: DateTimeNullableWithAggregatesFilter<"Rental"> | Date | string | null
    checkoutDate?: DateTimeNullableWithAggregatesFilter<"Rental"> | Date | string | null
    status?: EnumRentalStatusWithAggregatesFilter<"Rental"> | $Enums.RentalStatus
    note?: StringNullableWithAggregatesFilter<"Rental"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Rental"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Rental"> | Date | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: UuidFilter<"Payment"> | string
    humanId?: StringFilter<"Payment"> | string
    rentalId?: UuidFilter<"Payment"> | string
    monthsPaid?: IntFilter<"Payment"> | number
    periodStart?: DateTimeFilter<"Payment"> | Date | string
    periodEnd?: DateTimeFilter<"Payment"> | Date | string
    amount?: IntFilter<"Payment"> | number
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    note?: StringNullableFilter<"Payment"> | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    rental?: XOR<RentalScalarRelationFilter, RentalWhereInput>
    images?: ImageListRelationFilter
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    humanId?: SortOrder
    rentalId?: SortOrder
    monthsPaid?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    amount?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    status?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    rental?: RentalOrderByWithRelationInput
    images?: ImageOrderByRelationAggregateInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    humanId?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    rentalId?: UuidFilter<"Payment"> | string
    monthsPaid?: IntFilter<"Payment"> | number
    periodStart?: DateTimeFilter<"Payment"> | Date | string
    periodEnd?: DateTimeFilter<"Payment"> | Date | string
    amount?: IntFilter<"Payment"> | number
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    note?: StringNullableFilter<"Payment"> | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    rental?: XOR<RentalScalarRelationFilter, RentalWhereInput>
    images?: ImageListRelationFilter
  }, "id" | "humanId">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    humanId?: SortOrder
    rentalId?: SortOrder
    monthsPaid?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    amount?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    status?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Payment"> | string
    humanId?: StringWithAggregatesFilter<"Payment"> | string
    rentalId?: UuidWithAggregatesFilter<"Payment"> | string
    monthsPaid?: IntWithAggregatesFilter<"Payment"> | number
    periodStart?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    periodEnd?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    amount?: IntWithAggregatesFilter<"Payment"> | number
    paidAt?: DateTimeNullableWithAggregatesFilter<"Payment"> | Date | string | null
    status?: EnumPaymentStatusWithAggregatesFilter<"Payment"> | $Enums.PaymentStatus
    note?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
  }

  export type ImageWhereInput = {
    AND?: ImageWhereInput | ImageWhereInput[]
    OR?: ImageWhereInput[]
    NOT?: ImageWhereInput | ImageWhereInput[]
    id?: UuidFilter<"Image"> | string
    url?: StringFilter<"Image"> | string
    kosanId?: UuidNullableFilter<"Image"> | string | null
    roomId?: UuidNullableFilter<"Image"> | string | null
    paymentId?: UuidNullableFilter<"Image"> | string | null
    createdAt?: DateTimeFilter<"Image"> | Date | string
    kosan?: XOR<KosanNullableScalarRelationFilter, KosanWhereInput> | null
    room?: XOR<RoomNullableScalarRelationFilter, RoomWhereInput> | null
    payment?: XOR<PaymentNullableScalarRelationFilter, PaymentWhereInput> | null
  }

  export type ImageOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    kosanId?: SortOrderInput | SortOrder
    roomId?: SortOrderInput | SortOrder
    paymentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    kosan?: KosanOrderByWithRelationInput
    room?: RoomOrderByWithRelationInput
    payment?: PaymentOrderByWithRelationInput
  }

  export type ImageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ImageWhereInput | ImageWhereInput[]
    OR?: ImageWhereInput[]
    NOT?: ImageWhereInput | ImageWhereInput[]
    url?: StringFilter<"Image"> | string
    kosanId?: UuidNullableFilter<"Image"> | string | null
    roomId?: UuidNullableFilter<"Image"> | string | null
    paymentId?: UuidNullableFilter<"Image"> | string | null
    createdAt?: DateTimeFilter<"Image"> | Date | string
    kosan?: XOR<KosanNullableScalarRelationFilter, KosanWhereInput> | null
    room?: XOR<RoomNullableScalarRelationFilter, RoomWhereInput> | null
    payment?: XOR<PaymentNullableScalarRelationFilter, PaymentWhereInput> | null
  }, "id">

  export type ImageOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    kosanId?: SortOrderInput | SortOrder
    roomId?: SortOrderInput | SortOrder
    paymentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ImageCountOrderByAggregateInput
    _max?: ImageMaxOrderByAggregateInput
    _min?: ImageMinOrderByAggregateInput
  }

  export type ImageScalarWhereWithAggregatesInput = {
    AND?: ImageScalarWhereWithAggregatesInput | ImageScalarWhereWithAggregatesInput[]
    OR?: ImageScalarWhereWithAggregatesInput[]
    NOT?: ImageScalarWhereWithAggregatesInput | ImageScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Image"> | string
    url?: StringWithAggregatesFilter<"Image"> | string
    kosanId?: UuidNullableWithAggregatesFilter<"Image"> | string | null
    roomId?: UuidNullableWithAggregatesFilter<"Image"> | string | null
    paymentId?: UuidNullableWithAggregatesFilter<"Image"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Image"> | Date | string
  }

  export type OwnerCreateInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    kosan?: KosanCreateNestedManyWithoutOwnerInput
  }

  export type OwnerUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    kosan?: KosanUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type OwnerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kosan?: KosanUpdateManyWithoutOwnerNestedInput
  }

  export type OwnerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kosan?: KosanUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type OwnerCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OwnerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OwnerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KosanCreateInput = {
    id?: string
    name: string
    address: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    humanId: string
    owner: OwnerCreateNestedOneWithoutKosanInput
    rooms?: RoomCreateNestedManyWithoutKosanInput
    images?: ImageCreateNestedManyWithoutKosanInput
  }

  export type KosanUncheckedCreateInput = {
    id?: string
    ownerId: string
    name: string
    address: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    humanId: string
    rooms?: RoomUncheckedCreateNestedManyWithoutKosanInput
    images?: ImageUncheckedCreateNestedManyWithoutKosanInput
  }

  export type KosanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    humanId?: StringFieldUpdateOperationsInput | string
    owner?: OwnerUpdateOneRequiredWithoutKosanNestedInput
    rooms?: RoomUpdateManyWithoutKosanNestedInput
    images?: ImageUpdateManyWithoutKosanNestedInput
  }

  export type KosanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    humanId?: StringFieldUpdateOperationsInput | string
    rooms?: RoomUncheckedUpdateManyWithoutKosanNestedInput
    images?: ImageUncheckedUpdateManyWithoutKosanNestedInput
  }

  export type KosanCreateManyInput = {
    id?: string
    ownerId: string
    name: string
    address: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    humanId: string
  }

  export type KosanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    humanId?: StringFieldUpdateOperationsInput | string
  }

  export type KosanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    humanId?: StringFieldUpdateOperationsInput | string
  }

  export type RoomCreateInput = {
    id?: string
    name: string
    monthlyPrice: number
    createdAt?: Date | string
    updatedAt?: Date | string
    humanId: string
    quantity?: number
    facilities?: RoomCreatefacilitiesInput | string[]
    rentals?: RentalCreateNestedManyWithoutRoomInput
    kosan: KosanCreateNestedOneWithoutRoomsInput
    images?: ImageCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateInput = {
    id?: string
    kosanId: string
    name: string
    monthlyPrice: number
    createdAt?: Date | string
    updatedAt?: Date | string
    humanId: string
    quantity?: number
    facilities?: RoomCreatefacilitiesInput | string[]
    rentals?: RentalUncheckedCreateNestedManyWithoutRoomInput
    images?: ImageUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    monthlyPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    humanId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    facilities?: RoomUpdatefacilitiesInput | string[]
    rentals?: RentalUpdateManyWithoutRoomNestedInput
    kosan?: KosanUpdateOneRequiredWithoutRoomsNestedInput
    images?: ImageUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kosanId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    monthlyPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    humanId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    facilities?: RoomUpdatefacilitiesInput | string[]
    rentals?: RentalUncheckedUpdateManyWithoutRoomNestedInput
    images?: ImageUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type RoomCreateManyInput = {
    id?: string
    kosanId: string
    name: string
    monthlyPrice: number
    createdAt?: Date | string
    updatedAt?: Date | string
    humanId: string
    quantity?: number
    facilities?: RoomCreatefacilitiesInput | string[]
  }

  export type RoomUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    monthlyPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    humanId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    facilities?: RoomUpdatefacilitiesInput | string[]
  }

  export type RoomUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    kosanId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    monthlyPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    humanId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    facilities?: RoomUpdatefacilitiesInput | string[]
  }

  export type TenantCreateInput = {
    id?: string
    telegramId?: string | null
    name: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rentals?: RentalCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateInput = {
    id?: string
    telegramId?: string | null
    name: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rentals?: RentalUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rentals?: RentalUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rentals?: RentalUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantCreateManyInput = {
    id?: string
    telegramId?: string | null
    name: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TenantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RentalCreateInput = {
    id?: string
    humanId: string
    startDate: Date | string
    monthlyPriceSnapshot: number
    paidUntil?: Date | string | null
    checkoutDate?: Date | string | null
    status?: $Enums.RentalStatus
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    room: RoomCreateNestedOneWithoutRentalsInput
    tenant: TenantCreateNestedOneWithoutRentalsInput
    payments?: PaymentCreateNestedManyWithoutRentalInput
  }

  export type RentalUncheckedCreateInput = {
    id?: string
    humanId: string
    roomId: string
    tenantId: string
    startDate: Date | string
    monthlyPriceSnapshot: number
    paidUntil?: Date | string | null
    checkoutDate?: Date | string | null
    status?: $Enums.RentalStatus
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentUncheckedCreateNestedManyWithoutRentalInput
  }

  export type RentalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    humanId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    monthlyPriceSnapshot?: IntFieldUpdateOperationsInput | number
    paidUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkoutDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumRentalStatusFieldUpdateOperationsInput | $Enums.RentalStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomUpdateOneRequiredWithoutRentalsNestedInput
    tenant?: TenantUpdateOneRequiredWithoutRentalsNestedInput
    payments?: PaymentUpdateManyWithoutRentalNestedInput
  }

  export type RentalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    humanId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    monthlyPriceSnapshot?: IntFieldUpdateOperationsInput | number
    paidUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkoutDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumRentalStatusFieldUpdateOperationsInput | $Enums.RentalStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUncheckedUpdateManyWithoutRentalNestedInput
  }

  export type RentalCreateManyInput = {
    id?: string
    humanId: string
    roomId: string
    tenantId: string
    startDate: Date | string
    monthlyPriceSnapshot: number
    paidUntil?: Date | string | null
    checkoutDate?: Date | string | null
    status?: $Enums.RentalStatus
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RentalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    humanId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    monthlyPriceSnapshot?: IntFieldUpdateOperationsInput | number
    paidUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkoutDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumRentalStatusFieldUpdateOperationsInput | $Enums.RentalStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RentalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    humanId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    monthlyPriceSnapshot?: IntFieldUpdateOperationsInput | number
    paidUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkoutDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumRentalStatusFieldUpdateOperationsInput | $Enums.RentalStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateInput = {
    id?: string
    humanId: string
    monthsPaid: number
    periodStart: Date | string
    periodEnd: Date | string
    amount: number
    paidAt?: Date | string | null
    status?: $Enums.PaymentStatus
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rental: RentalCreateNestedOneWithoutPaymentsInput
    images?: ImageCreateNestedManyWithoutPaymentInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    humanId: string
    rentalId: string
    monthsPaid: number
    periodStart: Date | string
    periodEnd: Date | string
    amount: number
    paidAt?: Date | string | null
    status?: $Enums.PaymentStatus
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: ImageUncheckedCreateNestedManyWithoutPaymentInput
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    humanId?: StringFieldUpdateOperationsInput | string
    monthsPaid?: IntFieldUpdateOperationsInput | number
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: IntFieldUpdateOperationsInput | number
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rental?: RentalUpdateOneRequiredWithoutPaymentsNestedInput
    images?: ImageUpdateManyWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    humanId?: StringFieldUpdateOperationsInput | string
    rentalId?: StringFieldUpdateOperationsInput | string
    monthsPaid?: IntFieldUpdateOperationsInput | number
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: IntFieldUpdateOperationsInput | number
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ImageUncheckedUpdateManyWithoutPaymentNestedInput
  }

  export type PaymentCreateManyInput = {
    id?: string
    humanId: string
    rentalId: string
    monthsPaid: number
    periodStart: Date | string
    periodEnd: Date | string
    amount: number
    paidAt?: Date | string | null
    status?: $Enums.PaymentStatus
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    humanId?: StringFieldUpdateOperationsInput | string
    monthsPaid?: IntFieldUpdateOperationsInput | number
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: IntFieldUpdateOperationsInput | number
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    humanId?: StringFieldUpdateOperationsInput | string
    rentalId?: StringFieldUpdateOperationsInput | string
    monthsPaid?: IntFieldUpdateOperationsInput | number
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: IntFieldUpdateOperationsInput | number
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageCreateInput = {
    id?: string
    url: string
    createdAt?: Date | string
    kosan?: KosanCreateNestedOneWithoutImagesInput
    room?: RoomCreateNestedOneWithoutImagesInput
    payment?: PaymentCreateNestedOneWithoutImagesInput
  }

  export type ImageUncheckedCreateInput = {
    id?: string
    url: string
    kosanId?: string | null
    roomId?: string | null
    paymentId?: string | null
    createdAt?: Date | string
  }

  export type ImageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kosan?: KosanUpdateOneWithoutImagesNestedInput
    room?: RoomUpdateOneWithoutImagesNestedInput
    payment?: PaymentUpdateOneWithoutImagesNestedInput
  }

  export type ImageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    kosanId?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageCreateManyInput = {
    id?: string
    url: string
    kosanId?: string | null
    roomId?: string | null
    paymentId?: string | null
    createdAt?: Date | string
  }

  export type ImageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    kosanId?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type KosanListRelationFilter = {
    every?: KosanWhereInput
    some?: KosanWhereInput
    none?: KosanWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type KosanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OwnerCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OwnerMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OwnerMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type OwnerScalarRelationFilter = {
    is?: OwnerWhereInput
    isNot?: OwnerWhereInput
  }

  export type RoomListRelationFilter = {
    every?: RoomWhereInput
    some?: RoomWhereInput
    none?: RoomWhereInput
  }

  export type ImageListRelationFilter = {
    every?: ImageWhereInput
    some?: ImageWhereInput
    none?: ImageWhereInput
  }

  export type RoomOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ImageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type KosanCountOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    address?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    humanId?: SortOrder
  }

  export type KosanMaxOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    address?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    humanId?: SortOrder
  }

  export type KosanMinOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    address?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    humanId?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type RentalListRelationFilter = {
    every?: RentalWhereInput
    some?: RentalWhereInput
    none?: RentalWhereInput
  }

  export type KosanScalarRelationFilter = {
    is?: KosanWhereInput
    isNot?: KosanWhereInput
  }

  export type RentalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoomCountOrderByAggregateInput = {
    id?: SortOrder
    kosanId?: SortOrder
    name?: SortOrder
    monthlyPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    humanId?: SortOrder
    quantity?: SortOrder
    facilities?: SortOrder
  }

  export type RoomAvgOrderByAggregateInput = {
    monthlyPrice?: SortOrder
    quantity?: SortOrder
  }

  export type RoomMaxOrderByAggregateInput = {
    id?: SortOrder
    kosanId?: SortOrder
    name?: SortOrder
    monthlyPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    humanId?: SortOrder
    quantity?: SortOrder
  }

  export type RoomMinOrderByAggregateInput = {
    id?: SortOrder
    kosanId?: SortOrder
    name?: SortOrder
    monthlyPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    humanId?: SortOrder
    quantity?: SortOrder
  }

  export type RoomSumOrderByAggregateInput = {
    monthlyPrice?: SortOrder
    quantity?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type TenantCountOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantMaxOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantMinOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumRentalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RentalStatus | EnumRentalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RentalStatus[] | ListEnumRentalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RentalStatus[] | ListEnumRentalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRentalStatusFilter<$PrismaModel> | $Enums.RentalStatus
  }

  export type RoomScalarRelationFilter = {
    is?: RoomWhereInput
    isNot?: RoomWhereInput
  }

  export type TenantScalarRelationFilter = {
    is?: TenantWhereInput
    isNot?: TenantWhereInput
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RentalCountOrderByAggregateInput = {
    id?: SortOrder
    humanId?: SortOrder
    roomId?: SortOrder
    tenantId?: SortOrder
    startDate?: SortOrder
    monthlyPriceSnapshot?: SortOrder
    paidUntil?: SortOrder
    checkoutDate?: SortOrder
    status?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RentalAvgOrderByAggregateInput = {
    monthlyPriceSnapshot?: SortOrder
  }

  export type RentalMaxOrderByAggregateInput = {
    id?: SortOrder
    humanId?: SortOrder
    roomId?: SortOrder
    tenantId?: SortOrder
    startDate?: SortOrder
    monthlyPriceSnapshot?: SortOrder
    paidUntil?: SortOrder
    checkoutDate?: SortOrder
    status?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RentalMinOrderByAggregateInput = {
    id?: SortOrder
    humanId?: SortOrder
    roomId?: SortOrder
    tenantId?: SortOrder
    startDate?: SortOrder
    monthlyPriceSnapshot?: SortOrder
    paidUntil?: SortOrder
    checkoutDate?: SortOrder
    status?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RentalSumOrderByAggregateInput = {
    monthlyPriceSnapshot?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumRentalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RentalStatus | EnumRentalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RentalStatus[] | ListEnumRentalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RentalStatus[] | ListEnumRentalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRentalStatusWithAggregatesFilter<$PrismaModel> | $Enums.RentalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRentalStatusFilter<$PrismaModel>
    _max?: NestedEnumRentalStatusFilter<$PrismaModel>
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type RentalScalarRelationFilter = {
    is?: RentalWhereInput
    isNot?: RentalWhereInput
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    humanId?: SortOrder
    rentalId?: SortOrder
    monthsPaid?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    amount?: SortOrder
    paidAt?: SortOrder
    status?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    monthsPaid?: SortOrder
    amount?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    humanId?: SortOrder
    rentalId?: SortOrder
    monthsPaid?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    amount?: SortOrder
    paidAt?: SortOrder
    status?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    humanId?: SortOrder
    rentalId?: SortOrder
    monthsPaid?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    amount?: SortOrder
    paidAt?: SortOrder
    status?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    monthsPaid?: SortOrder
    amount?: SortOrder
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type KosanNullableScalarRelationFilter = {
    is?: KosanWhereInput | null
    isNot?: KosanWhereInput | null
  }

  export type RoomNullableScalarRelationFilter = {
    is?: RoomWhereInput | null
    isNot?: RoomWhereInput | null
  }

  export type PaymentNullableScalarRelationFilter = {
    is?: PaymentWhereInput | null
    isNot?: PaymentWhereInput | null
  }

  export type ImageCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    kosanId?: SortOrder
    roomId?: SortOrder
    paymentId?: SortOrder
    createdAt?: SortOrder
  }

  export type ImageMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    kosanId?: SortOrder
    roomId?: SortOrder
    paymentId?: SortOrder
    createdAt?: SortOrder
  }

  export type ImageMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    kosanId?: SortOrder
    roomId?: SortOrder
    paymentId?: SortOrder
    createdAt?: SortOrder
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type KosanCreateNestedManyWithoutOwnerInput = {
    create?: XOR<KosanCreateWithoutOwnerInput, KosanUncheckedCreateWithoutOwnerInput> | KosanCreateWithoutOwnerInput[] | KosanUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: KosanCreateOrConnectWithoutOwnerInput | KosanCreateOrConnectWithoutOwnerInput[]
    createMany?: KosanCreateManyOwnerInputEnvelope
    connect?: KosanWhereUniqueInput | KosanWhereUniqueInput[]
  }

  export type KosanUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<KosanCreateWithoutOwnerInput, KosanUncheckedCreateWithoutOwnerInput> | KosanCreateWithoutOwnerInput[] | KosanUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: KosanCreateOrConnectWithoutOwnerInput | KosanCreateOrConnectWithoutOwnerInput[]
    createMany?: KosanCreateManyOwnerInputEnvelope
    connect?: KosanWhereUniqueInput | KosanWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type KosanUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<KosanCreateWithoutOwnerInput, KosanUncheckedCreateWithoutOwnerInput> | KosanCreateWithoutOwnerInput[] | KosanUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: KosanCreateOrConnectWithoutOwnerInput | KosanCreateOrConnectWithoutOwnerInput[]
    upsert?: KosanUpsertWithWhereUniqueWithoutOwnerInput | KosanUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: KosanCreateManyOwnerInputEnvelope
    set?: KosanWhereUniqueInput | KosanWhereUniqueInput[]
    disconnect?: KosanWhereUniqueInput | KosanWhereUniqueInput[]
    delete?: KosanWhereUniqueInput | KosanWhereUniqueInput[]
    connect?: KosanWhereUniqueInput | KosanWhereUniqueInput[]
    update?: KosanUpdateWithWhereUniqueWithoutOwnerInput | KosanUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: KosanUpdateManyWithWhereWithoutOwnerInput | KosanUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: KosanScalarWhereInput | KosanScalarWhereInput[]
  }

  export type KosanUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<KosanCreateWithoutOwnerInput, KosanUncheckedCreateWithoutOwnerInput> | KosanCreateWithoutOwnerInput[] | KosanUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: KosanCreateOrConnectWithoutOwnerInput | KosanCreateOrConnectWithoutOwnerInput[]
    upsert?: KosanUpsertWithWhereUniqueWithoutOwnerInput | KosanUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: KosanCreateManyOwnerInputEnvelope
    set?: KosanWhereUniqueInput | KosanWhereUniqueInput[]
    disconnect?: KosanWhereUniqueInput | KosanWhereUniqueInput[]
    delete?: KosanWhereUniqueInput | KosanWhereUniqueInput[]
    connect?: KosanWhereUniqueInput | KosanWhereUniqueInput[]
    update?: KosanUpdateWithWhereUniqueWithoutOwnerInput | KosanUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: KosanUpdateManyWithWhereWithoutOwnerInput | KosanUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: KosanScalarWhereInput | KosanScalarWhereInput[]
  }

  export type OwnerCreateNestedOneWithoutKosanInput = {
    create?: XOR<OwnerCreateWithoutKosanInput, OwnerUncheckedCreateWithoutKosanInput>
    connectOrCreate?: OwnerCreateOrConnectWithoutKosanInput
    connect?: OwnerWhereUniqueInput
  }

  export type RoomCreateNestedManyWithoutKosanInput = {
    create?: XOR<RoomCreateWithoutKosanInput, RoomUncheckedCreateWithoutKosanInput> | RoomCreateWithoutKosanInput[] | RoomUncheckedCreateWithoutKosanInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutKosanInput | RoomCreateOrConnectWithoutKosanInput[]
    createMany?: RoomCreateManyKosanInputEnvelope
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
  }

  export type ImageCreateNestedManyWithoutKosanInput = {
    create?: XOR<ImageCreateWithoutKosanInput, ImageUncheckedCreateWithoutKosanInput> | ImageCreateWithoutKosanInput[] | ImageUncheckedCreateWithoutKosanInput[]
    connectOrCreate?: ImageCreateOrConnectWithoutKosanInput | ImageCreateOrConnectWithoutKosanInput[]
    createMany?: ImageCreateManyKosanInputEnvelope
    connect?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
  }

  export type RoomUncheckedCreateNestedManyWithoutKosanInput = {
    create?: XOR<RoomCreateWithoutKosanInput, RoomUncheckedCreateWithoutKosanInput> | RoomCreateWithoutKosanInput[] | RoomUncheckedCreateWithoutKosanInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutKosanInput | RoomCreateOrConnectWithoutKosanInput[]
    createMany?: RoomCreateManyKosanInputEnvelope
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
  }

  export type ImageUncheckedCreateNestedManyWithoutKosanInput = {
    create?: XOR<ImageCreateWithoutKosanInput, ImageUncheckedCreateWithoutKosanInput> | ImageCreateWithoutKosanInput[] | ImageUncheckedCreateWithoutKosanInput[]
    connectOrCreate?: ImageCreateOrConnectWithoutKosanInput | ImageCreateOrConnectWithoutKosanInput[]
    createMany?: ImageCreateManyKosanInputEnvelope
    connect?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
  }

  export type OwnerUpdateOneRequiredWithoutKosanNestedInput = {
    create?: XOR<OwnerCreateWithoutKosanInput, OwnerUncheckedCreateWithoutKosanInput>
    connectOrCreate?: OwnerCreateOrConnectWithoutKosanInput
    upsert?: OwnerUpsertWithoutKosanInput
    connect?: OwnerWhereUniqueInput
    update?: XOR<XOR<OwnerUpdateToOneWithWhereWithoutKosanInput, OwnerUpdateWithoutKosanInput>, OwnerUncheckedUpdateWithoutKosanInput>
  }

  export type RoomUpdateManyWithoutKosanNestedInput = {
    create?: XOR<RoomCreateWithoutKosanInput, RoomUncheckedCreateWithoutKosanInput> | RoomCreateWithoutKosanInput[] | RoomUncheckedCreateWithoutKosanInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutKosanInput | RoomCreateOrConnectWithoutKosanInput[]
    upsert?: RoomUpsertWithWhereUniqueWithoutKosanInput | RoomUpsertWithWhereUniqueWithoutKosanInput[]
    createMany?: RoomCreateManyKosanInputEnvelope
    set?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    disconnect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    delete?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    update?: RoomUpdateWithWhereUniqueWithoutKosanInput | RoomUpdateWithWhereUniqueWithoutKosanInput[]
    updateMany?: RoomUpdateManyWithWhereWithoutKosanInput | RoomUpdateManyWithWhereWithoutKosanInput[]
    deleteMany?: RoomScalarWhereInput | RoomScalarWhereInput[]
  }

  export type ImageUpdateManyWithoutKosanNestedInput = {
    create?: XOR<ImageCreateWithoutKosanInput, ImageUncheckedCreateWithoutKosanInput> | ImageCreateWithoutKosanInput[] | ImageUncheckedCreateWithoutKosanInput[]
    connectOrCreate?: ImageCreateOrConnectWithoutKosanInput | ImageCreateOrConnectWithoutKosanInput[]
    upsert?: ImageUpsertWithWhereUniqueWithoutKosanInput | ImageUpsertWithWhereUniqueWithoutKosanInput[]
    createMany?: ImageCreateManyKosanInputEnvelope
    set?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    disconnect?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    delete?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    connect?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    update?: ImageUpdateWithWhereUniqueWithoutKosanInput | ImageUpdateWithWhereUniqueWithoutKosanInput[]
    updateMany?: ImageUpdateManyWithWhereWithoutKosanInput | ImageUpdateManyWithWhereWithoutKosanInput[]
    deleteMany?: ImageScalarWhereInput | ImageScalarWhereInput[]
  }

  export type RoomUncheckedUpdateManyWithoutKosanNestedInput = {
    create?: XOR<RoomCreateWithoutKosanInput, RoomUncheckedCreateWithoutKosanInput> | RoomCreateWithoutKosanInput[] | RoomUncheckedCreateWithoutKosanInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutKosanInput | RoomCreateOrConnectWithoutKosanInput[]
    upsert?: RoomUpsertWithWhereUniqueWithoutKosanInput | RoomUpsertWithWhereUniqueWithoutKosanInput[]
    createMany?: RoomCreateManyKosanInputEnvelope
    set?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    disconnect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    delete?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    update?: RoomUpdateWithWhereUniqueWithoutKosanInput | RoomUpdateWithWhereUniqueWithoutKosanInput[]
    updateMany?: RoomUpdateManyWithWhereWithoutKosanInput | RoomUpdateManyWithWhereWithoutKosanInput[]
    deleteMany?: RoomScalarWhereInput | RoomScalarWhereInput[]
  }

  export type ImageUncheckedUpdateManyWithoutKosanNestedInput = {
    create?: XOR<ImageCreateWithoutKosanInput, ImageUncheckedCreateWithoutKosanInput> | ImageCreateWithoutKosanInput[] | ImageUncheckedCreateWithoutKosanInput[]
    connectOrCreate?: ImageCreateOrConnectWithoutKosanInput | ImageCreateOrConnectWithoutKosanInput[]
    upsert?: ImageUpsertWithWhereUniqueWithoutKosanInput | ImageUpsertWithWhereUniqueWithoutKosanInput[]
    createMany?: ImageCreateManyKosanInputEnvelope
    set?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    disconnect?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    delete?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    connect?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    update?: ImageUpdateWithWhereUniqueWithoutKosanInput | ImageUpdateWithWhereUniqueWithoutKosanInput[]
    updateMany?: ImageUpdateManyWithWhereWithoutKosanInput | ImageUpdateManyWithWhereWithoutKosanInput[]
    deleteMany?: ImageScalarWhereInput | ImageScalarWhereInput[]
  }

  export type RoomCreatefacilitiesInput = {
    set: string[]
  }

  export type RentalCreateNestedManyWithoutRoomInput = {
    create?: XOR<RentalCreateWithoutRoomInput, RentalUncheckedCreateWithoutRoomInput> | RentalCreateWithoutRoomInput[] | RentalUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RentalCreateOrConnectWithoutRoomInput | RentalCreateOrConnectWithoutRoomInput[]
    createMany?: RentalCreateManyRoomInputEnvelope
    connect?: RentalWhereUniqueInput | RentalWhereUniqueInput[]
  }

  export type KosanCreateNestedOneWithoutRoomsInput = {
    create?: XOR<KosanCreateWithoutRoomsInput, KosanUncheckedCreateWithoutRoomsInput>
    connectOrCreate?: KosanCreateOrConnectWithoutRoomsInput
    connect?: KosanWhereUniqueInput
  }

  export type ImageCreateNestedManyWithoutRoomInput = {
    create?: XOR<ImageCreateWithoutRoomInput, ImageUncheckedCreateWithoutRoomInput> | ImageCreateWithoutRoomInput[] | ImageUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ImageCreateOrConnectWithoutRoomInput | ImageCreateOrConnectWithoutRoomInput[]
    createMany?: ImageCreateManyRoomInputEnvelope
    connect?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
  }

  export type RentalUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<RentalCreateWithoutRoomInput, RentalUncheckedCreateWithoutRoomInput> | RentalCreateWithoutRoomInput[] | RentalUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RentalCreateOrConnectWithoutRoomInput | RentalCreateOrConnectWithoutRoomInput[]
    createMany?: RentalCreateManyRoomInputEnvelope
    connect?: RentalWhereUniqueInput | RentalWhereUniqueInput[]
  }

  export type ImageUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<ImageCreateWithoutRoomInput, ImageUncheckedCreateWithoutRoomInput> | ImageCreateWithoutRoomInput[] | ImageUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ImageCreateOrConnectWithoutRoomInput | ImageCreateOrConnectWithoutRoomInput[]
    createMany?: ImageCreateManyRoomInputEnvelope
    connect?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type RoomUpdatefacilitiesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type RentalUpdateManyWithoutRoomNestedInput = {
    create?: XOR<RentalCreateWithoutRoomInput, RentalUncheckedCreateWithoutRoomInput> | RentalCreateWithoutRoomInput[] | RentalUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RentalCreateOrConnectWithoutRoomInput | RentalCreateOrConnectWithoutRoomInput[]
    upsert?: RentalUpsertWithWhereUniqueWithoutRoomInput | RentalUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: RentalCreateManyRoomInputEnvelope
    set?: RentalWhereUniqueInput | RentalWhereUniqueInput[]
    disconnect?: RentalWhereUniqueInput | RentalWhereUniqueInput[]
    delete?: RentalWhereUniqueInput | RentalWhereUniqueInput[]
    connect?: RentalWhereUniqueInput | RentalWhereUniqueInput[]
    update?: RentalUpdateWithWhereUniqueWithoutRoomInput | RentalUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: RentalUpdateManyWithWhereWithoutRoomInput | RentalUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: RentalScalarWhereInput | RentalScalarWhereInput[]
  }

  export type KosanUpdateOneRequiredWithoutRoomsNestedInput = {
    create?: XOR<KosanCreateWithoutRoomsInput, KosanUncheckedCreateWithoutRoomsInput>
    connectOrCreate?: KosanCreateOrConnectWithoutRoomsInput
    upsert?: KosanUpsertWithoutRoomsInput
    connect?: KosanWhereUniqueInput
    update?: XOR<XOR<KosanUpdateToOneWithWhereWithoutRoomsInput, KosanUpdateWithoutRoomsInput>, KosanUncheckedUpdateWithoutRoomsInput>
  }

  export type ImageUpdateManyWithoutRoomNestedInput = {
    create?: XOR<ImageCreateWithoutRoomInput, ImageUncheckedCreateWithoutRoomInput> | ImageCreateWithoutRoomInput[] | ImageUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ImageCreateOrConnectWithoutRoomInput | ImageCreateOrConnectWithoutRoomInput[]
    upsert?: ImageUpsertWithWhereUniqueWithoutRoomInput | ImageUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: ImageCreateManyRoomInputEnvelope
    set?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    disconnect?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    delete?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    connect?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    update?: ImageUpdateWithWhereUniqueWithoutRoomInput | ImageUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: ImageUpdateManyWithWhereWithoutRoomInput | ImageUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: ImageScalarWhereInput | ImageScalarWhereInput[]
  }

  export type RentalUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<RentalCreateWithoutRoomInput, RentalUncheckedCreateWithoutRoomInput> | RentalCreateWithoutRoomInput[] | RentalUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RentalCreateOrConnectWithoutRoomInput | RentalCreateOrConnectWithoutRoomInput[]
    upsert?: RentalUpsertWithWhereUniqueWithoutRoomInput | RentalUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: RentalCreateManyRoomInputEnvelope
    set?: RentalWhereUniqueInput | RentalWhereUniqueInput[]
    disconnect?: RentalWhereUniqueInput | RentalWhereUniqueInput[]
    delete?: RentalWhereUniqueInput | RentalWhereUniqueInput[]
    connect?: RentalWhereUniqueInput | RentalWhereUniqueInput[]
    update?: RentalUpdateWithWhereUniqueWithoutRoomInput | RentalUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: RentalUpdateManyWithWhereWithoutRoomInput | RentalUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: RentalScalarWhereInput | RentalScalarWhereInput[]
  }

  export type ImageUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<ImageCreateWithoutRoomInput, ImageUncheckedCreateWithoutRoomInput> | ImageCreateWithoutRoomInput[] | ImageUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ImageCreateOrConnectWithoutRoomInput | ImageCreateOrConnectWithoutRoomInput[]
    upsert?: ImageUpsertWithWhereUniqueWithoutRoomInput | ImageUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: ImageCreateManyRoomInputEnvelope
    set?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    disconnect?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    delete?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    connect?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    update?: ImageUpdateWithWhereUniqueWithoutRoomInput | ImageUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: ImageUpdateManyWithWhereWithoutRoomInput | ImageUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: ImageScalarWhereInput | ImageScalarWhereInput[]
  }

  export type RentalCreateNestedManyWithoutTenantInput = {
    create?: XOR<RentalCreateWithoutTenantInput, RentalUncheckedCreateWithoutTenantInput> | RentalCreateWithoutTenantInput[] | RentalUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: RentalCreateOrConnectWithoutTenantInput | RentalCreateOrConnectWithoutTenantInput[]
    createMany?: RentalCreateManyTenantInputEnvelope
    connect?: RentalWhereUniqueInput | RentalWhereUniqueInput[]
  }

  export type RentalUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<RentalCreateWithoutTenantInput, RentalUncheckedCreateWithoutTenantInput> | RentalCreateWithoutTenantInput[] | RentalUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: RentalCreateOrConnectWithoutTenantInput | RentalCreateOrConnectWithoutTenantInput[]
    createMany?: RentalCreateManyTenantInputEnvelope
    connect?: RentalWhereUniqueInput | RentalWhereUniqueInput[]
  }

  export type RentalUpdateManyWithoutTenantNestedInput = {
    create?: XOR<RentalCreateWithoutTenantInput, RentalUncheckedCreateWithoutTenantInput> | RentalCreateWithoutTenantInput[] | RentalUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: RentalCreateOrConnectWithoutTenantInput | RentalCreateOrConnectWithoutTenantInput[]
    upsert?: RentalUpsertWithWhereUniqueWithoutTenantInput | RentalUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: RentalCreateManyTenantInputEnvelope
    set?: RentalWhereUniqueInput | RentalWhereUniqueInput[]
    disconnect?: RentalWhereUniqueInput | RentalWhereUniqueInput[]
    delete?: RentalWhereUniqueInput | RentalWhereUniqueInput[]
    connect?: RentalWhereUniqueInput | RentalWhereUniqueInput[]
    update?: RentalUpdateWithWhereUniqueWithoutTenantInput | RentalUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: RentalUpdateManyWithWhereWithoutTenantInput | RentalUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: RentalScalarWhereInput | RentalScalarWhereInput[]
  }

  export type RentalUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<RentalCreateWithoutTenantInput, RentalUncheckedCreateWithoutTenantInput> | RentalCreateWithoutTenantInput[] | RentalUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: RentalCreateOrConnectWithoutTenantInput | RentalCreateOrConnectWithoutTenantInput[]
    upsert?: RentalUpsertWithWhereUniqueWithoutTenantInput | RentalUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: RentalCreateManyTenantInputEnvelope
    set?: RentalWhereUniqueInput | RentalWhereUniqueInput[]
    disconnect?: RentalWhereUniqueInput | RentalWhereUniqueInput[]
    delete?: RentalWhereUniqueInput | RentalWhereUniqueInput[]
    connect?: RentalWhereUniqueInput | RentalWhereUniqueInput[]
    update?: RentalUpdateWithWhereUniqueWithoutTenantInput | RentalUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: RentalUpdateManyWithWhereWithoutTenantInput | RentalUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: RentalScalarWhereInput | RentalScalarWhereInput[]
  }

  export type RoomCreateNestedOneWithoutRentalsInput = {
    create?: XOR<RoomCreateWithoutRentalsInput, RoomUncheckedCreateWithoutRentalsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutRentalsInput
    connect?: RoomWhereUniqueInput
  }

  export type TenantCreateNestedOneWithoutRentalsInput = {
    create?: XOR<TenantCreateWithoutRentalsInput, TenantUncheckedCreateWithoutRentalsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutRentalsInput
    connect?: TenantWhereUniqueInput
  }

  export type PaymentCreateNestedManyWithoutRentalInput = {
    create?: XOR<PaymentCreateWithoutRentalInput, PaymentUncheckedCreateWithoutRentalInput> | PaymentCreateWithoutRentalInput[] | PaymentUncheckedCreateWithoutRentalInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutRentalInput | PaymentCreateOrConnectWithoutRentalInput[]
    createMany?: PaymentCreateManyRentalInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutRentalInput = {
    create?: XOR<PaymentCreateWithoutRentalInput, PaymentUncheckedCreateWithoutRentalInput> | PaymentCreateWithoutRentalInput[] | PaymentUncheckedCreateWithoutRentalInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutRentalInput | PaymentCreateOrConnectWithoutRentalInput[]
    createMany?: PaymentCreateManyRentalInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumRentalStatusFieldUpdateOperationsInput = {
    set?: $Enums.RentalStatus
  }

  export type RoomUpdateOneRequiredWithoutRentalsNestedInput = {
    create?: XOR<RoomCreateWithoutRentalsInput, RoomUncheckedCreateWithoutRentalsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutRentalsInput
    upsert?: RoomUpsertWithoutRentalsInput
    connect?: RoomWhereUniqueInput
    update?: XOR<XOR<RoomUpdateToOneWithWhereWithoutRentalsInput, RoomUpdateWithoutRentalsInput>, RoomUncheckedUpdateWithoutRentalsInput>
  }

  export type TenantUpdateOneRequiredWithoutRentalsNestedInput = {
    create?: XOR<TenantCreateWithoutRentalsInput, TenantUncheckedCreateWithoutRentalsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutRentalsInput
    upsert?: TenantUpsertWithoutRentalsInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutRentalsInput, TenantUpdateWithoutRentalsInput>, TenantUncheckedUpdateWithoutRentalsInput>
  }

  export type PaymentUpdateManyWithoutRentalNestedInput = {
    create?: XOR<PaymentCreateWithoutRentalInput, PaymentUncheckedCreateWithoutRentalInput> | PaymentCreateWithoutRentalInput[] | PaymentUncheckedCreateWithoutRentalInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutRentalInput | PaymentCreateOrConnectWithoutRentalInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutRentalInput | PaymentUpsertWithWhereUniqueWithoutRentalInput[]
    createMany?: PaymentCreateManyRentalInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutRentalInput | PaymentUpdateWithWhereUniqueWithoutRentalInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutRentalInput | PaymentUpdateManyWithWhereWithoutRentalInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutRentalNestedInput = {
    create?: XOR<PaymentCreateWithoutRentalInput, PaymentUncheckedCreateWithoutRentalInput> | PaymentCreateWithoutRentalInput[] | PaymentUncheckedCreateWithoutRentalInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutRentalInput | PaymentCreateOrConnectWithoutRentalInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutRentalInput | PaymentUpsertWithWhereUniqueWithoutRentalInput[]
    createMany?: PaymentCreateManyRentalInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutRentalInput | PaymentUpdateWithWhereUniqueWithoutRentalInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutRentalInput | PaymentUpdateManyWithWhereWithoutRentalInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type RentalCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<RentalCreateWithoutPaymentsInput, RentalUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: RentalCreateOrConnectWithoutPaymentsInput
    connect?: RentalWhereUniqueInput
  }

  export type ImageCreateNestedManyWithoutPaymentInput = {
    create?: XOR<ImageCreateWithoutPaymentInput, ImageUncheckedCreateWithoutPaymentInput> | ImageCreateWithoutPaymentInput[] | ImageUncheckedCreateWithoutPaymentInput[]
    connectOrCreate?: ImageCreateOrConnectWithoutPaymentInput | ImageCreateOrConnectWithoutPaymentInput[]
    createMany?: ImageCreateManyPaymentInputEnvelope
    connect?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
  }

  export type ImageUncheckedCreateNestedManyWithoutPaymentInput = {
    create?: XOR<ImageCreateWithoutPaymentInput, ImageUncheckedCreateWithoutPaymentInput> | ImageCreateWithoutPaymentInput[] | ImageUncheckedCreateWithoutPaymentInput[]
    connectOrCreate?: ImageCreateOrConnectWithoutPaymentInput | ImageCreateOrConnectWithoutPaymentInput[]
    createMany?: ImageCreateManyPaymentInputEnvelope
    connect?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type RentalUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<RentalCreateWithoutPaymentsInput, RentalUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: RentalCreateOrConnectWithoutPaymentsInput
    upsert?: RentalUpsertWithoutPaymentsInput
    connect?: RentalWhereUniqueInput
    update?: XOR<XOR<RentalUpdateToOneWithWhereWithoutPaymentsInput, RentalUpdateWithoutPaymentsInput>, RentalUncheckedUpdateWithoutPaymentsInput>
  }

  export type ImageUpdateManyWithoutPaymentNestedInput = {
    create?: XOR<ImageCreateWithoutPaymentInput, ImageUncheckedCreateWithoutPaymentInput> | ImageCreateWithoutPaymentInput[] | ImageUncheckedCreateWithoutPaymentInput[]
    connectOrCreate?: ImageCreateOrConnectWithoutPaymentInput | ImageCreateOrConnectWithoutPaymentInput[]
    upsert?: ImageUpsertWithWhereUniqueWithoutPaymentInput | ImageUpsertWithWhereUniqueWithoutPaymentInput[]
    createMany?: ImageCreateManyPaymentInputEnvelope
    set?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    disconnect?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    delete?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    connect?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    update?: ImageUpdateWithWhereUniqueWithoutPaymentInput | ImageUpdateWithWhereUniqueWithoutPaymentInput[]
    updateMany?: ImageUpdateManyWithWhereWithoutPaymentInput | ImageUpdateManyWithWhereWithoutPaymentInput[]
    deleteMany?: ImageScalarWhereInput | ImageScalarWhereInput[]
  }

  export type ImageUncheckedUpdateManyWithoutPaymentNestedInput = {
    create?: XOR<ImageCreateWithoutPaymentInput, ImageUncheckedCreateWithoutPaymentInput> | ImageCreateWithoutPaymentInput[] | ImageUncheckedCreateWithoutPaymentInput[]
    connectOrCreate?: ImageCreateOrConnectWithoutPaymentInput | ImageCreateOrConnectWithoutPaymentInput[]
    upsert?: ImageUpsertWithWhereUniqueWithoutPaymentInput | ImageUpsertWithWhereUniqueWithoutPaymentInput[]
    createMany?: ImageCreateManyPaymentInputEnvelope
    set?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    disconnect?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    delete?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    connect?: ImageWhereUniqueInput | ImageWhereUniqueInput[]
    update?: ImageUpdateWithWhereUniqueWithoutPaymentInput | ImageUpdateWithWhereUniqueWithoutPaymentInput[]
    updateMany?: ImageUpdateManyWithWhereWithoutPaymentInput | ImageUpdateManyWithWhereWithoutPaymentInput[]
    deleteMany?: ImageScalarWhereInput | ImageScalarWhereInput[]
  }

  export type KosanCreateNestedOneWithoutImagesInput = {
    create?: XOR<KosanCreateWithoutImagesInput, KosanUncheckedCreateWithoutImagesInput>
    connectOrCreate?: KosanCreateOrConnectWithoutImagesInput
    connect?: KosanWhereUniqueInput
  }

  export type RoomCreateNestedOneWithoutImagesInput = {
    create?: XOR<RoomCreateWithoutImagesInput, RoomUncheckedCreateWithoutImagesInput>
    connectOrCreate?: RoomCreateOrConnectWithoutImagesInput
    connect?: RoomWhereUniqueInput
  }

  export type PaymentCreateNestedOneWithoutImagesInput = {
    create?: XOR<PaymentCreateWithoutImagesInput, PaymentUncheckedCreateWithoutImagesInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutImagesInput
    connect?: PaymentWhereUniqueInput
  }

  export type KosanUpdateOneWithoutImagesNestedInput = {
    create?: XOR<KosanCreateWithoutImagesInput, KosanUncheckedCreateWithoutImagesInput>
    connectOrCreate?: KosanCreateOrConnectWithoutImagesInput
    upsert?: KosanUpsertWithoutImagesInput
    disconnect?: KosanWhereInput | boolean
    delete?: KosanWhereInput | boolean
    connect?: KosanWhereUniqueInput
    update?: XOR<XOR<KosanUpdateToOneWithWhereWithoutImagesInput, KosanUpdateWithoutImagesInput>, KosanUncheckedUpdateWithoutImagesInput>
  }

  export type RoomUpdateOneWithoutImagesNestedInput = {
    create?: XOR<RoomCreateWithoutImagesInput, RoomUncheckedCreateWithoutImagesInput>
    connectOrCreate?: RoomCreateOrConnectWithoutImagesInput
    upsert?: RoomUpsertWithoutImagesInput
    disconnect?: RoomWhereInput | boolean
    delete?: RoomWhereInput | boolean
    connect?: RoomWhereUniqueInput
    update?: XOR<XOR<RoomUpdateToOneWithWhereWithoutImagesInput, RoomUpdateWithoutImagesInput>, RoomUncheckedUpdateWithoutImagesInput>
  }

  export type PaymentUpdateOneWithoutImagesNestedInput = {
    create?: XOR<PaymentCreateWithoutImagesInput, PaymentUncheckedCreateWithoutImagesInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutImagesInput
    upsert?: PaymentUpsertWithoutImagesInput
    disconnect?: PaymentWhereInput | boolean
    delete?: PaymentWhereInput | boolean
    connect?: PaymentWhereUniqueInput
    update?: XOR<XOR<PaymentUpdateToOneWithWhereWithoutImagesInput, PaymentUpdateWithoutImagesInput>, PaymentUncheckedUpdateWithoutImagesInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumRentalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RentalStatus | EnumRentalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RentalStatus[] | ListEnumRentalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RentalStatus[] | ListEnumRentalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRentalStatusFilter<$PrismaModel> | $Enums.RentalStatus
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumRentalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RentalStatus | EnumRentalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RentalStatus[] | ListEnumRentalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RentalStatus[] | ListEnumRentalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRentalStatusWithAggregatesFilter<$PrismaModel> | $Enums.RentalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRentalStatusFilter<$PrismaModel>
    _max?: NestedEnumRentalStatusFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type KosanCreateWithoutOwnerInput = {
    id?: string
    name: string
    address: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    humanId: string
    rooms?: RoomCreateNestedManyWithoutKosanInput
    images?: ImageCreateNestedManyWithoutKosanInput
  }

  export type KosanUncheckedCreateWithoutOwnerInput = {
    id?: string
    name: string
    address: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    humanId: string
    rooms?: RoomUncheckedCreateNestedManyWithoutKosanInput
    images?: ImageUncheckedCreateNestedManyWithoutKosanInput
  }

  export type KosanCreateOrConnectWithoutOwnerInput = {
    where: KosanWhereUniqueInput
    create: XOR<KosanCreateWithoutOwnerInput, KosanUncheckedCreateWithoutOwnerInput>
  }

  export type KosanCreateManyOwnerInputEnvelope = {
    data: KosanCreateManyOwnerInput | KosanCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type KosanUpsertWithWhereUniqueWithoutOwnerInput = {
    where: KosanWhereUniqueInput
    update: XOR<KosanUpdateWithoutOwnerInput, KosanUncheckedUpdateWithoutOwnerInput>
    create: XOR<KosanCreateWithoutOwnerInput, KosanUncheckedCreateWithoutOwnerInput>
  }

  export type KosanUpdateWithWhereUniqueWithoutOwnerInput = {
    where: KosanWhereUniqueInput
    data: XOR<KosanUpdateWithoutOwnerInput, KosanUncheckedUpdateWithoutOwnerInput>
  }

  export type KosanUpdateManyWithWhereWithoutOwnerInput = {
    where: KosanScalarWhereInput
    data: XOR<KosanUpdateManyMutationInput, KosanUncheckedUpdateManyWithoutOwnerInput>
  }

  export type KosanScalarWhereInput = {
    AND?: KosanScalarWhereInput | KosanScalarWhereInput[]
    OR?: KosanScalarWhereInput[]
    NOT?: KosanScalarWhereInput | KosanScalarWhereInput[]
    id?: UuidFilter<"Kosan"> | string
    ownerId?: UuidFilter<"Kosan"> | string
    name?: StringFilter<"Kosan"> | string
    address?: StringFilter<"Kosan"> | string
    description?: StringNullableFilter<"Kosan"> | string | null
    createdAt?: DateTimeFilter<"Kosan"> | Date | string
    updatedAt?: DateTimeFilter<"Kosan"> | Date | string
    humanId?: StringFilter<"Kosan"> | string
  }

  export type OwnerCreateWithoutKosanInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OwnerUncheckedCreateWithoutKosanInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OwnerCreateOrConnectWithoutKosanInput = {
    where: OwnerWhereUniqueInput
    create: XOR<OwnerCreateWithoutKosanInput, OwnerUncheckedCreateWithoutKosanInput>
  }

  export type RoomCreateWithoutKosanInput = {
    id?: string
    name: string
    monthlyPrice: number
    createdAt?: Date | string
    updatedAt?: Date | string
    humanId: string
    quantity?: number
    facilities?: RoomCreatefacilitiesInput | string[]
    rentals?: RentalCreateNestedManyWithoutRoomInput
    images?: ImageCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateWithoutKosanInput = {
    id?: string
    name: string
    monthlyPrice: number
    createdAt?: Date | string
    updatedAt?: Date | string
    humanId: string
    quantity?: number
    facilities?: RoomCreatefacilitiesInput | string[]
    rentals?: RentalUncheckedCreateNestedManyWithoutRoomInput
    images?: ImageUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutKosanInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutKosanInput, RoomUncheckedCreateWithoutKosanInput>
  }

  export type RoomCreateManyKosanInputEnvelope = {
    data: RoomCreateManyKosanInput | RoomCreateManyKosanInput[]
    skipDuplicates?: boolean
  }

  export type ImageCreateWithoutKosanInput = {
    id?: string
    url: string
    createdAt?: Date | string
    room?: RoomCreateNestedOneWithoutImagesInput
    payment?: PaymentCreateNestedOneWithoutImagesInput
  }

  export type ImageUncheckedCreateWithoutKosanInput = {
    id?: string
    url: string
    roomId?: string | null
    paymentId?: string | null
    createdAt?: Date | string
  }

  export type ImageCreateOrConnectWithoutKosanInput = {
    where: ImageWhereUniqueInput
    create: XOR<ImageCreateWithoutKosanInput, ImageUncheckedCreateWithoutKosanInput>
  }

  export type ImageCreateManyKosanInputEnvelope = {
    data: ImageCreateManyKosanInput | ImageCreateManyKosanInput[]
    skipDuplicates?: boolean
  }

  export type OwnerUpsertWithoutKosanInput = {
    update: XOR<OwnerUpdateWithoutKosanInput, OwnerUncheckedUpdateWithoutKosanInput>
    create: XOR<OwnerCreateWithoutKosanInput, OwnerUncheckedCreateWithoutKosanInput>
    where?: OwnerWhereInput
  }

  export type OwnerUpdateToOneWithWhereWithoutKosanInput = {
    where?: OwnerWhereInput
    data: XOR<OwnerUpdateWithoutKosanInput, OwnerUncheckedUpdateWithoutKosanInput>
  }

  export type OwnerUpdateWithoutKosanInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OwnerUncheckedUpdateWithoutKosanInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUpsertWithWhereUniqueWithoutKosanInput = {
    where: RoomWhereUniqueInput
    update: XOR<RoomUpdateWithoutKosanInput, RoomUncheckedUpdateWithoutKosanInput>
    create: XOR<RoomCreateWithoutKosanInput, RoomUncheckedCreateWithoutKosanInput>
  }

  export type RoomUpdateWithWhereUniqueWithoutKosanInput = {
    where: RoomWhereUniqueInput
    data: XOR<RoomUpdateWithoutKosanInput, RoomUncheckedUpdateWithoutKosanInput>
  }

  export type RoomUpdateManyWithWhereWithoutKosanInput = {
    where: RoomScalarWhereInput
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyWithoutKosanInput>
  }

  export type RoomScalarWhereInput = {
    AND?: RoomScalarWhereInput | RoomScalarWhereInput[]
    OR?: RoomScalarWhereInput[]
    NOT?: RoomScalarWhereInput | RoomScalarWhereInput[]
    id?: UuidFilter<"Room"> | string
    kosanId?: UuidFilter<"Room"> | string
    name?: StringFilter<"Room"> | string
    monthlyPrice?: IntFilter<"Room"> | number
    createdAt?: DateTimeFilter<"Room"> | Date | string
    updatedAt?: DateTimeFilter<"Room"> | Date | string
    humanId?: StringFilter<"Room"> | string
    quantity?: IntFilter<"Room"> | number
    facilities?: StringNullableListFilter<"Room">
  }

  export type ImageUpsertWithWhereUniqueWithoutKosanInput = {
    where: ImageWhereUniqueInput
    update: XOR<ImageUpdateWithoutKosanInput, ImageUncheckedUpdateWithoutKosanInput>
    create: XOR<ImageCreateWithoutKosanInput, ImageUncheckedCreateWithoutKosanInput>
  }

  export type ImageUpdateWithWhereUniqueWithoutKosanInput = {
    where: ImageWhereUniqueInput
    data: XOR<ImageUpdateWithoutKosanInput, ImageUncheckedUpdateWithoutKosanInput>
  }

  export type ImageUpdateManyWithWhereWithoutKosanInput = {
    where: ImageScalarWhereInput
    data: XOR<ImageUpdateManyMutationInput, ImageUncheckedUpdateManyWithoutKosanInput>
  }

  export type ImageScalarWhereInput = {
    AND?: ImageScalarWhereInput | ImageScalarWhereInput[]
    OR?: ImageScalarWhereInput[]
    NOT?: ImageScalarWhereInput | ImageScalarWhereInput[]
    id?: UuidFilter<"Image"> | string
    url?: StringFilter<"Image"> | string
    kosanId?: UuidNullableFilter<"Image"> | string | null
    roomId?: UuidNullableFilter<"Image"> | string | null
    paymentId?: UuidNullableFilter<"Image"> | string | null
    createdAt?: DateTimeFilter<"Image"> | Date | string
  }

  export type RentalCreateWithoutRoomInput = {
    id?: string
    humanId: string
    startDate: Date | string
    monthlyPriceSnapshot: number
    paidUntil?: Date | string | null
    checkoutDate?: Date | string | null
    status?: $Enums.RentalStatus
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenant: TenantCreateNestedOneWithoutRentalsInput
    payments?: PaymentCreateNestedManyWithoutRentalInput
  }

  export type RentalUncheckedCreateWithoutRoomInput = {
    id?: string
    humanId: string
    tenantId: string
    startDate: Date | string
    monthlyPriceSnapshot: number
    paidUntil?: Date | string | null
    checkoutDate?: Date | string | null
    status?: $Enums.RentalStatus
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentUncheckedCreateNestedManyWithoutRentalInput
  }

  export type RentalCreateOrConnectWithoutRoomInput = {
    where: RentalWhereUniqueInput
    create: XOR<RentalCreateWithoutRoomInput, RentalUncheckedCreateWithoutRoomInput>
  }

  export type RentalCreateManyRoomInputEnvelope = {
    data: RentalCreateManyRoomInput | RentalCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type KosanCreateWithoutRoomsInput = {
    id?: string
    name: string
    address: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    humanId: string
    owner: OwnerCreateNestedOneWithoutKosanInput
    images?: ImageCreateNestedManyWithoutKosanInput
  }

  export type KosanUncheckedCreateWithoutRoomsInput = {
    id?: string
    ownerId: string
    name: string
    address: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    humanId: string
    images?: ImageUncheckedCreateNestedManyWithoutKosanInput
  }

  export type KosanCreateOrConnectWithoutRoomsInput = {
    where: KosanWhereUniqueInput
    create: XOR<KosanCreateWithoutRoomsInput, KosanUncheckedCreateWithoutRoomsInput>
  }

  export type ImageCreateWithoutRoomInput = {
    id?: string
    url: string
    createdAt?: Date | string
    kosan?: KosanCreateNestedOneWithoutImagesInput
    payment?: PaymentCreateNestedOneWithoutImagesInput
  }

  export type ImageUncheckedCreateWithoutRoomInput = {
    id?: string
    url: string
    kosanId?: string | null
    paymentId?: string | null
    createdAt?: Date | string
  }

  export type ImageCreateOrConnectWithoutRoomInput = {
    where: ImageWhereUniqueInput
    create: XOR<ImageCreateWithoutRoomInput, ImageUncheckedCreateWithoutRoomInput>
  }

  export type ImageCreateManyRoomInputEnvelope = {
    data: ImageCreateManyRoomInput | ImageCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type RentalUpsertWithWhereUniqueWithoutRoomInput = {
    where: RentalWhereUniqueInput
    update: XOR<RentalUpdateWithoutRoomInput, RentalUncheckedUpdateWithoutRoomInput>
    create: XOR<RentalCreateWithoutRoomInput, RentalUncheckedCreateWithoutRoomInput>
  }

  export type RentalUpdateWithWhereUniqueWithoutRoomInput = {
    where: RentalWhereUniqueInput
    data: XOR<RentalUpdateWithoutRoomInput, RentalUncheckedUpdateWithoutRoomInput>
  }

  export type RentalUpdateManyWithWhereWithoutRoomInput = {
    where: RentalScalarWhereInput
    data: XOR<RentalUpdateManyMutationInput, RentalUncheckedUpdateManyWithoutRoomInput>
  }

  export type RentalScalarWhereInput = {
    AND?: RentalScalarWhereInput | RentalScalarWhereInput[]
    OR?: RentalScalarWhereInput[]
    NOT?: RentalScalarWhereInput | RentalScalarWhereInput[]
    id?: UuidFilter<"Rental"> | string
    humanId?: StringFilter<"Rental"> | string
    roomId?: UuidFilter<"Rental"> | string
    tenantId?: UuidFilter<"Rental"> | string
    startDate?: DateTimeFilter<"Rental"> | Date | string
    monthlyPriceSnapshot?: IntFilter<"Rental"> | number
    paidUntil?: DateTimeNullableFilter<"Rental"> | Date | string | null
    checkoutDate?: DateTimeNullableFilter<"Rental"> | Date | string | null
    status?: EnumRentalStatusFilter<"Rental"> | $Enums.RentalStatus
    note?: StringNullableFilter<"Rental"> | string | null
    createdAt?: DateTimeFilter<"Rental"> | Date | string
    updatedAt?: DateTimeFilter<"Rental"> | Date | string
  }

  export type KosanUpsertWithoutRoomsInput = {
    update: XOR<KosanUpdateWithoutRoomsInput, KosanUncheckedUpdateWithoutRoomsInput>
    create: XOR<KosanCreateWithoutRoomsInput, KosanUncheckedCreateWithoutRoomsInput>
    where?: KosanWhereInput
  }

  export type KosanUpdateToOneWithWhereWithoutRoomsInput = {
    where?: KosanWhereInput
    data: XOR<KosanUpdateWithoutRoomsInput, KosanUncheckedUpdateWithoutRoomsInput>
  }

  export type KosanUpdateWithoutRoomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    humanId?: StringFieldUpdateOperationsInput | string
    owner?: OwnerUpdateOneRequiredWithoutKosanNestedInput
    images?: ImageUpdateManyWithoutKosanNestedInput
  }

  export type KosanUncheckedUpdateWithoutRoomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    humanId?: StringFieldUpdateOperationsInput | string
    images?: ImageUncheckedUpdateManyWithoutKosanNestedInput
  }

  export type ImageUpsertWithWhereUniqueWithoutRoomInput = {
    where: ImageWhereUniqueInput
    update: XOR<ImageUpdateWithoutRoomInput, ImageUncheckedUpdateWithoutRoomInput>
    create: XOR<ImageCreateWithoutRoomInput, ImageUncheckedCreateWithoutRoomInput>
  }

  export type ImageUpdateWithWhereUniqueWithoutRoomInput = {
    where: ImageWhereUniqueInput
    data: XOR<ImageUpdateWithoutRoomInput, ImageUncheckedUpdateWithoutRoomInput>
  }

  export type ImageUpdateManyWithWhereWithoutRoomInput = {
    where: ImageScalarWhereInput
    data: XOR<ImageUpdateManyMutationInput, ImageUncheckedUpdateManyWithoutRoomInput>
  }

  export type RentalCreateWithoutTenantInput = {
    id?: string
    humanId: string
    startDate: Date | string
    monthlyPriceSnapshot: number
    paidUntil?: Date | string | null
    checkoutDate?: Date | string | null
    status?: $Enums.RentalStatus
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    room: RoomCreateNestedOneWithoutRentalsInput
    payments?: PaymentCreateNestedManyWithoutRentalInput
  }

  export type RentalUncheckedCreateWithoutTenantInput = {
    id?: string
    humanId: string
    roomId: string
    startDate: Date | string
    monthlyPriceSnapshot: number
    paidUntil?: Date | string | null
    checkoutDate?: Date | string | null
    status?: $Enums.RentalStatus
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentUncheckedCreateNestedManyWithoutRentalInput
  }

  export type RentalCreateOrConnectWithoutTenantInput = {
    where: RentalWhereUniqueInput
    create: XOR<RentalCreateWithoutTenantInput, RentalUncheckedCreateWithoutTenantInput>
  }

  export type RentalCreateManyTenantInputEnvelope = {
    data: RentalCreateManyTenantInput | RentalCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type RentalUpsertWithWhereUniqueWithoutTenantInput = {
    where: RentalWhereUniqueInput
    update: XOR<RentalUpdateWithoutTenantInput, RentalUncheckedUpdateWithoutTenantInput>
    create: XOR<RentalCreateWithoutTenantInput, RentalUncheckedCreateWithoutTenantInput>
  }

  export type RentalUpdateWithWhereUniqueWithoutTenantInput = {
    where: RentalWhereUniqueInput
    data: XOR<RentalUpdateWithoutTenantInput, RentalUncheckedUpdateWithoutTenantInput>
  }

  export type RentalUpdateManyWithWhereWithoutTenantInput = {
    where: RentalScalarWhereInput
    data: XOR<RentalUpdateManyMutationInput, RentalUncheckedUpdateManyWithoutTenantInput>
  }

  export type RoomCreateWithoutRentalsInput = {
    id?: string
    name: string
    monthlyPrice: number
    createdAt?: Date | string
    updatedAt?: Date | string
    humanId: string
    quantity?: number
    facilities?: RoomCreatefacilitiesInput | string[]
    kosan: KosanCreateNestedOneWithoutRoomsInput
    images?: ImageCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateWithoutRentalsInput = {
    id?: string
    kosanId: string
    name: string
    monthlyPrice: number
    createdAt?: Date | string
    updatedAt?: Date | string
    humanId: string
    quantity?: number
    facilities?: RoomCreatefacilitiesInput | string[]
    images?: ImageUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutRentalsInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutRentalsInput, RoomUncheckedCreateWithoutRentalsInput>
  }

  export type TenantCreateWithoutRentalsInput = {
    id?: string
    telegramId?: string | null
    name: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TenantUncheckedCreateWithoutRentalsInput = {
    id?: string
    telegramId?: string | null
    name: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TenantCreateOrConnectWithoutRentalsInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutRentalsInput, TenantUncheckedCreateWithoutRentalsInput>
  }

  export type PaymentCreateWithoutRentalInput = {
    id?: string
    humanId: string
    monthsPaid: number
    periodStart: Date | string
    periodEnd: Date | string
    amount: number
    paidAt?: Date | string | null
    status?: $Enums.PaymentStatus
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: ImageCreateNestedManyWithoutPaymentInput
  }

  export type PaymentUncheckedCreateWithoutRentalInput = {
    id?: string
    humanId: string
    monthsPaid: number
    periodStart: Date | string
    periodEnd: Date | string
    amount: number
    paidAt?: Date | string | null
    status?: $Enums.PaymentStatus
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: ImageUncheckedCreateNestedManyWithoutPaymentInput
  }

  export type PaymentCreateOrConnectWithoutRentalInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutRentalInput, PaymentUncheckedCreateWithoutRentalInput>
  }

  export type PaymentCreateManyRentalInputEnvelope = {
    data: PaymentCreateManyRentalInput | PaymentCreateManyRentalInput[]
    skipDuplicates?: boolean
  }

  export type RoomUpsertWithoutRentalsInput = {
    update: XOR<RoomUpdateWithoutRentalsInput, RoomUncheckedUpdateWithoutRentalsInput>
    create: XOR<RoomCreateWithoutRentalsInput, RoomUncheckedCreateWithoutRentalsInput>
    where?: RoomWhereInput
  }

  export type RoomUpdateToOneWithWhereWithoutRentalsInput = {
    where?: RoomWhereInput
    data: XOR<RoomUpdateWithoutRentalsInput, RoomUncheckedUpdateWithoutRentalsInput>
  }

  export type RoomUpdateWithoutRentalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    monthlyPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    humanId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    facilities?: RoomUpdatefacilitiesInput | string[]
    kosan?: KosanUpdateOneRequiredWithoutRoomsNestedInput
    images?: ImageUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateWithoutRentalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    kosanId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    monthlyPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    humanId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    facilities?: RoomUpdatefacilitiesInput | string[]
    images?: ImageUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type TenantUpsertWithoutRentalsInput = {
    update: XOR<TenantUpdateWithoutRentalsInput, TenantUncheckedUpdateWithoutRentalsInput>
    create: XOR<TenantCreateWithoutRentalsInput, TenantUncheckedCreateWithoutRentalsInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutRentalsInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutRentalsInput, TenantUncheckedUpdateWithoutRentalsInput>
  }

  export type TenantUpdateWithoutRentalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantUncheckedUpdateWithoutRentalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUpsertWithWhereUniqueWithoutRentalInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutRentalInput, PaymentUncheckedUpdateWithoutRentalInput>
    create: XOR<PaymentCreateWithoutRentalInput, PaymentUncheckedCreateWithoutRentalInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutRentalInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutRentalInput, PaymentUncheckedUpdateWithoutRentalInput>
  }

  export type PaymentUpdateManyWithWhereWithoutRentalInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutRentalInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: UuidFilter<"Payment"> | string
    humanId?: StringFilter<"Payment"> | string
    rentalId?: UuidFilter<"Payment"> | string
    monthsPaid?: IntFilter<"Payment"> | number
    periodStart?: DateTimeFilter<"Payment"> | Date | string
    periodEnd?: DateTimeFilter<"Payment"> | Date | string
    amount?: IntFilter<"Payment"> | number
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    note?: StringNullableFilter<"Payment"> | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
  }

  export type RentalCreateWithoutPaymentsInput = {
    id?: string
    humanId: string
    startDate: Date | string
    monthlyPriceSnapshot: number
    paidUntil?: Date | string | null
    checkoutDate?: Date | string | null
    status?: $Enums.RentalStatus
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    room: RoomCreateNestedOneWithoutRentalsInput
    tenant: TenantCreateNestedOneWithoutRentalsInput
  }

  export type RentalUncheckedCreateWithoutPaymentsInput = {
    id?: string
    humanId: string
    roomId: string
    tenantId: string
    startDate: Date | string
    monthlyPriceSnapshot: number
    paidUntil?: Date | string | null
    checkoutDate?: Date | string | null
    status?: $Enums.RentalStatus
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RentalCreateOrConnectWithoutPaymentsInput = {
    where: RentalWhereUniqueInput
    create: XOR<RentalCreateWithoutPaymentsInput, RentalUncheckedCreateWithoutPaymentsInput>
  }

  export type ImageCreateWithoutPaymentInput = {
    id?: string
    url: string
    createdAt?: Date | string
    kosan?: KosanCreateNestedOneWithoutImagesInput
    room?: RoomCreateNestedOneWithoutImagesInput
  }

  export type ImageUncheckedCreateWithoutPaymentInput = {
    id?: string
    url: string
    kosanId?: string | null
    roomId?: string | null
    createdAt?: Date | string
  }

  export type ImageCreateOrConnectWithoutPaymentInput = {
    where: ImageWhereUniqueInput
    create: XOR<ImageCreateWithoutPaymentInput, ImageUncheckedCreateWithoutPaymentInput>
  }

  export type ImageCreateManyPaymentInputEnvelope = {
    data: ImageCreateManyPaymentInput | ImageCreateManyPaymentInput[]
    skipDuplicates?: boolean
  }

  export type RentalUpsertWithoutPaymentsInput = {
    update: XOR<RentalUpdateWithoutPaymentsInput, RentalUncheckedUpdateWithoutPaymentsInput>
    create: XOR<RentalCreateWithoutPaymentsInput, RentalUncheckedCreateWithoutPaymentsInput>
    where?: RentalWhereInput
  }

  export type RentalUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: RentalWhereInput
    data: XOR<RentalUpdateWithoutPaymentsInput, RentalUncheckedUpdateWithoutPaymentsInput>
  }

  export type RentalUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    humanId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    monthlyPriceSnapshot?: IntFieldUpdateOperationsInput | number
    paidUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkoutDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumRentalStatusFieldUpdateOperationsInput | $Enums.RentalStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomUpdateOneRequiredWithoutRentalsNestedInput
    tenant?: TenantUpdateOneRequiredWithoutRentalsNestedInput
  }

  export type RentalUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    humanId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    monthlyPriceSnapshot?: IntFieldUpdateOperationsInput | number
    paidUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkoutDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumRentalStatusFieldUpdateOperationsInput | $Enums.RentalStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageUpsertWithWhereUniqueWithoutPaymentInput = {
    where: ImageWhereUniqueInput
    update: XOR<ImageUpdateWithoutPaymentInput, ImageUncheckedUpdateWithoutPaymentInput>
    create: XOR<ImageCreateWithoutPaymentInput, ImageUncheckedCreateWithoutPaymentInput>
  }

  export type ImageUpdateWithWhereUniqueWithoutPaymentInput = {
    where: ImageWhereUniqueInput
    data: XOR<ImageUpdateWithoutPaymentInput, ImageUncheckedUpdateWithoutPaymentInput>
  }

  export type ImageUpdateManyWithWhereWithoutPaymentInput = {
    where: ImageScalarWhereInput
    data: XOR<ImageUpdateManyMutationInput, ImageUncheckedUpdateManyWithoutPaymentInput>
  }

  export type KosanCreateWithoutImagesInput = {
    id?: string
    name: string
    address: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    humanId: string
    owner: OwnerCreateNestedOneWithoutKosanInput
    rooms?: RoomCreateNestedManyWithoutKosanInput
  }

  export type KosanUncheckedCreateWithoutImagesInput = {
    id?: string
    ownerId: string
    name: string
    address: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    humanId: string
    rooms?: RoomUncheckedCreateNestedManyWithoutKosanInput
  }

  export type KosanCreateOrConnectWithoutImagesInput = {
    where: KosanWhereUniqueInput
    create: XOR<KosanCreateWithoutImagesInput, KosanUncheckedCreateWithoutImagesInput>
  }

  export type RoomCreateWithoutImagesInput = {
    id?: string
    name: string
    monthlyPrice: number
    createdAt?: Date | string
    updatedAt?: Date | string
    humanId: string
    quantity?: number
    facilities?: RoomCreatefacilitiesInput | string[]
    rentals?: RentalCreateNestedManyWithoutRoomInput
    kosan: KosanCreateNestedOneWithoutRoomsInput
  }

  export type RoomUncheckedCreateWithoutImagesInput = {
    id?: string
    kosanId: string
    name: string
    monthlyPrice: number
    createdAt?: Date | string
    updatedAt?: Date | string
    humanId: string
    quantity?: number
    facilities?: RoomCreatefacilitiesInput | string[]
    rentals?: RentalUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutImagesInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutImagesInput, RoomUncheckedCreateWithoutImagesInput>
  }

  export type PaymentCreateWithoutImagesInput = {
    id?: string
    humanId: string
    monthsPaid: number
    periodStart: Date | string
    periodEnd: Date | string
    amount: number
    paidAt?: Date | string | null
    status?: $Enums.PaymentStatus
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rental: RentalCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateWithoutImagesInput = {
    id?: string
    humanId: string
    rentalId: string
    monthsPaid: number
    periodStart: Date | string
    periodEnd: Date | string
    amount: number
    paidAt?: Date | string | null
    status?: $Enums.PaymentStatus
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutImagesInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutImagesInput, PaymentUncheckedCreateWithoutImagesInput>
  }

  export type KosanUpsertWithoutImagesInput = {
    update: XOR<KosanUpdateWithoutImagesInput, KosanUncheckedUpdateWithoutImagesInput>
    create: XOR<KosanCreateWithoutImagesInput, KosanUncheckedCreateWithoutImagesInput>
    where?: KosanWhereInput
  }

  export type KosanUpdateToOneWithWhereWithoutImagesInput = {
    where?: KosanWhereInput
    data: XOR<KosanUpdateWithoutImagesInput, KosanUncheckedUpdateWithoutImagesInput>
  }

  export type KosanUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    humanId?: StringFieldUpdateOperationsInput | string
    owner?: OwnerUpdateOneRequiredWithoutKosanNestedInput
    rooms?: RoomUpdateManyWithoutKosanNestedInput
  }

  export type KosanUncheckedUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    humanId?: StringFieldUpdateOperationsInput | string
    rooms?: RoomUncheckedUpdateManyWithoutKosanNestedInput
  }

  export type RoomUpsertWithoutImagesInput = {
    update: XOR<RoomUpdateWithoutImagesInput, RoomUncheckedUpdateWithoutImagesInput>
    create: XOR<RoomCreateWithoutImagesInput, RoomUncheckedCreateWithoutImagesInput>
    where?: RoomWhereInput
  }

  export type RoomUpdateToOneWithWhereWithoutImagesInput = {
    where?: RoomWhereInput
    data: XOR<RoomUpdateWithoutImagesInput, RoomUncheckedUpdateWithoutImagesInput>
  }

  export type RoomUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    monthlyPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    humanId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    facilities?: RoomUpdatefacilitiesInput | string[]
    rentals?: RentalUpdateManyWithoutRoomNestedInput
    kosan?: KosanUpdateOneRequiredWithoutRoomsNestedInput
  }

  export type RoomUncheckedUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    kosanId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    monthlyPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    humanId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    facilities?: RoomUpdatefacilitiesInput | string[]
    rentals?: RentalUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type PaymentUpsertWithoutImagesInput = {
    update: XOR<PaymentUpdateWithoutImagesInput, PaymentUncheckedUpdateWithoutImagesInput>
    create: XOR<PaymentCreateWithoutImagesInput, PaymentUncheckedCreateWithoutImagesInput>
    where?: PaymentWhereInput
  }

  export type PaymentUpdateToOneWithWhereWithoutImagesInput = {
    where?: PaymentWhereInput
    data: XOR<PaymentUpdateWithoutImagesInput, PaymentUncheckedUpdateWithoutImagesInput>
  }

  export type PaymentUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    humanId?: StringFieldUpdateOperationsInput | string
    monthsPaid?: IntFieldUpdateOperationsInput | number
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: IntFieldUpdateOperationsInput | number
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rental?: RentalUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    humanId?: StringFieldUpdateOperationsInput | string
    rentalId?: StringFieldUpdateOperationsInput | string
    monthsPaid?: IntFieldUpdateOperationsInput | number
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: IntFieldUpdateOperationsInput | number
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KosanCreateManyOwnerInput = {
    id?: string
    name: string
    address: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    humanId: string
  }

  export type KosanUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    humanId?: StringFieldUpdateOperationsInput | string
    rooms?: RoomUpdateManyWithoutKosanNestedInput
    images?: ImageUpdateManyWithoutKosanNestedInput
  }

  export type KosanUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    humanId?: StringFieldUpdateOperationsInput | string
    rooms?: RoomUncheckedUpdateManyWithoutKosanNestedInput
    images?: ImageUncheckedUpdateManyWithoutKosanNestedInput
  }

  export type KosanUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    humanId?: StringFieldUpdateOperationsInput | string
  }

  export type RoomCreateManyKosanInput = {
    id?: string
    name: string
    monthlyPrice: number
    createdAt?: Date | string
    updatedAt?: Date | string
    humanId: string
    quantity?: number
    facilities?: RoomCreatefacilitiesInput | string[]
  }

  export type ImageCreateManyKosanInput = {
    id?: string
    url: string
    roomId?: string | null
    paymentId?: string | null
    createdAt?: Date | string
  }

  export type RoomUpdateWithoutKosanInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    monthlyPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    humanId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    facilities?: RoomUpdatefacilitiesInput | string[]
    rentals?: RentalUpdateManyWithoutRoomNestedInput
    images?: ImageUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateWithoutKosanInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    monthlyPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    humanId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    facilities?: RoomUpdatefacilitiesInput | string[]
    rentals?: RentalUncheckedUpdateManyWithoutRoomNestedInput
    images?: ImageUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateManyWithoutKosanInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    monthlyPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    humanId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    facilities?: RoomUpdatefacilitiesInput | string[]
  }

  export type ImageUpdateWithoutKosanInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomUpdateOneWithoutImagesNestedInput
    payment?: PaymentUpdateOneWithoutImagesNestedInput
  }

  export type ImageUncheckedUpdateWithoutKosanInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageUncheckedUpdateManyWithoutKosanInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RentalCreateManyRoomInput = {
    id?: string
    humanId: string
    tenantId: string
    startDate: Date | string
    monthlyPriceSnapshot: number
    paidUntil?: Date | string | null
    checkoutDate?: Date | string | null
    status?: $Enums.RentalStatus
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ImageCreateManyRoomInput = {
    id?: string
    url: string
    kosanId?: string | null
    paymentId?: string | null
    createdAt?: Date | string
  }

  export type RentalUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    humanId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    monthlyPriceSnapshot?: IntFieldUpdateOperationsInput | number
    paidUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkoutDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumRentalStatusFieldUpdateOperationsInput | $Enums.RentalStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutRentalsNestedInput
    payments?: PaymentUpdateManyWithoutRentalNestedInput
  }

  export type RentalUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    humanId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    monthlyPriceSnapshot?: IntFieldUpdateOperationsInput | number
    paidUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkoutDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumRentalStatusFieldUpdateOperationsInput | $Enums.RentalStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUncheckedUpdateManyWithoutRentalNestedInput
  }

  export type RentalUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    humanId?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    monthlyPriceSnapshot?: IntFieldUpdateOperationsInput | number
    paidUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkoutDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumRentalStatusFieldUpdateOperationsInput | $Enums.RentalStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kosan?: KosanUpdateOneWithoutImagesNestedInput
    payment?: PaymentUpdateOneWithoutImagesNestedInput
  }

  export type ImageUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    kosanId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    kosanId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RentalCreateManyTenantInput = {
    id?: string
    humanId: string
    roomId: string
    startDate: Date | string
    monthlyPriceSnapshot: number
    paidUntil?: Date | string | null
    checkoutDate?: Date | string | null
    status?: $Enums.RentalStatus
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RentalUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    humanId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    monthlyPriceSnapshot?: IntFieldUpdateOperationsInput | number
    paidUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkoutDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumRentalStatusFieldUpdateOperationsInput | $Enums.RentalStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomUpdateOneRequiredWithoutRentalsNestedInput
    payments?: PaymentUpdateManyWithoutRentalNestedInput
  }

  export type RentalUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    humanId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    monthlyPriceSnapshot?: IntFieldUpdateOperationsInput | number
    paidUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkoutDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumRentalStatusFieldUpdateOperationsInput | $Enums.RentalStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUncheckedUpdateManyWithoutRentalNestedInput
  }

  export type RentalUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    humanId?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    monthlyPriceSnapshot?: IntFieldUpdateOperationsInput | number
    paidUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkoutDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumRentalStatusFieldUpdateOperationsInput | $Enums.RentalStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyRentalInput = {
    id?: string
    humanId: string
    monthsPaid: number
    periodStart: Date | string
    periodEnd: Date | string
    amount: number
    paidAt?: Date | string | null
    status?: $Enums.PaymentStatus
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateWithoutRentalInput = {
    id?: StringFieldUpdateOperationsInput | string
    humanId?: StringFieldUpdateOperationsInput | string
    monthsPaid?: IntFieldUpdateOperationsInput | number
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: IntFieldUpdateOperationsInput | number
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ImageUpdateManyWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateWithoutRentalInput = {
    id?: StringFieldUpdateOperationsInput | string
    humanId?: StringFieldUpdateOperationsInput | string
    monthsPaid?: IntFieldUpdateOperationsInput | number
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: IntFieldUpdateOperationsInput | number
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ImageUncheckedUpdateManyWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateManyWithoutRentalInput = {
    id?: StringFieldUpdateOperationsInput | string
    humanId?: StringFieldUpdateOperationsInput | string
    monthsPaid?: IntFieldUpdateOperationsInput | number
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: IntFieldUpdateOperationsInput | number
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageCreateManyPaymentInput = {
    id?: string
    url: string
    kosanId?: string | null
    roomId?: string | null
    createdAt?: Date | string
  }

  export type ImageUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kosan?: KosanUpdateOneWithoutImagesNestedInput
    room?: RoomUpdateOneWithoutImagesNestedInput
  }

  export type ImageUncheckedUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    kosanId?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImageUncheckedUpdateManyWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    kosanId?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}