import React, {  useEffect, useState } from 'react'
import './Login.css'



import LoginForm from './LoginForm'
import VerificationForm from './VerificationForm'


export default function Login() {




  const [verify,setVerify]=useState(false)
  const [message,setMessage]=useState('')


  useEffect(()=>{
      if(localStorage.getItem('temp_userdetails')){
        setVerify(true)
      }
  },[])


    

  return (
        <div className="container">
            <div className="login_container">
                <div  className="login_bg_container">
                   <LoginForm onOpenVerification={setVerify} onSetMessage={setMessage} openVerify={verify} />
                    <VerificationForm message={message} onSetVerify={setVerify}  verify={verify}  />
               </div>
            </div>
        </div>
            
            )
          }
         
    
  
        

          
        
      
           
    
    

