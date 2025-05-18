import React from "react";
import style from "./ProfilePicPicker.module.scss"
import { useState } from "react";
import penIcon from '../../assets/icons/pen.svg'

const ProfilePicPicker = ({children}) => {
    const [backgroundImageUrl, setBackgroundImageUrl] = useState(null); 
    

    const handleFileChange = (event) => {
        const file = event.target.files[0]; 
        if (file) {
          
          if (file.type.startsWith('image/')) {
            const reader = new FileReader();
    
            reader.onload = (e) => {
              setBackgroundImageUrl(e.target.result); 
            };
    
            reader.readAsDataURL(file);
    
          } else {
            
            setBackgroundImageUrl(null); 
          }
        } else {
          
          setBackgroundImageUrl(null); 
        }
      };
    
    return(
        <div style={{backgroundImage: `url(${backgroundImageUrl})`}} className={`${style.pic}`}>
            <input className={`${style.choose}`}type="file" accept="image/*" onChange={handleFileChange}></input>
            <img src={penIcon}></img>
        </div>
       
       
    );
};

export default ProfilePicPicker;