
const getSimilarDataAds = (onSuccess, onFail) => {
  fetch('https://27.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if(!response.ok) {
        onFail();
      } else {
        return response.json();
      }
    })
    .then((similarDataAds) => onSuccess(similarDataAds))
    .catch(() => onFail());
};


const sendAdData = (onSuccess, onFail, body) => {
  fetch('https://27.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    }
  )
    .then((response) => {
      if(response.ok) {
        onSuccess();
      } else {
        onFail();
      }})
    .catch(() => onFail());
};


export { getSimilarDataAds, sendAdData };
