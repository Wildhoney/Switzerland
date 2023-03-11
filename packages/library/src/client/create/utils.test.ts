import {
  dispatchEvent,
  getAttributes,
  hasApplicableMutations,
} from "./utils.js";

describe("getAttributes()", () => {
  it("should be able to parse the attributes from a node", () => {
    const section = document.createElement("section");
    section.setAttribute("name", "Adam");
    section.setAttribute("partners-name", "Maria");
    section.setAttribute("daughters-name", "Imogen");

    expect(getAttributes(section.attributes)).toMatchInlineSnapshot(`
      {
        "daughtersName": "Imogen",
        "name": "Adam",
        "partnersName": "Maria",
      }
    `);
  });
});

describe("dispatchEvent()", () => {
  it("should be able to dispatch events with payload object", () => {
    const node = document.createElement("section");
    const spy = jest.spyOn(node, "dispatchEvent");
    dispatchEvent(node)("update-name", { name: "Imogen" });
    expect(spy).toHaveBeenCalled();
  });
});

describe("hasApplicableMutations()", () => {
  it.each`
    input      | output
    ${"Adam"}  | ${true}
    ${"Maria"} | ${false}
  `(
    'should be able to determine when there is an applicable mutation for "$input"',
    ({ input, output }) => {
      const node = document.createElement("div");
      node.setAttribute("name", "Maria");
      const mutations = [{ attributeName: "name", oldValue: input }];
      expect(
        hasApplicableMutations(node, mutations as MutationRecord[])
      ).toEqual(output);
    }
  );
});
