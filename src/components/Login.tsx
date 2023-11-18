import React, { ReactElement } from "react";
import { signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { auth } from "src/firebase/firebaseClient";
import { getFirestore, doc, setDoc } from 'firebase/firestore';

export default function Login(): ReactElement {
  const firestore = getFirestore(); // Get Firestore instance

  async function signInWithGithub() {
    const userCredentials = await signInWithPopup(auth, new GithubAuthProvider());

    // Create or update the user document
    await setDoc(doc(firestore, "users", userCredentials.user.uid), {
      uid: userCredentials.user.uid,
      email: userCredentials.user.email,
      name: userCredentials.user.displayName,
      provider: userCredentials.user.providerData[0].providerId,
      photoUrl: userCredentials.user.photoURL,
    });
  }

  return (
    <div className="flex justify-center items-center">
      <div className="p-6 max-w-sm mx-auto rounded-xl shadow-md flex items-center space-x-4 border border-blue-800">
        <div className="flex flex-col items-center">
          <div className="text-xl font-medium text-white">Sign in or sign up with just a click</div>
          <button className="mt-4 bg-blue-800 text-white font-bold py-2 px-4 rounded hover:bg-blue-700" onClick={() => signInWithGithub()}>
            Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
