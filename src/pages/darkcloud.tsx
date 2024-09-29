import React, { useState, useRef, useEffect } from 'react';
import { Shield, Zap, Database, Cloud, Cpu, Play, Pause, Bell, FileText } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="border border-blue-500 bg-black bg-opacity-40 p-6 rounded-xl shadow-lg backdrop-blur-sm">
    <Icon className="text-blue-500 w-12 h-12 mb-4" />
    <h3 className="text-xl font-semibold mb-2 text-blue-300">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressChange = (e) => {
    const video = videoRef.current;
    const progressBar = progressRef.current;
    const pos = (e.pageX - progressBar.offsetLeft) / progressBar.offsetWidth;
    video.currentTime = pos * video.duration;
  };

  return (
    <div className="relative">
      <video 
        ref={videoRef}
        className="w-full rounded-xl shadow-lg" 
        loop 
        playsInline
        onClick={togglePlayPause}
      >
        <source src="/DarkCloudVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div 
        ref={progressRef}
        className="absolute bottom-0 left-0 w-full h-1 bg-gray-700 cursor-pointer"
        onClick={handleProgressChange}
      >
        <div 
          className="h-full bg-blue-500" 
          style={{ width: `${progress}%` }} // Use template literals
        ></div>
      </div>
      <button 
        onClick={togglePlayPause}
        className="absolute bottom-4 right-4 bg-blue-500 bg-opacity-75 hover:bg-opacity-100 transition-opacity duration-300 rounded-full p-2"
      >
        {isPlaying ? (
          <Pause className="w-8 h-8 text-white" />
        ) : (
          <Play className="w-8 h-8 text-white" />
        )}
      </button>
    </div>
  );
};

const DarkCloudAd = () => {
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
            <feature.icon className="w-6 h-6 mr-2" /> {/* Corrected to use capitalized component */}
            <span className="text-lg">{feature.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const DarkCloudLanding = () => {
  const [email, setEmail] = useState('');

  const features = [
    {
      icon: Zap,
      title: "Real-Time Processing",
      description: "Analyze data streams in real-time to identify and respond to threats with minimal latency."
    },
    {
      icon: Cpu,
      title: "AI-Driven Adaptability",
      description: "Continuously learn and adapt to evolving threat landscapes through advanced AI techniques."
    },
    {
      icon: Shield,
      title: "Data Isolation and Security",
      description: "Utilize nested Kubernetes control planes to ensure robust protection for sensitive data."
    },
    {
      icon: Cloud,
      title: "Scalable Architecture",
      description: "Seamlessly handle increasing data volumes and complexity with our Kubernetes-based deployment."
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <div className="text-white min-h-screen">
      <header className="border-b border-blue-500 py-8 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Image src="/DarkCloudLogo.png" alt="DarkCloud Logo" width={200} height={67} />
          <div>
            <h1 className="text-4xl font-bold mb-2 text-blue-300">AI-Driven Cybersecurity System</h1>
            <p className="text-xl text-gray-300">Next-generation protection for your digital assets</p>
          </div>
        </div>
      </header>

      <section className="py-16 bg-black bg-opacity-30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <VideoPlayer />
        </div>
      </section>

      <main className="container mx-auto px-4 py-16">
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-blue-300">System Overview</h2>
          <p className="text-lg mb-4 text-gray-300">
            Our groundbreaking AI-driven cybersecurity system is designed to process, analyze, and act on streaming network data in real-time. Leveraging cutting-edge artificial intelligence and a scalable Kubernetes-based architecture, we offer a dynamic, adaptable, and efficient solution to modern cybersecurity challenges.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-blue-300">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </section>

        <section className="border border-blue-500 bg-black bg-opacity-40 p-6 rounded-xl backdrop-blur-sm">
          <h2 className="text-3xl font-semibold mb-8 text-blue-300">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-lg space-y-4 text-gray-300">
            <li>Proactive threat detection and response</li>
            <li>Continuous learning and adaptation to new threats</li>
            <li>Scalable solution suitable for businesses of all sizes</li>
            <li>Enhanced data security through advanced containerization</li>
            <li>Reduced latency in threat detection and mitigation</li>
          </ul>
        </section>

        <section className="mt-16 border border-blue-500 bg-black bg-opacity-40 p-8 rounded-xl backdrop-blur-sm text-center">
          <h2 className="text-3xl font-semibold mb-4 text-blue-300">Coming Soon</h2>
          <p className="text-lg mb-6 text-gray-300">
            Our cutting-edge AI-driven cybersecurity system is currently in its final stages of development. 
            We&apos;re working hard to bring you the most advanced protection for your digital assets.
          </p>
          
        </section>

        <section className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-xl text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">Want to dive deeper?</h2>
        <p className="text-xl mb-6 text-white">
          Explore the technical details and innovative features of our AI-driven cybersecurity system.
        </p>
        <Link 
          href="/whitepaper"
          className="inline-flex items-center px-6 py-3 text-lg font-semibold text-blue-600 bg-white rounded-full hover:bg-blue-100 transition duration-300"
        >
          <FileText className="mr-2" />
          Read our White Paper
        </Link>
      </section>
      </main>

    </div>
  );
};

export default function DarkCloud() {
  return (
    <div>
      <DarkCloudLanding />
    </div>
  );
}
