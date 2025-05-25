import React, { useState } from "react";
import styles from "./ProfileIcon.module.scss"
import picPlaceholder from "../../assets/images/picplaceholder2.png"
import menuIcon from "../../assets/icons/menuIcon.svg"
import { AnimatePresence, motion} from "motion/react"

const ProfileIcon = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const pressedClass = isMenuVisible? styles["profileIcon-pressed"] : ""
    const logoutClass = styles["listItem-logout"]
    const boldClass = styles["listItem-bold"]

    return(
        <>
   
        <div className={`${styles.container}`}>
            <button className={`${styles.profileIcon} ${pressedClass}`} onClick={() => setIsMenuVisible(!isMenuVisible)}>
                <img src={menuIcon} alt="menu icon" width={"20px"}></img>
                <img src={picPlaceholder} alt="profile pic" width={"35px"} className={`${styles.pic}`}></img>
            </button>
            
            <AnimatePresence initial={false}>
                {isMenuVisible ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className={`${styles.menu}`}
                        key="box"
                    >
                       <ul className={`${styles.list}`}>
                            <li className={`${styles.listItem} `}>Your matches</li>
                       </ul>
                       <div className={`${styles.separator}`}></div>
                       <ul className={`${styles.list}`}>
                            <li className={`${styles.listItem} ${boldClass}`}>Your account</li>
                            <li className={`${styles.listItem}`}>Support center</li>
                       </ul>
                       <div className={`${styles.separator}`}></div>
                       <ul className={`${styles.list}`}>
                            <li className={`${styles.listItem} ${logoutClass}`}>Logout</li>
                       </ul>
                    </motion.div>
                ) : null}
            </AnimatePresence>  

        </div>
        </>
    );
};

export default ProfileIcon;