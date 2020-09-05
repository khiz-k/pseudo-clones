import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBZy1UhetvzGUnshqlb9BnX43jjm4sf8q0",
  authDomain: "netflix-clone-19915.firebaseapp.com",
  databaseURL: "https://netflix-clone-19915.firebaseio.com",
  projectId: "netflix-clone-19915",
  storageBucket: "netflix-clone-19915.appspot.com",
  messagingSenderId: "463848174742",
  appId: "1:463848174742:web:02f0a024ab3952c1c07eb7",
  measurementId: "G-E0T7G0KMLY",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
