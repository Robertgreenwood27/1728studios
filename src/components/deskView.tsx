import React from 'react';
import Logo from './Logo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { logout } from '../firebase/firebaseClient'; // Adjust the import path as needed

const DeskView = ({ links, isAuthenticated }) => {
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
        <header className="flex items-center justify-between px-6 py-4 shadow-md bg-transparent">
            <Logo />

            <nav className="flex items-center space-x-4">
                {links.map((link, index) => (
                    <Link key={index} href={link.path} legacyBehavior>
                        <a className="text-white hover:text-blue-400 transition duration-300">
                            {link.label}
                        </a>
                    </Link>
                ))}

                <button 
                    onClick={handleAuthAction} 
                    className={`text-white ${isAuthenticated ? 'bg-red-700' : 'bg-blue-900'} px-4 py-2 rounded hover:bg-opacity-80 transition duration-300`}
                >
                    {isAuthenticated ? 'Sign Out' : 'Sign In'}
                </button>
            </nav>
        </header>
    );
}

export default DeskView;