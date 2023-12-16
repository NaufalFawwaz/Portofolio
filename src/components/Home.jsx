import react from 'react';
import { TypeAnimation } from 'react-type-animation';
import art from '../assets/art.png';
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';
import AboutMe from './AboutMe';

const Home = () => {
    const theButtonClick = () => {
        const driveLink = 'https://drive.google.com/file/d/1SDwYm9vCKu345BDgDvx1JgNhqhkz2Bo-/view?usp=sharing';
        window.open(driveLink, '_blank');
    };
    return (
        <main className="max-w-7xl mx-auto">
            <section className='md:h-[85vh] md:max-h-[500px] mt-16 flex flex-row items-center justify-between w-full'>
                <div className='text-main font-medium flex flex-col gap-y-2 h-full pt-3'>
                    <div className='pt-6'>
                        <p className='text-3xl'>Hello Everyone,</p>
                        <TypeAnimation
                            sequence={[
                                "I'm M. Naufal Fawwaz Haryono", 700,
                                "I'm Front-End Developer", 700,
                            ]}
                            speed={25}
                            wrapper='h1'
                            repeat={Infinity}
                            className='text-4xl font-bold text-main'
                        />
                        <p className='pb-3 text-3xl'>Welcome to my portfolio website</p>
                    </div>
                    <button onClick={theButtonClick} className='bg-gray-800 rounded-[12px] p-3 text-white font-black w-fit mt-9 hover:bg-black hover:text-eeeeee hover:scale-110'>Find Out More About Me</button>
                    <div className='flex flex-row gap-7 pt-16'>
                        <Link to={'https://github.com/NaufalFawwaz'} target='_blank' rel='noopener noreferrer' className='icon-link github'>
                            <FaGithub className='w-12 h-12'/>
                        </Link>
                        <Link to={'https://www.linkedin.com/in/m-naufal-fawwaz-haryono-1a09a9291/'} target='_blank' rel='noopener noreferrer' className='icon-link linkedin'>
                            <FaLinkedinIn className='w-12 h-12'/>
                        </Link>
                        <Link to={'https://www.instagram.com/naufal2738/'} target='_blank' rel='noopener noreferrer' className='icon-link instagram'>
                            <FaInstagram className='w-12 h-12'/>
                        </Link>
                    </div>
                </div>
                <div className='flex justify-end'>
                    <img src={art} alt="" className='max-w-80'/>
                </div>
            </section>
            <br />
            <br />
            <br />
            <br />
            <br />
            <AboutMe />
        </main>
    )
}

export default Home;


