import {createContext, useState} from 'react'
export const loginContext=createContext()

 function LoginStatus({children}){
    const [loginStatus,setLoginStatus]=useState(false)
    return(
        <loginContext.Provider value={{loginStatus,setLoginStatus}}>
            {children}
        </loginContext.Provider>
    )
}
export default LoginStatus;