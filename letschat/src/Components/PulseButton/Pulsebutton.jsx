import { IconButton } from '@material-ui/core'
import { Check, Close } from '@material-ui/icons'
import React from 'react'
import Timer from '../Timer/Timer'
import './Pulsebutton.css'

function Pulsebutton({onClick,isActive}) {
    return (
        <div className="pulse-container">

            <IconButton onClick={onClick}>
                <Close  />
            </IconButton>

            <span className="load"/>
            <Timer isActive={isActive}/>


            <IconButton >
           <Check />
             </IconButton>


        </div>
    
  
    )
}

export default Pulsebutton
