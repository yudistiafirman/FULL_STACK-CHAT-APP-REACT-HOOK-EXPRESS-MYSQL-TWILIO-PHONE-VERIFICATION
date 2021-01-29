import React from 'react'
import {Check}from '@material-ui/icons'
import {  IconButton } from '@material-ui/core'


function Preview_bottom({onClick}) {
    return (
        <div className="preview-border-bottom">
        <div className="preview-icon-container">
            <IconButton onClick={onClick}>
                <Check style={{color:'#e4e6eb'}}/>
            </IconButton>

        </div>

    </div>
    )
}

export default Preview_bottom
