import { all, call, put, takeLatest } from "redux-saga/effects";
import { auth } from "./../../firebase/utils";
import { clearCart } from "./../Cart/cart.actions";
import { setOrderDetails, setUserOrderHistory } from "./orders.actions";
import {
  handleGetOrder,
  handleGetUserOrderHistory,
  handleSaveOrder,
} from "./orders.helpers";
import ordersTypes from "./orders.types";

export function* getUserOrderHistory({ payload }) {
  try {
    const history = yield handleGetUserOrderHistory(payload);

    yield put(setUserOrderHistory(history));
  } catch (e) {
    console.error(e);
  }
}

export function* onGetUserOrderHistoryStart() {
  yield takeLatest(
    ordersTypes.GET_USER_ORDER_HISTORY_START,
    getUserOrderHistory
  );
}

export function* saveOrder({ payload }) {
  try {
    const timestamps = new Date();
    yield handleSaveOrder({
      ...payload,
      orderUserID: auth.currentUser.uid,
      orderCreatedDate: timestamps,
    });

    yield put(clearCart());
  } catch (e) {
    console.error(e);
  }
}

export function* onSaveOrderHistoryStart() {
  yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START, saveOrder);
}

export function* getOrderDetails({ payload }) {
  try {
    const order = yield handleGetOrder(payload);
    console.log(order);
    yield put(setOrderDetails(order));
  } catch (e) {
    console.error(e);
  }
}

export function* onGetOrderDetailsStart() {
  yield takeLatest(ordersTypes.GET_ORDER_DETAILS_START, getOrderDetails);
}

export default function* orderSagas() {
  yield all([
    call(onSaveOrderHistoryStart),
    call(onGetOrderDetailsStart),
    call(onGetUserOrderHistoryStart),
  ]);
}
