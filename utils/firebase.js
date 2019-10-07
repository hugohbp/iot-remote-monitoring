import firebase from "firebase";
import credencial from "./credencials.json";

const prodConfig = credencial;
const devConfig = credencial;

export const firebaseImpl = firebase.initializeApp(prodConfig);
export const firebaseDatabase = firebase.database();
export const firebaseAuth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
