/**
 * A binary tree implementation. More accurately, the root node of a tree whose
 * nodes are all BinaryTree instances.
 *
 * Values are marked by keys, which must be comparable with < and >. If the
 * values themselves are not comparable, provide comparable keys explicitly or
 * by providing a key function. NOTE: Strings are comparable in alphabetical
 * order, so they are acceptable keys.
 *
 * @param {Object} [options.key] - An explicit key to use for value retrieval.
 * If absent, the key function will be used.
 * @param {*} options.value - A value to store at this node of the tree.
 * @param {Function} [options.keyFunction] - A function which produces a key
 * when performed on a value. If absent, the identity function will be used.
 */
class TreeNode {
  constructor({key = null, value, keyFunction = null}) {
    // this.keyFunction = keyFunction || v => v; doesn't parse. JS!
    if (keyFunction) {
      this.keyFunction = keyFunction;
    } else {
      this.keyFunction = v => v;
    }

    this.value = value;
    this.key = key || this.keyFunction(value);
    this.right = null;
    this.left = null;
  }

  /**
   * Retrieves the value with the supplied key, or null.
   */
  get(key) {
    if (this.key === key) {
      return this.value;
    } else {
      let branch = key < this.key ? "left" : "right";
      return this[branch] ? this[branch].get(key) : null;
    }
  }

  insert({key = null, value}) {
    key = key || this.keyFunction(value);

    if (this.key == key) {
      this.value = value;
    } else {
      let branch = (key < this.key) ? "left" : "right";

      if (this[branch]) {
        this[branch].insert({key: key, value: value});
      } else {
        this[branch] = new TreeNode({
          value: value,
          key: key,
          keyFunction: this.keyFunction
        });
      }
    }
  }
}

// Client code will require this as BinaryTree; this is fine.
module.exports = TreeNode;
