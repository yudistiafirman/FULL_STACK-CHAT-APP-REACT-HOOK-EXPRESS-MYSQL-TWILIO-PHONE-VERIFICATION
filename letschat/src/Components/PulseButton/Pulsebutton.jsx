import { IconButton } from '@material-ui/core'
import { Check, Close } from '@material-ui/icons'
import React from 'react'
import Timer from '../Timer/Timer'
import './Pulsebutton.css'

function Pulsebutton({onClick,isActive,onAudiofile,onBlur,onFocus}) {
    return (
        <div className="pulse-container" onFocus={onFocus} tabIndex={1}  onBlur={onBlur}>
         
            <IconButton onClick={onClick}>
                <Close  />
            </IconButton>

            <span className="load"/>
            <Timer isActive={isActive}/>


            <IconButton onClick={onAudiofile} >
           <Check />
             </IconButton>


        </div>
    
  
    )
}

export default Pulsebutton
