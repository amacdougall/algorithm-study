const HashTable = require("../src/hash_table");
const hashCode = require("../src/hash_code"); // white-box testing
const assert = require("assert");

describe("testing a hash table", function() {
  beforeEach(function() {
    this.hashTable = new HashTable();
  });

  it("can set and get a value under a string key", function() {
    assert.doesNotThrow(() => this.hashTable.set("a", 1), TypeError);
    assert.equal(1, this.hashTable.get("a"));
  });

  it("can get and set a value under a string key whose hash code is greater than the bucket count", function() {
    let key = "alphabetize";
    assert(this.hashTable.hashCode(key) > this.hashTable.bucketCount);
    assert.doesNotThrow(() => this.hashTable.set(key, 1), Error);
    assert.equal(1, this.hashTable.get(key));
  });

  it("can store multiple values with the same hash code", function() {
    this.hashTable.hashCode = string => 0; // guarantee hash collisions
    assert.doesNotThrow(() => this.hashTable.set("a", 1), Error);
    assert.doesNotThrow(() => this.hashTable.set("b", 2), Error);
    let filledBuckets = this.hashTable.buckets.filter(b => b !== undefined);
    assert.equal(filledBuckets.length, this.hashTable.bucketsUsed);
    assert.equal(1, filledBuckets.length);
    assert.equal(2, filledBuckets[0].length); // two entries in this bucket
    assert.equal(1, this.hashTable.get("a"));
    assert.equal(2, this.hashTable.get("b"));
  });

  it("increases bucket count when utilization reaches 75%", function() {
    this.hashTable.bucketCount = 4;
    // guarantee unique codes
    this.hashTable.hashCode = string => string.charCodeAt(0);
    this.hashTable.set("a", 1);
    this.hashTable.set("b", 2);
    assert.equal(4, this.hashTable.bucketCount);
    this.hashTable.set("c", 3);
    assert.equal(8, this.hashTable.bucketCount);

    // demonstrate that we can get values from the rehashed table
    assert.equal(1, this.hashTable.get("a"));
    assert.equal(2, this.hashTable.get("b"));
  });

  it("throws an error when storing a value under a non-string key", function() {
    assert.throws(() => this.hashTable.set(1, 1), TypeError);
  });
});
