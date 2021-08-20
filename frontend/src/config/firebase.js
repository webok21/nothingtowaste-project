import firebase from "firebase";
// import "firebase/storage";
// Initialize Firebase/
const fireB = firebase.initializeApp({
    apiKey: "AIzaSyCH57NYEzkCrvKpMISaJ7sfZjDWLaaVafc",
    authDomain: "nothingtotrash-eda50.firebaseapp.com",
    projectId: "nothingtotrash-eda50",
    storageBucket: "nothingtotrash-eda50.appspot.com",
    messagingSenderId: "51131797082",
    appId: "1:51131797082:web:cb6a198fa804ddca4b5263",
    // databaseURL: process.env.REACT_APP_DBURL
});

export default fireB;