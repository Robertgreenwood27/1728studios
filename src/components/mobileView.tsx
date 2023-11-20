import React from 'react';
import Logo from './Logo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '../firebase/firebaseClient'; // Adjust the import path as needed

const MobileView = ({ toggleOpen, isOpen, links }) => {
    const [user] = useAuthState(auth);
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };
    return (
        <header className="shadow-md">
            <div className="flex items-center justify-between px-6 py-4">
                <Logo />

                {/* Menu Toggle */}
                <button onClick={toggleOpen} className="p-2 rounded-md focus:outline-none ">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="py-4">
                    {links.map((link, index) => (
                        <Link key={index} href={link.path} legacyBehavior>
                            <a className="block text-white px-6 py-2 hover:border border-blue-800 transition duration-300">
                                {link.label}
                            </a>
                        </Link>
                    ))}

                    {/* Login/Logout Button */}
                    {!user ? (
                        <button onClick={() => router.push('/signIn')} className="block text-white bg-blue-900 px-4 py-2 rounded hover:bg-blue-700 transition duration-300 mx-6 my-2">
                            Sign In
                        </button>
                    ) : (
                        <button onClick={handleLogout} className="block text-white bg-red-700 px-4 py-2 rounded hover:bg-red-600 transition duration-300 mx-6 my-2">
                            Sign Out
                        </button>
                    )}
                </div>
            )}
        </header>
    );
}

export default MobileView;