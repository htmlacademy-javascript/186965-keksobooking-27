import { inflectWord } from './utils.js';

const houseCompare = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель'
};


const createHouseCapacityDescription = (item, element) => {
  const roomsAmount = item.offer.rooms;
  const guestAmount = item.offer.guests;

  element.querySelector('.popup__text--capacity').textContent = `${roomsAmount} ${inflectWord(roomsAmount, ['комната', 'комнаты', 'комнат'])} для ${guestAmount} ${inflectWord(guestAmount, ['гостя', 'гостей', 'гостей'])}`;

};


const checkHouseFeatures = (features, element) => {
  const featuresList = element.querySelector('.popup__features');
  const allFeatures = featuresList.querySelectorAll('.popup__feature');

  if (features === undefined) {
    featuresList.classList.add('hidden');
  } else {
    const modifiers = features.map((feature) => `popup__feature--${feature}`);

    allFeatures.forEach((item) => {
      const modifier = item.classList[1];

      if (!modifiers.includes(modifier)) {
        item.remove();
      }
    });
  }
};


const createFlatPhotos = (items, element) => {
  const photoContainerElement = element.querySelector('.popup__photos');

  photoContainerElement.innerHTML = '';

  const photoBoxElement = document.createDocumentFragment();

  if (items === undefined) {
    photoContainerElement.classList.add('hidden');
  } else {
    items.forEach((item) => {
      const photo = document.createElement('img');
      photo.classList.add('popup__photo');
      photo.width = 45;
      photo.height = 40;
      photo.alt = 'Фотография жилья';
      photo.src = `${item}`;

      photoBoxElement.append(photo);
    });

    photoContainerElement.append(photoBoxElement);
  }

};


export { createHouseCapacityDescription, checkHouseFeatures, createFlatPhotos, houseCompare };
