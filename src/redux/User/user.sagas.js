import { all, call, put, takeLatest } from "redux-saga/effects";
import { auth, handleUserProfile } from "../../firebase/utils";
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

        // dispatch({
        //     type: userTypes.SIGN_IN_SUCCESS,
        //     payload: true
        // });

    } catch (e) {
        // console.error(e);
    }
}

export function* onEmailSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export default function* userSagas() {
    yield all([call(onEmailSignInStart)]);
}