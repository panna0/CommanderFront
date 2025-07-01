import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import styles from './AnimatedBackground.module.scss';
import bombIcon from '../../assets/icons/bombIcon.svg';
import deathMatchIcon from '../../assets/icons/DeathMatchIcon.svg';
import freeForAllIcon from '../../assets/icons/FreeForAllIcon.svg';
import empty from '../../assets/icons/empty.png'

const AnimatedBackground = ({ gamemode }) => {
    const [icon, setIcon] = useState(bombIcon);

    useEffect(() => {
        switch (gamemode) {
            case 'Bomb Defuse':
                setIcon(bombIcon);
                break;
            case 'Team Deathmatch':
                setIcon(deathMatchIcon);
                break;
            case 'Free for All':
                setIcon(freeForAllIcon);
                break;
            default:
                setIcon(empty);
                break;
        }
    }, [gamemode]);

    const fixedIconPositions = useMemo(() => [
        { left: '10vw', top: '15vh', width: '4vw' },
        { left: '30vw', top: '5vh', width: '5vw' },
        { left: '50vw', top: '25vh', width: '3vw' },
        { left: '75vw', top: '10vh', width: '4.5vw' },
        { left: '90vw', top: '20vh', width: '6vw' },

        { left: '5vw', top: '40vh', width: '5.5vw' },
        { left: '25vw', top: '50vh', width: '3.5vw' },
        { left: '45vw', top: '35vh', width: '4vw' },
        { left: '60vw', top: '60vh', width: '5vw' },
        { left: '85vw', top: '45vh', width: '3vw' },

        { left: '15vw', top: '70vh', width: '4vw' },
        { left: '35vw', top: '85vh', width: '6vw' },
        { left: '55vw', top: '75vh', width: '3.5vw' },
        { left: '70vw', top: '90vh', width: '4.5vw' },
        { left: '95vw', top: '80vh', width: '5vw' },
    ], []);

    const memoizedIconsToRender = useMemo(() => {
        const iconVariants = {
            initial: { opacity: 0.2, y: 0, scale: 0.8 },
            animate: {
                opacity: 0.6,
                y: [0, -10, 0, 10, 0],
                scale: [0.8, 1, 0.9, 1],
                rotate: [0, 5, -5, 0],
                transition: {
                    duration: Math.random() * 5 + 5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: Math.random() * 2
                }
            }
        };

        return fixedIconPositions.map((pos, i) => (
            <motion.img
                key={i}
                src={icon}
                alt="animated background icon"
                className={styles.bgIcon}
                variants={iconVariants} 
                initial="initial"
                animate="animate"
                style={{
                    left: pos.left,
                    top: pos.top,
                    position: 'absolute',
                    width: pos.width,
                    height: 'auto',
                }}
            />
        ));
    }, [icon, fixedIconPositions]); 

    return (
        <div className={styles.animatedBackgroundContainer}>
            {memoizedIconsToRender}
        </div>
    );
};

export default AnimatedBackground;