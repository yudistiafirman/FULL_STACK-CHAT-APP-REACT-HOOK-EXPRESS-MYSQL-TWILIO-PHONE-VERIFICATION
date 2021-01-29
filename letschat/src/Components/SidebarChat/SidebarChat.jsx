import React from 'react'
import "./SideBarchat.css"
import {Avatar}from '@material-ui/core'

const SidebarChat =({username,message,status})=>{
    return <div className="sidebar-chat">
        <Avatar/>
        <div className="sidebar-chat-info">
       <h2>{username}</h2>
       <p>{message}</p>
       <p>{status}</p>
        </div>
 
    </div>
}

export default SidebarChat