import React from 'react'
import './ChatHeaderInfo.css'

function ChatHeaderInfo({conversation_username}) {
    return (
        <div className="chat-header-info">
        <h3>{conversation_username}</h3>
        <p>last seen at...</p>
    </div>
    )
}

export default ChatHeaderInfo
