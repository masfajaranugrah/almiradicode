import LikeButtonInitiator from "../src/scripts/utils/like-button-initiator";
import FavoriteRestaurantIdb from "../src/scripts/data/favorite-restaurant-idb";
import { async } from "regenerator-runtime";

describe('Unliking A Restaurant',()=>{
    const addLikeButtonContainer = () =>{
        document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    }
    beforeEach(async()=>{
        addLikeButtonContainer();
        await FavoriteRestaurantIdb.putRestaurant({id:1});
    })
    afterEach(async()=>{
        await FavoriteRestaurantIdb.deleteRestaurant(1);
    })

    it('Should display unlike widget when the Restaurant has been liked',async()=>{
        await LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            restaurant:{
                id:1,
            }  
        })
        expect(document.querySelector('[aria-label="unlike this restaurant"]'))
        .toBeTruthy();
    })
    //separator
    it('should not display like widget when the restaurant has been liked',async()=>{
        await LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            restaurant:{
                id:1,
            }
        })
        expect(document.querySelector('[aria-label="like this restaurant"]'))
        .toBeFalsy();
    })
    //separator
    it('Should be able to remove likde restaurant from the list',async()=>{
        await LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            restaurant: {
                id:1,
            }
        })
        document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));
        expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([]);
    })
    //separator
    it('should not throw error if the unliked restaurant is not in the list',async()=>{
        await LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            restaurant: {
                id:1,
            }
        })
        await FavoriteRestaurantIdb.deleteRestaurant(1);
        document.querySelector('[aria-label="unlike this restaurant"]')
        expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([])
    })
})