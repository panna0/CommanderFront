import React from "react";
import styles from "./PasswordInput.module.scss"
import occhio from '../../assets/icons/occhio.png';
import occhioChiuso from '../../assets/icons/occhioChiuso.png';

const PasswordInput = ({showPassword, password, setPassword, setShowPassword, par, err}) => {
    
    //const {children} = props;
    //const typeClass = type === "primary" ? "btn-primary" : "btn-secondary";

    return(
        <>
        
        <div className={`${styles.passwordImputDivDiv}`}>
            <label>{par}</label>
            <div className={`${styles.passwordInputDiv}`}>
                <input className={`${styles.passwordInput}`}
                type={showPassword?"text":"password"} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                />
                <button className={`${styles.eye}`}
                onClick={()=> setShowPassword(!showPassword)}
                type="button">
                    <img src={showPassword?occhio:occhioChiuso} width={"20vw"}></img>
                </button>
            </div>
            <div className={`${styles.errorDiv}`}><p>{err? err : ""}</p></div>
          </div>
        </>

       //<button className={`${styles.btn} ${typeClass}`}>{children}</button> //children.props o const {children} = a props e solo {children}
    );
};

export default PasswordInput;