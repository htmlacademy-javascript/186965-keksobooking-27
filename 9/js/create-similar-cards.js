import { similarAds } from './create-data.js';
import { inflectWord } from './utils.js';


const houseCompare = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель'
};

const adTemplateElement = document.querySelector('#card').content.querySelector('.popup'); // шаблон карточки объявления


const createHouseCapacityDescription = (item, element) => {
  const roomsAmount = item.offer.rooms;
  const guestAmount = item.offer.guests;

  element.querySelector('.popup__text--capacity').textContent = `${roomsAmount} ${inflectWord(roomsAmount, ['комната', 'комнаты', 'комнат'])} для ${guestAmount} ${inflectWord(guestAmount, ['гостя', 'гостей', 'гостей'])}`;

};


const checkHouseFeatures = (features, element) => {
  const featuresList = element.querySelector('.popup__features');
  const allFeatures = featuresList.querySelectorAll('.popup__feature');

  const modifiers = features.map((feature) => `popup__feature--${feature}`);


  allFeatures.forEach((item) => {
    const modifier = item.classList[1];

    if (!modifiers.includes(modifier)) {
      item.remove();

    }
  });
};


const createFlatPhotos = (items, element) => {
  const photoContainerElement = element.querySelector('.popup__photos');

  photoContainerElement.innerHTML = '';

  const photoBoxElement = document.createDocumentFragment();

  items.offer.photos.forEach((item) => {
    const photo = document.createElement('img');
    photo.classList.add('popup__photo');
    photo.width = 45;
    photo.height = 40;
    photo.alt = 'Фотография жилья';
    photo.src = `${item}`;

    photoBoxElement.append(photo);
  });

  photoContainerElement.append(photoBoxElement);
};


similarAds.forEach((ad) => {
  const adElement = adTemplateElement.cloneNode(true);
  const houseFeatures = ad.offer.features;

  adElement.querySelector('.popup__title').textContent = ad.offer.title;
  adElement.querySelector('.popup__text--address').textContent = `${ad.offer.address.lat}, ${ad.offer.address.lng}`;


  adElement.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
  adElement.querySelector('.popup__type').textContent = houseCompare[ad.offer.type];

  createHouseCapacityDescription(ad, adElement);

  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;

  checkHouseFeatures(houseFeatures, adElement);

  adElement.querySelector('.popup__description').textContent = ad.offer.description;

  createFlatPhotos(ad, adElement);

  adElement.querySelector('.popup__avatar').src = ad.author.avatar;


});


export { createHouseCapacityDescription, checkHouseFeatures, createFlatPhotos };
