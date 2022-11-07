
import { adFormElement } from './form-states.js';
import { sendAdData } from './fetch-api.js';
import { pristine } from './form-validation.js';
import { adAddressElement, TOKIO_COORDINATES, resetMapMainMarker } from './map.js';
import { sliderElement } from './price-slider.js';

const formSubmitButtonElement = adFormElement.querySelector('.ad-form__submit');
const formResetButtonElement = adFormElement.querySelector('.ad-form__reset');

const blockSubmitButton = () => {
  formSubmitButtonElement.disabled = true;
  formSubmitButtonElement.textContent = 'Опубликовываю...';
};

const unblockSubmitButton = () => {
  formSubmitButtonElement.disabled = false;
  formSubmitButtonElement.textContent = 'Опубликовать';
};


const resetForm = () => {
  adFormElement.reset();
  adAddressElement.value = `${TOKIO_COORDINATES.lat}, ${TOKIO_COORDINATES.lng}`;

};

formResetButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();

  resetForm();
  resetMapMainMarker();
  sliderElement.noUiSlider.reset();
});

// Отправка формы
const sendAdFormData = (onSuccess, onFail) => {
  adFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if(isValid) {
      blockSubmitButton();
      sendAdData(
        () => {
          unblockSubmitButton();
          onSuccess();
          resetMapMainMarker();
          sliderElement.noUiSlider.reset();
          resetForm();
        },
        () => {
          unblockSubmitButton();
          onFail();
        },
        new FormData(evt.target)
      );
    }
  });
};


export { sendAdFormData, resetForm };
