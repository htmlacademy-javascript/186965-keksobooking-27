import { adFormElement } from './form-states.js';
import { setActiveFormState, setInactiveFormState, setActiveFilterState, setInactiveFilterState } from './form-states.js';
import { createHouseCapacityDescription, checkHouseFeatures, createFlatPhotos, houseCompare } from './create-similar-cards.js';
import { getSimilarDataAds } from './fetch-api.js';
import { showErrorAlert } from './service-messages.js';
import { filterChange, totalMatch } from './ads-filter.js';
import { debounce } from './utils.js';

const TOKIO_COORDINATES = {
  lat: 35.6895,
  lng: 139.692,
};

const MAIN_ICON_SIZE = {
  width: 52,
  length: 52,
  anchor: 26,
};

const ICON_SIZE = {
  width: 40,
  length: 40,
  anchor: 20,
};

const RERENDER_DELAY = 500;

const map = L.map('map-canvas');

const adAddressElement = adFormElement.querySelector('#address');
adAddressElement.value = `${TOKIO_COORDINATES.lat}, ${TOKIO_COORDINATES.lng}`;


// иконка главного маркера
const mainMarkerIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [`${MAIN_ICON_SIZE.width}`, `${MAIN_ICON_SIZE.length}`],
  iconAnchor: [`${MAIN_ICON_SIZE.anchor}`, `${MAIN_ICON_SIZE.length}`],
});

// Отображение главного маркера на карте
const mainMarker = L.marker(
  {
    lat: `${TOKIO_COORDINATES.lat}`,
    lng: `${TOKIO_COORDINATES.lng}`,
  },
  {
    draggable: true,
    icon: mainMarkerIcon
  }
);

mainMarker.addTo(map);

// координаты главной метки = координаты поля "Адрес"
mainMarker.on('moveend', (evt) => {
  const latCoordinate = evt.target.getLatLng().lat.toFixed(5);
  const lngCoordinate = evt.target.getLatLng().lng.toFixed(5);

  adAddressElement.value = `${latCoordinate}, ${lngCoordinate}`;

});


//иконки похожих объявлений
const similarAdMarkersIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [`${ICON_SIZE.width}`, `${ICON_SIZE.length}`],
  iconAnchor: [`${ICON_SIZE.anchor}`, `${ICON_SIZE.length}`],
});


const createMarkerPopup = (marker) => {
  const markerPopupTemplateElement = document.querySelector('#card').content.querySelector('.popup');


  const markerPopupElement = markerPopupTemplateElement.cloneNode(true);

  markerPopupElement.querySelector('.popup__avatar').src = marker.author.avatar;
  markerPopupElement.querySelector('.popup__title').textContent = marker.offer.title;
  markerPopupElement.querySelector('.popup__text--address').textContent = marker.offer.address;
  markerPopupElement.querySelector('.popup__text--price').textContent = `${marker.offer.price} ₽/ночь`;

  markerPopupElement.querySelector('.popup__type').textContent = houseCompare[marker.offer.type];

  createHouseCapacityDescription(marker, markerPopupElement);

  markerPopupElement.querySelector('.popup__text--time').textContent = `Заезд после ${marker.offer.checkin}, выезд до ${marker.offer.checkout}`;

  checkHouseFeatures(marker.offer.features, markerPopupElement);

  markerPopupElement.querySelector('.popup__description').textContent = marker.offer.description;

  createFlatPhotos(marker.offer.photos, markerPopupElement);

  return markerPopupElement;
};


const markersGroup = L.layerGroup().addTo(map);


// создание меток похожих объявлений
const createMarker = (ad) => {
  const marker = L.marker(
    {
      lat: ad.location.lat,
      lng: ad.location.lng
    },
    {
      icon: similarAdMarkersIcon,
    });

  marker.addTo(markersGroup).bindPopup(createMarkerPopup(ad));
};


const createSimilarMarkers = (arr) => {
  markersGroup.clearLayers();

  const filteredData = totalMatch(arr);

  filteredData
    .forEach((ad) => {
      createMarker(ad);
    });

  map.closePopup();
};


const resetMapMainMarker = () => {
  mainMarker.setLatLng({
    lat: `${TOKIO_COORDINATES.lat}`,
    lng: `${TOKIO_COORDINATES.lng}`,
  });

  map.closePopup();

  map.setView({
    lat: `${TOKIO_COORDINATES.lat}`,
    lng: `${TOKIO_COORDINATES.lng}`,
  }, 12);

};

setInactiveFormState();
setInactiveFilterState();

// Инициализация карты
map.on('load',
  () => {
    setActiveFormState();

    getSimilarDataAds(
      (similarDataAds) => {
        createSimilarMarkers(similarDataAds);
        setActiveFilterState();

        filterChange(debounce(() => createSimilarMarkers(similarDataAds), RERENDER_DELAY));
      },
      () => {
        setInactiveFilterState();
        showErrorAlert('Не удалось загрузить данные. Попробуйте позже');
      });
  })
  .setView({
    lat: `${TOKIO_COORDINATES.lat}`,
    lng: `${TOKIO_COORDINATES.lng}`,
  }, 12);


L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

export { createSimilarMarkers, adAddressElement, TOKIO_COORDINATES, resetMapMainMarker };
