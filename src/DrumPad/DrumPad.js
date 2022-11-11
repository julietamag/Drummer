import './DrumPad.css';
import React, { useState, useEffect } from 'react';


export function DrumPad(props) {

    const handleClick = () =>{
        let audioTag = document.getElementById(props.clip.id);
        audioTag.currentTime = 0;
        audioTag.play();
      }

      React.useEffect(()=>{
        document.addEventListener('keydown', handleKeyPress);
        return () =>{
          document.removeEventListener('keydown', handleKeyPress);
        }
      }, []);
    
      
      const handleKeyPress = (e) => {
        if(e.keyCode === props.clip.keyCode){
            handleClick()
        }
      }

    return (
        <div id="display">
            <div className="drum-pad" onClick={handleClick}  >
                <audio src={props.clip.url} id={props.clip.id} ></audio>
                {props.clip.keyTrigger}</div>
        </div>
    )
}

// onKeyPress={handleKeyPress}