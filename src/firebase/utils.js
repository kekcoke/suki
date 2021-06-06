import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './config';

// if duplicate instance exists. Add IF/ELSE block
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider);

export const handleUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const { uid } = userAuth;

  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, phoneNumber: phone } = userAuth;
    const timestamp = new Date();
    // if via email provider auth, use phone from useAuth. else it comes from signup form. get the phone value.
    // Note that email providers may not have address and that address object passed on here. Create missing stuff elsewhere.
    let userObject;
    if (phone) {
      userObject = {
        displayName,
        email,
        createdDate: timestamp,
        phone,
        ...additionalData
      } 
    } else {
        userObject = {
          displayName,
          email,
          createdDate: timestamp,
          ...additionalData
        }
    }

    try {
      await userRef.set(userObject);
    } catch(err) {
      console.error(err);
    }
  }

  return userRef;
};