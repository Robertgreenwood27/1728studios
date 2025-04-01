//index.tsx
import React from 'react';
import { ArrowRight, Brain, Zap, Users, Code, BarChart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => (
  <div className="relative min-h-[80vh] flex items-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-r from-black to-blue-900/30 z-10"></div>
      <div className="w-full h-full bg-black opacity-80 absolute"></div>
      {/* Image placeholder - AI image generation prompt: 
         "A futuristic, dark tech environment with blue digital particles and neural network visualizations,
         representing AI and human collaboration, with a professional and sleek aesthetic" */}
    </div>
    
    <div className="container mx-auto px-4 z-10 py-20">
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
          Increasing Human Potential Through <span className="text-blue-400">AI Partnership</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          At 1728 Studios, we&apos;re pioneering the future of human-AI collaboration, 
          creating innovative solutions that enhance productivity and unlock new possibilities.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/consulting" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-300 flex items-center">
            Our Services <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link href="/projects" className="px-6 py-3 bg-transparent border border-blue-500 hover:border-blue-400 text-blue-400 rounded-full transition-colors duration-300">
            Explore Projects
          </Link>
        </div>
      </div>
    </div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="border border-blue-500 bg-black bg-opacity-40 p-6 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105">
    <div className="flex justify-center">
      <Icon className="text-blue-500 w-12 h-12 mb-4" />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-center text-blue-300">{title}</h3>
    <p className="text-gray-300 text-center">{description}</p>
  </div>
);

const AboutSection = () => (
  <div className="py-20 bg-black bg-opacity-60">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4 text-blue-300">Who We Are</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          We&apos;re a team of AI specialists, developers, and business strategists dedicated to 
          creating technology that works alongside humans, not replacing them.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <FeatureCard 
          icon={Brain}
          title="AI Expertise"
          description="Deep knowledge of artificial intelligence, machine learning, and neural networks to build cutting-edge solutions."
        />
        <FeatureCard 
          icon={Users}
          title="Human-Centered"
          description="We design with humans in mind, creating AI systems that enhance capabilities rather than replace them."
        />
        <FeatureCard 
          icon={Zap}
          title="Innovation Focus"
          description="Constantly pushing boundaries to develop new approaches to AI integration and application."
        />
      </div>
    </div>
  </div>
);

const ProjectsPreview = () => (
  <div className="py-20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-300">Our Solutions</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Explore our flagship projects that demonstrate our commitment to enhancing human potential through AI.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="border border-blue-500 bg-black bg-opacity-40 p-6 rounded-xl shadow-lg overflow-hidden group">
          <div className="relative h-48 mb-6 overflow-hidden rounded-lg bg-blue-900/30">
            {/* Using existing image, but if needed, AI image generation prompt: 
               "A professional visualization of an AI guide or teacher, with glowing blue interface elements,
               showing a futuristic learning environment with subtle digital elements" */}
            <Image 
              src="/guidelogo.png" 
              alt="The Guide" 
              fill 
              className="object-contain bg-black transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-blue-300">The Guide</h3>
          <p className="text-gray-300 mb-4">
            AI educators designed to provide personalized learning experiences and knowledge transfer.
          </p>
          <Link href="/projects" className="text-blue-400 flex items-center">
            Learn more <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        <div className="border border-blue-500 bg-black bg-opacity-40 p-6 rounded-xl shadow-lg overflow-hidden group">
          <div className="relative h-48 mb-6 overflow-hidden rounded-lg bg-blue-900/30">
            {/* Using existing image, but if needed, AI image generation prompt: 
               "A sleek, dark cybersecurity interface with blue glowing elements, showing a shield or protective
               barrier visualization, representing advanced AI security technology" */}
            <Image 
              src="/DarkCloudLogo.png" 
              alt="Dark Cloud" 
              fill 
              className="object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-blue-300">Dark Cloud</h3>
          <p className="text-gray-300 mb-4">
            Advanced AI-driven cybersecurity system for real-time threat detection and protection.
          </p>
          <Link href="/projects" className="text-blue-400 flex items-center">
            Learn more <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

const ServicesPreview = () => (
  <div className="py-20 bg-black bg-opacity-60">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-300">Our Services</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          We offer comprehensive consulting services to help businesses integrate AI effectively.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="flex items-start p-4">
          <Code className="text-blue-500 w-8 h-8 mr-4 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-300">AI Solution Development</h3>
            <p className="text-gray-300">
              Custom AI applications tailored to your specific business needs and challenges.
            </p>
          </div>
        </div>
        
        <div className="flex items-start p-4">
          <BarChart className="text-blue-500 w-8 h-8 mr-4 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-300">Workflow Automation</h3>
            <p className="text-gray-300">
              Streamline operations by automating repetitive tasks with intelligent AI systems.
            </p>
          </div>
        </div>
        
        <div className="flex items-start p-4">
          <Brain className="text-blue-500 w-8 h-8 mr-4 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-300">AI Strategy Development</h3>
            <p className="text-gray-300">
              Comprehensive roadmaps for integrating AI into your business processes and culture.
            </p>
          </div>
        </div>
        
        <div className="flex items-start p-4">
          <Zap className="text-blue-500 w-8 h-8 mr-4 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-300">Performance Optimization</h3>
            <p className="text-gray-300">
              Fine-tune your existing AI implementations to maximize effectiveness and ROI.
            </p>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-12">
        <Link href="/consulting" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-300 inline-flex items-center">
          View All Services <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  </div>
);

const CTASection = () => (
  <div className="py-20">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-900 to-blue-700 p-12 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-white">Ready to Transform Your Business?</h2>
        <p className="text-xl text-gray-200 mb-8">
          Partner with 1728 Studios to harness the power of AI and unlock new levels of productivity and innovation.
        </p>
        <Link href="/contact" className="px-8 py-4 bg-white text-blue-900 hover:bg-gray-100 rounded-full text-lg font-semibold transition-colors duration-300 inline-block">
          Get in Touch
        </Link>
      </div>
    </div>
  </div>
);

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ProjectsPreview />
      <ServicesPreview />
      <CTASection />
    </div>
  );
};

export default HomePage;
