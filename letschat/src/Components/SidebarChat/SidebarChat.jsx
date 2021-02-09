import React from 'react'
import "./SideBarchat.css"
import {Avatar}from '@material-ui/core'


const SidebarChat =({sent_at,username,status,onClick,onChange})=>{

   


    
    return <div onChange={onChange} onClick={onClick} className="sidebar-chat">
        <Avatar/>
        <div className="sidebar-chat-info">
       <h2>{username}</h2>
{
    status?   <p>{status}</p>:null
}
    <span>
        {sent_at}
    </span>
        </div>
  
    </div>
} 

export default SidebarChat