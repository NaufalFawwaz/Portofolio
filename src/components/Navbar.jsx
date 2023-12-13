import React from 'react';
import { Link } from 'react-router-dom';
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
        <>
            <nav className='flex justify-between px-10 py-5 gap-14 sticky'>
                <Link to={'Home'} className='flex text-2xl items-center gap-3 pl-20'>
                    <img src={logo} alt="logo" className='w-14' />
                    <h1 className='text-main font-black'>M. Naufal Fawwaz Haryono</h1>
                </Link>
                <ul className='flex items-center list-none gap-11 pr-36 text-xl'>
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
        </>
    );
};

export default Navbar;
