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
let totalHits = 0;

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
      totalHits = 0;
      clearGallery();
    }

    // Показуємо лоадер перед початком запиту
    loader.style.display = 'block';

    // Приховуємо кнопку "Load more" до отримання результатів запиту
    loadMoreBtn.style.display = 'none';

    const response = await fetchImages(query, page);

    if (!response || !response.hits || response.hits.length === 0) {
      iziToast.warning({
        title: 'No Results',
        message: 'No images found for your query. Please try again!',
      });
      return;
    }

    if (page === 1) {
      totalHits = response.totalHits;
    }

    renderGallery(response.hits);
    lightbox.refresh();

    // Якщо завантажені всі доступні зображення, ховаємо кнопку і показуємо повідомлення
    if (page * 15 >= totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: 'End of Results',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      loadMoreBtn.style.display = 'block';
      page++;
    }

    smoothScroll();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong! Please try again later.',
    });
  } finally {
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
  const newQuery = event.currentTarget.elements.query.value.trim();

  if (!newQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query!',
    });
    return;
  }

  loadMoreBtn.style.display = 'none';
  loadImages(newQuery);
});

// Обробка кліку на кнопку "Load more"
loadMoreBtn.addEventListener('click', () => {
  loadImages();
});
