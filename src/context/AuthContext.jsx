import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react'
// import { useState } from 'react';




export const AuthContextObj=createContext();


export default function AuthContextProvider({children}) {
    const [userToken, setuserToken] = useState(null)
    const [userData, setUserData] = useState(null)

    function decryptUserToken(){
        const res=  jwtDecode(userToken)
        console.log('userData',res);
        setUserData(res)
        
      }


      useEffect(()=>{
        if(userToken){
            decryptUserToken()
        }
        
      },[userToken])


    // useEffect(function(){
    //     console.log('Refreshed');
        
    //     const tkn=localStorage.getItem('tkn')
    //     if (tkn!=null){
    //         setuserToken(tkn)
    //     }
    // },[])
    
  return <>
    
    <AuthContextObj.Provider value={{setuserToken,userToken,userData}}>
    {children}
    </AuthContextObj.Provider>
    </>
}
