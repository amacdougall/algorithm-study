/**
 * True if the two supplied strings are no more than one edit apart.
 */
function isOneEditAway(x, y) {
  // immediately return for trivial cases:
  if (x === y) {
    return true;
  } else if (Math.abs(x.length - y.length) > 1) {
    return false;
  }

  let xIndex = 0;
  let yIndex = 0;
  let faults = 0;

  while (xIndex < x.length || yIndex < y.length) {
    let xChar = x.charAt(xIndex);
    let yChar = y.charAt(yIndex);

    // In the event of a fault in strings of unequal length, we'll undo one of
    // these increments; but since they will almost always be correct, it is
    // more efficient to do them now.
    xIndex += 1;
    yIndex += 1;

    if (xChar !== yChar) {
      faults += 1;
      if (faults > 1) {
        return false;
      }

      if (y.length < x.length) {
        yIndex -= 1; // don't advance after all
      } else if (x.length < y.length) {
        xIndex -= 1;
      }
    }
  }
  return true;
}

module.exports = isOneEditAway;
