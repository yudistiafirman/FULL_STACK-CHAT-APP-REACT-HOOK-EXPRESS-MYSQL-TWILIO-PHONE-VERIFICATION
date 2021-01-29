import React from 'react'
import { ArrowBack, Camera, CameraAlt, Check, Edit, Photo} from '@material-ui/icons'
import { Avatar, IconButton } from '@material-ui/core'
import './IconButton.css'
function IconButton() {
    return (
<IconButton onClick={()=>setActive(!activeName)}  style={{position:'absolute',top:'0',left:'275px',bottom:'0',right:'0'}}>
                                    <Check style={{color:'teal'}}/>
                            </IconButton>
    )
}

export default IconButton
