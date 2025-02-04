import { auth } from './../../firebase/utils';
import userTypes from './user.types';

export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user
});

export const signInUser = ({ email, password }) => async dispatch => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        dispatch({
            type: userTypes.SIGN_IN_SUCCESS,
            payload: true
        });

    } catch (e) {
        // console.error(e);
    }
};

export const signUpUser = ({ displayName, email, password, confirmPassword }) => async dispatch => {
    const checkPasswordStrength = (password, confirmPassword) => {
        const err = [];
        if (password !== confirmPassword) {
            err.push('Passwords don\'t match');
        }
        if (String(password).length < 8) {
            err.push('Password must be minimum length of 8 characters');
        }

        dispatch({
            type: userTypes.SIGN_UP_ERROR,
            payload: err
        });
        return err;
    }

    const err = checkPasswordStrength(password, confirmPassword);

    if (err.length > 0)
        return;

    try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
        
        await user.updateProfile(user, { displayName });
        dispatch({
            type: userTypes.SIGN_UP_SUCCESS,
            payload: true
        });

    } catch (err) {
        // console.error(err);
    }
};
