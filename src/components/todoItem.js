import React, { useState } from 'react'
import axios from 'axios'

export default function TodoItem(props) {
    const [done, setDone] = useState(props.done)
    const toggleDone = () => {
        axios
        .patch(`https://jdm-todo-api.herokuapp.com/todo/${props.id}`,{
            done:!done
        })
        .then(() => setDone(!done))
        .catch(err => console.error("toggleDone Error: ", err))
    }
    return( 
    <div className="todo-item">
    <input type="checkbox"
        onClick={toggleDone}
        defaultChecked={done}
    />
    <p className={done ? "done" : ""}>{props.title}</p>
    <button onClick={() => props.deleteToDo(props.id)}>X</button>
    </div>
)
}