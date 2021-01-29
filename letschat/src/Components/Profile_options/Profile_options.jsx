import React from 'react'
import './Profile_options.css'

function Profile_options({option_name,onClick}) {
    return (
        <div className="profile-option" onClick={onClick}>
            {option_name}
        </div>
    )
}

export default Profile_options
