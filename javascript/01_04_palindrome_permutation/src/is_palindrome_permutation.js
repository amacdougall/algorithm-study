/**
 * True if any possible permutation of the supplied string is a palindrome.
 */
function isPalindromePermutation(string) {
  /* If a palindrome's length is even, each distinct character must occur an
   * even number of times. If its length is odd, at most one of the distinct
   * characters may be odd.
   */
  let frequency = characterFrequency(string);
  let oddFrequencies = 0;
  for (let key in frequency) {
    if (frequency[key] % 2 > 0) {
      oddFrequencies += 1;
    }
    if (oddFrequencies > 1) {
      return false;
    }
  }
  return true;
}

/**
 * Returns a hash table of character frequencies.
 */
function characterFrequency(string) {
  let frequency = {};
  for (let i = 0; i < string.length; i++) {
    let character = string.charAt(i);
    if (frequency[character]) {
      frequency[character] += 1;
    } else {
      frequency[character] = 1;
    }
  }
  return frequency;
}

module.exports = isPalindromePermutation;
