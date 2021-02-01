import React from 'react'
import "./SideBarchat.css"
import {Avatar, IconButton}from '@material-ui/core'
import { Delete } from '@material-ui/icons'

const SidebarChat =({username,message,status})=>{
    return <div className="sidebar-chat">
        <Avatar/>
        <div className="sidebar-chat-info">
       <h2>{username}</h2>
       <p>{message}</p>
       <p>{status}</p>
        </div>
        <IconButton style={{position:'absolute',right:'10%'}}>
            <Delete style={{color:'gray'}}/>
        </IconButton>
    </div>
} 

export default SidebarChat