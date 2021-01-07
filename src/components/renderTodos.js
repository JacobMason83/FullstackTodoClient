import React, { useState } from 'react'

export default function RenderTodos(props) {
    const [todos, setTodos] = useState(props.todos)

    const renderTodos = todos.map(todo => {
       return( <div key={todo.id} className="todo-item">
            <h1>{todo.title}</h1>
        </div>
       )
    })
    return(
        <div>
          {renderTodos}
        </div>
      )
}
