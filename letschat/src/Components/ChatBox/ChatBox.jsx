import React from 'react'
import './ChatBox.css'
function ChatBox({isReceiver,sendername,created_at,message}) {
    return (
        
        <p className={isReceiver?"chat-message":"chat-message chat-receiver"}>
    
        {message}

        <span className="chat-timestamp">
            {created_at}
        </span>
        </p>
    )
}

export default ChatBox
