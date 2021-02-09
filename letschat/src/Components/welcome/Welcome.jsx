import React from 'react'
import './welcome.css'
import { Forum}from '@material-ui/icons'
function Welcome() {
    return (
        <div className="welcoming-user">
        <Forum style={{color:'#e4e6eb',width:'40%',height:'40%'}}/>
        <p>Keep Your Beloved One's Connected</p>
    </div>
    )
}

export default Welcome
