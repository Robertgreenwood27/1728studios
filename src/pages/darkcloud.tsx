import React, { useState, useRef, useEffect } from 'react';
import { Shield, Zap, Database, Cloud, Cpu, Play, Pause } from 'lucide-react';
import Image from 'next/image';

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
          style={{ width: `${progress}%` }}
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

const DarkCloudLanding = () => {
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
      </main>
    </div>
  );
};

export default DarkCloudLanding;