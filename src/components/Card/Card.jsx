import React from "react";
import styles from "./Card.module.scss"

const Card = ({title, text, iconPath}) => {
    
   const icon = iconPath

    return(
        <div className={`${styles.card}`}>
            <div className={`${styles.textContainer}`}>
                <h1>{title}</h1>
                <p>{text}</p>
            </div>
            <img src={icon} alt="icon" width={"80rem"} className={`${styles.icon}`}></img>
        </div>
    );
};

export default Card;