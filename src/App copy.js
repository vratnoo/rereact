import React,{ useState,useRef, useEffect, useReducer } from "react";
import {Route,Routes,BrowserRouter,Link} from 'react-router-dom'
import User from './User'

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

   function increase(){
      dispatch({type:'INCREMENT_COUNTER'})
   }
   function incstep(){
      dispatch({type:'INCREMENT_STEP',payload:1})
   }
   return (
<>
<h1>Working</h1>
<p>Counter is : {state.counter}</p>
<p>Step is : {state.step}</p>
<button onClick={increase}>Increse Counter</button>
<button onClick={incstep}>Increse Step</button>
</>

   )
}

export default App