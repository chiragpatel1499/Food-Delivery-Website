import axios from "axios";
import { orderActions } from "./order";
import { useSelector } from "react-redux";
const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
};

// fetch past order for both user + delivery executive
export const getPastOrders = (role) => {
  return async (dispatch) => {
    try {
      if (role === "NU") {
        const res = await axios.get(
          "http://localhost:5000/order/getuserorder",
          {
            headers: headers,
          }
        );
        console.log(res.data);
        dispatch(
          orderActions.setPastOrders({
            pastOrders: res.data.length > 0 ? res.data : [],
          })
        );
      } else {
        const res = await axios.get(
          "http://localhost:5000/delivery/getdeliveryexecutivepastorders",
          {
            headers: headers,
          }
        );
        dispatch(
          orderActions.setPastOrders({
            pastOrders: res.data.length > 0 ? res.data : [],
          })
        );
      }
    } catch (error) {
      return error.message;
    }
  };
};
