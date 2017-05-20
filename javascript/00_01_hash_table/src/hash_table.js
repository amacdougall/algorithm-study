const hashCode = require("./hash_code");

class HashTable {
  /**
   * Given a JavaScript object, create a new HashTable instance with those
   * key-value pairs. Keys must be strings. Hash code is a mutable property for
   * ease of white-box testing, since I'm implementing this for my own
   * edification to begin with.
   */
  constructor(hash = null) {
    this.hashCode = hashCode;
    this.bucketCount = 100;
    this.bucketsUsed = 0;

    /* NOTE: each bucket contains an array of [key, value] entries at this hash
     * code. A traditional C implementation would use a linked list, but we
     * don't have to reinvent every wheel.
     */
    this.buckets = [];

    if (hash) {
      for (let k in hash) {
        this.set(k, hash[k]);
      }
    }
  }

  get(key) {
    if (typeof(key) !== "string") {
      throw new TypeError(`Key value ${key} was not a string.`);
    } else {
      const bucket = this.buckets[this.hashCode(key) % this.bucketCount];
      if (bucket) {
        const entry = findEntry(bucket, key);
        if (entry) {
          return entry[1]; // bucket value
        }
      }
    }
    return undefined;
  }

  set(key, value) {
    if (typeof(key) !== "string") {
      throw new TypeError(`Key value ${key} was not a string.`);
    } else {
      const code = this.hashCode(key);
      const bucketIndex = code % this.bucketCount;
      if (this.buckets[bucketIndex] === undefined) {
        this.buckets[bucketIndex] = [[key, value]];
      } else {
        const bucket = this.buckets[bucketIndex];
        const entry = findEntry(bucket, key);
        if (entry) {
          entry[1] = value; // replace
        } else {
          bucket.push([key, value]); // append to bucket
        }
      }
    }
  }

  unset(key) {
    // TODO
  }

  keys() {

  }

  values() {

  }

  /**
   * Given a function expecting arguments (k, v), returns an array of elements
   * produced by application of the function to every key-value pair in the
   * hash table.
   */
  map(f) {

  }
}

/**
 * Returns the first bucket entry with the supplied key, or undefined.
 */
function findEntry(bucket, key) {
  return bucket.filter(([k, v]) => k === key)[0];
}

module.exports = HashTable;
