import React, { useEffect, useRef, useState } from 'react'
import './Chat.css'
import {Avatar, IconButton}from '@material-ui/core'

import {Mic, InsertEmoticon, AttachFile, Send, Stop, Straighten}from '@material-ui/icons'

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
import Pulsebutton from '../../Components/PulseButton/Pulsebutton'


 const Chat =()=>{

    const [chatOption,Setchatoption]=useState(false)
    const{conversation}=useChatValue()
    const chat_options=[
        {option:'Delete Chat'},
        {option:'Delete Contact'}
    ]
    const [text,SetText]=useState('')
    const [emoji,SetEmoji]=useState(false)
    const [mic,SetMic]=useState({
        isRecording:false,
        blobUrl:'',
     
    })
    const [record,SetRecord]=useState(null)
 
    const file=useRef()
    const {isRecording,blobUrl,isBlocked}=mic

    useEffect(()=>{
        if(isRecording){
            fetchRecording()
        }
    },[isRecording])

            
           
  
 
    

    
  

const fetchRecording= async()=>{
    let chunks=[]

    const options = {mimeType: 'audio/webm'}
    let stream= await navigator.mediaDevices.getUserMedia({audio:isRecording})
    let recorder= new MediaRecorder(stream,options)
    recorder.start()
    SetRecord(recorder)

    recorder.ondataavailable = (e)=> {
        if(e.data.size>0){
            chunks.push(e.data);
        }
        
      }
    recorder.onstop=e=>{
        const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
        chunks = [];

        SetMic({blobUrl:blob})
        
    }
      
}

    const renderChatBox=()=>{
        return   conversation.message.map((value,index)=><div key={index} style={{display:'flex',flexDirection:'column'}}>

        <span className="date-group">{dateFormatterChat(value.date) }</span>
        {
         value.data.map((val,idx)=> <ChatBox key={idx} isReceiver={conversation.id===val.senders_id} sendername={conversation.username} message={val.messages} created_at={moment(val.created_at).format('LT')}/>)
        }
      
        </div>
        )
    }
    const onStartMedia=()=>{
       SetMic({isRecording:true,blobUrl:''})

    
       
    }
    const onStopMedia=()=>{

        if(record.state!=='inactive'){
            record.stop()
            SetMic({blobUrl:''})
        }
     
    }
  console.log(blobUrl)
   

    
     
    

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
            
             <IconButton onClick={()=>SetEmoji(!emoji)}>   <InsertEmoticon style={{color:'aliceblue'}}/> </IconButton>
            
          {emoji&&     <Emoji setText={SetText}/>}
       
            <form >
           
                    <input value={text} onChange={(e)=>SetText(e.target.value)} type="text" placeholder="type a message"/>
                 
           </form>
          {text.length >0 ?<IconButton><Send style={{color:'aliceblue'}}/></IconButton>:record.state==='recording'?<Pulsebutton onClick={onStopMedia} / >: <IconButton onClick={onStartMedia} >  <Mic style={{color:'aliceblue'}}/></IconButton>  }
           
        </div>

    </div>
}


export default Chat 
          
           
         
 

             
    
   
   
