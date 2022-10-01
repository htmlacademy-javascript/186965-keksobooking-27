
//Максимум и минимум включаются. Resourse MDN
function getRandomNumber(min, max) {
  if(min >= max || min < 0 || max < 0) {
    return;
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomNumber(10, 137);


function getRandomCoordinate(min, max, number) {
  if(min >= max || min < 0 || max < 0) {
    return;
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  const randomNumber = Math.random() * (max - min + 1) + min; // Максимум и минимум включаются
  const coordinate = +randomNumber.toFixed(number);

  return coordinate;
}


getRandomCoordinate(10, 100, 13);
