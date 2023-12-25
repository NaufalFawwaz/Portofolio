import React from 'react';
import logo from '../assets/logo.png';

const Navbar = () => {
    const navData = [
        {
            name: "About Me",
            nav: "#aboutMe"
        },
        {
            name: "Portfolio",
            nav: "#portfolio"
        },
        {
            name: "Service",
            nav: "#service"
        },
    ];

    return (
        <nav className='flex justify-between px-10 py-5 gap-14 sticky top-0 bg-opacity-70 backdrop-filter backdrop-blur-md z-50'>
            <a href='#home' className='flex text-2xl items-center gap-3 pl-20'>
                <img src={logo} alt="logo" className='w-14' />
                <h1 className='text-main font-black'>M. Naufal Fawwaz Haryono</h1>
            </a>
            <ul className='flex items-center list-none gap-11 pr-36 text-xl font-semibold'>
                {navData.map((data, index) => (
                    <li className='text-main' key={index}>
                        <a href={data.nav} className='relative'>
                            {data.name}
                            <div className='line'></div>
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
