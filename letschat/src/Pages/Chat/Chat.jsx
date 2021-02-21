import React, { useEffect, useRef, useState } from 'react'
import './Chat.css'
import {Avatar, IconButton}from '@material-ui/core'
import {Mic, InsertEmoticon, AttachFile, Send, Add, Close}from '@material-ui/icons'
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
import{Alert}from '@material-ui/lab'
import { Snackbar } from '@material-ui/core'
import { Scrollbars } from 'react-custom-scrollbars';

import Addfile from '../../Components/Addfile/Addfile'
import CustomScrollDiv from '../../Components/Scrollbar/Scrollbar'






 const Chat =()=>{

    const [chatOption,Setchatoption]=useState(false)
    const{conversation,picture,SetPicture,SetIndex,index,SetConversation}=useChatValue()
    const chat_options=[
        {option:'Delete Chat'},
        {option:'Delete Contact'}
    ]
    const [text,SetText]=useState('')
    const [emoji,SetEmoji]=useState(false)
    const [mic,SetMic]=useState(false)
    const [record,SetRecord]=useState(null)
    const[error,SetError]=useState({
        error_picture:false,
        error_message:''
    })
    const [delIdx,SetDelIdx]=useState(null)
 

    const file=useRef()
    const {error_picture,error_message}=error
    
    useEffect(()=>{
        if(mic){
            fetchRecording()
        }
    },[mic])
 
  useEffect(()=>{
    if(index===delIdx){
        picture.splice(delIdx,1)
        SetIndex(prev=>picture.length-1)
    } else if(delIdx===0){
        picture.shift()
        SetIndex(prev=>picture.length-1)
    }

    if(picture.length===0){
        SetIndex(0)
    }

  
  
    SetDelIdx(null)


   
  },[delIdx,picture])


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


    const renderPreview=()=>{
      return  <PicturePreview  onClose={onClosePreview} onSendPicture={onSendPicture} >
        {
            picture.length>0?picture.map((v,i)=>{
                return <div  onClick={()=>SetIndex(i)} className={index===i?"add-picture active":"add-picture"}>
                    <img key={i}   src={v}/>
                    <span onClick={()=>SetDelIdx(i)} className={i===index?"close-small-picture":"close-small-picture display-none"}><Close/></span>
                </div>
            } ):null
        }
      {
          picture.length>0&&picture.length<5?<Addfile onAddPicture={onAddPicture}/>:null
      }


 </PicturePreview>
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
        
             onStopMedia()
         }
     }

     const onChangePicture=e=>{
        const imageUpload= e.target.files[0]
     
        if(imageUpload.size>1000000){
             SetError({error_picture:true,error_message:'file is too large'})
        }else if (!(/\.(png|jpe?g)$/i.test(imageUpload.name)) ){
            SetError({error_picture:true,error_message:'file is not an image type'})
        }else{

            SetPicture(prev=>[...prev,URL.createObjectURL(imageUpload)])
            if(picture.length!==0){
                SetIndex(prev=>picture.length)
            }
                SetConversation({...conversation,isAddingPicture:true})
        }
            

     }

   
 const onClickFile=()=>{
     if(picture.length>0){
        SetConversation({...conversation,isAddingPicture:true})
     }

        file.current.value=null
        file.current.click()
     
    
 }

 const onClosePreview=()=>{
     SetPicture([])
     file.current.value=null
     SetIndex(prev=>prev=0)
 }



const onAddPicture=()=>{

onClickFile()


}

const onSendPicture=()=>{
    const fd = new FormData()


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
             <CustomScrollDiv>
             {
               !conversation.isAddingPicture?renderChatBox():renderPreview()
             }
       </CustomScrollDiv>
         </div>
        
         <div className="chat-footer">
             
              <IconButton onClick={()=>SetEmoji(!emoji)}>   <InsertEmoticon style={{color:'aliceblue'}}/> </IconButton>
             
           {emoji&&     <Emoji className="emoji-container" setText={SetText}/>}
           <IconButton onClick={onClickFile}><AttachFile style={{color:'aliceblue'}}/></IconButton>
        
             <form >
            
                     <input value={text} onChange={(e)=>SetText(e.target.value)} type="text" placeholder="type a message"/>
                     <input onChange={onChangePicture} type="file" accept='image/*' style={{display:'none'}} ref={file}/>
            </form>
            <div contentEditable onFocus={()=>console.log('hai')} style={{outline:'none',caretColor:'transparent',color:'transparent'}} onBlur={handleBlur} >
            {text.length >0 ?<IconButton><Send style={{color:'aliceblue'}}/></IconButton>:record && record.state==='recording'?<Pulsebutton   isActive={record.state!=='inactive'}  onClick={onStopMedia} onAudiofile={onSubmitAudio} / >: <IconButton onClick={onStartMedia} >  <Mic style={{color:'aliceblue'}}/></IconButton>  }
            </div>
          
            
         </div>
 


   <Snackbar  open={error_picture} style={{width:'100%',position:'absolute',top:'50%',height:'10%',left:'50%'}} autoHideDuration={2000} onClose={()=>SetError({error_picture:false,error_message:''})}>
   <Alert  severity="error" >{error_message}</Alert>
   </Snackbar>
 
     </div>
 }
 
 
 export default Chat 
          
           
  
 
    

    
  


        
    
    


       
   
 
    
     
    



          
           
         
 

             
    
   
   
