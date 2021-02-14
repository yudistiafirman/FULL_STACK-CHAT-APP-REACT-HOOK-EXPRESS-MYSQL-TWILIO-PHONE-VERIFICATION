import { IconButton } from '@material-ui/core'
import { Check, Close } from '@material-ui/icons'
import React from 'react'
import './Pulsebutton.css'

function Pulsebutton({onClick}) {
    return (
        <div className="pulse-container">
            <IconButton onClick={onClick}>
                <Close  />
            </IconButton>
     <span className="load"/>
     <IconButton >
         <Check />
     </IconButton>
        </div>
    
  
    )
}

export default Pulsebutton
