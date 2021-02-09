import React, { useEffect, useState } from 'react'
import './Modal.css'
import { Close } from '@material-ui/icons'
import Button from '../Button/Button'
import {IconButton} from '@material-ui/core'
import { ValidatePhone } from '../../Helpers/validator'
import axios from 'axios'
import { uri } from '../../Helpers/constant'
import{Alert}from '@material-ui/lab'


function Modal({open,onCloseModal}) {

    const [phone,Setphone]=useState({
        phoneNumber:'',
        error:false
    })
    const [responseApi,SetResponseApi]=useState({
        error_response:false,
        error_message:'',
        success_response:false,
        success_message:''
    })
const {phoneNumber,error}=phone
const {error_response,error_message,success_message,success_response}=responseApi


useEffect(() => {
    if(!ValidatePhone(`+62${phoneNumber}`)){
        Setphone({...phone,error:true})
    }else{
        Setphone({...phone,error:false})
    }
}, [phoneNumber])


const onChangePhone=(e)=>{
    if(e.target.value.length>12){
  
    }else{
      Setphone({...phone,phoneNumber:e.target.value})
    }
  }

  const onAddContact=(e)=>{

      e.preventDefault()
      SetResponseApi({...responseApi,error_message:'',error_response:false})
      if(phoneNumber&&!error){
        
          const token =JSON.parse(localStorage.getItem('token')) 
  
          axios.post(`${uri}auth/addcontact/${token}`,{phonenumber:`+62${phoneNumber}`}).then((response)=>{
                SetResponseApi({error_message:'',error_response:false,success_response:true,success_message:response.data.message})
                setTimeout(()=>{
                    onCloseModal(false)
                    SetResponseApi({error_message:'',error_response:false,success_response:false,success_message:''})
                },1000)
                
          }).catch((error)=>{
              SetResponseApi({...responseApi,error_response:true,error_message:error.response.data.message})
          })
      }

  }

  const handleCloseModal=()=>{
      SetResponseApi({...responseApi,error_message:'',error_response:false,success_message:'',success_response:false})
      Setphone({...phone,phoneNumber:''})
      onCloseModal(false)
  }
    return (
        <div className={open?"add-contact-modal-backdrop":"add-contact-modal-backdrop display-none"}>
        <div className="modal-box">
            <form action="">
            <div className="modal-input-field">
                <span>+62</span>
                <input type="number" value={phoneNumber} onChange={onChangePhone} maxLength="12" placeholder="Enter Phone Number"/>
            </div>
             
             <div style={{alignSelf:'flex-end'}}>
             <Button text="Add " onClick={onAddContact} />
             </div>
            </form>
            <IconButton onClick={handleCloseModal} style={{position:'absolute',bottom:'20%',top:'41%',right:'8%',left:'62%',height:'0px'}}>
            <Close style={{color:'#e4e6eb'}}/>
            </IconButton>
            {error&&phoneNumber.length>0? <div className="modal-error-phone">
        <p>invalid phone number</p>
    </div>:null} 
        {
   error_response||success_response? <Alert style={{position:'absolute',width:'27%',top:'33%'}}  severity={error_response?'error':'success'} >{error_message?error_message:success_message}</Alert>:null
        }
   
          
       
    
        </div>
       
</div>
     
    )
}

export default Modal
