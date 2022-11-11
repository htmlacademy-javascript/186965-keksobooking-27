import { adFormElement } from './form-states.js';
import { inflectWord } from './utils.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 100000;
const adTitleElement = adFormElement.querySelector('#title');
const adPriceElement = adFormElement.querySelector('#price');
const adRoomNumberElement = adFormElement.querySelector('#room_number');
const adRoomCapacityElement = adFormElement.querySelector('#capacity');
const wordRoomOptions = ['комната', 'комнаты', 'комнат'];
const wordRoomCapacityOptions = ['гостя', 'гостей', 'гостей'];
const adRoomTypeElement = adFormElement.querySelector('#type');
const adCheckInTimeElement = adFormElement.querySelector('#timein');
const adCheckOutTimeElement = adFormElement.querySelector('#timeout');


const roomsToGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};


const minRoomPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

adPriceElement.placeholder = minRoomPrice[adRoomTypeElement.value];

const pristine = new Pristine(adFormElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

// Валидация заголовка объявления
const validateAdTitle = (value) => value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;

pristine.addValidator(adTitleElement, validateAdTitle, 'От 30 до 100 символов');


// Валидация цены объявления
const validatePrice = (value) => +value && value <= MAX_PRICE;

pristine.addValidator(adPriceElement, validatePrice, `Максимальная цена ${MAX_PRICE} ₽/ночь.`);


// Валидация количества гостей и комнат
const validateAmountOfGuests = () => roomsToGuests[adRoomNumberElement.value].includes(adRoomCapacityElement.value);

const onCapacityChange = () => {
  pristine.validate(adRoomCapacityElement);
  pristine.validate(adRoomNumberElement);
};

const onRoomNumberChange = () => {
  pristine.validate(adRoomCapacityElement);
  pristine.validate(adRoomNumberElement);
};

const getRoomsErrorMessage = () => {
  if(adRoomNumberElement.value === '100') {
    return 'не для гостей';
  }

  return `${adRoomNumberElement.value} ${inflectWord(adRoomNumberElement.value, wordRoomOptions)} для ${roomsToGuests[adRoomNumberElement.value]} ${inflectWord(roomsToGuests[adRoomNumberElement.value], wordRoomCapacityOptions)}`;
};

pristine.addValidator(adRoomNumberElement, validateAmountOfGuests, getRoomsErrorMessage);
pristine.addValidator(adRoomCapacityElement, validateAmountOfGuests, getRoomsErrorMessage);

adRoomCapacityElement.addEventListener('change', onCapacityChange);
adRoomNumberElement.addEventListener('change', onRoomNumberChange);


// Валидация типа квартиры и цены

const validateMinHousePrice = (value) => {
  const houseType = adRoomTypeElement.value;
  return value >= minRoomPrice[houseType];
};

const onHouseTypeChange = () => {
  const houseType = adRoomTypeElement.value;
  adPriceElement.placeholder = minRoomPrice[houseType];

  adPriceElement.min = minRoomPrice[houseType];
  adPriceElement.max = `${MAX_PRICE}`;
  pristine.validate(adRoomTypeElement);
};

adRoomTypeElement.addEventListener('change', onHouseTypeChange);

const getHouseAndPriceErrorMessage = () => {
  const houseType = adRoomTypeElement.value;

  return `Цена не должна быть ниже ${minRoomPrice[houseType]} ₽/ночь`;
};

pristine.addValidator(adPriceElement, validateMinHousePrice, getHouseAndPriceErrorMessage);


// Валидация времени заезда и выезда
const setCheckInTime = () => {
  const checkOutTime = adCheckOutTimeElement.value;
  adCheckInTimeElement.value = checkOutTime;
};

const setCheckOutTime = () => {
  const checkInTime = adCheckInTimeElement.value;
  adCheckOutTimeElement.value = checkInTime;
};

adCheckInTimeElement.addEventListener('change', setCheckOutTime);
adCheckOutTimeElement.addEventListener('change', setCheckInTime);


export { adPriceElement, MAX_PRICE, adRoomTypeElement, minRoomPrice, pristine };
