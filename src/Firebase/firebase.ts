import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import config from './config';

const Firebase = firebase.initializeApp(config.firebase);

export const auth = firebase.auth();
export default Firebase;