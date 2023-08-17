import { isStringSchema, JsonSchema } from "../src";

const schema: JsonSchema = {
  type: "string",
  enum: ["foo", "bar"],
};

describe("StringSchema", () => {
  it("should be a string", () => {
    expect(isStringSchema(schema)).toBe(true);
  });
});
