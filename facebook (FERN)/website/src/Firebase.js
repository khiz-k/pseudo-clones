import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA_nBCDDo18m5rEOa6UPOBZLasOAQmRCz4",
    authDomain: "fb-clone-5930d.firebaseapp.com",
    databaseURL: "https://fb-clone-5930d.firebaseio.com",
    projectId: "fb-clone-5930d",
    storageBucket: "fb-clone-5930d.appspot.com",
    messagingSenderId: "589194242028",
    appId: "1:589194242028:web:feacce06ad3b79acc202c9",
    measurementId: "G-KYLS8VZ3HM"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;