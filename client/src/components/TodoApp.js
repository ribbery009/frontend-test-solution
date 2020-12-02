import React, { Component } from 'react';
import TodoHeader from './TodoHeader';
import Api from '../Service/Api';
import NewTodoForm from './NewTodoForm';
import Aux from '../hoc/Auxiliary/Auxiliary';
import TodoItem from './TodoItem';



class Hello extends Component {

  state = {
    show: false,
    todos: [],
    pull: false,
    prevStateCount: 0,
    todoslength: 0,
  }


  FetchData = () => {
    let temp = 0;
    Api.fetchTodos()
      .then(response => {
        const todos = response.data;
        const updatedTodos = todos.map(todo => {
          temp++;
          return {
            ...todo
          }
        })
        if (todos) {
          
          this.setState({ todos: updatedTodos, todoslength: temp })
        }
      });
  }

  showInput = () => {
    if (this.state.show) {
      this.setState({ show: false })
    }
    else {
      this.setState({ show: true })
    }


  }

  componentDidMount() {
    this.FetchData();

  }

  componentDidUpdate() {
    if (this.state.todos) {
      if (this.state.prevStateCount !== this.state.todoslength) {
        this.setState({ prevStateCount: this.state.todoslength })
      }
    }
  }

  todoDataHandler = (selectedTodo, selectedDate) => {
 
    const data = {
      title: selectedTodo,
      completed: false,
      datetime: selectedDate,
    }
    Api.addTodo(data);
  }

  todoDataRemover = (id) => {
 
    let item = {id: id}
    Api.deleteTodo(item)
    this.FetchData();
  }

  todoDataUpdate = (id,selectedTodo,selectedDate,completed) => {
    const item = {
      title: selectedTodo,
      completed: completed,
      datetime: selectedDate,
      id:id
    }
    Api.updateTodo(item)
    this.FetchData();
  }
  render() {
    let updatetedTodos = [];
    if (this.state.todos) {
      updatetedTodos = this.state.todos.map((todo, index) => {
        return (
          <TodoItem
            title={todo.title}
            date={todo.datetime}
            completed={todo.completed}
            key={index}
            id={todo._id}
            todoDateRemover={this.todoDataRemover}
            todoDataUpdate={this.todoDataUpdate}
          />
        );
      });
    }

    if (this.state.todos) {
      if (this.state.prevStateCount !== this.state.todoslength) {
        this.FetchData();
      }
    }

    return (
      <div className="container">
        <div className="row justify-content-center py-5">
          <div className="col-lg-6">
          <div className="card todos">
          <div className="card-header bg-white position-relative">
            
                <TodoHeader showTodoForm={this.showInput} todos={this.state.todos} opener={this.state.show} />
</div>
                {this.state.show ? <Aux>
                  <NewTodoForm todos={this.state.todos} todoDataHandler={this.todoDataHandler} /></Aux>

                  : 
                  null
                }
                {this.state.todos ?
                  <div className="list-group">
                    {updatetedTodos}
                  </div>
                  :
                  <div className="card-body">
                    <h4 className="text-center">You don't have any todos yet. :(</h4>
                    <p className="text-center">Click the button above to add some.</p>
                  </div>}



              </div>
            </div>
          </div>
        </div>
    )

  }
}
export default Hello;