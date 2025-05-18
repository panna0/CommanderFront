import React from "react";
import styles from "./Button.module.scss"

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
        : "";

    return(

       <button className={`${styles.btn} ${colorClass} ${sizeClass}`} onClick={() => action()}>{children}</button> //children.props o const {children} = a props e solo {children}
    );
};

export default Button;