import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loader = document.getElementById('loader');

// Додаємо обробник події на форму
form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = event.currentTarget.elements.query.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query!',
    });
    return;
  }

  try {
    loader.classList.remove('hidden'); // Показуємо лоадер
    const data = await fetchImages(query); // Запит на API
    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'No Results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      clearGallery(gallery); // Очищаємо галерею
      renderGallery(gallery, data.hits); // Рендеримо нові зображення
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong! Please try again later.',
    });
  } finally {
    loader.classList.add('hidden'); // Ховаємо лоадер
  }
});
