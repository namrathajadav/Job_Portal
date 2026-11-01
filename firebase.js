import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBUUAOepnY1CybjhEyRdszh4omB8Y4a7Kc",
  authDomain: "authentication-2cc4b.firebaseapp.com",
  databaseURL: "https://authentication-2cc4b-default-rtdb.firebaseio.com",
  projectId: "authentication-2cc4b",
  databaseURL: "https://authentication-2cc4b-default-rtdb.firebaseio.com",
  storageBucket: "authentication-2cc4b.firebasestorage.app",
  messagingSenderId: "413394516573",
  appId: "1:413394516573:web:9e4849da2fdc6b15eeabb4",
  measurementId: "G-FEM9KCP1C4"
};

export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const database = getDatabase(app);