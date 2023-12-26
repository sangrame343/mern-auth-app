// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-6f5b4.firebaseapp.com",
  projectId: "mern-auth-6f5b4",
  storageBucket: "mern-auth-6f5b4.appspot.com",
  messagingSenderId: "18177852828",
  appId: "1:18177852828:web:fbee01609183e95070b459",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
