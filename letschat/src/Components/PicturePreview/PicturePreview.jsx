import { IconButton } from '@material-ui/core'
import { Close, InsertEmoticon, Send } from '@material-ui/icons'

import React, {useState } from 'react'
import './PicturePreview.css'
import Emoji from '../Emoji/Emoji'
import { useChatValue } from '../../Helpers/context'




function PicturePreview({children,onClose,onSendPicture,preview}) {

const [emoticon,SetEmoticon]=useState(false)
const {previewText,SetPreviewText,picture,index,conversation}=useChatValue()

    return (
        <div   className={conversation.isAddingPicture&&picture.length>0?"send-picture-preview show":"send-picture-preview"}>
            <div className="preview-top">
                <IconButton onClick={onClose}>
                    <Close/>
                </IconButton>
                <p>Preview</p>
            </div>

            <div className="picture-preview">

                <div className="picture-collection">

                    {
                       picture.length>0?picture.map((v,i)=>{
                      return <div key={i} className={i===index?"slide active":"slide"}>{
                           i===index&&(  <img style={{width:'500px',height:'350px'}} src={v}/>)
                       }
                                
                       </div>
                     }):null
                   }
                  
                </div>

            <div className="preview-caption">

            <input value={previewText} onChange={(e)=>SetPreviewText(e.target.value)} placeholder="add caption..." type="text"/>
            {emoticon&&<Emoji setText={SetPreviewText} className="preview-emoji-container"/>}

            <IconButton  onClick={()=>SetEmoticon(!emoticon)}>
                <InsertEmoticon/>
            </IconButton>
            </div>
                
            </div>
                 
            <div className="preview-tiny-picture">
                    <IconButton onClick={onSendPicture}>
                        <Send/>
                    </IconButton>
                    {children}
                    
            </div>
             
        </div>
    )
}

export default PicturePreview
              
                 

                    

