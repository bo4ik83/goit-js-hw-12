import axios from 'axios';

const API_KEY = '46607456-5552cc86243543e4de6027df0';
const BASE_URL = 'https://pixabay.com/api/';

// Функція для запиту з Pixabay
async function fetchImages(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: query,
        page: page,
        key: API_KEY,
        image_type: 'photo',
        per_page: 12
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;  // Рекомендується кидати помилку для обробки на рівні виклику функції
  }
}

export default fetchImages;
