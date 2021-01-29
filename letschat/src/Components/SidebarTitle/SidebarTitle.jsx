import React from 'react'
import { ArrowBack}from '@material-ui/icons'
import './SidebarTitle.css'
import { IconButton } from '@material-ui/core'
function SidebarTitle({onClick,title}) {
    return (
        <div className="sidebar-header-title">
                     
            <IconButton onClick={onClick}>
            <ArrowBack style={{color:'#e4e6eb'}}/>
            </IconButton>
   
        <p style={{color:'#e4e6eb'}}>{title}</p>
        </div>
    )
}

export default SidebarTitle
