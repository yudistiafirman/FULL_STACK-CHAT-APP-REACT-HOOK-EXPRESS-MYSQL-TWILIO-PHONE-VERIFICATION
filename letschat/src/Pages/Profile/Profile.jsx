import React,{useRef, useState,useCallback} from 'react'
import './Profile.css'
import {  CameraAlt,Close}from '@material-ui/icons'
import { Avatar, IconButton } from '@material-ui/core'
import SidebarTitle from '../../Components/SidebarTitle/SidebarTitle'
import Profileoptions from '../../Components/Profile_options/Profile_options'
import Profiledetail from './Profile_detail'
import Profileabout from './Profile_about'

import Preview from '../../Components/Preview/Preview'
import Previewtop from '../../Components/Preview_top/Preview_top'
import Previewbottom from '../../Components/Preview_bottom/Preview_bottom'
import { useChatValue } from '../../Helpers/context'

function Profile() {

   
  
    const [changePhoto,setChangephoto]=useState(false)
    const [option,setOption]=useState(false)
    const [viewPhoto,setViewPhoto]=useState(false)
    const [preview,setPreview]=useState(null)
    const [errorUpload,setErrorUpload]=useState(false)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
      console.log(croppedArea, croppedAreaPixels)
    }, [])
    const file=useRef()
    const options=[
        {option_name:'View Photo',option_function:()=>setViewPhoto(true)},
        {option_name:'Upload Photo',option_function:()=>file.current.click()},
        {option_name:'Remove Photo',option_function:()=>file.current.click()}
    ]

    const {profile,toggleProfile}=useChatValue()
    

 
 

     



    const onShowoption=()=>{
        if(changePhoto===true && option===false){
            setChangephoto(false)
        }else if(changePhoto && option){
            setChangephoto(true)
        }else{
            setChangephoto(false)
        }
    }
  
  const onChangeImage=(e)=>{

        const imageUpload= e.target.files[0]
     
        if(imageUpload.size>1000000){
                setErrorUpload(true)
        }else if (!(/\.(png|jpe?g)$/i.test(imageUpload.name)) ){
            setErrorUpload(true)
        }else{
        
            setPreview(URL.createObjectURL(e.target.files[0]))
        }
            
    
   
    }
   const onLeaveMouse=()=>{
    setOption(false)
    setChangephoto(false)
   } 

   const onCloseFile=()=>{
    file.current.value=null
    setPreview(null)
   }

   const zoomIn=()=>{

        if(zoom<6){
            setZoom(prev=>prev+1)
        }
    }

    const zoomOut=()=>{
   
            if(zoom>1){
                setZoom(prev=>prev-1)
            }
        }
            
        return (
            <div className={profile?"profile-container show-profile":"profile-container"}>
                <SidebarTitle onClick={toggleProfile} title="Profile"/>
    
                <div className="profile-picture">
                 <div className="avatar-container" onMouseEnter={()=>setChangephoto(true)} >
                    <Avatar style={{width:'150px',height:'150px',zIndex:"1", }}  />
                </div>
    
           
                <div  onClick={()=>{setOption(!option)}} onMouseLeave={onShowoption}  className={changePhoto?"photo-icon":"photo-icon display-none"}  >
                    <IconButton>
                        <CameraAlt style={{color:'#e4e6eb'}}/>
                    </IconButton>
                    <p>CHANGE</p>
                    <p>PROFILE PHOTO</p>
                </div>
                  
                <div onMouseLeave={onLeaveMouse} className={changePhoto&&option?"profile-options reveal-options":"profile-options"}>
                   
                      {options.map((value,index)=> <Profileoptions onClick={value.option_function} option_name={value.option_name} /> ) }
                      <input type="file" onChange={onChangeImage} ref={file} accept="image/*"/>
                </div>
            </div>
                       
                  
           
                <div className="profile-detail-container">
                    <Profiledetail/>
    
                    <div className="profile-detail">
                    <p>This is not username or pin. This name will visible in your contacts</p>
                   </div>
                   
                    <Profileabout/>
                </div>

                <div className={viewPhoto?"view-photo":"view-photo display-none"}>
                        <img src="" alt=""/>
                    <div className="view-photo-close">

                        <IconButton onClick={()=>{setViewPhoto(false)}}>
                            <Close style={{color:'#ffffff'}}/>
                        </IconButton>
                    </div>
                </div>

                <div className={preview?"view-photo":"view-photo display-none"}>

                        <div className="preview-container">
                               <Previewtop onClick={()=>file.current.click()} onClose={onCloseFile}/>
                        <div className="preview-image">

                            <Preview preview={preview} onCropComplete={onCropComplete} setCrop={setCrop} setZoom={setZoom} crop={crop} zoom={zoom}/>

                           <div className="zoom-in-out">
                            <button onClick={zoomIn}>+</button>
                            <button onClick={zoomOut}>-</button>

                        </div>
                       </div>

                              <Previewbottom/> 
                              
                        </div>
                </div>

                <div className={errorUpload?"view-photo":"view-photo display-none"}>
                    <div className="error-container show">
                            <p>Couldn't set photo profile</p>
                            <button onClick={()=>{
                                setErrorUpload(false)
                                file.current.value=null
                            }}>Okay</button>
                    </div>
                </div>

          </div>
                       
                    
                         
        )
    }
    
    export default Profile
     
        
        
 
    



                       

         
    
  
   




  
