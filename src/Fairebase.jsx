// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeAsYgbUU96UIzqgxnehnBOvWX1P8skio",
  authDomain: "chat-app-efdc7.firebaseapp.com",
  projectId: "chat-app-efdc7",
  storageBucket: "chat-app-efdc7.appspot.com",
  messagingSenderId: "219375251330",
  appId: "1:219375251330:web:1a798e5e9874744e83a99b",
  measurementId: "G-1GQPMPP3F2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);