
const adFormElement = document.querySelector('.ad-form');
const adFormFieldsetElements = adFormElement.querySelectorAll('fieldset');

const mapFilterElement = document.querySelector('.map__filters');
const mapFilterSelectElements = mapFilterElement.querySelectorAll('.map__filter');
const mapFilterFieldsetElement = mapFilterElement.querySelector('.map__features');

const setInactiveFilterState = () => {
  mapFilterElement.classList.add('map__filters--disabled');

  mapFilterSelectElements.forEach((element) => {
    element.disabled = true;
  });

  mapFilterFieldsetElement.disabled = true;
};

const setInactiveFormState = () => {
  adFormElement.classList.add('ad-form--disabled');

  adFormFieldsetElements.forEach((element) => {
    element.disabled = true;
  });

};


const setActiveFilterState = () => {
  mapFilterElement.classList.remove('map__filters--disabled');

  mapFilterSelectElements.forEach((element) => {
    element.disabled = false;
  });

  mapFilterFieldsetElement.disabled = false;
};


const setActiveFormState = () => {
  adFormElement.classList.remove('ad-form--disabled');

  adFormFieldsetElements.forEach((element) => {
    element.disabled = false;
  });

};


export { adFormElement, setActiveFormState, setInactiveFormState, setInactiveFilterState, setActiveFilterState };
