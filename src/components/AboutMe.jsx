import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import my from '../assets/my.png';
import { FaReact, FaNodeJs, FaGitAlt } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiFirebase, SiJavascript } from "react-icons/si";
import { useDarkMode } from '../context/DarkModeContext';

const AboutMe = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const { isDarkMode } = useDarkMode();

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } }
  };

  const techStack = [
    { icon: FaReact, name: "React", color: "text-blue-500" },
    { icon: SiNextdotjs, name: "Next.js", color: isDarkMode ? "text-white" : "text-black" },
    { icon: SiTailwindcss, name: "Tailwind", color: "text-cyan-500" },
    { icon: FaNodeJs, name: "Node.js", color: "text-green-600" },
    { icon: SiFirebase, name: "Firebase", color: "text-yellow-500" },
    { icon: FaGitAlt, name: "Git", color: "text-orange-600" },
    { icon: SiJavascript, name: "JavaScript", color: "text-yellow-500" },
    { icon: FaReact, name: "React", color: "text-blue-500" },
    { icon: SiNextdotjs, name: "Next.js", color: isDarkMode ? "text-white" : "text-black" },
    { icon: SiTailwindcss, name: "Tailwind", color: "text-cyan-500" },
    { icon: FaNodeJs, name: "Node.js", color: "text-green-600" },
    { icon: SiFirebase, name: "Firebase", color: "text-yellow-500" },
    { icon: FaGitAlt, name: "Git", color: "text-orange-600" },
    { icon: SiJavascript, name: "JavaScript", color: "text-yellow-500" }
  ];

  return (
    <section id='aboutMe' className={`pt-20 md:pt-24 w-full py-16 md:py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          className='flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12 lg:gap-16'
        >
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className='w-full md:w-1/2'
          >
            <motion.h1
              className={`text-4xl sm:text-5xl font-black mb-6 text-center md:text-left ${isDarkMode ? 'text-white' : 'text-main'}`}
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              About Me
            </motion.h1>
            <motion.p
              className={`text-lg sm:text-xl leading-relaxed text-justify ${isDarkMode ? 'text-gray-300' : 'text-main'}`}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              My name is M. Naufal Fawwaz Haryono, a Computer Science graduate from Universitas Brawijaya, Indonesia. I have a strong passion for front-end web development, especially using React.js and Next.js to build efficient and user-friendly applications. Beyond coding, I am also deeply interested in UI/UX design, as I believe great user experiences are as important as great functionality. I actively enhance my skills through self-learning, personal projects, and freelance work, while staying curious about the latest trends in modern web technologies.
            </motion.p>
          </motion.div>

          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className='w-full md:w-1/2 flex justify-center md:justify-end'
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.img
                src={my}
                alt="Profile"
                className='w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-xl object-cover'
                style={{
                  boxShadow: isDarkMode 
                    ? '0 10px 30px rgba(59, 130, 246, 0.2), 0 0 40px rgba(147, 51, 234, 0.1)' 
                    : '0 10px 30px rgba(68, 89, 100, 0.15), 0 0 30px rgba(168, 85, 247, 0.1)'
                }}
              />
              <motion.div
                className={`absolute -inset-4 rounded-xl -z-10 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20' 
                    : 'bg-gradient-to-r from-blue-300/30 to-purple-300/30'
                }`}
                animate={{
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className='mt-20 md:mt-24'
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-10 text-center ${isDarkMode ? 'text-white' : 'text-main'}`}>
            Tech Stack
          </h2>

          <div className='overflow-hidden py-6 w-full'>
            <Marquee gradient={false} speed={50} className='gap-6'>
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  className={`flex flex-col items-center p-5 rounded-xl transition-all duration-300 mx-4 min-w-[120px] ${
                    isDarkMode 
                      ? 'bg-gray-900 hover:bg-gray-700 shadow-lg hover:shadow-xl' 
                      : 'bg-white hover:bg-gray-50 shadow-md hover:shadow-lg'
                  }`}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <tech.icon className={`w-10 h-10 md:w-12 md:h-12 ${tech.color}`} />
                  <span className={`mt-3 text-sm md:text-base font-semibold ${isDarkMode ? 'text-gray-200' : 'text-main'}`}>
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </Marquee>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;