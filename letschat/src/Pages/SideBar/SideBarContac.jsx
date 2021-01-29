import React from 'react'
import './SideBarContact.css'
import { ArrowBack}from '@material-ui/icons'
import Sidebarsearch from '../../Components/Sidebar-search/Sidebar_search'
import SidebarChat from '../../Components/SidebarChat/SidebarChat'
import {useContact,useToggleContact}from '../../Helpers/context'
import { IconButton } from '@material-ui/core'


function SideBarContact() {

    const contact=useContact()
    const toggleContact=useToggleContact()
  




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
            <SidebarChat username="Firman" status="aku jenius"/>
        </div>
    </div>
    )
}

export default SideBarContact
