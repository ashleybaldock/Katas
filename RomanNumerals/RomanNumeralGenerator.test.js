import RomanNumeralGenerator from './RomanNumeralGenerator';

let generate = (new RomanNumeralGenerator).generate;

/*
 * I approached this by writing tests to implement the minimum amount of 
 * functionality at each stage, writing code to satisfy that test, and
 * then refactoring the tests/code (the 3-stage red/green/refactor technique)
 *
 * Each set of tests represents an incremental increase in algorithm complexity.
 *
 * I also ended up thinking of a second way to approach this which I've documented
 */

/*
 * Out of range
 * - Not explicitly defined in the interface but exceptions seem sensible here
 */
test.each`
  input
  ${0}
  ${-1}
  ${-100}
  ${4000}
  ${4999}
`('throws on input: $input', ({input}) => {
  let testCall = () => {
    generate(input);
  };
  expect(testCall).toThrowError(RangeError);
  expect(testCall).toThrowError(/^The argument must be between 1 and 3999.$/);
});

/*
 * Ones
 * - You can do this using a switch statement, but an indexed lookup table is
 *   less branching
 */
test.each`
  input | expected
  ${1}  | ${'I'}
  ${2}  | ${'II'}
  ${3}  | ${'III'}
  ${4}  | ${'IV'}
  ${5}  | ${'V'}
  ${6}  | ${'VI'}
  ${7}  | ${'VII'}
  ${8}  | ${'VIII'}
  ${9}  | ${'IX'}
`('ones: returns $expected for input $input', ({input, expected}) => {
  expect(generate(input)).toEqual(expected);
});

/*
 * Tens
 * - I got it to work for each grouping alone first
 */
test.each`
  input | expected
  ${10} | ${'X'}
  ${20} | ${'XX'}
  ${30} | ${'XXX'}
  ${40} | ${'XL'}
  ${50} | ${'L'}
  ${60} | ${'LX'}
  ${70} | ${'LXX'}
  ${80} | ${'LXXX'}
  ${90} | ${'XC'}
`('tens: returns $expected for input $input', ({input, expected}) => {
  expect(generate(input)).toEqual(expected);
});

// Hundreds
test.each`
   input | expected
  ${100} | ${'C'}
  ${200} | ${'CC'}
  ${300} | ${'CCC'}
  ${400} | ${'CD'}
  ${500} | ${'D'}
  ${600} | ${'DC'}
  ${700} | ${'DCC'}
  ${800} | ${'DCCC'}
  ${900} | ${'CM'}
`('hundreds: returns $expected for input $input', ({input, expected}) => {
  expect(generate(input)).toEqual(expected);
});

// Thousands
test.each`
    input | expected
  ${1000} | ${'M'}
  ${2000} | ${'MM'}
  ${3000} | ${'MMM'}
`('thousands: returns $expected for input $input', ({input, expected}) => {
  expect(generate(input)).toEqual(expected);
});

/*
 * Combinations
 * - Final bit of additional logic involved combining the previous outputs
 *   At this point the final step seemed obvious, so I added test cases to
 *   cover a variety of combinations
 */
test.each`
    input | expected
  ${11} | ${'XI'}
  ${222} | ${'CCXXII'}
  ${999} | ${'CMXCIX'}
  ${2834} | ${'MMDCCCXXXIV'}
  ${555} | ${'DLV'}
  ${3999} | ${'MMMCMXCIX'}
  ${3888} | ${'MMMDCCCLXXXVIII'}
  ${444} | ${'CDXLIV'}
  ${1555} | ${'MDLV'}
`('combinations: returns $expected for input $input', ({input, expected}) => {
  expect(generate(input)).toEqual(expected);
});
