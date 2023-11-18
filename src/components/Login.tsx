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
    <div>
      <button onClick={() => signInWithGithub()}>Sign in with GitHub</button>
    </div>
  );
}

