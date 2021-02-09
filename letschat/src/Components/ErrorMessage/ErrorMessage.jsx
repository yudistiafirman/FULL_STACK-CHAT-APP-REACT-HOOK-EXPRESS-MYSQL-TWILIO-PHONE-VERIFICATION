import React from 'react'


function ErrorMessage({children,top}) {

    const style={
        position:'absolute',fontSize:'14px',color:'red',top:top,left:'-40%',right:'0',bottom:'0'
    }

    return (
        <div style={style}>
            {children}
        </div>
    )
}

export default ErrorMessage
