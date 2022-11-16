const GET_DATA_URL = 'https://27.javascript.pages.academy/keksobooking/data';
const SEND_DATA_URL = 'https://27.javascript.pages.academy/keksobooking';


const getSimilarDataAds = (onSuccess, onFail) => fetch(GET_DATA_URL)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Данные не загрузились');
    }
    return response.json();
  })
  .then((similarDataAds) => {
    onSuccess(similarDataAds);
  })
  .catch(() => {
    onFail();
  });


const sendAdData = (onSuccess, onFail, body) => {
  fetch(SEND_DATA_URL,
    {
      method: 'POST',
      body,
    }
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => onFail());
};


export { getSimilarDataAds, sendAdData };
