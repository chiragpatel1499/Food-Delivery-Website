import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurantDetails: {},
  totalAmount: 0,
  cartFoodList: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    replaceCart(state, action) {
      state.restaurantDetails = action.payload.restaurantDetails;
      state.totalAmount = action.payload.totalAmount;
      state.cartFoodList = action.payload.cartFoodList;
    },
    clearCart(state,action){
        state.restaurantDetails={};
        state.totalAmount=0;
        state.cartFoodList=[];
    },
    addToCart(state, action) {},
    removeFromCart(state, action) {},
    removeItem(state, action) {},
  },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
