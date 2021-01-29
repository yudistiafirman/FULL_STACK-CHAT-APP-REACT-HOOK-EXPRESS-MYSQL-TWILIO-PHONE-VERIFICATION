import React, { useState } from 'react'
import './SideBar.css'

import {Avatar, IconButton}from '@material-ui/core'
import myavatar from '../../Support/Images/evra.jpg'
import SidebarChat from '../../Components/SidebarChat/SidebarChat'
import SidebarHeaderRight from '../../Components/SidebarHeader/SidevbarHeader'
import Sidebarsearch from '../../Components/Sidebar-search/Sidebar_search'
import { useToggleContact, useToggleProfile } from '../../Helpers/context'
import Profile_options from '../../Components/Profile_options/Profile_options'



const Sidebar=()=>{
    const toggleContact=useToggleContact()
    const toggleProfile=useToggleProfile()
    const [openOption,setopenOption]=useState(false)
    const user_option=[
        {option_name:"Add Contact"},
        {option_name:"New Group"},
        {option_name:"Profile"},
        {option_name:"Log out"}
    ]
    return <div className="sidebar">


            <div className="sidebar-header">
                <IconButton onClick={toggleProfile}>
                <Avatar src={myavatar}/>
                </IconButton>
             
                <SidebarHeaderRight toggleContact={toggleContact} openUserOption={()=>setopenOption(!openOption)}/>
            </div>

            <div className={openOption?"user-options show-options":"user-options"}>
                    {
                        user_option.map((value,index)=> <Profile_options option_name={value.option_name}/> )
                    }
                
            </div>

            <div className="sidebar-search">
                <Sidebarsearch/>
            </div>

            <div className="sidebar-chats">
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>

            </div>
        </div>
}


export default Sidebar