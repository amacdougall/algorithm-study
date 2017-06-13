const isPalindromePermutation = require("../src/is_palindrome_permutation");
const assert = require("assert");

describe("isPalindromePermutation", function() {
  it("should return correct results for degenerate cases", function() {
    // Since empty and single-character strings are the same when reversed,
    // they are technically palindromes
    assert(isPalindromePermutation(""), "zero-length strings are palindromes");
    assert(isPalindromePermutation("a"), "single-character strings are palindromes");
  });

  it("should detect palindrome permutations", function() {
    assert(isPalindromePermutation("aab"));
    assert(isPalindromePermutation("baba"));
    assert(isPalindromePermutation("cbaab"));
    assert(!isPalindromePermutation("ab"));
    assert(!isPalindromePermutation("aabbcd"));
  });
});
