import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDtz-BgzRJsXRmN_Dc-szFOlPxcGR8cfWM",
  authDomain: "tiktok-clone-8ade4.firebaseapp.com",
  databaseURL: "https://tiktok-clone-8ade4.firebaseio.com",
  projectId: "tiktok-clone-8ade4",
  storageBucket: "tiktok-clone-8ade4.appspot.com",
  messagingSenderId: "839475659459",
  appId: "1:839475659459:web:97e69ec1eba4603586d876",
  measurementId: "G-6BY79G0F55",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
