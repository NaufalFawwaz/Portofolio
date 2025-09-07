import React, { useState, useEffect } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import logo from '../assets/logo.png';
import night from '../assets/night.png';
import light from '../assets/light.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const [mounted, setMounted] = useState(false);
    
    const navData = [
        { name: "About Me", nav: "#aboutMe" },
        { name: "Projects", nav: "#projects" },
        { name: "Contact", nav: "#contact" },
    ];

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavClick = (nav, e) => {
        e.preventDefault();
        setIsMenuOpen(false);
        
        const element = document.querySelector(nav);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <nav className={`w-full py-5 px-4 md:px-8 lg:px-16 fixed top-0 z-50 transition-all duration-300 
            ${isScrolled 
                ? isDarkMode 
                    ? 'bg-gray-800 shadow-md' 
                    : 'bg-white shadow-md'
                : isDarkMode 
                    ? 'bg-gray-800 shadow-md' 
                    : 'bg-white shadow-md'
            }`}>
            
            <div className='max-w-7xl mx-auto flex justify-between items-center'>
                <a href='#home' className='flex items-center gap-2 md:gap-3'>
                    <img src={logo} alt="logo" className='w-8 h-8 md:w-10 md:h-10' />
                    <h1 className={`font-black text-base md:text-xl lg:text-2xl ${
                        isDarkMode ? 'text-white' : 'text-main'
                    }`}>
                        M. Naufal Fawwaz Haryono
                    </h1>
                </a>
                <ul className='hidden md:flex items-center gap-6 lg:gap-8 text-base lg:text-lg font-medium'>
                    {navData.map((data, index) => (
                        <li key={index} className='relative group'>
                            <a 
                                href={data.nav} 
                                className={`relative transition-colors duration-300 py-2 block ${
                                    isDarkMode 
                                        ? 'text-white hover:text-gray-300' 
                                        : 'text-main hover:text-main/70'
                                }`}
                                onClick={(e) => handleNavClick(data.nav, e)}
                            >
                                {data.name}
                                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                                    isDarkMode ? 'bg-white' : 'bg-main'
                                }`}></span>
                            </a>
                        </li>
                    ))}
                </ul>

                <div className='flex items-center gap-4'>
                    <button 
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-full transition-colors duration-300 focus:outline-none ${
                            isDarkMode 
                                ? 'hover:bg-gray-700' 
                                : 'hover:bg-gray-100'
                        }`}
                        aria-label="Toggle dark mode"
                    >
                        <img 
                            src={isDarkMode ? light : night} 
                            alt={isDarkMode ? "Light mode" : "Dark mode"} 
                            className='w-6 h-6' 
                        />
                    </button>

                    <button 
                        className='md:hidden flex flex-col justify-center items-center w-8 h-8 relative focus:outline-none'
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        <span className={`block h-0.5 w-6 rounded-sm transition-all duration-300 ease-out ${
                            isDarkMode ? 'bg-white' : 'bg-main'
                        } ${isMenuOpen ? 'rotate-45 translate-y-2' : '-translate-y-1'}`}></span>
                        <span className={`block h-0.5 w-6 rounded-sm my-1.5 transition-all duration-300 ease-out ${
                            isDarkMode ? 'bg-white' : 'bg-main'
                        } ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                        <span className={`block h-0.5 w-6 rounded-sm transition-all duration-300 ease-out ${
                            isDarkMode ? 'bg-white' : 'bg-main'
                        } ${isMenuOpen ? '-rotate-45 -translate-y-2' : 'translate-y-1'}`}></span>
                    </button>
                </div>
            </div>

            <div className={`md:hidden fixed left-0 w-full overflow-hidden transition-all duration-300 ease-in-out shadow-lg z-50 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
            } ${isMenuOpen ? 'max-h-screen py-4 top-16' : 'max-h-0 -top-full'}`}>
                <ul className='flex flex-col items-center gap-6 text-lg font-medium'>
                    {navData.map((data, index) => (
                        <li key={index} className='group w-full text-center'>
                            <a 
                                href={data.nav} 
                                className={`relative transition-colors duration-300 py-3 block px-4 ${
                                    isDarkMode 
                                        ? 'text-white hover:text-gray-300' 
                                        : 'text-main hover:text-main/70'
                                }`}
                                onClick={(e) => handleNavClick(data.nav, e)}
                            >
                                {data.name}
                                <span className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-16 ${
                                    isDarkMode ? 'bg-white' : 'bg-main'
                                }`}></span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;