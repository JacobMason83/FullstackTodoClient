import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './styles.css'
import axios from 'axios'
import TodoItem from './components/todoItem';



class App extends Component {
  constructor(){
    super()
    
    this.state = {
      todo: "",
      todos: []
    }
  }
  componentDidMount() {
    axios
    .get('https://jdm-todo-api.herokuapp.com/todos')
    .then(res => this.setState({
      todos: res.data
    }))  
    .catch(err => console.error(err))
  }
  handleChange = e => {
    this.setState({
      todo: e.target.value
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    //post to api
    axios
      .post('https://jdm-todo-api.herokuapp.com/todo', {
        title: this.state.todo,
        done: false
      })
      .then(res => {
        this.setState({
          todos: [...this.state.todos, res.data],
          todo: ""
        })
      })
      .catch(err => console.error("handleSubmit Error", err))
    //set state with new item
  }
  deleteToDo = id => {
    axios 
    .delete(`https://jdm-todo-api.herokuapp.com/todo/${id}`)
    .then(() => this.setState({
      todos: this.state.todos.filter(todo => {
        return todo.id !== id
      })
    }))
    .catch(err => console.error("deleteTodo Error: ", err))
  }
  renderTodos = () => {
    return this.state.todos.map(todo => {
      return(
        <TodoItem key={todo.id} {...todo} deleteToDo={this.deleteToDo} />
      )
    })
  }
  
  render(){
  return(
    <div id='app'>
      <h1>ToDo List</h1>
      <form className='add-todo' onSubmit={this.handleSubmit}>
        <input type="text"
          placeholder="Add ToDo"
          onChange={this.handleChange}
          value={this.state.todo}
        />
        <button type="submit">Add</button>
      </form>
      {this.renderTodos()}
    </div>
  )
}
}

ReactDOM.render(  
    <App />, document.getElementById('root')
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

