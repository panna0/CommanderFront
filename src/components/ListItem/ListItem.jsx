import React, { useEffect, useState } from "react";
import styles from "./ListItem.module.scss"
import {ReactComponent as MapIcon} from '../../assets/icons/mapIcon2.svg';
import Button from "../Button/Button";
import { Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react"


const ListItem = ({isDeleteModeOn}) => {
    const navigate = useNavigate();
    const viewHandler = () => {
        navigate('/home/match-detail')
    }

    
    return(
        <motion.div className={`${styles.listItem}`}  whileInView={{ opacity: 1 }}>
            <div className={`${styles.imageText}`}>
                <div className={`${styles.image}`}></div>
                <div className={`${styles.texts}`}>
                    <h3>Nome Stanza</h3>
                    <div className={`${styles.iconText}`}><MapIcon/><h4>Luogo partita</h4></div>
                </div>
            </div>
            {isDeleteModeOn ? (
                <Checkbox sx={{
                    color: '#747474', // Un altro esempio con colore esadecimale
                    '&.Mui-checked': {
                      color: '#FFFFFF',
                    },
                  }}/>
            ) : (
                <Button size={"small"} color={"secondary"} action={viewHandler}>
                View
                </Button>
            )}
           
        </motion.div>
                
    )
};

export default ListItem;