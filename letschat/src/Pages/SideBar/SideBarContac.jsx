import React, { useEffect, useState } from 'react'
import './SideBarContact.css'
import { ArrowBack}from '@material-ui/icons'
import Sidebarsearch from '../../Components/Sidebar-search/Sidebar_search'
import SidebarChat from '../../Components/SidebarChat/SidebarChat'
import {useChatValue}from '../../Helpers/context'
import { CircularProgress, IconButton } from '@material-ui/core'


function SideBarContact() {
    
    const {contact,toggleContact,user,getAllcontacts}=useChatValue()
    const {loading,value,error}=user
    const [searchValue,SetSearchValue]=useState('')
    const [filter,Setfilter]=useState([])

    const onHandleClick=(contactId)=>{
    
       getAllcontacts()
        toggleContact()
    }

    useEffect(()=>{

        
        if(value!==null){
            searchIndex()
        }
    
 
    },[searchValue])
 
    const searchIndex=()=>{
        let arrayIndex=[]
        const valueFilter= value
        valueFilter.filter((val)=>val.data.length>0)
                    .map((v,i)=>v.data.map((el)=>{
                        if(el.username.toUpperCase().includes(searchValue)){
                            arrayIndex.push(i)
                        }
                    }))
                    Setfilter(arrayIndex)
    }
 
    const renderContact=()=>{
 
         return value.filter((v,i)=>v.data.length>0 )
        .map((value,index)=> 
     
        <div key={index} >
            
             <span  className={filter.indexOf(index)===-1&& searchValue?"username-index display-none":"username-index"}>{value.title}</span>
            
           
            {
               
               value.data.filter((el,idx)=>el.username.toUpperCase().includes(searchValue)).sort((a, b) => a.username !== b.username ? a.username < b.username ? -1 : 1 : 0).map((v,i)=><SidebarChat   key={i}  username={v.username} /> )
            }
            
        </div>

        )
    
    }

    return (
        <div className={contact?"sidebar-contact sidebar-contact-show":"sidebar-contact"}>


        <div className="sidebar-header-contact">
            <IconButton onClick={toggleContact}>
            <ArrowBack style={{color:'#e4e6eb'}}/>
            </IconButton>
   
        <p style={{color:'#e4e6eb'}}>New Chat</p>
        </div>

        <div className="sidebar-search">
         <Sidebarsearch onChange={(e)=>SetSearchValue(e.target.value.toUpperCase())}/>
        </div>

        <div className="sidebar-contacts">
            
            {
                loading?<CircularProgress style={{position:'absolute',left:'50%',top:'50%'}} color="secondary"/>:value?renderContact() :null
            }
        </div>
    </div>
    )
}

export default SideBarContact




  
  

   
  



