const getCurrentTime = () => {
  const newDate = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const year = newDate.getFullYear();
  const month = months[newDate.getMonth()];
  const date = newDate.getDate();
  const day = days[newDate.getDay()];
  const hour = newDate.getHours();
  const min = `0${newDate.getMinutes()}`;
  const time = `${day} ${date} ${month} ${year} ${hour}:${min.substr(-2)}`;
  return time;
};

const getCurrentDay = () => {
  const newDate = new Date();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const month = months[newDate.getMonth()];
  const date = newDate.getDate();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = days[newDate.getDay()];
  return {
    curDate: date,
    curMonth: month,
    curDay: day,
  };
};

const forecastWeather = [];

const getForecastDate = (date) => {
  date.forEach((item, index) => {
    const newDate = new Date(item.dt_txt);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[newDate.getDay()];
    forecastWeather[index] = {
      curDay: day,
      temp: item.main.temp.toFixed(0),
      icon: item.weather[0].id,
    };
  });
  return forecastWeather;
};

const renderFarenheit = () => {
  const currentTempEl = document.querySelector('#currentTemp');
  const signTempEl = document.querySelector('.temp');
  const feels = document.getElementById('feels');
  currentTempEl.textContent = Math.round((currentTempEl.textContent * 9) / 5 + 32);
  signTempEl.textContent = '°F';
  feels.textContent = Math.round((feels.textContent * 9) / 5 + 32);

  const forecastDateEl = document.querySelectorAll('[data-forecast]');
  for (let i = 0; i < 3; i += 1) {
    const value = [...forecastDateEl][i].querySelector('.text--large').textContent;
    const sign = [...forecastDateEl][i].querySelector('.text--large + .text--medium');
    [...forecastDateEl][i].querySelector('.text--large').textContent = Math.round((value * 9) / 5 + 32);
    sign.textContent = '℉';
  }
};

const renderCelcium = () => {
  const currentTempEl = document.querySelector('#currentTemp');
  const signTempEl = document.querySelector('.temp');
  const feels = document.getElementById('feels');
  currentTempEl.textContent = Math.round(((currentTempEl.textContent - 32) * 5) / 9);
  signTempEl.textContent = '°C';
  feels.textContent = Math.round(((feels.textContent - 32) * 5) / 9);

  const forecastDateEl = document.querySelectorAll('[data-forecast]');
  for (let i = 0; i < 3; i += 1) {
    const value = [...forecastDateEl][i].querySelector('.text--large').textContent;
    const sign = [...forecastDateEl][i].querySelector('.text--large + .text--medium');
    [...forecastDateEl][i].querySelector('.text--large').textContent = Math.round(((value - 32) * 5) / 9);
    sign.textContent = '°C';
  }
};

const convertTemp = (degree) => {
  if (degree === 'farenheit') {
    renderFarenheit();
  } else {
    renderCelcium();
  }
};

const speechRecord = () => {
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.addEventListener('result', (e) => {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join('');

    if (e.results[0].isFinal) {
      document.querySelector('.search__input').value = transcript;
    }
  });

  recognition.addEventListener('end', recognition.start);

  recognition.start();
};

const startPreloader = () => {
  document.querySelector('.preloader').classList.add('preloader--active');
};

const stopPreloader = () => {
  document.querySelector('.preloader').classList.remove('preloader--active');
};

export {
  getCurrentTime,
  getCurrentDay,
  getForecastDate,
  convertTemp,
  speechRecord,
  startPreloader,
  stopPreloader,
};
