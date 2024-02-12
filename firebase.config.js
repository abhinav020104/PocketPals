// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgkwRUJP2nz_jLp87vvHUr4PjIgtfdYZM",
  authDomain: "paytm2-e32e0.firebaseapp.com",
  projectId: "paytm2-e32e0",
  storageBucket: "paytm2-e32e0.appspot.com",
  messagingSenderId: "532391102410",
  appId: "1:532391102410:web:617eb4513a5d0200d77133",
  measurementId: "G-B6HE8FD6F6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);