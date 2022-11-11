
import './create-similar-cards.js';
import './form-states.js';
import './form-validation.js';
import './map.js';
import './price-slider.js';
import './fetch-api.js';
import { sendAdFormData } from './form-submit.js';
import { showSuccessMessage, showErrorMessage } from './service-messages.js';
import './form-submit.js';


sendAdFormData(
  () => showSuccessMessage(),
  () => showErrorMessage()
);
