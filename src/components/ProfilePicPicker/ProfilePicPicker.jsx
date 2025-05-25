import React, { useEffect } from "react";
import style from "./ProfilePicPicker.module.scss"
import { useState } from "react";
import penIcon from '../../assets/icons/pen.svg'
import placeHolderPic from '../../assets/images/picPlaceholder.png'

const ProfilePicPicker = ({backgroundImageUrl, setBackgroundImageUrl}) => {
    
    const [isImageTrue, setIsImageTrue] = useState(false); 
    const [isHovering, setIsHovering] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0]; 
        if (file) {
            setIsImageTrue(true);
          
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

     

      useEffect(() => {
        if(backgroundImageUrl){
            if(backgroundImageUrl.trim() === ''){
                setShowDelete(false);
            }else{
                setShowDelete(true);
            }
        }
        
      }, [backgroundImageUrl])

    
    return(
        <>
        <div style={{backgroundImage: isImageTrue? `url(${backgroundImageUrl})` : `url(${placeHolderPic})`}} className={`${style.pic}`} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <input className={`${style.choose}`}type="file" accept="image/*" onChange={handleFileChange}></input>
            <img src={penIcon} style={{opacity: isHovering? '100%' : '0%'}} className={isHovering? `${style.penHovering}` : `${style.pen}`}></img>
        </div>
        <a className={isImageTrue? `${style.remove}` : `${style.removeHidden}`} onClick={() => setIsImageTrue(false)}>Remove image</a>
        </>
    );
};

export default ProfilePicPicker;