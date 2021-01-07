import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './styles.css'
import axios from 'axios'



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
    .get('http://jdm-todo-api.herokuapp.com/todos')
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
    console.log('submitted')
  }
  renderTodos = () => {
    return this.state.todos.map(todo => {
      return(
        <div>
          <h1>{todo.title}</h1>
        </div>
      )
    })
  }
  
  render(){
  return(
    <div id='root'>
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

