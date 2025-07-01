import React from "react";
import styles from "./GenericInput.module.scss"

const GenericInput = ({type, value, action, par, max, isEditable, err}) => {
    
   

    return(
        <div className={`${styles.GenericInputDiv}`}>
            <label>{par}</label>
            <input 
            className={`${styles.GenericInput}`}
            type={type} 
            max={max}
            value={value} 
            onChange={(e) => action(e, par)}
            readOnly={isEditable? false : true}
            disabled={isEditable? false : true}
            />
            <div className={`${styles.errorDiv}`}><p>{err}</p></div>
        </div>
    );
};

export default GenericInput;