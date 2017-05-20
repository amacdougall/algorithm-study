const hashCode = string => {
  if (string.length === 0) {
    return 0;
  } else {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      let charCode = string.charCodeAt(i);
      hash = (hash << 5) - hash + charCode;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }
}

module.exports = hashCode;
