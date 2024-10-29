import axios from 'axios';

const API_KEY = '46607456-5552cc86243543e4de6027df0';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        page: page,
        image_type: 'photo',
        per_page: 15,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Помилка при отриманні зображень:', error);
    throw error;
  }
}