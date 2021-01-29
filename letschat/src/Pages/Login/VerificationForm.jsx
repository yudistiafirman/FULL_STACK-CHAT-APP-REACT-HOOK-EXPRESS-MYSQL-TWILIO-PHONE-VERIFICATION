import React ,{  useState,useRef, useEffect }from 'react'
import Button from '../../Components/Button/Button'
import Axios from 'axios'
import { authenticate } from '../../Helpers/auth'
import { useGetToken } from '../../Helpers/context'
import { uri } from '../../Helpers/constant'
import{Alert}from '@material-ui/lab'
import { Snackbar } from '@material-ui/core'


function VerificationForm({verify,message,onSetVerify}) {
    const [input,setInput]=useState({
        input_1:'',
        input_2:'',
        input_3:'',
        input_4:'',
      
      })
    const field_1=useRef()
    const field_2=useRef()
    const field_3=useRef()
    const field_4=useRef()

    const [alert,Setalert]=useState({
      error:false,
      message:''
    })

    const setToken=useGetToken()
    
    
    const {input_1,input_2,input_3,input_4}=input
    const {error,error_message}=alert
    
    const dataInput=[
      {value:input_1,refs:field_1},
      {value:input_2,refs:field_2},
      {value:input_3,refs:field_3},
      {value:input_4,refs:field_4},
    
      
    ]
    
const onSubmitEditing=(e,index,ref,value)=>{
    if((index+1)<=dataInput.length-1&&e.target.value!==''){
      dataInput[index+1].refs.current.focus()
    }
      
}


    
    const onSubmitCode=(e)=>{
      e.preventDefault()
      const code_1=field_1.current.value
      const code_2=field_2.current.value
      const code_3=field_3.current.value
      const code_4=field_4.current.value
      if(code_1&&code_2&&code_3&&code_4){
        //concat code_1>code_4
        const fullCode= code_1.concat(code_2,code_3,code_4)
        //get temp_user_detail from local_storage
        const userValue= JSON.parse(localStorage.getItem('temp_userdetails'))
        const {username,phone}=userValue
        //send to back end
        Axios.post(`${uri}auth/register`,{code:fullCode,username,phone:`+62${phone}`}).then((response)=>{
          authenticate(response)
          setToken(response.data.token)
          //remove temp_userdetails from localstorage,minutes second from localstorage
          localStorage.removeItem('temp_userdetails','minutes','seconds')
         
          
        }).catch((error)=>{
           if(error.response.data.max_attempt){
             Setalert({...alert,error:true,error_message:error.response.data.message})
             setTimeout(()=>{
              onSetVerify(false)
             },4000)
           
             localStorage.removeItem('temp_userdetails')
           }else{
              Setalert({...alert,error:true,error_message:error.response.data.message})
           }
        })
        
      }
    }
          
    return (
             
      <div className={verify?"verify-form slide-verify":"verify-form"}>
              <h3  className="verification-title">{message} </h3>
                <div id="form">

                 {
                  dataInput.map((value,index)=><input  ref={value.refs} type="text" maxLength="1" min="0" max="9" onInput={(e)=>onSubmitEditing(e,index)}/>)
                 }
    
     
                </div>

                <Button text="verify" onClick={onSubmitCode} />

            <div style={{color:'#e4e6eb'}}>

             Didn't receive the code?<br />
             <p  style={{color:'#e4e6eb'}}> just click verify button</p><br />
             <div id="time">

             </div>
  
           </div>
           
           <Snackbar  open={error} style={{width:'100%',position:'absolute',top:'100%',height:'10%'}} autoHideDuration="3000" onClose={()=>Setalert({...alert,error:false})}>
           <Alert  severity="error" >{error_message}</Alert>
           </Snackbar>
    </div>
    )
}

export default VerificationForm
