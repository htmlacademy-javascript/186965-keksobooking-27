
import { adFormElement } from './form-states.js';
import { getSimilarDataAds, sendAdData } from './fetch-api.js';
import { pristine } from './form-validation.js';
import { adAddressElement, TOKIO_COORDINATES, resetMapMainMarker, createSimilarMarkers } from './map.js';
import { sliderElement } from './price-slider.js';
import { housePhotoPreviewElement, avatarPreviewElement } from './ads-images.js';
import { showErrorAlert } from './service-messages.js';
import { resetFormFilters } from './ads-filter.js';

const DEFAULT_IMG = 'img/muffin-grey.svg';

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
  housePhotoPreviewElement.innerHTML = '';
  avatarPreviewElement.src = DEFAULT_IMG;
};

formResetButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();

  resetForm();
  resetMapMainMarker();
  sliderElement.noUiSlider.reset();
  resetFormFilters();
  getSimilarDataAds(createSimilarMarkers, showErrorAlert);

});

// Отправка формы
const sendAdFormData = (onSuccess, onFail) => {
  adFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      sendAdData(
        () => {
          unblockSubmitButton();
          onSuccess();
          resetMapMainMarker();
          sliderElement.noUiSlider.reset();
          resetForm();
          resetFormFilters();
          getSimilarDataAds(createSimilarMarkers, showErrorAlert);
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
