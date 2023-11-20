import React from 'react';
import Logo from './Logo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '../firebase/firebaseClient'; // Adjust the import path as needed

const DeskView = ({ links }) => {
    const [user] = useAuthState(auth);
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    return (
        <header className="flex items-center justify-between px-6 py-4 shadow-md bg-transparent">
            <Logo />

            <nav className="flex items-center space-x-4">
                {/* Map through the links and display them */}
                {links.map((link, index) => (
                    <Link key={index} href={link.path} legacyBehavior>
                        <a className="text-white hover:text-blue-400 transition duration-300">
                            {link.label}
                        </a>
                    </Link>
                ))}

                {/* Login/Logout Button */}
                {!user ? (
                    <button onClick={() => router.push('/signIn')} className="text-white bg-blue-900 px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                        Sign In
                    </button>
                ) : (
                    <button onClick={handleLogout} className="text-white bg-red-700 px-4 py-2 rounded hover:bg-red-600 transition duration-300">
                        Sign Out
                    </button>
                )}
            </nav>
        </header>
    );
}

export default DeskView;
