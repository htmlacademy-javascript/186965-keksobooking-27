import { adFormElement } from './form-states.js';
import { inflectWord } from './utils.js';

const adTitleElement = adFormElement.querySelector('#title');
const adPriceElement = adFormElement.querySelector('#price');
const adRoomNumberElement = adFormElement.querySelector('#room_number');
const adRoomCapacityElement = adFormElement.querySelector('#capacity');
const roomsAndGuestsCompare = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const pristine = new Pristine(adFormElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});


const validateAdTitle = (value) => value.length >= 30 && value.length <= 100;
pristine.addValidator(adTitleElement, validateAdTitle, 'Обязательное поле. От 30 до 100 символов');

const validatePrice = (value) => value <= 100000;
pristine.addValidator(adPriceElement, validatePrice, 'Обязательно поле. Не более 100000 ₽/ночь');


const wordRoomOptions = ['комната', 'комнаты', 'комнат'];
const wordRoomCapacityOptions = ['гостя', 'гостей', 'гостей'];

const validateAmountOfRoomsAndGuests = () => roomsAndGuestsCompare[adRoomNumberElement.value].includes(adRoomCapacityElement.value);


const getRoomsErrorMessage = () => {
  if(adRoomNumberElement.value === '100') {
    return 'не для гостей';
  }

  return `${adRoomNumberElement.value} ${inflectWord(adRoomNumberElement.value, wordRoomOptions)} для ${roomsAndGuestsCompare[adRoomNumberElement.value]} ${inflectWord(roomsAndGuestsCompare[adRoomNumberElement.value], wordRoomCapacityOptions)}`;
};


pristine.addValidator(adRoomNumberElement, validateAmountOfRoomsAndGuests, getRoomsErrorMessage);
pristine.addValidator(adRoomCapacityElement, validateAmountOfRoomsAndGuests, getRoomsErrorMessage);


adFormElement.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if(!isValid) {
    evt.preventDefault();
  }
});


