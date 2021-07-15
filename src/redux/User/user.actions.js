import userTypes from './user.types';
import { auth } from './../../firebase/utils';

/**
 * Set user state
 * @param user
 } user 
 * @returns typed user object
 */
export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user
});


/**
 * Authenticates user
 * @param {*} object 
 * @returns auth response
 */
export const signInUser = ({ email, password }) => async dispatch => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        dispatch({
            type: userTypes.SIGN_IN_SUCCESS,
            payload: true
        });
    } catch (e) {
        console.error(e);
    }
}