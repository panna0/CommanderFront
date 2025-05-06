import React from "react";
import styles from "./Button.module.scss"

const Button = ({children, type}) => {
    
    //const {children} = props;
    //const typeClass = type === "primary" ? "btn-primary" : "btn-secondary";
    const typeClass = (type === "primary" || type === "secondary") 
        ? styles["btn-primary"] 
        : styles["btn-secondary"];

    return(

       <button className={`${styles.btn} ${typeClass}`}>{children}</button> //children.props o const {children} = a props e solo {children}
    );
};

export default Button;