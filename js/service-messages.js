import { isEscapeKey } from './utils.js';


const ALERT_SHOW_TIME = 5000;
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorMessageButtonElement = errorMessageTemplate.querySelector('.error__button');


const onEscKey = (message) => (evt) => {
  if(isEscapeKey(evt)) {
    message.remove();
  }
};

const onWindowEvent = (message) => {
  window.addEventListener('click', () => {
    message.remove();
  });
};

const showErrorAlert = (message) => {
  const alertContainer = document.createElement('div');

  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.color = 'white';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


const showErrorMessage = () => {
  document.body.append(errorMessageTemplate);

  errorMessageButtonElement.addEventListener('click', () => {
    onEscKey(errorMessageTemplate);
  });

  document.addEventListener('keydown', onEscKey(errorMessageTemplate));
  onWindowEvent(errorMessageTemplate);
};


const showSuccessMessage = () => {
  document.body.append(successMessageTemplate);

  document.addEventListener('keydown', onEscKey(successMessageTemplate));
  onWindowEvent(successMessageTemplate);
};


export { showErrorAlert, showErrorMessage, showSuccessMessage };
