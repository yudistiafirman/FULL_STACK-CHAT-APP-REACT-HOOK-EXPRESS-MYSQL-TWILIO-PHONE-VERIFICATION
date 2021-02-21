import axios from 'axios'
import React,{useContext,useState} from 'react'
import { uri } from './constant'
import moment from 'moment'




const chatValueProvider=React.createContext()

export function useChatValue(){
        return useContext(chatValueProvider)
}


export function ChatProvider({children}){
    const [contact,setContact]=useState(false)
    const [profile,setProfile]=useState(false)
    const [token,setToken]=useState(null)
    const [conversation,SetConversation]=useState(null)
    const [previewText,SetPreviewText]=useState('')
    const [picture,SetPicture]=useState([])
    const [index,SetIndex]=useState(0)
  

    const [user,Setuser]=useState({
        loading:false,
        value:null,
        error:false
    })



    function getAllcontacts(){

        Setuser({...user,loading:true})
        const token= JSON.parse(localStorage.getItem('token'))
        axios.get(`${uri}auth/getallcontacts/${token}`).then((response)=>{
            const users=[]
            const alphabet= [ { title: 'A', data: []}, { title: 'B', data: [] }, {title: 'C', data: []}, {title: 'D', data: []}, {title: 'E', data: []}, {title: 'F', data: []}, {title: 'G', data: []}, {title: 'H', data: []}, 
            {title: 'I', data: []}, {title: 'J', data: []}, {title: 'K', data: []}, {title: 'L', data: []}, {title: 'M', data: []}, {title: 'N', data: []}, {title: 'O', data: []}, {title: 'P', data: []}, {title: 'Q', data: []}, 
            {title: 'R', data: []},  {title: 'S', data: []}, {title: 'T', data: []}, {title: 'U', data: []}, {title: 'V', data: []}, {title: 'W', data: []}, {title: 'X', data: []}, {title: 'Y', data: []}, {title: 'Z', data: []} ]
             
         response.data.contacts.map((value,index)=>users.push({id:value.user_id,phone:value.phone,username:value.username,avatar:value.avatar,message:[]}))
                response.data.messages.map((value,index)=>{
                    let idx
                    
                    for(var i =0;i<users.length;i++){
                        if(value.senders_id===users[i].id  || value.recepient_id ===users[i].id){
                            idx=i
                        }
                    }
                   return users[idx].message.push(value)
   
                   })
                users.map((value,index)=>{
                let indx

                for(var i =0;i<alphabet.length;i++){
                    if(value.username[0].toUpperCase()===alphabet[i].title){
                        indx=i
                    }
                }

                return alphabet[indx].data.push(value)
            })
             
                  Setuser({...user,loading:false,value:alphabet,error:false})
             


        }).catch((error)=>{
            console.log(error)
            // Setuser({...user,loading:false,value:null,error:true})
        })

    }

 
    function toggleProfile(){
        setProfile(prevProfile=>!prevProfile)
    }

    function toggleContact(){
        setContact(prevContact=>!prevContact)
    }

    function createConversation(id,username,avatar,message){
        const groupMessage=[]
        message.map((value,index)=>{
         
            let similar=false
            let tempValue=[]
            tempValue.push(value)

            for(var i =0;i<groupMessage.length;i++){
                if(moment(groupMessage[i].date).format('l')===moment(value.created_at).format('l')){
                    similar=true
                }
            }
            if(!similar){
          groupMessage.push({date:value.created_at,data:[]})
         

            }
            tempValue.map((v)=>{
               let idx
               for(var i =0;i<groupMessage.length;i++){
                if(moment(groupMessage[i].date).format('l')===moment(v.created_at).format('l')){
                    idx=i
                }
            }
       groupMessage[idx].data.push(v)
            })
          
        })
        const messageValue={id,username,avatar,message:groupMessage}
        SetConversation(messageValue)
        
        }
                    


  
       
     

    
             

            

   


       
          
     

    const chatValue={
        contact,
        profile,
        token,
        user,
        conversation,
        setToken,
        getAllcontacts,
        toggleProfile,
        toggleContact,
        createConversation,
        previewText,
        SetPreviewText,
        picture,
        SetPicture,
        index,
        SetIndex,
        SetConversation
       
   
     
    }

    return   <chatValueProvider.Provider value={chatValue}>
                             {children}

            </chatValueProvider.Provider>
              
                            
            

}
                                  
                                
                            

                       

                   

           
                          
    