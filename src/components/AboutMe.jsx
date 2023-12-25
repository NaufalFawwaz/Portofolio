import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import my from '../assets/my.png';

const AboutMe = () => {
  const [trigger, setTrigger] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const resetAnimation = () => {
    setTrigger(!trigger);
  };

  const animationProps = useSpring({
    opacity: inView ? 1 : 0,
    from: { opacity: 0 },
    onRest: resetAnimation,
    config: { duration: 1100 },
    key: trigger ? 'visible' : 'hidden',
  });

  const slideInProps = useSpring({
    marginLeft: inView ? 0 : -100,
    from: { marginLeft: -100 },
    onRest: resetAnimation,
    config: { duration: 1100 },
    key: trigger ? 'visible' : 'hidden',
  });

  return (
    <animated.div id='aboutMe' className='mt-32 text-main flex items-center flex-col-reverse md:flex-row w-full justify-between' style={animationProps} ref={ref}>
      <div className='md:mr-2'>
        <animated.h1 className='text-5xl font-black' style={slideInProps}>About Me</animated.h1>
        <p className='pt-5 max-w-xl text-lg font-medium'>
          My name is M. Naufal Fawwaz Haryono. I'm from Indonesia and currently, 
          I'm learning React as a Front-end developer. 
          I explore React through self-learning because it's enjoyable for me, 
          and I also take on freelance projects. 
          I am a 5th-semester student at Brawijaya University majoring in Informatics Engineering. 
          I have a strong interest in front-end development, particularly in websites, 
          and I am actively exploring React.
        </p>
      </div>
      <animated.img src={my} alt="photo" className='w-1/4 h-1/4 ml-4 md:ml-0 md:mr-2 md:mb-0 mr-24' style={animationProps}/>
    </animated.div>
  );
};

export default AboutMe;
