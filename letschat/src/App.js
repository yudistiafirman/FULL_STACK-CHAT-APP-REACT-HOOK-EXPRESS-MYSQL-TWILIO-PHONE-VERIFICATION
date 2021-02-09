import React,{useEffect} from 'react'
import Sidebar from "./Pages/SideBar/SideBar";
import Chat from './Pages/Chat/Chat'
import './App.css'
import Login from "./Pages/Login/Login.";

import SideBarContact from "./Pages/SideBar/SideBarContac";

import Profile from "./Pages/Profile/Profile";

import {useChatValue} from './Helpers/context';

function App() {

  const {token,setToken}=useChatValue()

 



useEffect(()=>{
setToken(localStorage.getItem('token'))
},[token])
  return (
  
      token?
       <div className="App">
    
      <div className="chat-body">
     
        <Sidebar/>
      <SideBarContact/>
        <Chat/>
        <Profile/>
       
   
      </div>
    </div>
 
    :
    <Login />
    
  )
     
        
   
}

export default App;
