import { all, call, put, takeLatest } from "redux-saga/effects";
import { auth, getCurrentUser, handleUserProfile } from "../../firebase/utils";
import { signInSuccess } from "./user.actions";
import userTypes from "./user.types";

export function* getSnapshotFromUserAuth(user) {
    try {
        const userRef = yield call(handleUserProfile, { userAuth: user });
        const snapshot = yield userRef.get();

        yield put(
            signInSuccess({
                id: snapshot.id,
                ...snapshot.data()
            })
        );
    } catch (e)
    {
        // console.error(e);
    }
}

export function* emailSignIn({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);

    } catch (e) {
        // console.error(e);
    }
}

export function* onEmailSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);

    } catch (e) {
        // console.error(e);
    }
}

export function* onCheckUserSession() {
    yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export default function* userSagas() {
    yield all([call(onEmailSignInStart), call(onCheckUserSession)]);
}