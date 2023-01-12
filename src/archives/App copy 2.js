import React,{ useState,useRef, useEffect, useReducer } from "react";
import {Route,Routes,BrowserRouter,Link} from 'react-router-dom'
import User from './User'
import { createContext } from "react";
import { RemoteComponent } from "./RemoteComponent";
import Context from "./Store";
function reducer(state,action){
      switch (action.type) {
         case 'INCREMENT_COUNTER':{
            return {...state,counter:state.counter+state.step}
         }
         case 'INCREMENT_STEP':{
             return {...state,step:state.step+action.payload}
         }
         case 'DECREMENT_STEP':{
            return {...state,step:state.step-action.payload}
         }

         default:
            break;
      }
}
function App(){
   const [state,dispatch]  = useReducer(reducer,{counter:0,step:1})

 
   return (
<>
      <Context.Provider value={[state,dispatch]}>
         <h1>This is local component</h1>
          <RemoteComponent/>
      </Context.Provider>
</>

   )
}



export default App