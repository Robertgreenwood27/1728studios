import React from "react";
import { useRouter } from 'next/router';
import usePremiumStatus from "../stripe/usePremiumStatus";
import Image from "next/image";
import { createCheckoutSession } from "src/stripe/createCheckoutSession";

export default function GuideAd() {
  // Mock user and loading state since we're not using Firebase auth
  const [user, userLoading] = [null, false];
  const userIsPremium = usePremiumStatus(user ?? null);
  const router = useRouter();

  if (userLoading) return <div>Loading...</div>;

  const handleGuideLinkClick = () => {
    if (!user) {
      router.push('/signIn');
    } else if (userIsPremium) {
      router.push('/guides');
    } else {
      createCheckoutSession(user.uid);
    }
  };

  return (
    <div
      className="w-full max-w-md mx-auto bg-black text-white overflow-hidden cursor-pointer border border-white rounded-lg"
      onClick={handleGuideLinkClick}
    >
      <div className="p-6">
        <div className="flex justify-center mb-4">
          <Image src="/guidelogo.png" alt="The Guide Logo" width={150} height={75} />
        </div>
        <h2 className="text-xl font-bold text-center mb-4">Talk to skilled AI educators!</h2>
        <div className="relative w-full" style={{ paddingBottom: '75%' }}>
          <Image 
            src="/guides.png"
            alt="AI Educators"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
}
