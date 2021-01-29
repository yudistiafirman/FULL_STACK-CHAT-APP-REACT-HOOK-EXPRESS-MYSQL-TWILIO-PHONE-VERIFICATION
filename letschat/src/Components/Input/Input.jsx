import React from 'react'
import './Input.css'


export default function Input({code,placeholder,onChange,ref,inputType,value}){
   
    return    <div className="input-field">
              <span className="phone-code">{code}</span>
            < input onChange={onChange} value={value} type={inputType}   placeholder={placeholder} ref={ref} required/>
         
            </div>
  
}