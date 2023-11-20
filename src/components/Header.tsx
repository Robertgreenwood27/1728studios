import React, { useState, useEffect } from 'react';
import DeskView from './deskView';
import MobileView from './mobileView';



const Header = () => {
    const [isMobile, setIsMobile] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

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

  

    return (
        <div>
            {isMobile ? 
                <MobileView toggleOpen={toggleOpen} isOpen={isOpen} links={links} /> : 
                <DeskView links={links} />
            }
        </div>
    );
};

export default Header;
