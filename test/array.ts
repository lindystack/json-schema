import { isArraySchema, JsonSchema } from "../src";

const schema: JsonSchema = {
  type: "array",
  items: {
    type: "string",
  },
};

describe("ArraySchema", () => {
  it("should be an array", () => {
    expect(isArraySchema(schema)).toBe(true);
  });
});
