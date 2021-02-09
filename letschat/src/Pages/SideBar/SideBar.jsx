import React, { useState,useEffect } from 'react'
import './SideBar.css'

import {Avatar, CircularProgress, IconButton}from '@material-ui/core'
import myavatar from '../../Support/Images/evra.jpg'
import SidebarChat from '../../Components/SidebarChat/SidebarChat'
import SidebarHeaderRight from '../../Components/SidebarHeader/SidevbarHeader'
import Sidebarsearch from '../../Components/Sidebar-search/Sidebar_search'
import {useChatValue } from '../../Helpers/context'
import Profileoptions from '../../Components/Profile_options/Profile_options'


import Modal from '../../Components/Modal/Modal'
import { dateFormatter } from '../../Helpers/dateFormatter'



const Sidebar=()=>{

    const {getAllcontacts,toggleContact,toggleProfile,user,createConversation}=useChatValue()

    const [openOption,setopenOption]=useState(false)
    const [open,setOpen]=useState(false)

    const [searchValue,SetSearchValue]=useState('')
    const {loading,value,error}=user
    
    const user_option=[
        {option_name:"Add Contact",function:()=>setOpen(true)},
        {option_name:"New Group",function :()=>setOpen(true)},
        {option_name:"Profile",function :()=>setOpen(true)},
        {option_name:"Log out",function :()=>setOpen(true)}
    ]



    function setContact(){
        toggleContact()
        getAllcontacts()
    }

    useEffect(()=>{
        getAllcontacts()
     
    },[])
 
  
   

    const renderChat=()=>{
        const data=[]
        value.filter((el)=>el.data.length>0).map((val)=>val.data.map((v,i)=>{
          return data.push(v)
        }))
        const sorting=   data.filter((val,idx)=>val.message.length>0).sort((a,b)=>new Date(b.message[b.message.length-1].created_at).getTime()-new Date(a.message[a.message.length-1].created_at))
        .filter((v,i)=> v.username.toLowerCase().includes(searchValue)).map((value,idx)=><SidebarChat onClick={()=>createConversation(value.id,value.username,value.avatar,value.message)} key={idx} sent_at={dateFormatter(value.message[value.message.length-1].created_at)} username={value.username} status={value.message[value.message.length-1].messages}/>)
        return sorting
             
    }

   

 



    return <div className="sidebar">


            <div className="sidebar-header">
                <IconButton onClick={toggleProfile}>
                <Avatar src={myavatar}/>
                </IconButton>
             
                <SidebarHeaderRight  toggleContact={setContact} openUserOption={()=>setopenOption(!openOption)}/>
            </div>

            <div onMouseLeave={()=>setopenOption(!openOption)} className={openOption?"user-options show-options":"user-options"}>
                    {
                        user_option.map((value,index)=> <Profileoptions  key={index}  option_name={value.option_name}  onClick={value.function} /> )
                    }
                
            </div>
                    <Modal open={open} onCloseModal={()=>setOpen(false)}/>
           
            <div className="sidebar-search">
                <Sidebarsearch onChange={(e)=>SetSearchValue(e.target.value.toLowerCase())}/>
            </div>
                    
            <div className="sidebar-chats">
                        {
                             value===null?<CircularProgress style={{position:'absolute',left:'50%',top:'50%'}} color="secondary"/>:renderChat()
                        }

            </div>
                          


                  
       

        </div>
}


export default Sidebar