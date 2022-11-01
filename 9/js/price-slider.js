import { adPriceElement, MAX_PRICE, adRoomTypeElement, minRoomPrice } from './form-validation.js';

const SLIDER_PRICE_START = 1000;
const sliderElement = document.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement, {
  range: {
    'min': 0,
    'max': MAX_PRICE,
  },
  start: SLIDER_PRICE_START,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value)
  },
});


sliderElement.noUiSlider.on('slide', () => {
  adPriceElement.value = sliderElement.noUiSlider.get();
});


adRoomTypeElement.addEventListener('change', () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      'min': minRoomPrice[adRoomTypeElement.value],
      'max': MAX_PRICE,
    },
    start: minRoomPrice[adRoomTypeElement.value],
  });
});


adPriceElement.addEventListener('input', () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      'min': minRoomPrice[adRoomTypeElement.value],
      'max': MAX_PRICE,
    },
    start: adPriceElement.value,
  });
});
