import React from 'react'
import SpiralIcon from '@material-ui/icons/DonutLarge'

import MoreVertIcon from '@material-ui/icons/MoreVert'
import {Add}from '@material-ui/icons'
import{IconButton}from '@material-ui/core'
import './SidebarHeader.css'


export default function SidebarHeaderRight({toggleContact,openUserOption,onMouseLeave}){

  

  
    return <div>
        <div  className="sidebar-header-right">
                    <IconButton>
                    <SpiralIcon style={{color:'	#e4e6eb'}}/>
                    </IconButton>
                    <IconButton onClick={toggleContact}>
                    <Add style={{color:'	#e4e6eb'}} />
                    </IconButton>
                    <IconButton onMouseLeave={onMouseLeave} onClick={openUserOption}>
                    <MoreVertIcon style={{color:'	#e4e6eb'}}/>
                    </IconButton>
                </div>
    </div>
}