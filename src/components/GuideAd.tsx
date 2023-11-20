import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/router';
import { auth } from "src/firebase/firebaseClient"; 
import usePremiumStatus from "src/stripe/usePremiumStatus";
import Image from "next/image";
import { createCheckoutSession } from "src/stripe/createCheckoutSession";

export default function GuideAd() {
  const [user, userLoading] = useAuthState(auth);
  const userIsPremium = usePremiumStatus(user ?? null);
  const router = useRouter();

  if (userLoading) return <h1>Loading...</h1>;

  const handleGuideLinkClick = () => {
    if (!user) {
      router.push('/signIn');
    } else if (user && !userIsPremium) {
      // This block seems to be misplaced, it should be part of the rendered JSX
      // Consider moving this logic outside the event handler
    } else {
      router.push('/guides');
    }
  };

  // Render the block for non-premium users
  const renderNonPremiumContent = () => {
    return user && !userIsPremium ? (
      <div>
        <h2>Get premium access for $4.99!</h2>
        <button onClick={() => createCheckoutSession(user.uid)}>Upgrade Now</button>
      </div>
    ) : null;
  };

  return (
    <div className="flex p-12">
      <div className="cursor-pointer flex flex-col lg:flex-row items-center border border-blue-800 rounded-xl" onClick={handleGuideLinkClick}>
        <div className="flex-none">
          <Image src="/guidelogo.png" alt="Guide Logo" width={500} height={300} />
        </div>
        <div className="flex-grow text-center p-6">
          <div className="text-2xl mb-5">Talk to skilled AI educators!</div>
          <Image src="/guides.png" alt="Guides Preview" width={500} height={300} />
        </div>
      </div>
      {renderNonPremiumContent()}
    </div>
  );
}
