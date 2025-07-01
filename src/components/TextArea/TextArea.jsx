import React from "react";
import styles from "./TextArea.module.scss"
import { useState } from "react";
import { AnimatePresence, motion} from "motion/react"

const TextArea = ({title, text, isEditable, action, placeholder}) => {

   
    
   

    return(
        <>
            <div className={`${styles.TextAreaDiv}`}>
                <label>{title}</label>
                <div className={`${styles.TextArea}`}>
                    <textarea value={text} maxLength={250} onChange={(e) => action(e)} placeholder={placeholder}></textarea>
                    <h5>{`${text.length}/250`}</h5>
                </div>
            </div>
            
        </>
        
    );
};

export default TextArea;