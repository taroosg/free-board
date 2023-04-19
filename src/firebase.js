import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "free-board-6f46e.firebaseapp.com",
  projectId: "free-board-6f46e",
  storageBucket: "free-board-6f46e.appspot.com",
  messagingSenderId: "626952878418",
  appId: "1:626952878418:web:90a594a5cee6b5ea32628b"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export default app;