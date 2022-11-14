import { adFormElement } from './form-states.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const avatarChooserElement = adFormElement.querySelector('#avatar');
const housePhotoChooserElement = adFormElement.querySelector('#images');
const avatarPreviewElement = adFormElement.querySelector('.ad-form-header__preview img');
const housePhotoPreviewElement = adFormElement.querySelector('.ad-form__photo');


avatarChooserElement.addEventListener('change', () => {
  const file = avatarChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((end) => fileName.endsWith(end));

  if (matches) {
    avatarPreviewElement.src = URL.createObjectURL(file);
  }
});


housePhotoChooserElement.addEventListener('change', () => {
  const file = housePhotoChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((end) => fileName.endsWith(end));

  if (matches) {
    housePhotoPreviewElement.innerHTML = '';

    const houseImg = document.createElement('img');
    houseImg.style.maxWidth = '100%';
    houseImg.style.height = 'auto';

    houseImg.src = URL.createObjectURL(file);
    housePhotoPreviewElement.append(houseImg);
  }
});

export { housePhotoPreviewElement, avatarPreviewElement };
