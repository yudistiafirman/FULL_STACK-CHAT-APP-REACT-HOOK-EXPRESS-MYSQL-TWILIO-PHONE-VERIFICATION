import React,{useRef,useState,useEffect} from 'react'
import {Check, Edit}from '@material-ui/icons'
import { IconButton } from '@material-ui/core'



function Profile_detail() {
    const [activeName,setActive]=useState(false)
    const field=useRef()


    useEffect(() => {
        if(activeName){
            field.current.focus()
        }else{
            field.current.blur()
        }

  
}, [activeName])
    return (
        <div className="profile-detail">
            <form>
                    <label htmlFor="username">Your name</label>
                        <div className="profile-input-field">
                        <input defaultValue="Firman Hadi Yudistia" disabled={!activeName?true:false}  ref={field} type="text"/>
                        {
                            activeName?<IconButton onClick={()=>setActive(!activeName)}>
                                    <Check style={{color:'teal'}}/>
                            </IconButton>
                            :
                            <IconButton onClick={()=>setActive(!activeName)}>
                            <Edit style={{color:'teal'}}/>
                        </IconButton>
                        }
                       
                        </div>
                    </form>
                       
                 
                     
        </div>
    )
}

export default Profile_detail
