import { combineReducers } from "redux";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./Cart/cart.reducer";
import ordersReducer from "./Orders/orders.reducer";
import productsReducer from "./Products/products.reducer";
import userReducer from "./User/user.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  productsData: productsReducer,
  cartData: cartReducer,
  ordersData: ordersReducer,
});

const configPersistStorage = {
  key: "root",
  storage,
  whiteList: ["cartData"],
};

export default persistReducer(configPersistStorage, rootReducer);
