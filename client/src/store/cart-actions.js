import axios from "axios";
import { cartActions } from "./cart";

const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
};
export const fetchCartData = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:5000/cart/getcart", {
        headers: headers,
      });
      const { totalAmount, cartFoodList, restaurantDetails } = res.data;
      dispatch(
        cartActions.replaceCart({
          totalAmount: totalAmount?totalAmount:0,
          cartFoodList: cartFoodList?cartFoodList:[],
          restaurantDetails: restaurantDetails,
        })
      );
    } catch (error) {
      return error.message;
    }
  };
};

export const addFoodToCart = (foodData) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}cart/addtocart`,
        foodData,
        {
          headers: headers,
        }
      );
      dispatch(fetchCartData());
    } catch (error) {}
  };
};

export const removeFoodFromCart = (foodData) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}cart/reducequantitytocart`,
        foodData,
        {
          headers: headers,
        }
      );
      dispatch(fetchCartData());
    } catch (error) {
      return error.message;
    }
  };
};

export const removeFoodItem = (foodData) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}cart/removefromcart`,
        foodData,
        {
          headers: headers,
        }
      );
      dispatch(fetchCartData());
    } catch (error) {}
  };
};
