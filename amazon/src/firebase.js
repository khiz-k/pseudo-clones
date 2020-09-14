import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCS6ILsyaYBgSgfcjYQYkckKPW5aRapiOI",
  authDomain: "clone-f1c46.firebaseapp.com",
  databaseURL: "https://clone-f1c46.firebaseio.com",
  projectId: "clone-f1c46",
  storageBucket: "clone-f1c46.appspot.com",
  messagingSenderId: "695874079140",
  appId: "1:695874079140:web:ff355bf98894c395f39931",
  measurementId: "G-YDR1W4RGN5",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
