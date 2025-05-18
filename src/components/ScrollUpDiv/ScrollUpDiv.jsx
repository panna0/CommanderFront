import React from "react";
import styles from "./ScrollUpDiv.module.scss"
import Card from "../Card/Card";
import { motion, useScroll, useTransform } from 'framer-motion';
import modeIcon from "../../assets/icons/modeIcon.svg";
import mapIcon from "../../assets/icons/mapIcon.svg";
import commanderIcon from "../../assets/images/commanderLogo.svg"

const ScrollUpDiv = () => {

    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ['110vh', '15vh']);
    
    return(
        <motion.div
        style={{y}}
        className={`${styles.scrollDiv}`}
      >
        <div className={`${styles.scrollDivBg}`}>
            <h1>Motivi per abbonarsi</h1>
            <div className={`${styles.cardContainer}`}>
                <Card title={"Choose the mode"} iconPath={modeIcon} text={"Ready for your next airsoft battle? Choose your mode: strategic Bomb, team-based Deathmatch, or solo Free For All. Pick your fight and let the action begin!"}></Card>
                <Card title={"Build your map"} iconPath={mapIcon} text={"Our innovative map builder lets you define key locations. Once in the game, track your position and your teammates' in real-time, all from your phone, for unparalleled tactical awareness."}></Card>
                <Card title={"Ready to play"} iconPath={commanderIcon} text={"The air is thick with anticipation, the terrain is set for battle. It's time to lock and load, coordinate with your team, and step onto the field for an unforgettable airsoft experience. Are you ready to play and claim victory?"}></Card>
            </div>
        </div>
      </motion.div>
    )
};

export default ScrollUpDiv;