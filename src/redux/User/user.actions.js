import { auth, GoogleProvider } from './../../firebase/utils';
import userTypes from './user.types';

export const emailSignInStart = userCredentials => ({
    type: userTypes.EMAIL_SIGN_IN_START,
    payload: userCredentials
});

export const signInSuccess = user => ({
    type: userTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const checkUserSession = () => ({
    type: userTypes.CHECK_USER_SESSION
});

export const signOutUserStart = () => ({
    type: userTypes.SIGN_OUT_USER_START
});

export const signOutUserSuccess = () => ({
    type: userTypes.SIGN_OUT_USER_SUCCESS
});

export const signUpUserStart = userCredentials => ({
    type: userTypes.SIGN_UP_USER_START,
    payload: userCredentials
});

export const userError = err => ({
    type: userTypes.USER_ERROR,
    payload: err
});

export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user
});

export const resetAllAuthForms = () => ({
    type: userTypes.RESET_AUTH_FORMS
});

export const resetPassword = ({ email }) => async dispatch => {
    const config = {
        url: 'http://localhost:3000/login'
    };

    try {

        await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                dispatch({
                    type: userTypes.RESET_PASSWORD_SUCCESS,
                    payload: true
                });
            })
            .catch(() => {
                dispatch({
                    type: userTypes.RESET_PASSWORD_ERROR,
                    payload: ['Oops. Something went wrong. Contact us if the issue persists.']
                });
            });
    } catch (err) {
        // console.error(err);
    }
}

export const signInWithGoogle = () => async dispatch => {
    try 
    {
        await auth.signInWithPopup(GoogleProvider)
            .then(() => { 
                dispatch({
                    type: userTypes.SIGN_UP_SUCCESS,
                    payload: true
                });
            })
            .catch(() => {
            });

    } catch (e)
    {
        // console.error(e);
    }
}