import React, {Fragment, useState} from 'react';
import style from "./toggle_style.module.css";

const ToggleSwitch = () => {
    const [{isToggleOn}, setState] = useState({
        isToggleOn:false
    }); 

    const handleClick = () =>{
        setState((prevState)=>({
            ...prevState, isToggleOn: !prevState.isToggleOn
        }))
    }

    return(
        <div onClick={(e)=>handleClick()} className={style.ToggleSwitch}>
            {isToggleOn?
                <div className={style.knobActive} />:
                <div className={style.knob} />
            }
            
        </div>
    );
}

export default ToggleSwitch;