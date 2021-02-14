import React from 'react'
import './AudioPlayer.css'
function AudioPlayer({src}) {
    return (
        <div id="audio0">
        <audio src={src} preload id="audio1" controls="controls">Your browser does not support HTML5 Audio!</audio>
    </div>
    )
}
export default AudioPlayer
