import React from "react";
import styles from "./Frame.module.scss"

const Frame = ({children}) => {

    return(
        <div className={`${styles.frameLogin}`}>
            <div className={`${styles.bgLogin}`}>
                {children}
            </div>
        </div>
    );
};

export default Frame;