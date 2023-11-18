import React from 'react';
import Logo from './Logo';
import Link from 'next/link';  // Import Link for navigation

const MobileView = ({ toggleOpen, isOpen, links }) => {
    return (
        <header className="shadow-md">
            <div className="flex items-center justify-between px-6 py-4">
                <Logo />

                {/* Menu Toggle */}
                <button onClick={toggleOpen} className="p-2 rounded-md focus:outline-none focus:bg-blue-700">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="py-4">
                    {/* Dynamically render the links */}
                    {links.map((link, index) => (
                        <Link key={index} href={link.path} legacyBehavior>
                            <a className="block text-white px-6 py-2 hover:bg-gray-800 transition duration-300">
                                {link.label}
                            </a>
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
}

export default MobileView;
