import restaurantdb from '../../data/restaurantdb-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const beranda = {
  async render() {
    return `
    <section class="hero" id="hero">
        <img src="./heros/hero-image_2.jpg" alt="Restaurant Hero Image" class="hero-image" tabindex="0">
        <div class="hero-content">
            <h1 tabindex="0">Welcome to Our Restaurant</h1>
            <p tabindex="0">Explore the world of great dining with us</p>

            <!-- Search Bar -->
            <div class="search-bar">
                <input type="text" id="search-input" placeholder="Search by city" aria-label="Search for restaurants by city">
                <button class="search-btn" aria-label="Search restaurants">Search</button>
            </div>
        </div>
    </section>

    <!-- Daftar Restoran -->
    <section id="restaurant-list">
        <h2 tabindex="0">Daftar Restoran</h2>
        <div class="restaurant-container" id="restaurants">
            <!-- Content will be inserted here via JavaScript -->
        </div>
    </section>
    `;
  },

  async afterRender() {
    const restaurants = await restaurantdb.beranda();
    const restaurantContainer = document.querySelector('#restaurants');
    const searchInput = document.querySelector('#search-input');
    const searchButton = document.querySelector('.search-btn');

    // Display all restaurants initially
    displayRestaurants(restaurants);

    // Search button event listener
    searchButton.addEventListener('click', () => {
      const query = searchInput.value.trim().toLowerCase();
      if (query) {
        filterRestaurantsByCity(query);
      } else {
        displayRestaurants(restaurants); // Show all if no query
      }
    });

    // Search input enter key event listener
    searchInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        const query = searchInput.value.trim().toLowerCase();
        if (query) {
          filterRestaurantsByCity(query);
        } else {
          displayRestaurants(restaurants); // Show all if no query
        }
      }
    });

    function filterRestaurantsByCity(city) {
      const filteredRestaurants = restaurants.filter((restaurant) =>
        restaurant.city.toLowerCase().includes(city)
      );
      displayRestaurants(filteredRestaurants);
    }

    function displayRestaurants(restaurants) {
      restaurantContainer.innerHTML = '';
      restaurants.forEach((restaurant) => {
        restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    }
  },
};

export default beranda;
