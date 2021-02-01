import React, { useState } from 'react'
import './SideBar.css'

import {Avatar, IconButton}from '@material-ui/core'
import myavatar from '../../Support/Images/evra.jpg'
import SidebarChat from '../../Components/SidebarChat/SidebarChat'
import SidebarHeaderRight from '../../Components/SidebarHeader/SidevbarHeader'
import Sidebarsearch from '../../Components/Sidebar-search/Sidebar_search'
import {useChatValue } from '../../Helpers/context'
import Profileoptions from '../../Components/Profile_options/Profile_options'


import Modal from '../../Components/Modal/Modal'



const Sidebar=()=>{

    const {getAllcontacts,toggleContact,toggleProfile}=useChatValue()

    const [openOption,setopenOption]=useState(false)
    const [open,setOpen]=useState(false)

    
    const user_option=[
        {option_name:"Add Contact",function:()=>setOpen(true)},
        {option_name:"New Group",function :''},
        {option_name:"Profile",function :''},
        {option_name:"Log out",function :''}
    ]

    function setContact(){
        toggleContact()
        getAllcontacts()
    }
    return <div className="sidebar">


            <div className="sidebar-header">
                <IconButton onClick={toggleProfile}>
                <Avatar src={myavatar}/>
                </IconButton>
             
                <SidebarHeaderRight toggleContact={setContact} openUserOption={()=>setopenOption(!openOption)}/>
            </div>

            <div className={openOption?"user-options show-options":"user-options"}>
                    {
                        user_option.map((value,index)=> <Profileoptions key={index} option_name={value.option_name} onClick={value.function} /> )
                    }
                
            </div>
                    <Modal open={open} onCloseModal={()=>setOpen(false)}/>
           
                    
                          


                  
       
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