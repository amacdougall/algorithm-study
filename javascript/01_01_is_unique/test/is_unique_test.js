const isUnique = require("../src/is_unique");
const assert = require("assert");

describe("isUnique", function() {
  it("should pass the empty string", function() {
    assert.ok(isUnique(""));
  });

  it("should pass strings of unique characters", function() {
    assert(isUnique("a"));
    assert(isUnique("ba"));
    assert(isUnique("abc"));
  });

  it("should fail strings with contiguous repeated characters", function() {
    assert(!isUnique("aa"));
  });

  it("should fail strings with non-contiguous repeated characters", function() {
    assert(!isUnique("aba"));
  });
});
