import React from 'react';
import Logo from './Logo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { logout } from '../firebase/firebaseClient'; // Adjust the import path as needed

const MobileView = ({ toggleOpen, isOpen, links, isAuthenticated }) => {
    const router = useRouter();

    const handleAuthAction = async () => {
        if (isAuthenticated) {
            await logout();
            router.push('/');
        } else {
            router.push('/signIn');
        }
    };

    return (
        <header className="shadow-md">
            <div className="flex items-center justify-between px-6 py-4">
                <Logo />

                <button onClick={toggleOpen} className="p-2 rounded-md focus:outline-none ">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="py-4">
                    {links.map((link, index) => (
                        <Link key={index} href={link.path} legacyBehavior>
                            <a className="block text-white px-6 py-2 hover:border border-blue-800 transition duration-300">
                                {link.label}
                            </a>
                        </Link>
                    ))}

                    <button 
                        onClick={handleAuthAction} 
                        className={`block text-white ${isAuthenticated ? 'bg-red-700' : 'bg-blue-900'} px-4 py-2 rounded hover:bg-opacity-80 transition duration-300 mx-6 my-2`}
                    >
                        {isAuthenticated ? 'Sign Out' : 'Sign In'}
                    </button>
                </div>
            )}
        </header>
    );
}

export default MobileView;