import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'src/firebase/firebaseClient';
import usePremiumStatus from 'src/stripe/usePremiumStatus';
import { createCheckoutSession } from 'src/stripe/createCheckoutSession';

const GoPremium = () => {
  const router = useRouter();
  const [user, loading, authError] = useAuthState(auth);
  const [userIsPremium, premiumLoading] = usePremiumStatus(user ?? null);
  const [upgradeLoading, setUpgradeLoading] = useState(false);

  useEffect(() => {
    if (loading || premiumLoading) return;
    if (!user) {
      router.push('/signIn');
      return;
    }
    if (userIsPremium) {
      // If the user is already premium, no action needed here.
    }
  }, [user, loading, userIsPremium, premiumLoading, router]);

  const handleUpgrade = async () => {
    if (!user) return;
    setUpgradeLoading(true);
    try {
      await createCheckoutSession(user.uid);
    } catch (e) {
      console.error('Error initiating checkout session:', e);
      // Display an error message or show a toast notification
      alert('Error upgrading to premium. Please try again.');
    } finally {
      setUpgradeLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center">
      <div className="p-10 border border-blue-800 rounded-lg shadow-xl text-center">
        {userIsPremium ? (
          <>
            <h1 className="text-4xl font-bold mb-4">Thank You for Being a Valued Subscriber!</h1>
            <button
              onClick={() => router.push('/')}
              className="mt-4 text-gray-300 hover:text-gray-100 text-sm"
            >
              Home
            </button>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-4">Go Premium</h1>
            <p className="text-lg mb-8">
              Subscribe to get access for <span className="text-blue-400">$4.99 per month.</span>
            </p>
            {upgradeLoading ? (
              <div className="text-lg mb-8">Loading...</div>
            ) : (
              <button
                onClick={handleUpgrade}
                className="bg-blue-800 rounded hover:bg-blue-700 text-white font-bold py-2 px-4 transition duration-300 mb-4 mr-2"
              >
                Count Me In!
              </button>
            )}
            <button
              onClick={() => router.push('/')}
              className="text-gray-300 hover:text-gray-100 text-sm"
            >
              Return to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GoPremium;