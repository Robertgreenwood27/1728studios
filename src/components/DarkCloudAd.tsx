import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/router';
import { auth } from "src/firebase/firebaseClient"; 
import usePremiumStatus from "src/stripe/usePremiumStatus";
import Image from "next/image";
import { createCheckoutSession } from "src/stripe/createCheckoutSession";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, Cloud } from "lucide-react";

export default function DarkCloudAd() {
  const [user, userLoading] = useAuthState(auth);
  const userIsPremium = usePremiumStatus(user ?? null);
  const router = useRouter();

  if (userLoading) return <div>Loading...</div>;

  const handleDarkCloudLinkClick = () => {
    if (!user) {
      router.push('/signIn');
    } else if (userIsPremium) {
      router.push('/darkcloud');
    } else {
      createCheckoutSession(user.uid);
    }
  };

  const features = [
    { icon: Shield, text: "Advanced AI Security" },
    { icon: Zap, text: "Real-time Threat Detection" },
    { icon: Cloud, text: "Scalable Cloud Architecture" },
  ];

  return (
    <Card
      className="max-w-md mx-auto my-8 p-6 bg-black cursor-pointer"
      onClick={handleDarkCloudLinkClick}
    >
      <CardContent>
        <div className="flex flex-col items-center">
          {/* Logo Section */}
          <Image
            src="/DarkCloudLogo.png" // Update the path to your logo image
            alt="Dark Cloud Logo"
            width={200} // Adjust width to make the logo larger
            height={200}
            className="mb-4"
          />

          <h2 className="text-2xl font-bold text-center mb-6">
            Explore the Depths of Dark Cloud!
          </h2>

          {/* Features List */}
          <div className="flex flex-col items-center mb-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center mb-2">
                <feature.icon className="w-6 h-6 mr-2" />
                <span className="text-lg">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
