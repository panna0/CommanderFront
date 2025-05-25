import React from 'react';
import { motion } from 'framer-motion';
import styles from './ScrollingTextBanner.module.scss'

const textToRepeat = "Commander";
const numberOfRepetitions = 10; 

const repeatedTextSet = Array(numberOfRepetitions).fill(textToRepeat);
const duplicatedText = [...repeatedTextSet, ...repeatedTextSet];

const ScrollingTextBanner = () => { 
  
  const bannerVariants = {
    initial: {
      x: 0,
    },
    animate: {
      x: '-50%',
      transition: {
        x: {
          duration: 40,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        },
      },
    },
  };

  return (
    <div
      className={`${styles.background}`}
    >
      <motion.div
        variants={bannerVariants}
        initial="initial"
        animate="animate"
        className={`${styles.scrollingDiv}`}
      >
        {duplicatedText.map((text) => (
          <span
            className={`${styles.text}`}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default ScrollingTextBanner;