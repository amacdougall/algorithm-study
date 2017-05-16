const isPermutation = require("../src/is_permutation");
const assert = require("assert");

describe("isPermutation", function() {
  it("should return correct results for degenerate cases", function() {
    // equality covers the empty string as well
    assert(isPermutation("a", "a"), "equal strings are always permutations");
    assert(!isPermutation("a", "ab"), "strings of different lengths cannot be permutations");
  });

  it("should detect permutations", function() {
    assert(isPermutation("ab", "ba"));
    assert(isPermutation("aab", "baa"));
    assert(!isPermutation("ab", "bc"));
  });
});
