import { fromCamelcase, toCamelcase } from ".";

describe("toCamelcase()", () => {
  describe("fromKebab()", () => {
    it("should handle the transformation", () => {
      expect(
        toCamelcase("adam-maria-imogen").fromKebab()
      ).toMatchInlineSnapshot(`"adamMariaImogen"`);
    });
  });

  describe("fromSnake()", () => {
    it("should handle the transformation", () => {
      expect(
        toCamelcase("adam_maria_imogen").fromSnake()
      ).toMatchInlineSnapshot(`"adamMariaImogen"`);
    });
  });
});

describe("fromCamelcase()", () => {
  describe("toKebab()", () => {
    it("should handle the transformation", () => {
      expect(fromCamelcase("adamMariaImogen").toKebab()).toMatchInlineSnapshot(
        `"adam-maria-imogen"`
      );
    });
  });

  describe("toSnake()", () => {
    it("should handle the transformation", () => {
      expect(fromCamelcase("adamMariaImogen").toSnake()).toMatchInlineSnapshot(
        `"adam_maria_imogen"`
      );
    });
  });
});
