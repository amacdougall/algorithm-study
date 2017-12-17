class Unique {
  /** Returns true if every character in the supplied string is unique. */
  // NOTE: this is a naive implementation. It may perform perfectly well, given
  // the intense optimization efforts that have gone into the leading JS
  // runtimes; but it is the first thing that came to mind.
  static naive(string) {
    let known = [];
    return !string.split("").some(character => {
      // suboptimial because this lookup scans all previous characters on each
      // iteration: a classic O(n^2) runtime.
      if (known.indexOf(character) >= 0) {
        return true;
      } else {
        known.push(character);
        return false;
      }
    });
  }

  /** Returns true if every character in the supplied string is unique. */
  // NOTE: This implementation minimizes CPU time at the expense of maintaining
  // a hash.
  static fast(string) {
    let known = {};
    // identical to the naive algorithm, but the lookup is O(n)
    return !string.split("").some(character => {
      if (known[character]) {
        return true;
      } else {
        known[character] = true;
        return false;
      }
    });
  }

  /** Returns true if every character in the supplied string is unique. */
  // NOTE: This implementation attempts to minimize RAM consumption, but
  // runs in amortized O(2n) time because it checks n - index characters
  // per iteration, ranging from n - 1 to 1, averaging n / 2.
  static compact(string) {
    /* Considering each character in turn, compare that character with each
     * subsequent character. If any subsequent character matches the character
     * under consideration, return false. If all characters have been considered
     * without incident, return true.
     *
     * Empty or single-element strings will be covered adequately by the
     * structure of the iterative solution.
     */
    for (let index = 0; index < string.length; index++) {
      for (let subIndex = index + 1; subIndex < string.length; subIndex++) {
        if (string.charAt(index) === string.charAt(subIndex)) {
          return false;
        }
      }
    }
    return true;
  }
};

module.exports = Unique;
