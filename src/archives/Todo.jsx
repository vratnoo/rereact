import React,{ useState,useEffect } from "react";
import { useDebugValue } from "react";

let globalId = 0


function Todo(){
    const [task,setTask] = useState("")
    const [todo,setTodo] = useState([])
    
    function handleSubmit(e){
        e.preventDefault()
        setTodo(oldTodo=>{
            setTask('')
            console.log("globalid",globalId)
            return [...oldTodo,{todo:task,id:globalId++ }]
        })
        console.log("globalid",globalId)
        // console.log(globalId)
        console.log("called")

    }

    // useEffect(()=>{
    //     console.log(globalId)
    // },[todo])

    function handleDelete(id){
        setTodo((oldTodo)=>{
            return oldTodo.filter((item)=>item.id!==id)
        })
    }
    return (
        <>
        <form onSubmit={handleSubmit}>

        <h1>Todo app</h1>
        <input name="task" value={task} onChange={(e)=>setTask(e.target.value)}/>
        <button type="submit">Add</button>
            </form>
        <ul>
            {todo.map((item)=>{
                return (<div key={item.id}><li >{item.todo+""+item.id}</li>
                <button onClick={()=>handleDelete(item.id)}>Delete</button>
                </div>)
            })}
        </ul>
        </>
    )
}


export default Todo