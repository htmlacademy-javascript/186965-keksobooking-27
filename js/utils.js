//Максимум и минимум включаются. Resourse MDN
function getRandomNumber(min, max) {
  if(min >= max || min < 0 || max < 0) {
    return NaN;
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getRandomCoordinate(min, max, number) {
  if(min >= max || min < 0 || max < 0) {
    return NaN;
  }

  min = Math.floor(min);
  max = Math.floor(max);

  const randomNumber = Math.random() * (max - min + 1) + min; // Максимум и минимум включаются
  const coordinate = +randomNumber.toFixed(number);

  return coordinate;
}


const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];


export { getRandomNumber, getRandomCoordinate, getRandomArrayElement };


