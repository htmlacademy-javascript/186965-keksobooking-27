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
    to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value)
  },
});


sliderElement.noUiSlider.on('update', () => {
  adPriceElement.value = sliderElement.noUiSlider.get();
});


adRoomTypeElement.addEventListener('change', () => {
  sliderElement.noUiSlider.updateOptions({
    start: minRoomPrice[adRoomTypeElement.value],
  });
});

