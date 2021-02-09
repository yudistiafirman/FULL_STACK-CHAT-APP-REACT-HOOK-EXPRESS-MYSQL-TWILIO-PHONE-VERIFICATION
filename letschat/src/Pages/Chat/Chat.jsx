import React, { useState } from 'react'
import './Chat.css'
import {Avatar, IconButton}from '@material-ui/core'

import {Mic, InsertEmoticon, MoreVert, SearchOutlined}from '@material-ui/icons'

import Profileoptions from '../../Components/Profile_options/Profile_options'
import { useChatValue } from '../../Helpers/context'
import Welcome from '../../Components/welcome/Welcome'
import ChatBox from '../../Components/ChatBox/ChatBox'
import {  dateFormatterChat } from '../../Helpers/dateFormatter'
import moment from 'moment'



 const Chat =()=>{

    const [chatOption,Setchatoption]=useState(false)
    const{conversation}=useChatValue()
    const chat_options=[
        {option:'Delete Chat'},
        {option:'Delete Contact'}
    ]

    const renderChatBox=()=>{
        return   conversation.message.map((value,index)=><div key={index} style={{display:'flex',flexDirection:'column'}}>

        <span className="date-group">{dateFormatterChat(value.date) }</span>
        {
         value.data.map((val,idx)=> <ChatBox key={idx} isReceiver={conversation.id===val.senders_id} sendername={conversation.username} message={val.messages} created_at={moment(val.created_at).format('LT')}/>)
        }
      
        </div>
        )
    }
  
    //get all message from db
    // sort base on time deliver
    //
    console.log(conversation)
    return conversation===null?<Welcome/>
            : 
    <div className="chat">
            
            <div className="chat-header">
                <Avatar src={conversation.avatar}/>

                <div className="chat-header-info">
                    <h3>{conversation.username}</h3>
                    <p>last seen at...</p>
                </div>

                <div className="chat_headerRight">

                    <IconButton>
                        <SearchOutlined style={{color:'	#e4e6eb'}}/>
                    </IconButton>
         
                    <IconButton onClick={()=>Setchatoption(true)}>
                        <MoreVert style={{color:'	#e4e6eb'}}/>
                    </IconButton>
                </div>

            </div>

            <div onMouseLeave={()=>Setchatoption(false)} className={chatOption?"chat-options show-options":"chat-options"}>

                {chat_options.map((value,index)=> <Profileoptions key={index} option_name={value.option}/>  )}

            </div>

        <div className="chat__body">
            {
              renderChatBox()
            }
      
        </div>
        
        <div className="chat-footer">
            <InsertEmoticon/>
            <form>
                <input type="text" placeholder="type a message"/>
                <button type="submit">send a message</button>
            </form>
            <Mic/>
        </div>

    </div>
}


export default Chat 