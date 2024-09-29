import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from "src/firebase/firebaseClient";
import Image from 'next/image';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isValidPassword = (password: string) => password.length >= 6;

  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      // ... handle successful sign-in
    } catch (error) {
      console.error("Error signing in with Google:", error);
      // ... handle errors
    }
  }

  async function handleLoginOrCreateAccount() {
    if (!isValidEmail(email) || !isValidPassword(password)) {
      setErrorMessage('Invalid email or password.');
      return;
    }
  
    setLoading(true);
    setErrorMessage('');
  
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length === 0) {
        // No user found with this email, create a new account
        await createUserWithEmailAndPassword(auth, email, password);
        // TODO: Handle successful account creation, e.g., redirect to dashboard
      } else {
        // User exists with this email, sign them in
        await signInWithEmailAndPassword(auth, email, password);
        // TODO: Handle successful sign-in, e.g., redirect to dashboard
      }
    } catch (error) {
      console.error("Error in handleLoginOrCreateAccount:", error);
    
      let message = '';
      if (typeof error === 'object' && error !== null && 'code' in error) {
        const errorCode = (error as { code: string }).code;
        switch (errorCode) {
          case 'auth/wrong-password':
            message = 'Incorrect password. Please try again.';
            break;
          case 'auth/user-not-found':
            message = 'No user found with this email.';
            break;
          case 'auth/email-already-in-use':
            message = 'This email is already associated with an account. If you signed up with Google, please sign in with Google instead.';
            break;
          // Add more cases for other errors as needed
          default:
            message = 'An error occurred. Please try again.';
        }
      } else {
        // Handle the case where the error is not the expected type
        message = 'An unexpected error occurred.';
      }
    
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  }
  
  

  return (
    <div className="flex justify-center items-center">
      <div className="p-6 max-w-sm mx-auto rounded-xl shadow-md flex flex-col items-center space-x-4 border border-blue-800">
        <div className="text-xl font-medium text-white mb-4">Sign in or sign up</div>

        {/* Error Message */}
        {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}

        {/* Email Input */}
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full mb-2 p-2 rounded bg-black text-white border-none focus:outline-none focus:bg-black focus:text-white"
        />

        {/* Password Input */}
        <div className="relative w-full mb-4">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-2 rounded bg-black text-white border-none focus:outline-none focus:bg-black focus:text-white"
          />
          <span 
            onClick={togglePasswordVisibility} 
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
          >
            {/* Eye icon here (can use an emoji, SVG, or an image) */}
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </span>
        </div>

        {/* Sign in or Create Account Button */}
        <button 
          className="bg-blue-800 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 w-full" 
          onClick={handleLoginOrCreateAccount}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Sign in or Sign up'}
        </button>

        <p className="my-4">--or--</p>

        {/* Sign in with Google */}
        <button 
          className="flex items-center justify-center bg-[#4285F4] text-white font-bold py-2 px-4 rounded hover:bg-[#357ae8] w-full mb-4" 
          onClick={signInWithGoogle}
        >
          <Image src="/google-logo.png" alt="Google" width={20} height={20} />
          <span className="ml-2">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}
