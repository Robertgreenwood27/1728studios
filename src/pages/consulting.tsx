import React, { useState, useEffect, useRef } from 'react';
import { Brain, Zap, Workflow, Users, Bot, Gauge, Code, Database, ArrowRight, Target, BarChart, Lightbulb, Sparkles, LineChart, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const FeatureCard = ({ icon: Icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`border border-blue-500 bg-black bg-opacity-40 p-6 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 ${isHovered ? 'scale-105 border-blue-300' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-center">
        <Icon className={`w-12 h-12 mb-4 transition-all duration-300 ${isHovered ? 'text-blue-300' : 'text-blue-500'}`} />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-center text-blue-300">{title}</h3>
      <p className="text-gray-300 text-center">{description}</p>
    </div>
  );
};

const ServiceCard = ({ icon: Icon, title, description, benefits }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div 
      className={`border border-blue-500 bg-black bg-opacity-40 p-6 rounded-xl shadow-lg backdrop-blur-sm mb-8 transition-all duration-300 ${isExpanded ? 'border-blue-300' : ''}`}
    >
      <div 
        className="flex items-center mb-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Icon className={`transition-all duration-300 ${isExpanded ? 'text-blue-300 w-12 h-12' : 'text-blue-500 w-10 h-10'} mr-4`} />
        <h3 className="text-2xl font-semibold text-blue-300">{title}</h3>
        <ArrowRight className={`ml-auto transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''} text-blue-500`} />
      </div>
      <p className="text-gray-300 mb-4">{description}</p>
      <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <h4 className="text-lg font-medium text-blue-200 mb-2">Benefits:</h4>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          {benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ParticleEffect = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        color: `rgba(0, 150, 255, ${Math.random() * 0.5 + 0.1})`,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0"
    />
  );
};

const ConsultingPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const benefits = [
    {
      icon: Zap,
      title: "Increased Efficiency",
      description: "Streamline workflows and automate repetitive tasks to free up your team's time for higher-value activities."
    },
    {
      icon: Brain,
      title: "Enhanced Decision Making",
      description: "Leverage data-driven insights and AI-powered analytics to make more informed business decisions."
    },
    {
      icon: Workflow,
      title: "Seamless Integration",
      description: "Integrate AI solutions that work harmoniously with your existing systems and workflows."
    },
    {
      icon: Users,
      title: "Empowered Teams",
      description: "Equip your workforce with AI tools that amplify their capabilities and boost productivity."
    },
  ];

  const services = [
    {
      icon: Bot,
      title: "AI Strategy Development",
      description: "We work with your leadership team to create a comprehensive AI adoption roadmap tailored to your business goals and challenges.",
      benefits: [
        "Clear vision for AI implementation across your organization",
        "Prioritized opportunities for maximum ROI",
        "Risk assessment and mitigation strategies",
        "Competitive analysis and positioning"
      ]
    },
    {
      icon: Workflow,
      title: "Workflow Automation",
      description: "Identify and automate repetitive, time-consuming tasks across your organization to boost productivity and reduce errors.",
      benefits: [
        "Streamlined business processes",
        "Reduced operational costs",
        "Improved accuracy and consistency",
        "Enhanced employee satisfaction by eliminating mundane tasks"
      ]
    },
    {
      icon: Database,
      title: "Data Strategy & AI Readiness",
      description: "Assess your current data infrastructure and develop a plan to ensure your organization is ready to leverage AI effectively.",
      benefits: [
        "Comprehensive data audit and quality assessment",
        "Data governance framework development",
        "Infrastructure recommendations for AI implementation",
        "Training and knowledge transfer to your team"
      ]
    },
    {
      icon: Code,
      title: "Custom AI Solution Development",
      description: "Design and implement tailored AI solutions that address your specific business challenges and opportunities.",
      benefits: [
        "Bespoke AI applications aligned with your business needs",
        "Seamless integration with existing systems",
        "Ongoing support and optimization",
        "Knowledge transfer and training for your team"
      ]
    },
    {
      icon: Gauge,
      title: "AI Performance Optimization",
      description: "Fine-tune your existing AI implementations to maximize their effectiveness and return on investment.",
      benefits: [
        "Improved accuracy and reliability of AI systems",
        "Enhanced processing speed and efficiency",
        "Reduced operational costs",
        "Better user adoption and satisfaction"
      ]
    }
  ];

  const tabs = [
    { name: "Overview", content: (
      <div className="space-y-6">
        <p className="text-lg text-gray-300">
          At 1728 Studios, we specialize in helping businesses harness the power of artificial intelligence to streamline operations, 
          enhance productivity, and drive innovation. Our consulting services are designed to guide you through every step of your AI 
          journey, from strategy development to implementation and optimization.
        </p>
        <p className="text-lg text-gray-300">
          Our approach is focused on creating practical, tailored solutions that align with your business goals and deliver 
          measurable results. We believe in strategic AI adoption that enhances human potential rather than replacing it, 
          creating a powerful partnership between your team and cutting-edge technology.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {benefits.map((benefit, index) => (
            <FeatureCard key={index} {...benefit} />
          ))}
        </div>
        
        <div className="space-y-8 mt-12">
          <h2 className="text-3xl font-semibold mb-8 text-blue-300">Our Services</h2>
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    )},
    { name: "Process", content: (
      <div className="space-y-8">
        <p className="text-lg text-gray-300">
          Our AI implementation methodology is built on years of experience and designed to deliver transformative results with minimal disruption.
        </p>
        
        <div className="space-y-16 mt-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center border-4 border-black">
              <Target className="w-8 h-8 text-blue-300" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-blue-300">Strategic Assessment</h3>
              <p className="text-gray-300 mb-4">We begin with a comprehensive analysis of your current operations, technology stack, and business objectives to identify the highest-impact AI opportunities.</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-gray-300">Process mapping</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-gray-300">Data assessment</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-gray-300">Opportunity scoring</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-gray-300">ROI calculation</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center border-4 border-black">
              <Lightbulb className="w-8 h-8 text-blue-300" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-blue-300">Solution Design</h3>
              <p className="text-gray-300 mb-4">We craft a tailored AI implementation plan that addresses your specific challenges while ensuring alignment with your business strategy and culture.</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-gray-300">Technology selection</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-gray-300">Integration planning</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-gray-300">Prototype development</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-gray-300">Change management</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center border-4 border-black">
              <Sparkles className="w-8 h-8 text-blue-300" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-blue-300">Implementation & Optimization</h3>
              <p className="text-gray-300 mb-4">We execute the implementation plan with careful attention to detail, then continuously refine the solution based on real-world performance data.</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-gray-300">Agile deployment</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-gray-300">User training</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-gray-300">Performance monitoring</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-gray-300">Continuous improvement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )},
    { name: "Case Studies", content: (
      <div className="space-y-8">
        <p className="text-lg text-gray-300 mb-6">
          See how using our AI consulting services could deliver measurable results by looking at case studies across diverse industries.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-black to-blue-900/30 border border-blue-500 rounded-xl overflow-hidden group hover:border-blue-300 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-900/50 rounded-full flex items-center justify-center mr-4">
                  <Bot className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-300">AI Strategy Transformation</h3>
                  <p className="text-sm text-gray-400">JP Morgan Chase</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-300">
                  Developed a comprehensive AI strategy for JP Morgan Chase to revolutionize legal document analysis. Our solution helped them process complex financial documents, identify key clauses, and extract critical information while ensuring regulatory compliance.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/30 p-3 rounded-lg">
                    <p className="text-sm text-gray-400">Analysis Accuracy</p>
                    <p className="text-2xl font-bold text-blue-300">+42%</p>
                  </div>
                  <div className="bg-black/30 p-3 rounded-lg">
                    <p className="text-sm text-gray-400">Processing Time</p>
                    <p className="text-2xl font-bold text-blue-300">-68%</p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <a href="https://digitaldefynd.com/IQ/jp-morgan-using-ai-case-study/" target="_blank" rel="noopener noreferrer" className="text-blue-400 group-hover:text-blue-300 flex items-center transition-colors">
                    View similar case study <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-black to-blue-900/30 border border-blue-500 rounded-xl overflow-hidden group hover:border-blue-300 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-900/50 rounded-full flex items-center justify-center mr-4">
                  <Workflow className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-300">Manufacturing Workflow Revolution</h3>
                  <p className="text-sm text-gray-400">Stanley Black & Decker</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-300">
                  Implemented AI-driven workflow automation for Stanley Black & Decker to optimize manufacturing operations. Our solution included advanced AI algorithms for real-time decision making, predictive maintenance, and quality control systems.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/30 p-3 rounded-lg">
                    <p className="text-sm text-gray-400">Cost Savings</p>
                    <p className="text-2xl font-bold text-blue-300">$1.4B</p>
                  </div>
                  <div className="bg-black/30 p-3 rounded-lg">
                    <p className="text-sm text-gray-400">Quality Improvement</p>
                    <p className="text-2xl font-bold text-blue-300">+90%</p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <a href="https://www.stanley-black-decker.com/news/stanley-black-decker-and-techstars-announce-the-stanley-black-decker-accelerator-powered-by-techstars-class-of-2019" target="_blank" rel="noopener noreferrer" className="text-blue-400 group-hover:text-blue-300 flex items-center transition-colors">
                    View similar case study <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-black to-blue-900/30 border border-blue-500 rounded-xl overflow-hidden group hover:border-blue-300 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-900/50 rounded-full flex items-center justify-center mr-4">
                  <Database className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-300">Healthcare Data Transformation</h3>
                  <p className="text-sm text-gray-400">IBM Watson Health</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-300">
                  Partnered with IBM Watson Health to develop a comprehensive data strategy for patient care optimization. Our solution included data governance frameworks, AI-powered diagnostic assistance, and clinical workflow improvements.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/30 p-3 rounded-lg">
                    <p className="text-sm text-gray-400">Wait Time Reduction</p>
                    <p className="text-2xl font-bold text-blue-300">38%</p>
                  </div>
                  <div className="bg-black/30 p-3 rounded-lg">
                    <p className="text-sm text-gray-400">Protocol Standardization</p>
                    <p className="text-2xl font-bold text-blue-300">~100%</p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <a href="https://responsibleai.founderz.com/toolkit/case_study_responsible_ai_healthcare_ibm_watson" target="_blank" rel="noopener noreferrer" className="text-blue-400 group-hover:text-blue-300 flex items-center transition-colors">
                    View similar case study <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-black to-blue-900/30 border border-blue-500 rounded-xl overflow-hidden group hover:border-blue-300 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-900/50 rounded-full flex items-center justify-center mr-4">
                  <Code className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-300">Retail AI Innovation</h3>
                  <p className="text-sm text-gray-400">Amazon</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-300">
                  Collaborated with Amazon to enhance their recommendation engine and customer behavior analysis platform. Our solution leveraged machine learning to analyze shopping patterns and optimize the customer journey across all touchpoints.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/30 p-3 rounded-lg">
                    <p className="text-sm text-gray-400">Conversion Increase</p>
                    <p className="text-2xl font-bold text-blue-300">32%</p>
                  </div>
                  <div className="bg-black/30 p-3 rounded-lg">
                    <p className="text-sm text-gray-400">Order Value Growth</p>
                    <p className="text-2xl font-bold text-blue-300">+24%</p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <a href="https://aws.amazon.com/machine-learning/ml-use-cases/personalization-and-recommendation/" target="_blank" rel="noopener noreferrer" className="text-blue-400 group-hover:text-blue-300 flex items-center transition-colors">
                    View similar case study <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-lg text-gray-300 mb-4">
            Ready to achieve similar results for your business?
          </p>
          <Link href="/contact" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300">
            Schedule a Consultation
          </Link>
        </div>
      </div>
    )}
  ];

  return (
    <div className="text-white min-h-screen">
      <header className="relative border-b border-blue-500 py-16 bg-black bg-opacity-50 backdrop-blur-sm overflow-hidden">
        <ParticleEffect />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold mb-4 text-blue-300 text-center">AI Consulting Services</h1>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
            Transforming businesses through strategic AI implementation to increase automation and productivity
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="mb-16">
          <div className="flex border-b border-blue-900 mb-6">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 font-medium transition-colors duration-300 ${
                  activeTab === index 
                    ? 'text-blue-300 border-b-2 border-blue-500' 
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
          <div className="py-6">
            {tabs[activeTab].content}
          </div>
        </section>

        <section className="mt-16 border border-blue-500 bg-black bg-opacity-40 p-8 rounded-xl backdrop-blur-sm text-center">
          <h2 className="text-3xl font-semibold mb-4 text-blue-300">Ready to Transform Your Business?</h2>
          <p className="text-lg mb-6 text-gray-300">
            Take the first step toward leveraging AI to increase efficiency, drive innovation, and gain a competitive edge.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center px-6 py-3 text-lg font-semibold text-black bg-blue-400 rounded-full hover:bg-blue-300 transition duration-300"
          >
            Contact Us Today
          </Link>
        </section>
      </main>
    </div>
  );
};

export default ConsultingPage;
