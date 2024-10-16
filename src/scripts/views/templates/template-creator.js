import CONFIG from '../../globals/config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const createRestaurantDetailTemplate = (restaurant) => `
  <img id="maincontent" alt="Gambar Restaurant ${restaurant.name}" class="img-detail lazyload" data-src="${CONFIG.BASE_IMAGE_URL}${restaurant.pictureId}"></img>
  <hr/>
  <div id="restaurant-info">
  <h2>${restaurant.name}</h2> <h3>⭐️${restaurant.rating}</h3>
  <p>${restaurant.address} | ${restaurant.city}</p>
  <p>${restaurant.description}</p>
  </div>
  <hr/>
  <div id="menu-info">
  <h2>Menu</h2>
  <div class="menu">
  <ul>
  <h3>Minuman</h3>
  ${restaurant.menus.drinks.map((key) => (
    `<li>${key.name}</li>`
  )).join('')}
</ul>
<ul>
<h3>Makanan</h3>
  ${restaurant.menus.foods.map((key) => (
    `<li>${key.name}</li>`
  )).join('')}
</ul>
</div>
</div>
<hr/>
<div id="section-ulasan">
<h3> Review </h3>
<div class="container-ulasan">
${restaurant.customerReviews.map((key) => (
    `<div class="card">
  <h3>Nama : ${key.name}</h3>
  <h4>"${key.review}"</h4>
  <p>Tanggal : ${key.date}</p>
  </div>  
  `
  )).join('')}
  </div>
</div>
<hr/>
<div id="pendapat">
<h3> Ulasan Kamu </h3>
<form>
<input type="text" class="inputreview" placeholder="Nama" required></input>
<textarea type="text" class="namereviewer" placeholder="Ulasan Misal : Makanan Nya enak" required></textarea>
<button class="kirim-ulasan" aria-label="Kirim Ulasan">Kirim Ulasan</button>
</form>
</div>
</div>
  </div>
`;

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item">
    <div class="restaurant-item__header">
        <img class="restaurant-item__header__poster lazyload" alt="${restaurant.name}"
        data-src="${CONFIG.BASE_IMAGE_URL}${restaurant.pictureId}">
        <div >
              <p class="city" tabindex="0">City: ${restaurant.city}</p>
        </div>
    </div>
       <div class="rating" tabindex="0">
          <p><strong>Rating: ⭐</strong> ${restaurant.rating}</p>
       </div>
    <div class="restaurant-item__content">
        <h3>${restaurant.name}</h3>
        <p>${restaurant.description}</p>
        <button onclick="location.href='${`#/detail/${restaurant.id}`}'" type="button" aria-label="lihat lebih detail">Lihat</button>
        </div>
  </div>
  `;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const createUnavailableFavorite = () => `
      <div id="UnavailableFavorite">
      <h1 class="favorite-restaurant-not-found">Belum Ada Restoran Favorit Kamu</h1>
      </div>
`;

export {
  createRestaurantDetailTemplate,
  createRestaurantItemTemplate,
  createLikedButtonTemplate,
  createLikeButtonTemplate,
  createUnavailableFavorite,
};
