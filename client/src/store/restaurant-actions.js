import axios from "axios";
import { restaurantsActions } from "./restaurant";

export const getRestaurants = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/restaurant/getrestaurants"
      );
      dispatch(
        restaurantsActions.setRestaurants({
          restaurants: res.data,
        })
      );
    } catch (error) {
      return error.message;
    }
  };
};

export const getTopRestaurants = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/restaurant/gettoprestaurants"
      );
      dispatch(
        restaurantsActions.setTopRestaurants({
          topRestaurants: res.data,
        })
      );
    } catch (error) {
      return error.message;
    }
  };
};

export const getFilterRestaurants = (city, search, vegChecked) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/restaurant/searchrestaurants",
        { params: { city: city, search: search } }
      );
      let restaurantFilter = res.data;
      if (vegChecked) {
        restaurantFilter = restaurantFilter.filter(
          (restaurant) => restaurant.restaurantType == "Veg"
        );
      }
      dispatch(
        restaurantsActions.setFilterRestaurants({
          filterRestaurants:
            restaurantFilter.length > 0 ? restaurantFilter : [],
        })
      );
    } catch (error) {
      return error.message;
    }
  };
};
