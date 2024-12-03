import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Gestion du scroll
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    // Fermer le menu mobile lors du changement de page
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/">
                        Expert Coaching
                    </Link>
                </div>

                <div 
                    className={`navbar-hamburger ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                    <ul className="navbar-links">
                        <li>
                            <Link 
                                to="/" 
                                className={location.pathname === '/' ? 'active' : ''}
                            >
                                Accueil
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/coachs"
                                className={location.pathname === '/coachs' ? 'active' : ''}
                            >
                                Nos Coachs
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/specialites"
                                className={location.pathname === '/specialites' ? 'active' : ''}
                            >
                                Spécialités
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/tarifs"
                                className={location.pathname === '/tarifs' ? 'active' : ''}
                            >
                                Tarifs
                            </Link>
                        </li>
                    </ul>

                    <div className="navbar-buttons">
                        <Link to="/login" className="btn btn-secondary">
                            Se connecter
                        </Link>
                        <Link to="/register" className="btn btn-primary">
                            S'inscrire
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;