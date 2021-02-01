import React,{useState,useEffect} from 'react'
import {ForumRounded}from '@material-ui/icons'
import Input from '../../Components/Input/Input'
import Button from '../../Components/Button/Button'
import ErrorMessage from '../../Components/ErrorMessage/ErrorMessage'
import { ValidatePhone, ValidateUsername } from '../../Helpers/validator'
import Axios from 'axios'
import { uri } from '../../Helpers/constant'
import { authenticate } from '../../Helpers/auth'
import { useChatValue } from '../../Helpers/context'
import{Alert}from '@material-ui/lab'
import { Snackbar } from '@material-ui/core'




function LoginForm({onOpenVerification,openVerify,onSetMessage}) {

    const [details,setDetail]=useState({
        phone:'',
        username:'',
        error_phone:false,
        error_name:false
    })
    const {setToken}=useChatValue()
    const [errorResponse,setErrorRes]=useState({
      openBar:false,
      message:''
    })
    const {openBar,message}=errorResponse
    const {phone,username,error_name,error_phone}=details


  const handleSubmit=(e)=>{
    e.preventDefault()
    if((phone&&username&&!error_name&&!error_phone)){
        Axios.post(`${uri}auth/login`,{phone:`+62${phone}`,username}).then((response)=>{
              authenticate(response)
              setToken(response.data.token)
        }).catch((error)=>{
            setErrorRes({...errorResponse,openBar:true,message:error.response.data.message})
        })
    }
  }
const handleNewAccount=(e)=>{
  e.preventDefault()

  if((phone&&username&&!error_name&&!error_phone)){
    Axios.post(`${uri}auth/sendcode`,{phone:`+62${phone}`,username}).then((response)=>{
      //if res.token set token
      if(response.data.token){
          authenticate(response)
          setToken(response.data.token)
        
      }else{
        onOpenVerification(true)
        localStorage.setItem('temp_userdetails',JSON.stringify({phone,username}))
        onSetMessage(response.data.message)
      }



    }).catch((error)=>{
      setErrorRes({...errorResponse,openBar:true,message:error.response.data.message})
    })
  }

}
   

  useEffect(() => {
        if(!ValidatePhone(`+62${phone}`)){
            setDetail({...details,error_phone:true})
        }else{
            setDetail({...details,error_phone:false})
        }
  }, [phone])


  useEffect(() => {
    if(ValidateUsername(username)){
        setDetail({...details,error_name:true})
    }else{
        setDetail({...details,error_name:false})
    }
}, [username])
const onChangePhone=(e)=>{
  if(e.target.value.length>12){

  }else{
    setDetail({...details,phone:e.target.value})
  }
}

const onChangeName=(e)=>{
  if(e.target.value.length>20){

  }else{
    setDetail({...details,username:e.target.value})
  }
}


    return (
        <div className={openVerify?"login-form slide":"login-form"}>
          <ForumRounded style={{color:'#ffffff',width:'80px',height:'80px'}}  />
            <p className="login-title">Let's Chat</p>


                <form  >
          
                 <Input code="+62" placeholder="phonenumber"  value={phone} inputType="number" onChange={onChangePhone} />
                 <Input placeholder="username" value={username} onChange={onChangeName}/>
         

                <div className="btn-container">
                <Button onClick={handleSubmit}  text="Enter"/>
                <Button onClick={handleNewAccount}  text="Create New Account"/>
        
                </div>
           
                </form>
           {error_phone&&phone.length>0?<ErrorMessage top="44%">invalid format phone</ErrorMessage>:null} 
           {error_name&& username.length>0?<ErrorMessage top="78%">minimum 6 characters </ErrorMessage>:null}


           <Snackbar  open={openBar} style={{width:'100%',position:'absolute',top:'100%',height:'10%'}} autoHideDuration="2000" onClose={()=>setErrorRes({...errorResponse,openBar:false})}>
           <Alert  severity="error" >{message}</Alert>
           </Snackbar>
         

             
          </div>
    )
}

export default LoginForm
