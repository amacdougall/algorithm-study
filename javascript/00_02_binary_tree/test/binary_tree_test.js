const BinaryTree = require("../src/binary_tree.js");
const assert = require("assert");

describe("creating a binary tree, providing only a value", function() {
  beforeEach(function() {
    this.binaryTree = new BinaryTree({value: "alpha"});
  });

  it("has the identity key function", function() {
    assert.equal("beta", this.binaryTree.keyFunction("beta"));
  });

  it("stores the value", function() {
    assert.equal(this.binaryTree.value, "alpha");
  });

  it("stores the value under an identity key", function() {
    assert.equal(this.binaryTree.key, this.binaryTree.value);
  });

  it("has no branches", function() {
    assert.equal(null, this.binaryTree.left);
    assert.equal(null, this.binaryTree.right);
  });
});

describe("creating a binary tree with a key and a value", function() {
  beforeEach(function() {
    this.binaryTree = new BinaryTree({key: "a", value: "alpha"});
  });

  it("has the identity key function", function() {
    assert.equal("beta", this.binaryTree.keyFunction("beta"));
  });

  it("stores the value", function() {
    assert.equal(this.binaryTree.value, "alpha");
  });

  it("stores the value under the explicit key", function() {
    assert.equal("a", this.binaryTree.key);
  });

  it("has no branches", function() {
    assert.equal(null, this.binaryTree.left);
    assert.equal(null, this.binaryTree.right);
  });
});

describe("creating a binary tree with a key function and a value", function() {
  beforeEach(function() {
    this.binaryTree = new BinaryTree({
      keyFunction: v => v.id,
      value: {id: 10, fruit: "apple"}
    });
  });

  it("has a custom key function", function() {
    assert.equal(5, this.binaryTree.keyFunction({id: 5, fruit: "fig"}));
  });

  it("stores the value", function() {
    assert.deepEqual({id: 10, fruit: "apple"}, this.binaryTree.value);
  });

  it("stores the value under the derived key", function() {
    assert.equal(10, this.binaryTree.key);
  });

  it("has no branches", function() {
    assert.equal(null, this.binaryTree.left);
    assert.equal(null, this.binaryTree.right);
  });
});

describe("inserting into a binary tree with no key function", function() {
  beforeEach(function() {
    this.binaryTree = new BinaryTree({
      value: "alpha"
    });
  });

  it("should insert greater keys to the right", function() {
    this.binaryTree.insert({value: "beta"});
    assert.ok(this.binaryTree.right);
    assert.equal(this.binaryTree.right.value, "beta");
  });

  it("should insert lesser keys to the left", function() {
    this.binaryTree.insert({value: "abacus"});
    assert.ok(this.binaryTree.left);
    assert.equal(this.binaryTree.left.value, "abacus");
  });
});

describe("inserting into a binary tree with a key function", function() {
  beforeEach(function() {
    this.binaryTree = new BinaryTree({
      keyFunction: v => v.length,
      value: "dog"
    });
  });

  it("should update if key function result is the same", function() {
    this.binaryTree.insert({value: "cat"});
    assert.equal(null, this.binaryTree.right);
    assert.equal(null, this.binaryTree.left);
    assert.equal("cat", this.binaryTree.value);
  });

  it("should insert at a position based on the key function", function() {
    // earlier by alpha; later by length
    let value = "aardvark";
    this.binaryTree.insert({value: value});
    assert.ok(this.binaryTree.right);
    assert.equal(value.length, this.binaryTree.right.key);
    assert.equal(value, this.binaryTree.right.value);

    // later by alpha, earlier by length
    value = "ox";
    this.binaryTree.insert({value: value});
    assert.ok(this.binaryTree.left);
    assert.equal(value.length, this.binaryTree.left.key);
    assert.equal(value, this.binaryTree.left.value);
  });

  it("should copy the key function to the child node", function() {
    this.binaryTree.insert({value: "tiger"});
    assert.ok(this.binaryTree.right);
    assert.equal(this.binaryTree.keyFunction, this.binaryTree.right.keyFunction);
  });
});

describe("inserting into a binary tree with an explicit key", function() {
  beforeEach(function() {
    this.binaryTree = new BinaryTree({
      key: 10,
      value: "dog"
    });
  });

  it("should insert at a position based on the key", function() {
    this.binaryTree.insert({key: 20, value: "cat"});
    assert.ok(this.binaryTree.right);
    assert.equal(20, this.binaryTree.right.key);
    assert.equal("cat", this.binaryTree.right.value);

    this.binaryTree.insert({key: 5, value: "iguana"});
    assert.ok(this.binaryTree.left);
    assert.equal(5, this.binaryTree.left.key);
    assert.equal("iguana", this.binaryTree.left.value);
  });
});

describe("inserting at the root of a complex binary tree", function() {
  beforeEach(function() {
    this.binaryTree = new BinaryTree({
      keyFunction: v => v.id,
      value: {id: 50, name: "root"}
    });
  });

  it("should grow to the left when inserting lower keys", function() {
    this.binaryTree.insert({value: {id: 25, name: "01_left"}});
    this.binaryTree.insert({value: {id: 15, name: "02_left"}});
    this.binaryTree.insert({value: {id: 5, name: "03_left"}});

    assert.ok(this.binaryTree.left.left.left);
    assert.equal(5, this.binaryTree.left.left.left.key);
  });

  it("should grow to the right when inserting higher keys", function() {
    this.binaryTree.insert({value: {id: 75, name: "01_right"}});
    this.binaryTree.insert({value: {id: 85, name: "02_right"}});
    this.binaryTree.insert({value: {id: 95, name: "03_right"}});

    assert.ok(this.binaryTree.right.right.right);
    assert.equal(95, this.binaryTree.right.right.right.key);
  });

  it("should zigzag when inserting into the middle of the range", function() {
    this.binaryTree.insert({value: {id: 40, name: "01_middle"}});
    this.binaryTree.insert({value: {id: 45, name: "02_middle"}});
    this.binaryTree.insert({value: {id: 42, name: "03_middle"}});

    assert.ok(this.binaryTree.left.right.left);
    assert.equal(42, this.binaryTree.left.right.left.key);
  });
});

describe("getting from a binary tree by key", function() {
  beforeEach(function() {
    this.binaryTree = new BinaryTree({
      keyFunction: v => v.id,
      value: {id: 50, name: "root"}
    });


    this.binaryTree.insert({value: {id: 25, name: "01_left"}});
    this.binaryTree.insert({value: {id: 15, name: "02_left"}});
    this.binaryTree.insert({value: {id: 5, name: "03_left"}});

    this.binaryTree.insert({value: {id: 75, name: "01_right"}});
    this.binaryTree.insert({value: {id: 85, name: "02_right"}});
    this.binaryTree.insert({value: {id: 95, name: "03_right"}});

    this.binaryTree.insert({value: {id: 40, name: "01_middle"}});
    this.binaryTree.insert({value: {id: 45, name: "02_middle"}});
    this.binaryTree.insert({value: {id: 42, name: "03_middle"}});
  });

  it("should get the root value by key", function() {
    let result = this.binaryTree.get(50);
    assert.ok(result);
    assert.equal("root", result.name);
  });

  it("should get left-hand values", function() {
    let result = this.binaryTree.get(25);
    assert.ok(result);
    assert.equal("01_left", result.name);

    result = this.binaryTree.get(15);
    assert.ok(result);
    assert.equal("02_left", result.name);

    result = this.binaryTree.get(5);
    assert.ok(result);
    assert.equal("03_left", result.name);
  });

  it("should get right-hand values", function() {
    let result = this.binaryTree.get(75);
    assert.ok(result);
    assert.equal("01_right", result.name);

    result = this.binaryTree.get(85);
    assert.ok(result);
    assert.equal("02_right", result.name);

    result = this.binaryTree.get(95);
    assert.ok(result);
    assert.equal("03_right", result.name);
  });

  it("should get middle values", function() {
    let result = this.binaryTree.get(40);
    assert.ok(result);
    assert.equal("01_middle", result.name);

    result = this.binaryTree.get(45);
    assert.ok(result);
    assert.equal("02_middle", result.name);

    result = this.binaryTree.get(42);
    assert.ok(result);
    assert.equal("03_middle", result.name);
  });
});
