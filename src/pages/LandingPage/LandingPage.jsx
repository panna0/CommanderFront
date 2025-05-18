
import Crosshair from "../../components/Crosshair/Crosshair";
import ScrollUpDiv from "../../components/ScrollUpDiv/ScrollUpDiv";
import { motion, useScroll, useTransform } from 'framer-motion';
import style from "./LandingPage.module.scss"
import { useRef, useState,} from "react";
import { useNavigate } from "react-router-dom";




const LandingPage = () => { 
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
    const originalText = "Level Up Your Airsoft Games"
    const hoverText = "Let's start!"
    const containerRef = useRef(null);
    const [testo, setTesto] = useState(originalText);

    const handleMouseEnter = () => {
        setTesto(hoverText);
    };

    const handleMouseLeave = () => {
        setTesto(originalText);
    };

    return (
        <>
         <div className={`${style.bigContainer}`}>
            <div
                ref={containerRef}
                className={`${style.container}`}
                >
                <motion.div className={`${style.textContainer}`} style={{ scaleX: scale,  scaleY: scale, opacity: opacity}}>
                    <a onClick={() => {navigate('/home')}} className={`${style.link}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{testo}</a>
                    <h1 className={`${style.subtitle}`}>The ultimate platform to create, manage, and experience thrilling airsoft matches with friends.</h1>
                </motion.div>
                <Crosshair containerRef={containerRef} color='#ffffff'/>
            
            </div>
            <ScrollUpDiv></ScrollUpDiv>
        </div>
       
        
       </>
    );
  }
  
  export default LandingPage;