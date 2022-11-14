import { mapFilterElement } from './form-states.js';

const DEFAULT_VALUE = 'any';
const SIMILAR_ADS_AMOUNT = 10;

const typeOfHouseElement = mapFilterElement.querySelector('#housing-type');
const housePriceElement = mapFilterElement.querySelector('#housing-price');
const numberOfRoomsElement = mapFilterElement.querySelector('#housing-rooms');
const amountOfGuestElement = mapFilterElement.querySelector('#housing-guests');


const getAllCheckedCheckboxes = () => {
  const allCheckedCheckboxesArray = [];
  const checkboxesChecked = mapFilterElement.querySelectorAll('.map__checkbox:checked');

  checkboxesChecked.forEach((item) => {
    allCheckedCheckboxesArray.push(item);
  });

  return allCheckedCheckboxesArray;
};

const filterType = (item) => typeOfHouseElement.value === DEFAULT_VALUE || typeOfHouseElement.value === item.offer.type;

const filterPrice = (item) => housePriceElement.value === DEFAULT_VALUE || (item.offer.price < 10000 && housePriceElement.value === 'low') || (item.offer.price >= 10000 && item.offer.price <= 50000 && housePriceElement.value === 'middle') || (item.offer.price > 50000 && housePriceElement.value === 'high');

const filterRooms = (item) => numberOfRoomsElement.value === DEFAULT_VALUE || +numberOfRoomsElement.value === item.offer.rooms;

const filterGuests = (item) => amountOfGuestElement.value === DEFAULT_VALUE || +amountOfGuestElement.value === item.offer.guests;

const filterFeatures = (item) => {
  const requiredFeatures = getAllCheckedCheckboxes();
  const itemFeatures = item.offer.features || [];

  for (const feature of requiredFeatures) {
    if (!itemFeatures.includes(feature.value)) {
      return false;
    }
  }

  return true;
};


const totalMatch = (data) => {
  const filteredAds = [];

  for (const item of data) {
    if (filteredAds.length >= SIMILAR_ADS_AMOUNT) {
      break;
    }

    if (
      filterType(item) &&
      filterPrice(item) &&
      filterRooms(item) &&
      filterGuests(item) &&
      filterFeatures(item)
    ) {
      filteredAds.push(item);
    }
  }

  return filteredAds;
};


const filterChange = (cb) => {
  mapFilterElement.addEventListener('change', () => {
    cb();
  });
};

export { totalMatch, filterChange };
