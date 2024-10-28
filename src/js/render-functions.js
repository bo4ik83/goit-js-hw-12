export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images
    .map(image => {
      return `
      <a href="${image.largeImageURL}" class="gallery-item">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        <div class="info">
          <p>Likes: ${image.likes}</p>
          <p>Views: ${image.views}</p>
          <p>Comments: ${image.comments}</p>
          <p>Downloads: ${image.downloads}</p>
        </div>
      </a>
    `;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);

  // Додаємо прокручування після додавання нових зображень
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}
