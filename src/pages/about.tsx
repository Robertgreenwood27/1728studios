// About.js

import React from 'react';

const About = () => (
  <div className=" text-white min-h-screen">
    <header className="p-4 text-center">
      <h1 className="text-5xl font-bold mb-4">About Us</h1>
    </header>

    <main className="container mx-auto py-10 text-center">
      <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
      <p className="text-lg mb-8">
        At 1728 Studios, our goal is to increase human potential through a strategic partnership with AI. We are committed to finding innovative solutions that enhance the overall productivity of each individual. By harnessing the power of artificial intelligence, we aim to revolutionize the way you work and achieve your goals.
      </p>

      {/* Add additional content about your team, values, etc. if needed */}
    </main>
  </div>
);

export default About;
