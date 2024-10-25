import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Ініціалізуємо SimpleLightbox для галереї
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Функція для очищення галереї
export function clearGallery(galleryElement) {
  galleryElement.innerHTML = '';
}

// Функція для створення картки зображення
export function createImageCard(image) {
  return `
    <li class="gallery-item">
      <a href="${image.largeImageURL}" class="gallery-link">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${image.likes}</p>
        <p><b>Views:</b> ${image.views}</p>
        <p><b>Comments:</b> ${image.comments}</p>
        <p><b>Downloads:</b> ${image.downloads}</p>
      </div>
    </li>
  `;
}

// Функція для відображення галереї
export function renderGallery(galleryElement, images) {
  const markup = images.map(createImageCard).join('');
  galleryElement.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh(); // Оновлюємо SimpleLightbox після рендеру
}
