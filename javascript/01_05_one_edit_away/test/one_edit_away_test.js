const assert = require("assert");
const isOneEditAway = require("../src/one_edit_away");

describe("is_one_edit_away", function() {
  it("should be true when strings are identical", function() {
    assert(isOneEditAway("", ""));
    assert(isOneEditAway("a", "a"));
  });

  it("should be true when deleting a single character", function() {
    assert(isOneEditAway("a", ""));
    assert(isOneEditAway("doge", "dog"));
    assert(isOneEditAway("apple", "pple"));
  });

  it("should be true when changing a single character", function() {
    assert(isOneEditAway("a", "b"));
    assert(isOneEditAway("dog", "bog"));
    assert(isOneEditAway("cat", "cap"));
  });

  it("should be true when adding a single character", function() {
    assert(isOneEditAway("", "a"));
    assert(isOneEditAway("cut", "cute"));
    assert(isOneEditAway("tray", "stray"));
  });

  it("should be false when adding or deleting too many characters", function() {
    assert(!isOneEditAway("a", "ant"), "'a' and 'ant' should be too far away.");
    assert(!isOneEditAway("tent", "e"), "'tent' and 'e' should be too far away.");
  });

  it("should be false when changing too many characters", function() {
    assert(!isOneEditAway("drum", "cram"));
  });

  it("should be false when order changes", function() {
    assert(!isOneEditAway("abc", "ca"));
    assert(!isOneEditAway("ab", "cba"));
    assert(!isOneEditAway("abc", "cbx"));
  });
});
