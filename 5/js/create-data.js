import { getRandomNumber, getRandomCoordinate, getRandomArrayElement } from './utils.js';

const ADS_NUMBER = 10;
const AVATARS_NUMBER = 10;
const ADS_TITLES = ['Вашему вниманию предлагается просторная квартира', 'Сдается полностью укомплектованная, уютная, квартира', 'Сдам уютную квартиру на длительный срок от собственника', 'Сдается квартира. Полностью меблированная', 'Сдаётся от собственника без комиссии на длительный срок уютная, светлая квартира', 'Сдаётся отличная квартира, после ремонта', 'Сдаётся жилье, ранее жил сам собственник', 'Сдаётся на длительный срок прекрасная квартира', 'Предлагается в аренду квартира', 'Сдаётся просторная квартира в новом жилом комплексе'];
const HOUSES_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN_TIME = ['12:00', '13:00', '14:00'];
const CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
const ADS_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const HOUSES_DESCRIPTION = [
  'Сдается просторная светлая квартира. В шаговой доступности расположены все основные достопримечательности. В радиусе 5 минут ходьбы расположена станция метро',
  'Сдается квартира от собственника с дизайнерским ремонтом. Дом класса - комфорт плюс. Закрытый уютный двор без машин!',
  'Сдаётся уютная студия в центре Санкт-Петербурга в шаговой доступности от метро. В квартире есть всё необходимое для жизни',
  'Светлая и уютная квартира',
  'Сдается квартира, хороший ремонт, уютно, после ремонта, с мебелью. Отдельный вход со двора. Строго, без кошек и маленьких детей.',
  'Сдаётся светлая квартира с евроремонтом, совмещённым санузлом и балконом. Окна выходят во двор. Дом находится в районе с развитой инфраструктурой.',
  'Двухкомнатная видовая квартира полностью меблированная, кроме одной комнаты, которую можно использовать под детскую/кабинет/гостевую. Окна квартиры и балкон с панорамным остеклением выходят на зелёный массив парка и красочные закаты.',
  'В квартире произведён евроремонт полгода назад. Полностью обставлена новой современной мебелью из ИКЕИ. Имеется застеклённая лоджия. Дом расположен в 300 метрах от метро.',
  'Сдается квартира студия в новом доме, от метро 10 мин транспортом. Для 1-2х граждан.'];
const ADS_PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const similarAds = [];
const adsAuthorAvatars = [];

const createAuthorAvatar = (number) => {
  for (let i = 1; i <= number; i++) {
    if (i <= 9) {
      i = `0${i}`;
    }

    adsAuthorAvatars.push(`img/avatars/user${i}.png`);
  }
};

createAuthorAvatar(AVATARS_NUMBER);


const createSimilarAd = () => {
  for(let i = 0; i < ADS_NUMBER; i++) {
    const lat = getRandomCoordinate(35.65000, 35.70000, 5);
    const lng = getRandomCoordinate(139.70000, 139.80000, 5);

    const newAd = {
      author: {
        avatar: adsAuthorAvatars[i],
      },
      offer: {
        title: getRandomArrayElement(ADS_TITLES),
        address: {
          lat,
          lng,
        },
        price: getRandomNumber(1, 1000),
        type: getRandomArrayElement(HOUSES_TYPES),
        rooms: getRandomNumber(1, 10),
        guests: getRandomNumber(1, 10),
        checkin: getRandomArrayElement(CHECKIN_TIME),
        checkout: getRandomArrayElement(CHECKOUT_TIME),
        features: ADS_FEATURES.slice(getRandomNumber(0, ADS_FEATURES.length - 1), getRandomNumber(0, ADS_FEATURES.length - 1)),
        description: HOUSES_DESCRIPTION[i],
        photos: ADS_PHOTOS.slice(getRandomNumber(0, ADS_PHOTOS.length - 1), getRandomNumber(0, ADS_PHOTOS.length - 1))
      },
      location: {
        lat,
        lng,
      }
    };

    similarAds.push(newAd);
  }

};

createSimilarAd();

export { createSimilarAd, similarAds };
