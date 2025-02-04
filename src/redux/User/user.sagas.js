import { takeLatest } from "redux-saga/effects";
import userTypes from "./user.types";

export function* emailSignIn({ payload: { email, password } }) {

}

export function* onEmailSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}