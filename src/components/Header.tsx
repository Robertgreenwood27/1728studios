import React, { useState, useEffect } from 'react';
import DeskView from './deskView';
import MobileView from './mobileView';
import { useAuth } from './AuthContext'; // Import the new hook

const Header = () => {
    const [isMobile, setIsMobile] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, loading } = useAuth(); // Use the auth context

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleOpen = () => {
        setIsOpen(prev => !prev);
    };

    const links = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/contact', label: 'Contact' },
        // ... more links ...
    ];

    if (loading) {
        return <div>Loading...</div>; // Or some loading spinner
    }

    return (
        <div>
            {isMobile ? 
                <MobileView toggleOpen={toggleOpen} isOpen={isOpen} links={links} isAuthenticated={isAuthenticated} /> : 
                <DeskView links={links} isAuthenticated={isAuthenticated} />
            }
        </div>
    );
};

export default Header;