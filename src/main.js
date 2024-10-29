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

let query = '';
let page = 1;
const perPage = 15;

// Ініціалізація SimpleLightbox
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Показуємо або приховуємо лоадер та кнопку "Load more"
function toggleLoader(showLoader = false) {
  loader.style.display = showLoader ? 'block' : 'none';
  loadMoreBtn.style.display = showLoader ? 'none' : 'block';
}

// Функція для завантаження зображень з API
async function loadImages() {
  toggleLoader(true);

  try {
    const data = await fetchImages(query, page, perPage);

    if (data.hits.length === 0 && page === 1) {
      iziToast.warning({
        title: 'No Results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      loadMoreBtn.style.display = 'none';
    } else {
      renderGallery(data.hits);
      lightbox.refresh();

      // Перевірка на кінець колекції
      if (page * perPage >= data.totalHits) {
        loadMoreBtn.style.display = 'none';
        iziToast.info({
          title: 'End of Results',
          message: "We're sorry, but you've reached the end of search results.",
        });
      } else {
        loadMoreBtn.style.display = 'block';
      }

      // Плавне прокручування сторінки
      smoothScroll();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong! Please try again later.',
    });
  } finally {
    toggleLoader(false);
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

  page = 1; // Скидаємо значення сторінки при новому запиті
  clearGallery(); // Очищуємо галерею
  loadMoreBtn.style.display = 'none'; // Ховаємо кнопку перед завантаженням
  loadImages();
});

// Обробка кліку на кнопку "Load more"
loadMoreBtn.addEventListener('click', () => {
  page += 1;
  loadImages();
});

