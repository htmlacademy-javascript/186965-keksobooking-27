
const adFormElement = document.querySelector('.ad-form');
const adFormFieldsetElements = adFormElement.querySelectorAll('fieldset');

const mapFilterElement = document.querySelector('.map__filters');
const mapFilterSelectElements = mapFilterElement.querySelectorAll('.map__filter');
const mapFilterFieldsetElement = mapFilterElement.querySelector('.map__features');

const setInactiveFormState = () => {
  adFormElement.classList.add('ad-form--disabled');
  mapFilterElement.classList.add('map__filters--disabled');
  mapFilterFieldsetElement.disabled = true;

  adFormFieldsetElements.forEach((element) => {
    element.disabled = true;
  });

  mapFilterSelectElements.forEach((element) => {
    element.disabled = true;
  });
};

setInactiveFormState();

const setActiveFormState = () => {
  adFormElement.classList.remove('ad-form--disabled');
  mapFilterElement.classList.remove('map__filters--disabled');
  mapFilterFieldsetElement.disabled = false;

  adFormFieldsetElements.forEach((element) => {
    element.disabled = false;
  });

  mapFilterSelectElements.forEach((element) => {
    element.disabled = false;
  });
};


export { adFormElement, setActiveFormState };
