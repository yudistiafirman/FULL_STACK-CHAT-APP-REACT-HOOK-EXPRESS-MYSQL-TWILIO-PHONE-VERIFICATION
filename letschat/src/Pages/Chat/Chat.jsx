import React from 'react'
import './Chat.css'
import {Avatar, IconButton}from '@material-ui/core'

import {Mic,AttachFile, InsertEmoticon, MoreVert, SearchOutlined}from '@material-ui/icons'
import myavatar from '../../Support/Images/evra.jpg'



 const Chat =()=>{
    return <div className="chat">

            <div className="chat-header">
                <Avatar src={myavatar}/>

                <div className="chat-header-info">
                    <h3>Room Name</h3>
                    <p>last seen at...</p>
                </div>

                <div className="chat_headerRight">

                    <IconButton>
                        <SearchOutlined style={{color:'	#e4e6eb'}}/>
                    </IconButton>
                    <IconButton>
                        <AttachFile style={{color:'	#e4e6eb'}}/>
                    </IconButton>
                    <IconButton>
                        <MoreVert style={{color:'	#e4e6eb'}}/>
                    </IconButton>
                </div>

            </div>

        <div className="chat__body">
            <p className="chat-message">
            <span className="chat-name">sonny</span>
            this is message

            <span className="chat-timestamp">
                {new Date().toUTCString()}
            </span>
            </p>
            <p className="chat-message chat-receiver">
            <span className="chat-name">sonny</span>
            this is message

            <span className="chat-timestamp">
                {new Date().toUTCString()}
            </span>
            </p>
            <p className="chat-message">
            <span className="chat-name">sonny</span>
            this is message

            <span className="chat-timestamp">
                {new Date().toUTCString()}
            </span>
            </p>
        </div>
        
        <div className="chat-footer">
            <InsertEmoticon/>
            <form>
                <input type="text" placeholder="type a message"/>
                <button type="submit">send a message</button>
            </form>
            <Mic/>
        </div>

    </div>
}


export default Chat 