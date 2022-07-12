import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "aave-analytics.firebaseapp.com",
  databaseURL: "https://aave-analytics-default-rtdb.firebaseio.com",
  projectId: "aave-analytics",
  storageBucket: "aave-analytics.appspot.com",
  messagingSenderId: "1008192203225",
  appId: "1:1008192203225:web:ddb9d1751c8f2d7fc051c8",
  measurementId: "G-8ZVY1BNPLY",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
