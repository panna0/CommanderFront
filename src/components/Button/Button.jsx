import React from "react";
import styles from "./Button.module.scss"
import {motion} from "motion/react"

const Button = ({children, color, size, action}) => {
    
    //const {children} = props;
    //const typeClass = type === "primary" ? "btn-primary" : "btn-secondary";
   

    const colorClass = color === "primary"
    ? styles["btn-primary"]
    : color === "secondary"
        ? styles["btn-secondary"]
        : "";


    const sizeClass = size === "small"
    ? styles["btn-small"]
    : size === "large"
        ? styles["btn-large"]
        : size === "rounded" 
        ? styles["btn-rounded"]
        : "";

    return(
        <motion.div whileHover={{ scale: 1.05 }}>
       <button className={`${styles.btn} ${colorClass} ${sizeClass}`} onClick={() => action()} type="button">{children}</button> 
       </motion.div>
    );
};

export default Button;