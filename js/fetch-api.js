const getSimilarDataAds = () => fetch('https://27.javascript.pages.academy/keksobooking/data')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Данные не загрузились');
    }
    return response.json();
  });


const sendAdData = (onSuccess, onFail, body) => {
  fetch('https://27.javascript.pages.academy/keksobooking',
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