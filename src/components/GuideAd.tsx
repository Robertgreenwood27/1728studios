import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/router';
import { auth } from "src/firebase/firebaseClient"; 
import usePremiumStatus from "src/stripe/usePremiumStatus";
import Image from "next/image";
import { Card, CardHeader, CardDescription, CardContent } from '@/components/ui/card';
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
      return (
        <div>
          <h2>Get premium access for $4.99!</h2>
          <button onClick={() => createCheckoutSession(user.uid)}>Upgrade Now</button>
        </div>
      );
    } else {
      router.push('/guides');
    }
  };

  return (
    <div className="flex justify-center p-12">
      <div className="cursor-pointer inline-block" onClick={handleGuideLinkClick}>
        <Card className="max-w-xl text-center">
          <CardHeader className="p-6">
            <Image src="/guidelogo.svg" alt="Guide Logo" width={500} height={300} className="w-auto h-auto mx-auto mb-3" />
            <CardDescription className="text-2xl mb-5">Talk to skilled AI educators!</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Image src="/guides.png" alt="Guides Preview" width={500} height={300} className="w-full h-auto mx-auto" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
