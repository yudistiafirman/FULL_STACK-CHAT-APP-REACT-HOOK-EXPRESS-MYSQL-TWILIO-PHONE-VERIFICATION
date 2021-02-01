import React, { useEffect } from 'react'
import './SideBarContact.css'
import { ArrowBack}from '@material-ui/icons'
import Sidebarsearch from '../../Components/Sidebar-search/Sidebar_search'
import SidebarChat from '../../Components/SidebarChat/SidebarChat'
import {useChatValue}from '../../Helpers/context'
import { IconButton } from '@material-ui/core'


function SideBarContact() {

  
    const {contact,toggleContact,user}=useChatValue()


 


  
  

   
  
  console.log(user)




    return (
        <div className={contact?"sidebar-contact sidebar-contact-show":"sidebar-contact"}>


        <div className="sidebar-header-contact">
            <IconButton onClick={toggleContact}>
            <ArrowBack style={{color:'#e4e6eb'}}/>
            </IconButton>
   
        <p style={{color:'#e4e6eb'}}>New Chat</p>
        </div>

        <div className="sidebar-search">
         <Sidebarsearch/>
        </div>

        <div className="sidebar-contacts">
            {
                user?user.map((value,index)=><SidebarChat key={index} username={value.username} status={value.phone}/> ):null
            }
        </div>
    </div>
    )
}

export default SideBarContact
