// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsrWNsG7A8eWcKDyCh3ZZh0BSNYiy-cZQ",
  authDomain: "bruta2.firebaseapp.com",
  projectId: "bruta2",
  storageBucket: "bruta2.firebasestorage.app",
  messagingSenderId: "273775142922",
  appId: "1:273775142922:web:861c6ddec5791541a517f3",
  measurementId: "G-FD6CXZG150"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Firestore instance
export const db = getFirestore(app);