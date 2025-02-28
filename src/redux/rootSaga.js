import { all, call } from "redux-saga/effects";
import orderSagas from "./Orders/orders.sagas";
import productsSagas from "./Products/products.sagas";
import userSagas from "./User/user.sagas";

export default function* rootSaga() {
  yield all([call(userSagas), call(productsSagas), call(orderSagas)]);
}
