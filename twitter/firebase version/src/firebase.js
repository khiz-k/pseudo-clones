import firebase from "firebase";

const firebaseConfig = {
  //fill your own details
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
