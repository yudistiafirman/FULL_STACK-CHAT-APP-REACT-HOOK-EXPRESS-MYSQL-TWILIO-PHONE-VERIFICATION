import React from 'react'
import './ChatHeaderRight.css'
import { MoreVert, SearchOutlined}from '@material-ui/icons'
import {Avatar, IconButton}from '@material-ui/core'


function ChatHeaderRight({onClick_Search,onClick_vert}) {
    return (
        <div className="chat_headerRight">

        <IconButton onClick={onClick_Search}>
            <SearchOutlined style={{color:'	#e4e6eb'}}/>
        </IconButton>

        <IconButton onClick={onClick_vert}>
            <MoreVert style={{color:'	#e4e6eb'}}/>
        </IconButton>
    </div>
    )
}

export default ChatHeaderRight
