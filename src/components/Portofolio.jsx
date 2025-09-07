import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { useDarkMode } from '../context/DarkModeContext';
import FilkomGameCorner from '../assets/FilkomGameCorner.png';
import YourPhoto from '../assets/YourPhoto.png';
import QrOnceScanner from '../assets/QrOnceScanner.png';

const projectsData = [
  {
    id: 1,
    title: "Filkom Game Corner",
    description: "Platform booking sewa bermain game di Filkom Game Corner UB, dengan list game yang tersedia",
    image: FilkomGameCorner,
    technologies: ["Next.js", "Tailwind CSS", "Firebase"],
    link: "https://filkom-ub-game-corner-next.vercel.app/"
  },
  {
    id: 2,
    title: "YourPhoto",
    description: "Platform photobooth dan user dapat memilih beberapa layout yang ingin digunakan.",
    image: YourPhoto,
    technologies: ["Next.js", "Tailwind CSS"],
    link: "https://yourphoto-web.vercel.app/"
  },
  {
    id: 3,
    title: "QR Once Scanner",
    description: "Aplikasi scanner QR code untuk presensi dengan validasi sekali pakai dan dapat export ke excel.",
    image: QrOnceScanner,
    technologies: ["React.js", "Tailwind CSS"],
    link: "https://qr-scanner-presence.vercel.app/"
  },
];

const ProjectCard = ({ project, index, isDarkMode }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`rounded-xl overflow-hidden transform transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gray-900 shadow-xl hover:shadow-2xl' 
          : 'bg-white shadow-md hover:shadow-lg'
      }`}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-56 object-cover transition-transform duration-500"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
      </div>
      
      <div className="p-6">
        <h3 className={`text-xl font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-main'
        }`}>
          {project.title}
        </h3>
        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-main'}`}>
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.map((tech, techIndex) => (
            <span 
              key={techIndex}
              className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                isDarkMode 
                  ? 'bg-gray-700 text-gray-200' 
                  : 'bg-gray-100 text-main'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
        
        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center font-semibold transition-colors ${
            isDarkMode 
              ? 'text-blue-50 hover:text-blue-300' 
              : 'text-main hover:text-black'
          }`}
          whileHover={{ x: 5 }}
        >
          View Project
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </motion.a>
      </div>
    </motion.div>
  );
};

const Portofolio = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const { isDarkMode } = useDarkMode();
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = showAll ? projectsData : projectsData.slice(0, 3);

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  useEffect(() => {
    const handleScrollToProjects = () => {
      if (window.location.hash === '#projects') {
        setTimeout(() => {
          const projectsSection = document.getElementById('projects');
          if (projectsSection) {
            const navbarHeight = 80;
            const offsetPosition = projectsSection.offsetTop - navbarHeight - 40;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    };

    handleScrollToProjects();
    window.addEventListener('hashchange', handleScrollToProjects);
    
    return () => {
      window.removeEventListener('hashchange', handleScrollToProjects);
    };
  }, []);

  return (
    <section id="projects" className={`pt-28 pb-20 px-4 sm:px-6 lg:px-8 -mt-24 ${
      isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2 
            variants={titleVariants}
            className={`text-4xl md:text-5xl font-black text-center mb-4 pt-6 ${
              isDarkMode ? 'text-white' : 'text-main'
            }`}
          >
            Here are few of my projects
          </motion.h2>
          
          <motion.p 
            className={`text-xl text-center max-w-3xl mx-auto mb-12 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Each project represents unique challenges and creative solutions
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>

          {projectsData.length > 3 && !showAll && (
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <button
                onClick={() => setShowAll(true)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center mx-auto ${
                  isDarkMode 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-main text-white hover:bg-main/90'
                }`}
              >
                View More Projects
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </motion.div>
          )}

          {showAll && (
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <button
                onClick={() => setShowAll(false)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center mx-auto ${
                  isDarkMode 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Show Less
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                </svg>
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Portofolio;