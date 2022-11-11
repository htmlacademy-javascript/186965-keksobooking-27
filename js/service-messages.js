import { isEscapeKey } from './utils.js';

const ALERT_SHOW_TIME = 5000;
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorMessageButtonElement = errorMessageTemplate.querySelector('.error__button');


const addMessage = (message) => {
  document.body.append(message);

  const onEscKey = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeUserModal();
    }
  };

  const onPopupClick = () => {
    closeUserModal();
  };


  function closeUserModal() {
    message.remove();
    document.removeEventListener('keydown', onEscKey);
  }

  document.addEventListener('keydown', onEscKey);
  message.addEventListener('click', onPopupClick);
  errorMessageButtonElement.addEventListener('click', onPopupClick);
};


const showErrorMessage = () => {
  addMessage(errorMessageTemplate);
};

const showSuccessMessage = () => {
  addMessage(successMessageTemplate);
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


export { showErrorAlert, showErrorMessage, showSuccessMessage };
