import React, { useReducer } from 'react'
import Context from './Store'

const initailState = {
    credential:{username:"",password:"",email:""},
    auth:false
}
const authReducer = (state,action)=>{
    switch (action.type) {
        case 'USER_AUTHENICATED':
            return {...state,auth:true}
            break;
        case 'USER_LOGEDOUT':
            return {...state,auth:false}
            break;
        case 'CRED_CHANGE':
            return {...state,credential:{...state.credential,...action.data}}
            break
        case 'CRED_SUBMITED':
        return {...state,credential:initailState.credential}
    }
}
const AuthProvider = ({children})=>{
    const [state,dispatch] = useReducer(authReducer,initailState)
    return(
        <Context.Provider  value={[state,dispatch]}>
            {children}
        </Context.Provider>
    )
}

export default AuthProvider
