import React from 'react'
import { useContext } from 'react'
import Context from './Store'
export const RemoteComponent = () => {
  const [state,dispatch] = useContext(Context)

  function increase(){
    dispatch({type:'INCREMENT_COUNTER'})
  }
  return (
    <>
    <p>One lvel down</p>
    <h1>Counter is {state.counter}</h1>
    <button onClick={increase}>Increse Counter</button>
    <RemoteComponent2/>

    
    </>
  )
}


export const RemoteComponent2 = () => {
  const [state,dispatch] = useContext(Context)
  function incstep(){
    dispatch({type:'INCREMENT_STEP',payload:1})
  }
    return (
      <>
      <p>Two lvel down</p>
      <h1>STEP iS {state.step}</h1>
      <button onClick={incstep}>Increse Step</button>
      </>

    )
  }
