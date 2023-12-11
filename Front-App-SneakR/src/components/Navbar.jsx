import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../helpers.js';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const isLoggedIn = getToken() !== null;

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isOpen]);

    return (
        <nav className="p-4" style={{ backgroundColor: 'rgb(160, 184, 186)', boxShadow: '0 4px 8px rgba(1, 2, 0, 1.5)', }}>
            <div className={`container mx-auto flex justify-between items-center ${isOpen ? 'flex-col' : 'flex'} transition-all duration-3000`}>
                <Link to="/" className="text-white text-lg font-bold">Accueil</Link>
                <div className="md:hidden sm:block">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>

                <div className={`md:flex ${isOpen ? 'block' : 'hidden'} space-y-4 md:space-y-0 md:space-x-4`}>
                    {isLoggedIn ? (
                        <>
                            <Link to="/profil" className="text-white mx-4">
                                Mon Profil
                            </Link>
                            <Link to="/collection" className="text-white mx-4">
                                Ma collection
                            </Link>
                        </>
                    ) : (
                        <Link to="/login" className="text-white mx-4">
                            Se connecter
                        </Link>
                    )}
                    <Link to="/wishlist" className="text-white mx-4">
                        Wishlist
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
