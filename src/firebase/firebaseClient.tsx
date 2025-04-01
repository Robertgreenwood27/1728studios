// import { initializeApp, getApps, getApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// // Firebase configuration variables loaded from environment variables
// const clientCredentials = {
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   };

// let app;

// if (getApps().length === 0) {
//   app = initializeApp(clientCredentials);
// } else {
//   app = getApp(); // if already initialized, use that one
// }

// const auth = getAuth(app);
// const firestore = getFirestore(app);

// Mock onAuthStateChanged function for development
const onAuthStateChanged = (auth, callback) => {
  // Immediately call the callback with null user
  setTimeout(() => callback(null), 0);
  // Return a no-op unsubscribe function
  return () => {};
};

// Mock auth object for development
const auth = {
  currentUser: null,
  signOut: async () => Promise.resolve(),
  onAuthStateChanged: (callback) => onAuthStateChanged(auth, callback)
};

// Mock firestore object for development
const firestore = {};

const logout = async () => {
  try {
    await auth.signOut();
    // Optionally, redirect user or perform other actions post-logout
  } catch (error) {
    console.error("Logout Error:", error);
  }
};

export { auth, firestore, logout, onAuthStateChanged };
