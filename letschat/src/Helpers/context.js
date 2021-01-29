import React,{useContext,useState} from 'react'





const onShowContact=React.createContext()
const onCloseContact=React.createContext()
const onShowProfile=React.createContext()
const onCloseProfile=React.createContext()
const isToken =React.createContext()
const handleToken=React.createContext()

export function useToken(){
    return useContext(isToken)
}

export function useGetToken(){
    return useContext(handleToken)
}


export function useProfile(){
    return useContext(onShowProfile)
} 

export function useToggleProfile(){
    return useContext(onCloseProfile)
}

export function useContact(){
    return useContext(onShowContact)
}

export function useToggleContact(){
    return useContext(onCloseContact)
}


export function ContactProvider({children}){
    const [contact,setContact]=useState(false)
    const [profile,setProfile]=useState(false)
    const [token,setToken]=useState()
    
    function toggleProfile(){
        setProfile(prevProfile=>!prevProfile)
    }

    function toggleContact(){
        setContact(prevContact=>!prevContact)
    }



    return(
        <onShowContact.Provider value={contact}>
                <onCloseContact.Provider value={toggleContact}>
                    <onShowProfile.Provider value={profile}>
                    <onCloseProfile.Provider value={toggleProfile}>
                        <isToken.Provider value={token}>
                            <handleToken.Provider value={setToken}>

                       

             
                   

                {children}
                </handleToken.Provider>
                </isToken.Provider>
                </onCloseProfile.Provider>
                </onShowProfile.Provider>
                </onCloseContact.Provider>
        </onShowContact.Provider>
    )
}