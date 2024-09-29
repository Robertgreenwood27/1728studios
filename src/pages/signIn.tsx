import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'src/firebase/firebaseClient';
import usePremiumStatus from 'src/stripe/usePremiumStatus';
import Login from '@/components/Login'; // Your login component
import { createCheckoutSession } from 'src/stripe/createCheckoutSession';

export default function SignIn() {
  const [user, loading, error] = useAuthState(auth);
  const userIsPremium = usePremiumStatus(user ?? null);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && userIsPremium) {
      router.push('/guides');
    }
  }, [user, loading, userIsPremium, router]);

  if (loading) return <h1 className="text-center text-3xl font-bold mt-12">Loading...</h1>;
  if (error) return <div className="text-red-500 text-center mt-12">Error: {error.message}</div>;

  if (!user) return <Login />;

  if (user && !userIsPremium) {
    return (
      <div className="flex flex-col items-center mt-12">
        <h2 className="text-2xl font-bold mb-4">Get premium access for $4.99!</h2>
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700" onClick={() => createCheckoutSession(user.uid)}>Upgrade Now</button>
      </div>
    );
  }
}
