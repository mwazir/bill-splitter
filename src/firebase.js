// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDebu6sm5bQbiVoFn3jqHuIeldujQyDeE",
    authDomain: "bill-splitter-app-45851.firebaseapp.com",
    databaseURL: "https://bill-splitter-app-45851-default-rtdb.firebaseio.com",
    projectId: "bill-splitter-app-45851",
    storageBucket: "bill-splitter-app-45851.appspot.com",
    messagingSenderId: "881472333481",
    appId: "1:881472333481:web:0345759b6f323509aa6bb8"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;