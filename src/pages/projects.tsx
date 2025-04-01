import React from 'react';
import GuideAd from '@/components/GuideAd';
import DarkCloudAd from '@/components/DarkCloudAd';

const ProjectsPage = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-300">Our Projects</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Explore our innovative AI solutions designed to enhance human potential and transform the way you work.
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <GuideAd />
        <DarkCloudAd />
      </div>
    </div>
  );
};

export default ProjectsPage;
