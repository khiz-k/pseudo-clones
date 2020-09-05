import firebase from "firebase";

const firebaseConfig = {
  // your own details
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
