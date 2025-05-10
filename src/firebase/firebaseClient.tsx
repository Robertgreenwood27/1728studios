// src/firebase/firebaseClient.tsx
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration variables loaded from environment variables
const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app;

if (getApps().length === 0) {
  app = initializeApp(clientCredentials);
} else {
  app = getApp(); // if already initialized, use that one
}

const auth = getAuth(app);
const firestore = getFirestore(app);

// Helper function for logout
const logout = async () => {
  try {
    await signOut(auth);
    // Optionally, redirect user or perform other actions post-logout
  } catch (error) {
    console.error("Logout Error:", error);
  }
};

export { auth, firestore, logout, onAuthStateChanged };