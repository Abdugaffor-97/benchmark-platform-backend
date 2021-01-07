const shuffleArray = (array, len) => {
  let curId = array.length;
  // There remain elements to shuffle
  while (0 !== curId) {
    // Pick a remaining element
    let randId = Math.floor(Math.random() * curId);
    curId -= 1;
    // Swap it with the current element.
    let tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }
  let randArray = array.slice(0, len);
  randArray.forEach((element) => {
    element.providedAnswer = null;
  });

  return randArray;
};

module.exports = shuffleArray;
