const assert = require("assert");
const constructBinaryTree = require("../src/construct_binary_tree");

describe("when given an empty list", function() {
  it("root node should be null", function() {
    const numbers = [];
    const rootNode = constructBinaryTree(numbers);
    assert(rootNode == null);
  });
});

describe("when given a list of one number", function() {
  const numbers = [1];
  const rootNode = constructBinaryTree(numbers);

  it("should be that number", function() {
    assert(rootNode.value === 1);
  });

  it("should have no subtrees", function() {
    assert(rootNode.left == null && rootNode.right == null);
  });
});

describe("when given a simple list", function() {
  const numbers = [1, 2, 3];
  const rootNode = constructBinaryTree(numbers);
  const expected = {
    value: 2,
    left: {value: 1, left: null, right: null},
    right: {value: 3, left: null, right: null}
  };

  it("should return a balanced tree", function() {
    assert.deepEqual(rootNode, expected);
  });
});

describe("when given a simple unbalanced list", function() {
  const numbers = [1, 2];
  const rootNode = constructBinaryTree(numbers);
  // This test case has two possible valid results; accept either.
  const validResults = [{
    value: 2,
    left: {value: 1, left: null, right: null},
    right: null
  },
  {
    value: 1,
    left: {value: 2, left: null, right: null},
    right: null
  }];

  it("should return a balanced tree", function() {
    assert(
      (rootNode.value === 2 && rootNode.left.value === 1) ||
      (rootNode.value === 1 && rootNode.right.value === 2)
    );
  });
});

describe("when given a list of even length", function() {
  const numbers = [1, 2, 3, 4];
  const rootNode = constructBinaryTree(numbers);
  // pivot index will be 2, making the number 3 the root value
  const expected = {
    value: 3,
    left: {
      value: 2,
      left: {value: 1, left: null, right: null},
      right: null
    },
    right: {
      value: 4,
      left: null,
      right: null
    }
  };

  it("should return a balanced tree", function() {
    assert.deepEqual(rootNode, expected);
  });
});

// We could test a 7-element array, but these tests will guarantee bottom-up
// correctness.
