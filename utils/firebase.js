import firebase from "firebase";

const prodConfig = {
  apiKey: "AIzaSyArOpiXW6HmPvmf_Z8f1dZcXk6BPKAb_X4",
  authDomain: "iot-remote-home.firebaseapp.com",
  databaseURL: "https://iot-remote-home.firebaseio.com",
  projectId: "iot-remote-home",
  storageBucket: "iot-remote-home.appspot.com",
  messagingSenderId: "1022390625873",
  appId: "1:1022390625873:web:8726070771922727347a70"
};

const devConfig = {
  apiKey: "AIzaSyArOpiXW6HmPvmf_Z8f1dZcXk6BPKAb_X4",
  authDomain: "iot-remote-home.firebaseapp.com",
  databaseURL: "https://iot-remote-home.firebaseio.com",
  projectId: "iot-remote-home",
  storageBucket: "iot-remote-home.appspot.com",
  messagingSenderId: "1022390625873",
  appId: "1:1022390625873:web:8726070771922727347a70"
};

//const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

export const firebaseImpl = firebase.initializeApp(prodConfig);
export const firebaseDatabase = firebase.database();
export const firebaseAuth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
