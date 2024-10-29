import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.getElementById('load-more');
const loader = document.getElementById('loader');

let page = 1; 
let query = ''; 

// Ініціалізація SimpleLightbox
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Функція для завантаження зображень з API
async function loadImages(newQuery = '') {
  try {
    if (newQuery) {
      page = 1;
      query = newQuery;
    }
    
    // Показуємо лоадер перед початком запиту
    loader.style.display = 'block';

    // Приховуємо кнопку "Load more" до отримання результатів запиту
    loadMoreBtn.style.display = 'none';

    const response = await fetchImages(query, page);

    if (!response || !response.hits || response.hits.length === 0) {
      iziToast.warning({
        title: 'Error',
        message: 'Something went wrong! Please try again later.',
      });
      return;
    }

    renderGallery(response.hits);
    lightbox.refresh();

    // Якщо є більше зображень для завантаження, показуємо кнопку
    if (response.hits.length === 15) {
      loadMoreBtn.style.display = 'block';
      page++;
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong! Please try again later.',
    });
  } finally {
    // Ховаємо лоадер після завершення запиту (успішного чи з помилкою)
    loader.style.display = 'none';
  }
}

// Функція для плавного прокручування
function smoothScroll() {
  const firstCard = gallery.firstElementChild;
  if (firstCard) {
    const { height: cardHeight } = firstCard.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}

// Обробка події сабміту форми
form.addEventListener('submit', event => {
  event.preventDefault();
  query = event.currentTarget.elements.query.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query!',
    });
    return;
  }

  clearGallery();
  loadMoreBtn.style.display = 'none';
  loadImages(query); 
});

// Обробка кліку на кнопку "Load more"
loadMoreBtn.addEventListener('click', () => {
  loadImages();
});
