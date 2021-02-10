import React from 'react'
import './Emoji.css'

function Emoji() {


    const emojiCollection=[0x1f92B,0x1f92D,0x1f917,0x1f911,0x1f61D,0x1f92A,0x1f61C,0x1f61B,0x1f60B,0x1f619,0x1f61A,0x1f617,0x1f618,0x1f929,0x1f60D,0x1f607,0x1f60A,0x1f609,0x1f643,0x1f600,0x1f603,0x1f604,0x1f601,0x1f606,0x1f605,0x1f602,0x1f60D]

    return (
        <div className="emoji-container">
            {
                emojiCollection.map((value,idx)=><span >{String.fromCodePoint(value)}</span>)
            }
        </div>
    )
}

export default Emoji
