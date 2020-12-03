import React, { Component } from 'react';
import TodoHeader from './TodoHeader';
import Api from '../Service/Api';
import NewTodoForm from './NewTodoForm';
import Aux from '../hoc/Auxiliary/Auxiliary';
import TodoItem from './TodoItem';



class TodoApp extends Component {

  state = {
    show: false,
    todosList: [],
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
          this.setState({ todosList: updatedTodos, todoslength: temp, needRefresh: false })
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

  componentWillMount() {
    this.FetchData()
    console.log("ComponentWillMount")
  }

  todoDataHandler = (selectedTodo, selectedDate) => {
    const data = {
      title: selectedTodo,
      completed: false,
      datetime: selectedDate,
    }
    Api.addTodo(data);
    this.FetchData();
  }

  todoDataRemover = (id) => {
    let item = { id: id }
    Api.deleteTodo(item)
    this.FetchData();
  }

  todoDataUpdate = (id, selectedTodo, selectedDate, completed) => {
    const item = {
      title: selectedTodo,
      completed: completed,
      datetime: selectedDate,
      id: id
    }
    Api.updateTodo(item)
    location.reload();
  }
  
  render() {
    let updatedTodos = [];
    if (this.state.todosList) {
      updatedTodos = this.state.todosList.map((todo, index) => {
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

    return (
      <div className="container">
        <div className="row justify-content-center py-5">
          <div className="col-lg-6">
            <div className="card todos">
              <div className="card-header bg-white position-relative">

                <TodoHeader showTodoForm={this.showInput} todos={this.state.todos} opener={this.state.show} todosCount={this.state.todoslength}/>
              </div>
              {this.state.show ? <Aux>
                <NewTodoForm todoDataHandler={this.todoDataHandler} /></Aux>

                :
                null
              }
              {this.state.todoslength > 0 ?
                <div className="list-group">
                  {updatedTodos}
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
export default TodoApp;