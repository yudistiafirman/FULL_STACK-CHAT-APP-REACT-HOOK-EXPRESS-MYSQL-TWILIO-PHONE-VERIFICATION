import React from 'react'
import './Profile_options.css'

function Profile_options({option_name,onClick,onMouseLeave}) {
    return (
        <div className="profile-option" onMouseLeave={onMouseLeave}  onClick={onClick}>
            {option_name}
        </div>
    )
}

export default Profile_options
