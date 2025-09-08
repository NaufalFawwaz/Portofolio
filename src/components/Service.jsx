import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { useDarkMode } from '../context/DarkModeContext';
import emailjs from '@emailjs/browser';
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

const Service = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { isDarkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleScrollToContact = () => {
      if (window.location.hash === '#contact') {
        setTimeout(() => {
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            const navbarHeight = 80;
            const offsetPosition = contactSection.offsetTop - navbarHeight - 20;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    };

    handleScrollToContact();
    window.addEventListener('hashchange', handleScrollToContact);

    return () => {
      window.removeEventListener('hashchange', handleScrollToContact);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!import.meta.env.VITE_EMAILJS_SERVICE_ID ||
      !import.meta.env.VITE_EMAILJS_TEMPLATE_ID ||
      !import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
      setError('Email service is not configured properly. Please contact me directly at naufal2738@gmail.com');
      setIsLoading(false);
      return;
    }

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          to_email: 'naufal2738@gmail.com',
          reply_to: formData.email
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (result.text === 'OK') {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });

        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Email sending error:', error);
      setError('Failed to send message. Please try again or contact me directly at naufal2738@gmail.com');
    } finally {
      setIsLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: FaEnvelope,
      title: 'Email',
      value: 'naufal2738@gmail.com',
      link: 'mailto:naufal2738@gmail.com?subject=Project%20Inquiry&body=Hello%20Naufal,%0A%0AI%20would%20like%20to%20discuss%20a%20project%20opportunity.',
      color: isDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'
    },
    {
      icon: FaLinkedin,
      title: 'LinkedIn',
      value: '/in/m-naufal-fawwaz-haryono',
      link: 'https://www.linkedin.com/in/m-naufal-fawwaz-haryono/',
      color: isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
    },
    {
      icon: FaGithub,
      title: 'Github',
      value: '/NaufalFawwaz',
      link: 'https://github.com/NaufalFawwaz',
      color: isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-800'
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

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

  return (
    <section id="contact" className={`pt-32 pb-20 px-4 sm:px-6 lg:px-8 -mt-24 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
      }`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2
            variants={titleVariants}
            className={`text-4xl md:text-5xl font-black text-center mb-4 pt-6 ${isDarkMode ? 'text-white' : 'text-main'
              }`}
          >
            Let's Work Together
          </motion.h2>

          <motion.p
            className={`text-xl text-center max-w-3xl mx-auto mb-12 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Have a project in mind or want to discuss potential opportunities? Feel free to reach out through any of these channels.
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <motion.div
              variants={cardVariants}
              className={`rounded-xl p-6 ${isDarkMode
                  ? 'bg-gray-900 shadow-lg'
                  : 'bg-white shadow-lg'
                }`}
            >
              <h3 className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-main'
                }`}>
                Send me a message
              </h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <FaCheckCircle className="text-green-500 text-4xl mb-3" />
                  <h4 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                    Message Sent!
                  </h4>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Thank you for your message. I'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 rounded-lg flex items-center gap-3 ${isDarkMode
                          ? 'bg-red-900/30 text-red-300 border border-red-700/50'
                          : 'bg-red-100 text-red-700 border border-red-300'
                        }`}
                    >
                      <FaExclamationTriangle />
                      <span className="text-sm">{error}</span>
                    </motion.div>
                  )}

                  <div>
                    <label htmlFor="name" className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDarkMode
                          ? 'bg-gray-700 text-white border-gray-600 disabled:bg-gray-800'
                          : 'border border-gray-300 text-gray-800 disabled:bg-gray-100'
                        }`}
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDarkMode
                          ? 'bg-gray-700 text-white border-gray-600 disabled:bg-gray-800'
                          : 'border border-gray-300 text-gray-800 disabled:bg-gray-100'
                        }`}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      rows="4"
                      className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDarkMode
                          ? 'bg-gray-700 text-white border-gray-600 disabled:bg-gray-800'
                          : 'border border-gray-300 text-gray-800 disabled:bg-gray-100'
                        }`}
                      placeholder="Tell me about your project or inquiry..."
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    className={`w-full py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${isDarkMode
                        ? 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-800'
                        : 'bg-main text-white hover:bg-main/90 disabled:bg-main/70'
                      }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <FaPaperPlane className="text-sm" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>

            <div className="space-y-6">
              <motion.div
                variants={cardVariants}
                transition={{ delay: 0.2 }}
                className={`rounded-xl p-6 ${isDarkMode
                    ? 'bg-gray-900 shadow-lg'
                    : 'bg-white shadow-lg'
                  }`}
              >
                <h3 className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-main'
                  }`}>
                  Direct Contact
                </h3>

                <div className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <motion.a
                      key={index}
                      href={method.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 5 }}
                      className={`flex items-start p-4 rounded-lg transition-all ${isDarkMode
                          ? 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                          : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      <div className={`p-3 rounded-full ${method.color} mr-4 flex-shrink-0`}>
                        <method.icon className="text-lg" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className={`font-semibold text-sm md:text-base mb-1 ${isDarkMode ? 'text-white' : 'text-main'
                          }`}>
                          {method.title}
                        </h4>
                        <p className={`text-xs md:text-sm truncate ${isDarkMode ? 'text-gray-300' : 'text-main'
                          }`}>
                          {method.value}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={cardVariants}
                transition={{ delay: 0.4 }}
                className={`rounded-xl p-6 ${isDarkMode
                    ? 'bg-gray-900 text-white'
                    : 'bg-main text-white shadow-lg'
                  }`}
              >
                <h3 className="text-xl font-bold mb-3 text-center md:text-left">Response Time</h3>
                <p className="text-sm mb-3 text-center md:text-left">I typically respond to emails within 24 hours.</p>
                <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                  <p className="text-sm opacity-90 text-center md:text-left">
                    Available for freelance and full-time opportunities
                  </p>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-900'
                    }`}>
                    <FaEnvelope className="text-sm" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className={`text-center mt-12 p-6 rounded-xl ${isDarkMode
                ? 'bg-gray-900 shadow-lg'
                : 'bg-white shadow-lg'
              }`}
          >
            <h4 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
              Quick Response Guaranteed
            </h4>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              I value your time and will respond to your inquiry as soon as possible.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Service;