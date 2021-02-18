import { IconButton } from '@material-ui/core'
import { Close, InsertEmoticon, Send } from '@material-ui/icons'
import evra from '../../Support/Images/evra.jpg'
import React, { useState } from 'react'
import './PicturePreview.css'
import Emoji from '../Emoji/Emoji'



function PicturePreview({children,onClose}) {

const [emoticon,SetEmoticon]=useState(false)
const [text,SetText]=useState('')

    return (
        <div className={children?"send-picture-preview show":"send-picture-preview"}>
            <div className="preview-top">
                <IconButton onClick={onClose}>
                    <Close/>
                </IconButton>
                <p>Preview</p>

            </div>

            <div className="picture-preview">
                    <img src={evra}/>

            <div className="preview-caption">
            <input value={text} onChange={(e)=>SetText(e.target.value)} placeholder="add caption..." type="text"/>
            {emoticon&&<Emoji setText={SetText} className="preview-emoji-container"/>}
            <IconButton  onClick={()=>SetEmoticon(!emoticon)}>
                <InsertEmoticon/>
            </IconButton>
            </div>
                    
            </div>

            <div className="preview-tiny-picture">
                    <IconButton>
                        <Send/>
                    </IconButton>
{children}
                    
            </div>
        </div>
    )
}

export default PicturePreview
