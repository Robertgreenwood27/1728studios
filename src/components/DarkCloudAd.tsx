import React from "react";
import { useRouter } from 'next/router';
import Image from "next/image";
import { Shield, Zap, Cloud } from "lucide-react";

export default function DarkCloudAd() {
  const router = useRouter();

  const handleDarkCloudLinkClick = () => {
    router.push('/darkcloud');
  };

  const features = [
    { icon: Shield, text: "Advanced AI Security" },
    { icon: Zap, text: "Real-time Threat Detection" },
    { icon: Cloud, text: "Scalable Cloud Architecture" },
  ];

  return (
    <div
      className="w-full max-w-md mx-auto bg-black text-white p-6 overflow-hidden cursor-pointer border border-white rounded-lg"
      onClick={handleDarkCloudLinkClick}
    >
      <div className="flex justify-center mb-4">
        <Image
          src="/DarkCloudLogo.png"
          alt="Dark Cloud Logo"
          width={200}
          height={200}
        />
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-6">
        Explore the Depths of Dark Cloud!
      </h2>

      <div className="flex flex-col items-center mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center mb-2">
            <feature.icon className="w-6 h-6 mr-2" />
            <span className="text-lg">{feature.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}