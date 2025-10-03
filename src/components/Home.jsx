import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { useDarkMode } from '../context/DarkModeContext';
import { Helmet } from 'react-helmet';
import art from '../assets/art.png';
import { FaGithub, FaLinkedinIn, FaInstagram, FaFileDownload } from "react-icons/fa";
import AboutMe from './AboutMe';
import Portofolio from './Portofolio';
import Service from './Service';

const useTypeAnimation = (sequence, speed, deletionSpeed) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopCount, setLoopCount] = useState(0);
    const typingSpeed = isDeleting ? deletionSpeed : speed;

    useEffect(() => {
        const handleTyping = () => {
            const current = currentIndex;
            const currentItem = sequence[current];

            if (typeof currentItem === 'string') {
                if (isDeleting) {
                    setCurrentText(currentItem.substring(0, currentText.length - 1));
                } else {
                    setCurrentText(currentItem.substring(0, currentText.length + 1));
                }

                if (!isDeleting && currentText === currentItem) {
                    setTimeout(() => setIsDeleting(true), 2000);
                } else if (isDeleting && currentText === '') {
                    setIsDeleting(false);
                    setCurrentIndex((currentIndex + 1) % sequence.length);
                    if (currentIndex === sequence.length - 1) {
                        setLoopCount(loopCount + 1);
                    }
                }
            } else {
                setTimeout(() => {
                    setCurrentIndex((currentIndex + 1) % sequence.length);
                }, currentItem);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentIndex, sequence, typingSpeed, loopCount]);

    return currentText;
};

const Home = () => {
    const [ref, inView] = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });

    const { isDarkMode } = useDarkMode();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const animatedText = useTypeAnimation(
        [
            "I'm M. Naufal Fawwaz Haryono",
            500,
            "I'm a Front-End Developer",
            50
        ],
        70,
        20
    );

    const theButtonClick = () => {
        const driveLink = 'https://drive.google.com/file/d/18IGzQ-WfFFhvmw_BMbK35zbUYZmAyFns/view?usp=sharing';
        window.open(driveLink, '_blank');
    };

    const scrollToProjects = () => {
        const element = document.querySelector('#projects');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <main id='home' className={`min-h-screen transition-colors duration-300 overflow-x-hidden ${isDarkMode
                ? 'bg-gray-800'
                : 'bg-gradient-to-br from-gray-100 to-white'
            }`}>
            
            <Helmet>
                <title>M. Naufal Fawwaz Haryono - Front-End Developer Portfolio</title>
                <meta name="description" content="Portfolio of M. Naufal Fawwaz Haryono, a passionate Front-End Developer specializing in React, JavaScript, and modern web development." />
                <meta name="keywords" content="Front-End Developer, React Developer, JavaScript, Web Development, Portfolio, Naufal Fawwaz" />
                <meta name="author" content="M. Naufal Fawwaz Haryono" />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://naufalfawwaz.vercel.app/" />
                <meta property="og:title" content="M. Naufal Fawwaz Haryono - Front-End Developer" />
                <meta property="og:description" content="Portfolio of M. Naufal Fawwaz Haryono, a passionate Front-End Developer specializing in React, JavaScript, and modern web development." />
                <meta property="og:image" content="https://naufalfawwaz.vercel.app/my.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="M. Naufal Fawwaz Haryono - Front-End Developer" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://naufalfawwaz.vercel.app/" />
                <meta property="twitter:title" content="M. Naufal Fawwaz Haryono - Front-End Developer" />
                <meta property="twitter:description" content="Portfolio of M. Naufal Fawwaz Haryono, a passionate Front-End Developer specializing in React, JavaScript, and modern web development." />
                <meta property="twitter:image" content="https://naufalfawwaz.vercel.app/my.png" />
                <meta property="twitter:image:alt" content="M. Naufal Fawwaz Haryono - Front-End Developer" />

                <link rel="canonical" href="https://naufalfawwaz.vercel.app/" />

                <script type="application/ld+json">
                    {`
                    {
                      "@context": "https://schema.org",
                      "@type": "Person",
                      "name": "M. Naufal Fawwaz Haryono",
                      "url": "https://naufalfawwaz.vercel.app/",
                      "image": "https://naufalfawwaz.vercel.app/my.png",
                      "sameAs": [
                        "https://github.com/NaufalFawwaz",
                        "https://www.linkedin.com/in/m-naufal-fawwaz-haryono-1a09a9291/",
                        "https://www.instagram.com/naufal2738/"
                      ],
                      "jobTitle": "Front-End Developer",
                      "worksFor": {
                        "@type": "Organization",
                        "name": "Freelance"
                      },
                      "description": "Passionate Front-End Developer specializing in React, JavaScript, and modern web development."
                    }
                    `}
                </script>
            </Helmet>

            <section className='min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-16 gap-8 lg:gap-16 mx-auto max-w-7xl'>

                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, x: -50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className='flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:max-w-xl mt-6 lg:mt-0'
                >

                    <p className={`text-xl md:text-3xl font-medium mb-4 ${isDarkMode ? 'text-gray-300' : 'text-main'
                        }`}>
                        Hello Everyone 👋
                    </p>

                    <div className='h-20 md:h-24 flex items-center justify-center lg:justify-start mb-5'>
                        <h1 className={`text-2xl md:text-3xl lg:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-main'
                            }`}>
                            {animatedText}
                            <span className="animate-pulse">|</span>
                        </h1>
                    </div>

                    <h2 className={`text-lg md:text-xl font-medium mb-6 ${isDarkMode ? 'text-gray-300' : 'text-main'
                        }`}>
                        Welcome to my space
                    </h2>

                    <p className={`text-base md:text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-main'
                        }`}>
                        Passionate about creating beautiful and functional web experiences
                        with modern technologies.
                    </p>

                    <div className={`w-full h-0.5 my-8 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                        }`}></div>

                    <div className='flex flex-col sm:flex-row gap-4 mb-8 w-full justify-center lg:justify-start'>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={theButtonClick}
                            className={`px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors text-base ${isDarkMode
                                    ? 'bg-white text-main hover:bg-slate-300'
                                    : 'bg-main text-white hover:bg-main/90'
                                }`}
                        >
                            <FaFileDownload className='w-5 h-5' />
                            CV
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={scrollToProjects}
                            className={`px-6 py-3 rounded-lg font-semibold border-2 transition-colors text-base ${isDarkMode
                                    ? 'border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500'
                                    : 'border-main text-main hover:bg-main hover:text-white'
                                }`}
                        >
                            View Projects
                        </motion.button>
                    </div>

                    <div className='flex gap-5 justify-center lg:justify-start'>
                        {[
                            { icon: FaGithub, url: 'https://github.com/NaufalFawwaz' },
                            { icon: FaLinkedinIn, url: 'https://www.linkedin.com/in/m-naufal-fawwaz-haryono-1a09a9291/' },
                            { icon: FaInstagram, url: 'https://www.instagram.com/naufal2738/' }
                        ].map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.url}
                                target='_blank'
                                rel='noopener noreferrer'
                                whileHover={{ scale: 1.15, y: -2 }}
                                whileTap={{ scale: 0.9 }}
                                className={`p-3 rounded-full transition-colors ${isDarkMode
                                        ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                                        : 'text-main hover:text-main/80 hover:bg-gray-100'
                                    }`}
                                aria-label={social.icon.name}
                            >
                                <social.icon className='w-10 h-10' />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className='flex justify-center items-center w-full lg:w-auto mb-4 lg:mb-0 relative'
                >
                    <motion.div
                        className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full blur-3xl -z-10"
                        animate={{
                            borderRadius: ["50% 50% 50% 50%", "60% 40% 30% 70%", "50% 60% 70% 40%", "50% 50% 50% 50%"]
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            background: isDarkMode
                                ? "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(147,197,253,0.15))"
                                : "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(59,130,246,0.25))"
                        }}
                    />

                    <motion.img
                        src={art}
                        alt="M. Naufal Fawwaz Haryono - Front-End Developer"
                        className='relative w-64 md:w-72 lg:w-80 z-10 rounded-xl'
                        style={{
                            filter: isDarkMode
                                ? 'drop-shadow(0 12px 20px rgba(59, 130, 246, 0.35))'
                                : 'drop-shadow(0 12px 20px rgba(68, 89, 100, 0.2))'
                        }}
                        whileHover={{
                            rotateX: 5,
                            rotateY: -5,
                            scale: 1.08,
                            transition: { duration: 0.4 }
                        }}
                        animate={{
                            y: [0, -10, 0]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>
            </section>

            <AboutMe />
            <Portofolio />
            <Service />
        </main>
    )
}

export default Home;