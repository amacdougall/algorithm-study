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

  /**
   * Removes the supplied value, or the value with the supplied key. Throws
   * Error if neither a key nor a value is supplied.
   *
   * @param {*} [options.value] - The value to remove.
   * @param {*} [options.key] - An explicit key for the value to be removed.
   *
   * @return {*} The value which was removed, or null if no value was found.
   */
  remove({value = null, key = null}) {
    if (!(value || key)) {
      throw new Error("BinaryTree.remove was called without a value or a key.");
    }

    key = key || this.keyFunction(value);

    if (this.key === key) {
      // The root node is targeted for deletion! Simply null out the value.
      // This is a special case. In all other cases, node.remove will affect
      // its child tree.
      this.value = null;
      return this.value;
    } else {
      let branch = (key < this.key) ? "left" : "right";

      if (!this[branch]) {
        // no node with this key exists
        return null;
      } else {
        // deletion target found
        if (this[branch].key === key) {
          if (this[branch].left == null && this[branch].right == null) {
            // if child has no branches, null out the child
            this[branch] = null;
          }
          // TODO: handle more cases
        } else {
          // recursively attempt to delete this key within target branch
          this[branch].remove({key});
        }
      } 
    }
  }
}

// Client code will require this as BinaryTree; this is fine.
module.exports = TreeNode;
