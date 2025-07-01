import React from "react";
import styles from "./SelectableCard.module.scss"
import { useState } from "react";
import { AnimatePresence, motion} from "motion/react"

const SelectableCard = ({title, text, icon, isActive, onSelect}) => {

   
    
   

    return(
        <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            whileHover={{ scale: 1.1 }} 
            transition={{
                type: "spring", 
                stiffness: 260, 
                damping: 20,    
                delay: 0.1,     
            }}
         className={isActive? `${styles.card} ${styles["card-active"]}` :`${styles.card}`} onClick={onSelect}>
            <div className={`${styles.textContainer}`}>
                <h1>{title}</h1>
                <p>{text}</p>
            </div>
            <img src={icon} alt="icon" width={"80rem"} className={`${styles.icon}`}></img>
        </motion.div>
    );
};

export default SelectableCard;