import React from "react";
import styles from "./Frame.module.scss"
import {motion} from 'motion/react'

const Frame = ({children}) => {

    return(
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{
            type: "spring", 
            stiffness: 260, 
            damping: 20,    
            delay: 0.1,     
        }}
        className={`${styles.frameLogin}`}>
            <div className={`${styles.bgLogin}`}>
                {children}
            </div>
        </motion.div>
    );
};

export default Frame;