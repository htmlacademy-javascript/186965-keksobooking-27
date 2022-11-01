import { adFormElement } from './form-states.js';
import { setActiveFormState } from './form-states.js';
import { similarAds } from './create-data.js';
import { createHouseCapacityDescription, checkHouseFeatures, createFlatPhotos } from './create-similar-cards.js';

const TOKIO_COORDINATES = {
  lat: 35.4122,
  lng: 139.4130,
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

const adAddressElement = adFormElement.querySelector('#address');
adAddressElement.value = `${TOKIO_COORDINATES.lat}, ${TOKIO_COORDINATES.lng}`;

// Инициализация карты
const map = L.map('map-canvas')
  .on('load', setActiveFormState)
  .setView({
    lat: `${TOKIO_COORDINATES.lat}`,
    lng: `${TOKIO_COORDINATES.lng}`,
  }, 10);


L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


// иконка главного маркера
const mainMarkerIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [`${MAIN_ICON_SIZE.width}`, `${MAIN_ICON_SIZE.length}`],
  iconAnchor: [`${MAIN_ICON_SIZE.anchor}`, `${MAIN_ICON_SIZE.length}`],
});

// Отображение главного маркера на карте
const mainMarker = L.marker({
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

  adAddressElement.value = `lat: ${latCoordinate}, lng: ${lngCoordinate}`;

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
  markerPopupElement.querySelector('.popup__text--address').textContent = `${marker.offer.address.lat}, ${marker.offer.address.lng}`;
  markerPopupElement.querySelector('.popup__text--price').textContent = marker.price;
  markerPopupElement.querySelector('.popup__type').textContent = marker.type;

  createHouseCapacityDescription(marker, markerPopupElement );

  markerPopupElement.querySelector('.popup__text--time').textContent = `Заезд после ${marker.offer.checkin}, выезд до ${marker.offer.checkout}`;

  checkHouseFeatures(marker.offer.features, markerPopupElement);

  markerPopupElement.querySelector('.popup__description').textContent = marker.offer.description;

  createFlatPhotos(marker, markerPopupElement);

  return markerPopupElement;
};


const markersGroup = L.layerGroup().addTo(map);


// создание меток похожих объявлений
const createMarker = (ad) => {
  const marker = L.marker(
    {
      lat: ad.offer.address.lat,
      lng: ad.offer.address.lng
    },
    {
      icon: similarAdMarkersIcon,
    });

  marker.addTo(markersGroup).bindPopup(createMarkerPopup(ad));
};


similarAds.forEach((ad) => {
  createMarker(ad);
});
