import { getIpInfo, getWeather, getImage } from './api';
import render from './render';
import {
  getCurrentDay,
  getForecastDate,
  startPreloader,
  stopPreloader,
} from './helper';

const getCurrentLocation = async () => {
  startPreloader();
  const { city, lat, lon } = await getIpInfo();
  const weatherInfo = await getWeather(lat, lon);
  const currentWeather = {
    temp: weatherInfo.list[0].main.temp.toFixed(0),
    feelsLike: weatherInfo.list[0].main.feels_like.toFixed(0),
    humidity: weatherInfo.list[0].main.humidity.toFixed(0),
    wind: weatherInfo.list[0].wind.speed.toFixed(0),
    icon: weatherInfo.list[0].weather[0].id,
    description: weatherInfo.list[0].weather[0].main,
  };

  const image = await getImage(city);

  const forecast = weatherInfo.list.filter((item) => item.dt_txt.match(/12:00:00/));

  const forecastDate = getForecastDate(forecast);

  const currentDate = getCurrentDay();

  await render(city, lat, lon, currentWeather, image, currentDate, forecastDate);

  stopPreloader();
};

const getCorrectLocation = async (city, lat, lng) => {
  startPreloader();
  const weatherInfo = await getWeather(lat, lng);

  const currentWeather = {
    temp: weatherInfo.list[0].main.temp.toFixed(0),
    feelsLike: weatherInfo.list[0].main.feels_like.toFixed(0),
    humidity: weatherInfo.list[0].main.humidity.toFixed(0),
    wind: weatherInfo.list[0].wind.speed.toFixed(0),
    icon: weatherInfo.list[0].weather[0].id,
    description: weatherInfo.list[0].weather[0].main,
  };

  const image = await getImage(city);

  const forecast = weatherInfo.list.filter((item) => item.dt_txt.match(/12:00:00/));

  const forecastDate = getForecastDate(forecast);

  const currentDate = getCurrentDay();

  await render(city, lat, lng, currentWeather, image, currentDate, forecastDate);

  stopPreloader();
};

export {
  getCurrentLocation,
  getCorrectLocation,
};
