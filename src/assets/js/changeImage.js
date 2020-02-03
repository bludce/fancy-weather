import { getImage } from './api';

const changeImage = async (city) => {
  const image = await getImage(city);
  const cityImageEl = document.getElementById('cityImage');
  cityImageEl.style.backgroundImage = `url('${image}')`;
};

export default changeImage;
