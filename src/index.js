import './assets/style/main.sass';

import { getCurrentLocation, getCorrectLocation } from './assets/js/getLocation';
import changeImage from './assets/js/changeImage';
import { getGeoData } from './assets/js/api';
import { convertTemp, getCurrentTime, speechRecord } from './assets/js/helper';

document.addEventListener('DOMContentLoaded', async () => {
  getCurrentLocation();
  speechRecord();
});

const btn = document.querySelector('.btn');
const searchCityEl = document.querySelector('.search');
const temperatureEl = document.getElementById('temp');

btn.addEventListener('click', (e) => {
  e.preventDefault();
  changeImage(localStorage.getItem('city'));
});

searchCityEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = e.target.querySelector('.search__input').value;
  const { lat, lng } = await getGeoData(city);
  getCorrectLocation(city, lat, lng);
});

temperatureEl.addEventListener('change', (e) => {
  e.preventDefault();
  convertTemp(e.target.value);
});

const timeEl = document.getElementById('time');
timeEl.innerHTML = getCurrentTime();

const refreshTime = () => {
  timeEl.innerHTML = getCurrentTime();
};

setInterval(() => refreshTime(), 60000);
