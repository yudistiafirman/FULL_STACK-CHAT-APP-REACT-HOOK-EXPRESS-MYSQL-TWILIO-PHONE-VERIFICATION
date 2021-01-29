import React from 'react'
import { Close, Undo}from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
function Preview_top({onClick,onClose}) {
    return (
        <div className="preview-border-top">
        <IconButton onClick={onClose}>
            <Close style={{color:'#e4e6eb'}}/>
        </IconButton>
        <p>Drag Image to Adjust</p>
        <span style={{display:'flex',alignItems:'center',cursor:'pointer'}} onClick={onClick}>
            <Undo style={{color:'#e4e6eb'}}/>
            <span style={{color:'#e4e6eb'}}>Upload</span>
        </span>
        </div>
    )
}

export default Preview_top
