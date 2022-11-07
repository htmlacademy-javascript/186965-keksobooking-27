
import './create-similar-cards.js';
import './form-states.js';
import './form-validation.js';
import './map.js';
import './price-slider.js';
import './fetch-api.js';
import { sendAdFormData } from './form-submit.js';
import { getSimilarDataAds } from './fetch-api.js';
import { createSimilarMarkers } from './map.js';
import { showErrorAlert, showSuccessMessage, showErrorMessage } from './service-messages.js';
import './form-submit.js';

const SIMILAR_ADS_AMOUNT = 10;


getSimilarDataAds(
  (similarDataAds) => createSimilarMarkers(similarDataAds.slice(0, SIMILAR_ADS_AMOUNT)),
  () => showErrorAlert('Не удалось загрузить данные. Попробуйте позже'),
);


sendAdFormData(
  () => showSuccessMessage(),
  () => showErrorMessage()
);
