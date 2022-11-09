const ALERT_SHOW_TIME = 5000;
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorMessageButtonElement = errorMessageTemplate.querySelector('.error__button');


const createRemoveListener = (message) => {
  const listener = () => {
    message.remove();

    document.removeEventListener('keydown', listener);
    document.removeEventListener('click', listener);
  };

  return listener;
};

const onSuccessListener = createRemoveListener(successMessageTemplate);
const onErrorListener = createRemoveListener(errorMessageTemplate);


const onErrorButton = (message) => {
  errorMessageButtonElement.addEventListener('click', () => {
    message.remove();
  });
};

const showErrorMessage = () => {
  document.body.append(errorMessageTemplate);

  onErrorButton(errorMessageTemplate);

  document.addEventListener('keydown', onErrorListener);
  document.addEventListener('click', onErrorListener);
};


const showSuccessMessage = () => {
  document.body.append(successMessageTemplate);

  document.addEventListener('keydown', onSuccessListener);
  document.addEventListener('click', onSuccessListener);
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
