import * as S from "@effect/schema/Schema";

import {
  ArrayRefSchema,
  ArraySchema,
  JsonSchema,
  NumberSchema,
  ObjectSchema,
  RefSchema,
  StringSchema,
} from "./schema";

/* -------------------------------------------------------------------------------------------------
 * Refinements
 * -----------------------------------------------------------------------------------------------*/

export const isNumberSchema = (schema: JsonSchema): schema is NumberSchema =>
  S.is(NumberSchema)(schema);

export const isStringSchema = (schema: JsonSchema): schema is StringSchema =>
  S.is(StringSchema)(schema);

export const isArraySchema = (schema: JsonSchema): schema is ArraySchema =>
  S.is(ArraySchema)(schema);

export const isArrayRefSchema = (
  schema: JsonSchema,
): schema is ArrayRefSchema => S.is(ArraySchema)(schema);

export const isObjectSchema = (schema: JsonSchema): schema is ObjectSchema =>
  S.is(ObjectSchema)(schema);

export const isRefSchema = (schema: JsonSchema): schema is RefSchema =>
  S.is(RefSchema)(schema);

export function hasProperty(
  key: string,
  schema: ObjectSchema,
): schema is ObjectSchema & {
  properties: { [key: string]: JsonSchema };
} {
  return key in schema.properties;
}

/* -------------------------------------------------------------------------------------------------
 * misc predicates
 * -----------------------------------------------------------------------------------------------*/

export const PrimitiveTypeSchema = S.union(
  StringSchema,
  NumberSchema,
  ObjectSchema,
);

export type PrimitiveTypeSchema = S.To<typeof PrimitiveTypeSchema>;

export const isPrimitiveTypeSchema = (
  schema: JsonSchema,
): schema is PrimitiveTypeSchema => S.is(PrimitiveTypeSchema)(schema);

const HasEnum = S.union(
  StringSchema,
  NumberSchema,
);

type HasEnum = S.To<typeof HasEnum>;

export const hasEnum = (schema: JsonSchema): schema is HasEnum =>
  isNumberSchema(schema) || isStringSchema(schema);
