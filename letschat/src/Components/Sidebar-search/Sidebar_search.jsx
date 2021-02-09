import React from 'react'
import './Sidebar_search.css'
import { SearchOutlined}from '@material-ui/icons'

export default function Sidebar_search ({onChange}){
    return <div className="sidebar-searchContainer">
    <SearchOutlined/>
    <input style={{outline:'none',border:'none',marginLeft:'10px'}} onChange={onChange} placeholder="Search or start new chat" type="text"/>
</div>
}