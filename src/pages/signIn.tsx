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

  if (loading) return <h1>Loading...</h1>;
  if (error) return <div>Error: {error.message}</div>;

  if (!user) return <Login />;

  if (user && !userIsPremium) {
    return (
      <div>
        <h2>Get premium access for $4.99!</h2>
        <button onClick={() => createCheckoutSession(user.uid)}>Upgrade Now</button>
      </div>
    );
  }

  // Optionally, include additional UI for authenticated users here
  return (
    <div>
      {/* Your UI for authenticated users */}
    </div>
  );
}
