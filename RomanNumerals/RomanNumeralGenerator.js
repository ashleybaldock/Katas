
/*
 * 1 5 10 50 100 500 1000
 * I V  X  L   C   D    M
 */

/* Only has to support numbers in the range 1-3999, which is good, since there isn't
 * a particularly well-standardised way to represent numbers outside this range using
 * Roman numerals */
const ones      = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
const tens      = ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'];
const hundreds  = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'];
const thousands = ['', 'M', 'MM', 'MMM'];

/* This is only a class because that's the interface the example asked for
 * I made this file an ES6 module/class */
class RomanNumeralGenerator {
  generate (number) {
    if (number < 1 || number > 3999) {
      throw new RangeError("The argument must be between 1 and 3999.");
    }

    /*
     * You could also do this, but I think it's less efficient than the
     * conversion to a string and indexing
     * Basically you just need to convert each power of 10 into the right
     * numeral representation and then concatenate the strings
     */
    /*return thousands[Math.floor(number / 1000)]
         + hundreds[Math.floor((number % 1000) / 100)]
         + tens[Math.floor((number % 100) / 10)]
         + ones[number % 10];*/

    let padded = number.toString().padStart(4, '0');
    /* You could also do this, if this needed to work in IE for some reason
     * (It is also plausible that doing the padding/conversion from number to string
     * in the same step is more efficient...)
     * let padded = ('000' + number).slice(-4);
     */

    return thousands[padded[0]] + hundreds[padded[1]] + tens[padded[2]] + ones[padded[3]];
  }
}

export default RomanNumeralGenerator;
