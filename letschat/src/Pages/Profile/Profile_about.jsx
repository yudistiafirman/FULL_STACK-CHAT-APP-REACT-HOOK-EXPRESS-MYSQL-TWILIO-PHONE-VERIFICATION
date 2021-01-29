import React,{useState,useRef,useEffect} from 'react'
import {  Check, Edit}from '@material-ui/icons'
import {  IconButton } from '@material-ui/core'



function Profile_about() {
    const [activeAbout,setActiveAbout]=useState(false)
    const fieldAbout=useRef()

    useEffect(() => {
     

        if(activeAbout){
            fieldAbout.current.focus()
        }else{
            fieldAbout.current.blur()
        }
}, [activeAbout])



    return (
        <div className="profile-detail">
            <form>

            <label htmlFor="username">About</label>
                <div className="profile-input-field">
                    <input defaultValue="Hey there I'am using let'chat" disabled={!activeAbout?true:false}  ref={fieldAbout} type="text"/>
                        {
                        activeAbout?<IconButton onClick={()=>setActiveAbout(!activeAbout)} >
                            <Check style={{color:'teal'}}/>
                        </IconButton>
                        :
                        <IconButton  onClick={()=>setActiveAbout(!activeAbout)}>
                        <Edit style={{color:'teal'}}/>
                        </IconButton>
                        }

                </div>
            </form>
        </div>
    )
}


export default Profile_about
