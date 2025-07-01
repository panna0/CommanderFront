

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

function AnimatedNumber({ totalMinutes, type }) {

    const formatDuration = (totalMinutes) => {
        if (totalMinutes < 0) return "0 ore 0 minuti"; 
        const hours = Math.floor(totalMinutes / 60);
        const minutes = Math.round(totalMinutes % 60); 
      
        let parts = [];
        
        parts.push(`${hours}`);
        
       
        parts.push(`${minutes}${minutes === 0 ? '0' : ''}`);
        
      
        return parts.join(' : ');
      };

    let spring = useSpring(totalMinutes, {
    mass: 0.8,        
    stiffness: 75,    
    damping: 15       
  });

  
  let display = useTransform(spring, (current) => {
    if(type === 'time'){
        return formatDuration(Math.round(current));
    }else{
        return Math.round(current)
    }
   
  });

  
  useEffect(() => {
    spring.set(totalMinutes);
  }, [spring, totalMinutes]);

  
  return <motion.span style={{ fontSize: '2em', fontWeight: 'bold'}}>{display}</motion.span>;
}

export default AnimatedNumber;