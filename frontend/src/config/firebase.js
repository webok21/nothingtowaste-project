import firebase from "firebase";
// Initialize Firebase/
const fireB = firebase.initializeApp({
    apiKey: "AIzaSyCH57NYEzkCrvKpMISaJ7sfZjDWLaaVafc",
    authDomain: "nothingtotrash-eda50.firebaseapp.com",
    projectId: "nothingtotrash-eda50",
    storageBucket: "nothingtotrash-eda50.appspot.com",
    messagingSenderId: "51131797082",
    appId: "1:51131797082:web:cb6a198fa804ddca4b5263"
    // databaseURL: process.env.REACT_APP_DBURL
});

export default fireB;

// apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGIN_SENDER_ID,
//     appId: process.env.REACT_APP_APP_ID,