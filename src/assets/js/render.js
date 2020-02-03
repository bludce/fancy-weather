const render = (city, lat, lon, currentWeather, image, date, forecastDate) => {
  const cityEl = document.getElementById('city');
  const latEl = document.getElementById('lat');
  const lonEl = document.getElementById('lon');
  const cityImageEl = document.getElementById('cityImage');
  const currentTempEl = document.getElementById('currentTemp');
  const currentIconEl = document.getElementById('currentIcon');
  const currentDescEl = document.getElementById('description');
  const currentFeelEl = document.getElementById('feels');
  const currentWindEl = document.getElementById('wind');
  const currentHumidityEl = document.getElementById('humidity');
  const currentDateEl = document.getElementById('currentDate');
  const forecastDateEl = document.querySelectorAll('[data-forecast]');

  currentDateEl.innerHTML = `<p><span class="text--large">${date.curDate}</span> <br />${date.curMonth}<br> ${date.curDay}</p>`;
  currentIconEl.classList.remove('owf-803');
  currentIconEl.classList.add(`owf-${currentWeather.icon}`);
  cityEl.textContent = city;
  latEl.textContent = lat;
  lonEl.textContent = lon;
  currentDescEl.textContent = currentWeather.description;
  currentFeelEl.textContent = currentWeather.feelsLike;
  currentWindEl.textContent = currentWeather.wind;
  currentHumidityEl.textContent = currentWeather.humidity;
  currentTempEl.textContent = currentWeather.temp;
  cityImageEl.style.backgroundImage = `url('${image}')`;

  for (let i = 0; i < 3; i += 1) {
    [...forecastDateEl][i].innerHTML = `
      <a href="#" class="box box--transparent">
        <p>
          <span class="text--medium">${forecastDate[i].curDay}</span><br>
          <span class="text--large">${forecastDate[i].temp}</span><span class="text--medium">°C</span><i class="owf owf-5x owf-${forecastDate[i].icon}"></i>
        </p>
      </a>
    `;
  }

  mapboxgl.accessToken = 'pk.eyJ1IjoiYmx1ZGNlIiwiYSI6ImNrNDVuZDB0MTBhZjEzZXFtMXQ3bXRqaWoifQ.h3jr4dvTobFt5HkNeaA9Uw';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [lon, lat],
    zoom: 11,
  });
};

export default render;
