import {
  // Array,
  BigInt,
  Bool,
  Date,
  Float,
  Int,
  // Regex,
  // Tuple,
} from "./index.js";

describe("Int()", () => {
  it.each`
    input        | output
    ${"1"}       | ${1}
    ${"1000"}    | ${1_000}
    ${"1000.50"} | ${1000}
    ${"1000000"} | ${1_000_000}
    ${"Imogen"}  | ${null}
  `(
    'should be able to convert strings to numbers "$input" → "$output"',
    ({ input, output }) => {
      expect(Int(input)).toEqual(output);
    }
  );
});

describe("BigInt()", () => {
  it.each`
    input        | output
    ${"1"}       | ${1n}
    ${"1000"}    | ${1_000n}
    ${"1000.50"} | ${null}
    ${"Imogen"}  | ${null}
  `(
    'should be able to convert strings to BigInt "$input" → "$output"',
    ({ input, output }) => {
      expect(BigInt(input)).toEqual(output);
    }
  );
});

describe("Float()", () => {
  it.each`
    input       | output
    ${"1"}      | ${1}
    ${"100.50"} | ${100.5}
    ${"Imogen"} | ${null}
  `(
    'should be able to convert strings to Float "$input" → "$output"',
    ({ input, output }) => {
      expect(Float(input)).toEqual(output);
    }
  );
});

describe("Float.DP()", () => {
  it.each`
    input               | options                 | output
    ${"1"}              | ${{ decimalPlaces: 2 }} | ${1.0}
    ${"100.51"}         | ${{ decimalPlaces: 1 }} | ${100.5}
    ${"100.59"}         | ${{ decimalPlaces: 1 }} | ${100.6}
    ${"100.1234567890"} | ${{ decimalPlaces: 5 }} | ${100.12346}
    ${"Imogen"}         | ${{ decimalPlaces: 2 }} | ${null}
  `(
    'should be able to convert strings to Float.DP(𝑥) "$input" → "$output"',
    ({ input, options, output }) => {
      expect(Float.DP(options.decimalPlaces)(input)).toEqual(output);
    }
  );
});

describe("Bool()", () => {
  it.each`
    input       | output
    ${""}       | ${true}
    ${"1"}      | ${true}
    ${"true"}   | ${true}
    ${"on"}     | ${true}
    ${"yes"}    | ${true}
    ${"0"}      | ${false}
    ${"false"}  | ${false}
    ${"off"}    | ${false}
    ${"no"}     | ${false}
    ${"Imogen"} | ${null}
  `(
    'should be able to convert strings to Boolean "$input" → "$output"',
    ({ input, output }) => {
      expect(Bool(input)).toEqual(output);
    }
  );
});

describe("Date()", () => {
  it.each`
    input           | output
    ${"1985/10/10"} | ${new global.Date(global.Date.parse("1985/10/10"))}
    ${"10-10-1985"} | ${new global.Date(global.Date.parse("1985/10/10"))}
    ${"Imogen"}     | ${null}
  `(
    'should be able to convert strings to Date "$input" → "$output"',
    ({ input, output }) => {
      expect(Date(input)).toEqual(output);
    }
  );
});

// describe("Array()", () => {
//   it.each`
//     input                  | options             | output
//     ${"Imogen"}            | ${{ type: String }} | ${["Imogen"]}
//     ${"Adam,Maria,Imogen"} | ${{ type: String }} | ${["Adam", "Maria", "Imogen"]}
//     ${"1,2,3"}             | ${{ type: Int }}    | ${[1, 2, 3]}
//     ${"1,0,on"}            | ${{ type: Bool }}   | ${[true, false, true]}
//     ${"Imogen"}            | ${{ type: Int }}    | ${[null]}
//   `(
//     'should be able to convert strings to Array(𝑥) "$input" → "$output"',
//     ({ input, options, output }) => {
//       expect(Array(options.type)(input)).toEqual(output);
//     }
//   );
// });

// describe("Tuple()", () => {
//   it.each`
//     input              | options                           | output
//     ${"Adam,36,true"}  | ${{ types: [String, Int, Bool] }} | ${["Adam", 36, true]}
//     ${"Imogen,2,true"} | ${{ types: [Int, Int, Bool] }}    | ${[null, 2, true]}
//   `(
//     'should be able to convert strings to Tuple(…𝑥) "$input" → "$output"',
//     ({ input, options, output }) => {
//       expect(Tuple(...options.types)(input)).toEqual(output);
//     }
//   );
// });

// describe("Regex()", () => {
//   it.each`
//     input           | options                                                       | output
//     ${"27.07.2020"} | ${{ expression: /(?<day>\d+)\.(?<month>\d+)\.(?<year>\d+)/ }} | ${{ day: "27", month: "07", year: "2020" }}
//     ${"27.07.2020"} | ${{ expression: /(?<day>\d+)|(?<month>\d+)|(?<year>\d+)/ }}   | ${{ day: "27", month: null, year: null }}
//     ${"27.07.2020"} | ${{ expression: /.+/ }}                                       | ${{}}
//   `(
//     'should be able to convert strings to Regex "$input" → "$output"',
//     ({ input, options, output }) => {
//       expect(Regex(options.expression)(input)).toEqual(output);
//     }
//   );
// });
