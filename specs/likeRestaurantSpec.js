import { async } from 'regenerator-runtime';
import LikeButtonInitiator from '../src/scripts/utils/like-button-initiator';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Liking A Movie', () => {
    const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
}
beforeEach(()=>{
    addLikeButtonContainer();
})

  it('should show the like button when the restaurant has not been liked before', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.getElementById('likeButtonContainer'),
      restaurant: {
        id: 1,
      },
    });
    expect(document.querySelector('[aria-label="like this restaurant"]'))
      .toBeTruthy();
  });
  // separator
  it('should not show the unlike button when the restaurant has not been liked before ', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
      },
    });
    expect(document.querySelector('[aria-label="unlike this restaurant"]'))
      .toBeFalsy();
  });
  // separator
  it('should be able to like the restaurant',async()=>{
    await LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant:{
            id:1,
        }
    })
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);
    expect(restaurant).toEqual({id:1});
    FavoriteRestaurantIdb.deleteRestaurant(1);
  })

  it('should not add a movie again when its already liked',async()=>{
    await LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: {
            id:1,
        }
    })
    await FavoriteRestaurantIdb.putRestaurant({id:1})
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([{id:1}]);
    FavoriteRestaurantIdb.deleteRestaurant(1);
  })
  it('should not add a restaurant when it has no id',async()=>{
    await LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: {},
    })
    document.querySelector('#likeButton').dispatchEvent(new Event('click'))
    expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([]);
  })

});
