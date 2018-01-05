function isEven(n) {
  return n % 2 === 0;
}

function constructBinaryTree(numbers) {
  if (numbers.length === 0) {
    return null;
  } else if (numbers.length === 1) {
    return {
      value: numbers[0],
      left: null,
      right: null
    };
  } else {
    const pivot = Math.floor(numbers.length / 2);
    const left = numbers.slice(0, pivot);
    const right = numbers.slice(pivot + 1);

    return {
      value: numbers[pivot],
      left: constructBinaryTree(left),
      right: constructBinaryTree(right)
    };
  }
};

module.exports = constructBinaryTree;
