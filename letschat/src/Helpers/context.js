import axios from 'axios'
import React,{useContext,useState} from 'react'
import { uri } from './constant'





const chatValueProvider=React.createContext()

export function useChatValue(){
        return useContext(chatValueProvider)
}


export function ChatProvider({children}){
    const [contact,setContact]=useState(false)
    const [profile,setProfile]=useState(false)
    const [token,setToken]=useState(null)

    const [user,Setuser]=useState(null)


    function getAllcontacts(){
        const token= JSON.parse(localStorage.getItem('token'))
        axios.get(`${uri}auth/getallcontacts/${token}`).then((response)=>{
            
            Setuser(prev=>response.data.contacs)
        }).catch((error)=>{
                console.log(error.response.data.message)
        })

    }
    
    function toggleProfile(){
        setProfile(prevProfile=>!prevProfile)
    }

    function toggleContact(){
        setContact(prevContact=>!prevContact)
    }

    const chatValue={
        contact,
        profile,
        token,
        user,
        setToken,
        getAllcontacts,
        toggleProfile,
        toggleContact
    }

    return   <chatValueProvider.Provider value={chatValue}>
                             {children}

            </chatValueProvider.Provider>
              
                            
            

}
                                  
                                
                            

                       

                   

           
                          
    