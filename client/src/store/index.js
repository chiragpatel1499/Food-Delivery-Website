import {configureStore} from '@reduxjs/toolkit'
import userReducer from './user'
import cartReducer from './cart'
import restaurantReducer from './restaurant'
import orderReducer from './order'
const store = configureStore({
    reducer:{
        user:userReducer,
        cart:cartReducer,
        restaurant:restaurantReducer,
        order:orderReducer
    }
})
export default store;