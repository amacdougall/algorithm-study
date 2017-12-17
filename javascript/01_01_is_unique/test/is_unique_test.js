const Unique = require("../src/is_unique");
const assert = require("assert");

describe("testing uniqueness of characters within a string", function() {
  describe("using a naive implementation", function() {
    testUniquenessWith(Unique.naive);
  });

  describe("using a CPU-optimized implementation", function() {
    testUniquenessWith(Unique.fast);
  });

  describe("using a RAM-optimized implementation", function() {
    testUniquenessWith(Unique.compact);
  });
});

function testUniquenessWith(f) {
  it("should pass the empty string", function() {
    assert.ok(f(""));
  });

  it("should pass strings of unique characters", function() {
    assert(f("a"));
    assert(f("ba"));
    assert(f("abc"));
  });

  it("should fail strings with contiguous repeated characters", function() {
    assert(!f("aa"));
  });

  it("should fail strings with non-contiguous repeated characters", function() {
    assert(!f("aba"));
  });
}
