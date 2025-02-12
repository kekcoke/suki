import { all, call, put, takeLatest } from "redux-saga/effects";
import { auth, getCurrentUser, handleUserProfile } from "../../firebase/utils";
import { signInSuccess, signOutUserSuccess, userError } from "./user.actions";
import userTypes from "./user.types";

export function* getSnapshotFromUserAuth(user, additionalData = {}) {
    try {
        const userRef = yield call(handleUserProfile, { userAuth: user, additionalData });
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

export function* signOutUser() {
    try {
        yield auth.signOut();
        yield(
            put(
                signOutUserSuccess)
            )
    } catch (e) {
        // console.error(e);
    }
}

export function* onSignOutUserStart() {
    yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}

export function* signUpUser({ payload: { 
    displayName, 
    email, 
    password, 
    confirmPassword 
} }) {

    if (password !== confirmPassword) {
        const err = ['Passwords don\'t match'];
        yield put(
            userError(err)
        );

        return;
    }

    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        const additionalData = { displayName };
        // const userRef = yield call(handleUserProfile, { userAuth: user, additionalData: { displayName } });
        
        yield getSnapshotFromUserAuth(user, additionalData);
    } catch (e) {
        // console.error(e);
    }
}

export function* signUpUserStart() {
    yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser);
}

export default function* userSagas() {
    yield all([
        call(onEmailSignInStart), 
        call(onCheckUserSession),
        call(onSignOutUserStart),
        call(signUpUserStart)
    ]);
}