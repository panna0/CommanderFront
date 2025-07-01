import React from "react";
import styles from "./SelectableListItem.module.scss"
import {motion} from "motion/react"

const SelectableListItem = ({title, icon, isActive, onSelect}) => {

   
    
   

    return(
        <motion.div whileHover={{ scale: 1.05 }} 
         className={isActive? `${styles.card} ${styles["card-active"]}` :`${styles.card}`} onClick={onSelect}>
                <img src={icon} alt="icon" width={"30rem"} className={`${styles.icon}`}></img>
                <h3>{title}</h3>
        </motion.div>
    );
};

export default SelectableListItem;