import React from 'react'
import './Button.css'

export default function Button ({text,onClick}){

    return <div>
            
            
            <button onClick={onClick} style={{textDecoration:'none',outline:'none'}} className="btn purple">{text}</button>

    </div>


}