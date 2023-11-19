// pages/404.js

import React from 'react';
import Link from 'next/link'; // Import Link from next/link

const NotFoundPage = () => (
  <div
    className="min-h-screen bg-cover bg-center flex items-center justify-center"
    style={{
      backgroundImage: 'url(/working.png)',
    }}
  >
    <div className="bg-black bg-opacity-70 p-6 rounded-lg text-white text-center">
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-lg mb-4">
        Oops! It seems like our goofy web developer got a bit lost in the code. This page doesn&apos;t exist yet!
      </p>
      <p className="text-lg">
        But don&apos;t worry, you can always go back to our <Link href="/">home page</Link> and continue your journey with us.
      </p>
    </div>
  </div>
);

export default NotFoundPage;
