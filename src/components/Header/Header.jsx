import React from "react";
import logo from "./../../assets/images/commanderLogo.svg"
import style from "./Header.module.scss"
import { Link, useNavigate } from 'react-router';

const Header = ({children}) => {
    const navigate = useNavigate(); 
    
    return(
        <header className={`${style.header}`}>
                <img src={logo} alt="logo" width={"40px"} onClick={()=>navigate("/")}/> 
            { children }
            
        </header>
    );
};

export default Header;