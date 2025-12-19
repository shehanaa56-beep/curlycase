import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCETBWT2searmpgf6G9FiRP6DXT9SUlBHw",
  authDomain: "curlycase-ed77f.firebaseapp.com",
  databaseURL: "https://curlycase-ed77f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "curlycase-ed77f",
  storageBucket: "curlycase-ed77f.firebasestorage.app",
  messagingSenderId: "97088251240",
  appId: "1:97088251240:web:00fc03d54668677e8122dd",
  measurementId: "G-40BFF0WP2R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
