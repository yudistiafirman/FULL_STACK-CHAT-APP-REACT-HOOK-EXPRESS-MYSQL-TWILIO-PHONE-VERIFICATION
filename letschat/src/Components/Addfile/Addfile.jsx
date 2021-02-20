import { Add } from '@material-ui/icons'
import React from 'react'
import './AddFile.css'
function Addfile({onAddPicture}) {
    return (
        <div className="add-file" onClick={onAddPicture}>
                 <Add/>
                 <p>add file</p>
             </div>
    )
}

export default Addfile
