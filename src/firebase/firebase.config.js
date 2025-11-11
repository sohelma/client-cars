// src/firebase/firebase.config and auth setup
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCuYwPNDg_g0s6Co5YojAwLF6nVOqB6mko",
  authDomain: "rentwheels-auth-4626a.firebaseapp.com",
  projectId: "rentwheels-auth-4626a",
  storageBucket: "rentwheels-auth-4626a.firebasestorage.app",
  messagingSenderId: "1039335519519",
  appId: "1:1039335519519:web:be19c005a164e6583dec2a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


