import axios from 'axios';

const IMAGE_BASE_URL = 'https://pixabay.com/api/';
const IMAGE_KEY = '29815717-e22672f4a65c97651fd180553';
const IMAGE_PER_PAGE = 12;
const IMAGE_PARAMETERS = `image_type=photo&orientation=horizontal&per_page=${IMAGE_PER_PAGE}`;

const fetchImages = async (query, page) => {
  const url = `${IMAGE_BASE_URL}?q=${query}&page=${page}&key=${IMAGE_KEY}&${IMAGE_PARAMETERS}`;

  const response = await axios.get(url);

  if (response.status !== 200) {
    throw new Error('Backend error');
  }

  if (response.data.totalHits === 0) {
    throw new Error('No images');
  }

  return {
    hits: response.data.hits,
    totalPages: Math.ceil(response.data.totalHits / IMAGE_PER_PAGE),
  };
};

const helpers = {
  fetchImages,
};

export default helpers;
