import * as S from "@effect/schema/Schema";

const Common = S.struct({
  title: S.optional(S.string),
  description: S.optional(S.string),
});

type Common = S.To<typeof Common>;

/* -------------------------------------------------------------------------------------------------
 * Boolean
 * -----------------------------------------------------------------------------------------------*/

export const BooleanSchema = Common.pipe(S.extend(S.struct({
  type: S.literal("boolean"),
})));

export type BooleanSchema = S.To<typeof BooleanSchema>;

/* -------------------------------------------------------------------------------------------------
 * Integer
 * -----------------------------------------------------------------------------------------------*/

export const IntegerSchema = Common.pipe(S.extend(S.struct({
  type: S.literal("integer"),
  enum: S.optional(S.array(S.number.pipe(S.int()))),
})));

export type IntegerSchema = S.To<typeof IntegerSchema>;

/* -------------------------------------------------------------------------------------------------
 * Number
 * -----------------------------------------------------------------------------------------------*/

const NumberFormatOptions = S.union(
  S.literal("currency"),
  S.literal("currency shorthand"),
);

export const NumberSchema = Common.pipe(S.extend(S.struct({
  type: S.literal("number"),
  enum: S.optional(S.array(S.number)),
  format: S.optional(NumberFormatOptions),
})));

export type NumberSchema = S.To<typeof NumberSchema>;

/* -------------------------------------------------------------------------------------------------
 * String
 * -----------------------------------------------------------------------------------------------*/

export const StringSchema = Common.pipe(S.extend(S.struct({
  type: S.literal("string"),
  enum: S.optional(S.array(S.string)),
})));

export type StringSchema = S.To<typeof StringSchema>;

/* -------------------------------------------------------------------------------------------------
 * $ref
 * -----------------------------------------------------------------------------------------------*/

export const RefSchema = Common.pipe(S.extend(S.struct({
  $ref: S.string,
})));

export type RefSchema = S.To<typeof RefSchema>;

/* -------------------------------------------------------------------------------------------------
 * Array
 * -----------------------------------------------------------------------------------------------*/

export interface ArraySchema extends Common {
  type: "array";
  items: JsonSchema;
}

export const ArraySchema: S.Schema<ArraySchema> = S.lazy(() =>
  Common.pipe(S.extend(S.struct({
    type: S.literal("array"),
    items: JsonSchema,
  })))
);

/* -------------------------------------------------------------------------------------------------
 * Json
 * -----------------------------------------------------------------------------------------------*/

export type JsonSchema =
  | BooleanSchema
  | NumberSchema
  | IntegerSchema
  | StringSchema
  | ObjectSchema
  | RefSchema
  | ArraySchema;

export const JsonSchema: S.Schema<JsonSchema> = S.lazy(() =>
  S.union(
    BooleanSchema,
    NumberSchema,
    IntegerSchema,
    StringSchema,
    ObjectSchema,
    RefSchema,
    ArraySchema,
  )
);

/* -------------------------------------------------------------------------------------------------
 * Properties
 * -----------------------------------------------------------------------------------------------*/

const Properties = S.record(S.string, JsonSchema).pipe(
  S.filter((o) => Object.keys(o).length > 0),
);

type Properties = S.To<typeof Properties>;

/* -------------------------------------------------------------------------------------------------
 * $defs
 * -----------------------------------------------------------------------------------------------*/

const Defs = S.record(S.string, JsonSchema);
type Defs = S.To<typeof Defs>;

/* -------------------------------------------------------------------------------------------------
 * Object
 * -----------------------------------------------------------------------------------------------*/

export interface ObjectSchema extends Common {
  type: "object";
  $id: string;
  properties: S.To<typeof Properties>;
  $defs?: Defs;
  // lindy specific...
  $displayColumn?: string;
  $route?: string;
  $searchRoute?: string;
  $url?: string;
}

export const ObjectSchema: S.Schema<ObjectSchema> = S.lazy(() =>
  Common.pipe(S.extend(S.struct({
    type: S.literal("object"),
    $id: S.string,
    properties: Properties,
    $defs: S.optional(S.record(S.string, JsonSchema)),
    $route: S.optional(S.string),
    $searchRoute: S.optional(S.string),
    $url: S.optional(S.string),
    $displayColumn: S.optional(S.string),
  })))
);
