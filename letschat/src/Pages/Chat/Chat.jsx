import React, { useEffect, useRef, useState } from 'react'
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
import Emoji from '../../Components/Emoji/Emoji'
import Pulsebutton from '../../Components/PulseButton/Pulsebutton'
import axios from 'axios'
import { uri } from '../../Helpers/constant'
import PicturePreview from '../../Components/PicturePreview/PicturePreview'








 const Chat =()=>{

    const [chatOption,Setchatoption]=useState(false)
    const{conversation}=useChatValue()
    const chat_options=[
        {option:'Delete Chat'},
        {option:'Delete Contact'}
    ]
    const [text,SetText]=useState('')
    const [emoji,SetEmoji]=useState(false)
    const [mic,SetMic]=useState(false)
    const [record,SetRecord]=useState(null)
 
 
  
 
    const file=useRef()


    useEffect(()=>{
        if(mic){
            fetchRecording()
        }
    },[mic])

            
           
  
 
    

    
  

const fetchRecording= async()=>{


    const options = {mimeType: 'audio/webm'}
    let stream= await navigator.mediaDevices.getUserMedia({audio:mic})
    let recorder= new MediaRecorder(stream,options)
    recorder.start()
    SetRecord(recorder)


      
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
        
       SetMic(prev=>true)
        
    
       
    }
    const onStopMedia=()=>{

        if(record.state!=='inactive'){
            record.stop()
            SetMic(false)

        }
     
    }

   const onSubmitAudio=(e)=>{
       // record state===!incative stop the audio
        if(record.state!=='inactive'){
            record.stop()
            SetMic(false)
            

        }
        let chunks=[]
        record.ondataavailable = (e)=> {
                chunks.push(e.data)

            
          }

          record.onstop=e=>{
            const blob = new Blob(chunks, { 'type' : 'audio/webm' });
            chunks=[]
            if(blob.size>500000){
                alert('cannot send the audio file is too large')
            }else{
                let fd = new FormData()
                fd.append('audio',blob)
                const token =localStorage.getItem('token')
           
                axios.post(`${uri}auth/uploadaudio/${JSON.parse(token)}/${conversation.id}`,fd).then((res)=>{
                    console.log(res.data)
                }).catch((err)=>{
                    console.log(err)
                })
            }
          }
 
            
    }

       
   
const handleBlur=(e)=>{
    if(mic){
        console.log(record.state)
        onStopMedia()
    }
 
    
     
    
}



    return conversation===null?<Welcome/>
            : 
    <div className="chat">
            
            <div className="chat-header">
                <Avatar src={conversation.avatar}/>

                <ChatHeaderInfo conversation_username={conversation.username}/>
                
                <ChatHeaderRight onClick_vert={()=>Setchatoption(!chatOption)}/>


            </div>

            <div onMouseLeave={()=>Setchatoption(false)}  className={chatOption?"chat-options show-options":"chat-options"}>

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
          <IconButton onClick={()=>file.current.click()}><AttachFile style={{color:'aliceblue'}}/></IconButton>
       
            <form >
           
                    <input value={text} onChange={(e)=>SetText(e.target.value)} type="text" placeholder="type a message"/>
                    <input type="file" accept='image/*' style={{display:'none'}} ref={file}/>
           </form>
           <div contentEditable onFocus={()=>console.log('hai')} style={{outline:'none',caretColor:'transparent',color:'transparent'}} onBlur={handleBlur} >
           {text.length >0 ?<IconButton><Send style={{color:'aliceblue'}}/></IconButton>:record && record.state==='recording'?<Pulsebutton   isActive={record.state!=='inactive'}  onClick={onStopMedia} onAudiofile={onSubmitAudio} / >: <IconButton onClick={onStartMedia} >  <Mic style={{color:'aliceblue'}}/></IconButton>  }
           </div>
         
           
        </div>

    <PicturePreview/>

    </div>
}


export default Chat 
          
           
         
 

             
    
   
   
