import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB16iPvDR1xbxsSfkmbUv3SIGDXdPaggXw",
  authDomain: "fcit-connect.firebaseapp.com",
  projectId: "fcit-connect",
  storageBucket: "fcit-connect.firebasestorage.app",
  messagingSenderId: "685215482197",
  appId: "1:685215482197:web:32a808ada69ee9003d6fdc",
  measurementId: "G-W39HCZG18N"
};


const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
