const API_KEY = '46607456-5552cc86243543e4de6027df0';
const BASE_URL = 'https://pixabay.com/api/';

// Функція для запиту з Pixabay
export async function fetchImages(query, page = 1, perPage = 12) {
  const response = await fetch(
    `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );

  if (!response.ok) {
    throw new Error('Error fetching data');
  }

  return response.json();
}
