import React, { useRef, useState } from 'react'
import './Chat.css'
import {Avatar, IconButton}from '@material-ui/core'

import {Mic, InsertEmoticon, AttachFile, Send}from '@material-ui/icons'

import Profileoptions from '../../Components/Profile_options/Profile_options'
import { useChatValue } from '../../Helpers/context'
import Welcome from '../../Components/welcome/Welcome'
import ChatBox from '../../Components/ChatBox/ChatBox'
import {  dateFormatterChat } from '../../Helpers/dateFormatter'
import moment from 'moment'
import ChatHeaderInfo from '../../Components/ChatHeaderInfo/ChatHeaderInfo'
import ChatHeaderRight from '../../Components/ChatHeaderRight/ChatHeaderRight'
import data from 'emoji-mart/data/google.json'
import { NimblePicker } from 'emoji-mart'
import "emoji-mart/css/emoji-mart.css";

import ReactEmoji from 'react-emoji';
import Emoji from '../../Components/Emoji/Emoji'


 const Chat =()=>{

    const [chatOption,Setchatoption]=useState(false)
    const{conversation}=useChatValue()
    const chat_options=[
        {option:'Delete Chat'},
        {option:'Delete Contact'}
    ]
    const [text,SetText]=useState('')
    const [emoji,SetEmoji]=useState(false)
    const file=useRef()

    const renderChatBox=()=>{
        return   conversation.message.map((value,index)=><div key={index} style={{display:'flex',flexDirection:'column'}}>

        <span className="date-group">{dateFormatterChat(value.date) }</span>
        {
         value.data.map((val,idx)=> <ChatBox key={idx} isReceiver={conversation.id===val.senders_id} sendername={conversation.username} message={val.messages} created_at={moment(val.created_at).format('LT')}/>)
        }
      
        </div>
        )
    }

    const onClickText=(e)=>{
        e.preventDefault()
        let emoji= String.fromCodePoint(0x1F630)
        SetText(prev=> prev+emoji)
    }
    return conversation===null?<Welcome/>
            : 
    <div className="chat">
            
            <div className="chat-header">
                <Avatar src={conversation.avatar}/>

                <ChatHeaderInfo conversation_username={conversation.username}/>
                
                <ChatHeaderRight onClick_vert={()=>Setchatoption(!chatOption)}/>


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
            <IconButton onClick={()=>SetEmoji(!emoji)}>
           
            <InsertEmoticon style={{color:'aliceblue'}}/>
            </IconButton>
            {emoji&&     <Emoji/>}
       
            <form action="
            ">
       
                <input value={text} onChange={(e)=>SetText(e.target.value)} type="text" placeholder="type a message"/>
                
             
                </form>
          <IconButton onClick={onClickText}>
          { text.length>0?  <Send style={{color:'aliceblue'}}/>: <Mic style={{color:'aliceblue'}}/> }
          </IconButton>

       
        </div>

    </div>
}


export default Chat 