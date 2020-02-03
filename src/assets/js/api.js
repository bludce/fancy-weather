const getIpInfo = async () => {
  try {
    const response = await fetch('https://ipinfo.io/json?token=1cb31470e45f0a');
    const data = await response.json();
    return {
      city: data.city,
      lat: data.loc.split(',')[0],
      lon: data.loc.split(',')[1],
    };
  } catch (err) {
    throw new Error(err);
  }
};

const getImage = async (city) => {
  try {
    const URL = 'https://api.unsplash.com/photos/random';
    const KEY = 'a2ebfc7a58c43653f2bac7d529c3805e564998abdfd927daf79b616bc7d67c2f';
    const query = `${URL}?orientation=landscape&per_page=1&query=town,${city}&client_id=${KEY}`;
    const response = await fetch(query);
    const data = await response.json();
    return data.urls.regular;
  } catch (err) {
    return '';
    // throw new Error(err);
  }
};

const getWeather = async (lat, lon) => {
  try {
    const KEY = '35b2a72618d61c46be085eab60aa1793';
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const URL = 'http://api.openweathermap.org/data/2.5/forecast';
    const query = `?lat=${+lat}&lon=${+lon}&APPID=${KEY}&units=metric`;
    const response = await fetch(proxyUrl + URL + query);
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

const getGeoData = async (city) => {
  try {
    const KEY = '16048d1be514454cb8cf21210afae810';
    const URL = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${KEY}&pretty=1&no_annotations=1`;

    const response = await fetch(URL);
    const data = await response.json();
    return data.results[0].geometry;
  } catch (err) {
    throw new Error(err);
  }
};

export {
  getIpInfo,
  getImage,
  getWeather,
  getGeoData,
};
