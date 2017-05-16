/**
 * Returns true if string a is a permutation of string b; that is, if it
 * contains the same characters with the same frequency, but in a different
 * order.
 */
function isPermutation(a, b) {
  if (a.length !== b.length) {
    return false;
  } else if (a === b) {
    return true;
  } else {
    let [aFrequency, bFrequency] = [a, b].map(characterFrequency);
    return Object.keys(aFrequency).every(key => {
      return aFrequency[key] === bFrequency[key];
    });
  }
}

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

module.exports = isPermutation;
