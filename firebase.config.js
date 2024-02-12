// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfFFxPdSuibwltxXKBXWzgtktWY1N7qwM",
  authDomain: "paytm-60846.firebaseapp.com",
  projectId: "paytm-60846",
  storageBucket: "paytm-60846.appspot.com",
  messagingSenderId: "947876174398",
  appId: "1:947876174398:web:6bed77484e93a3ec400f6f",
  measurementId: "G-SPCTLMB1ED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);