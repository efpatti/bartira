// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBngjf1ctoM0Iy2-cHrhWy7a3BQRNviwtQ",
  authDomain: "bartira-d8e17.firebaseapp.com",
  projectId: "bartira-d8e17",
  storageBucket: "bartira-d8e17.appspot.com",
  messagingSenderId: "488014872342",
  appId: "1:488014872342:web:d22063e52c4afcf32e9a37",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
