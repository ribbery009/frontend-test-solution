import React, { Component } from 'react';
import moment from 'moment';
import Icon from '@material-ui/core/Icon';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Checkbox from '@material-ui/core/Checkbox';
import Aux from '../hoc/Auxiliary/Auxiliary'



class Todoreturn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      selectedTodo: ' ',
      todos: [],
      checked: false,
      isEdit: false,
      id:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }


  componentWillMount(){
  this.setState({selectedTodo: this.props.title})
  this.setState({checked: this.props.completed})
  this.setState({selectedDate: this.props.date})
  this.setState({id: this.props.id})
  }

  handleCheckboxChange = event => {
    this.setState({ checked: event.target.checked })
    this.clickeventSave(event);
  }


  handleChange(event) {
    event.preventDefault();
    this.setState({ selectedTodo: event.target.value });
  }


  clickevent = (e) => {
    this.state.isEdit ? this.setState({ isEdit: false }) : this.setState({ isEdit: true })
  }

  clickeventSave = (e) => {
    if (this.state.selectedTodo === " ") {
      alert("Error, Empty field")
    }
    else { 
    if(e.target.type !== "checkbox"){
      this.props.todoDataUpdate(this.state.id, this.state.selectedTodo, this.state.selectedDate,this.state.checked)
      this.clickevent(e);}
    else{
      let next=true;
      this.state.checked ? next=false : null;
      this.props.todoDataUpdate(this.state.id, this.state.selectedTodo, this.state.selectedDate,next)
    }
  }
  }
  render() {
    const formattedDate = moment(this.state.selectedDate).format('LT');
    const edit = this.state.isEdit ? "visible" : "invisible";

    const TimePic = (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <TimePicker value={this.state.selectedDate} onChange={(value) => { this.setState({ selectedDate: value }) }} />
      </MuiPickersUtilsProvider>
    )


    const Todo = (<div className="list-group-item todo-item">
      <div className="row h-input align-items-center">
        <div className="align-items-center">

          <div className="col-1 col-sm-1 col-lg-2">
            {this.props.completed ? <Checkbox
            
              checked={this.state.checked}
              onChange={this.handleCheckboxChange}
              size="small"
              inputProps={{ 'aria-label': 'checkbox with small size' }}
            /> : <Checkbox
            
              checked={this.state.checked}
              onChange={this.handleCheckboxChange}
              size="small"
              inputProps={{ 'aria-label': 'checkbox with small size' }}
            />}
          </div>
        </div>

        <div className="col-4 col-lg-7 col-md-6 col-sm-3">
          <span className="font-weight-normal align-items-center">
            {this.state.checked ?
              <strike style={{ color: '#e0e0e0' }}>
                <span style={{ color: '#e0e0e0' }}>{this.props.title}</span>
              </strike>
              : this.props.title}

          </span>
        </div>

        <div className="col-md-4 col-sm-6 col-lg-3 d-flex align-items-center justify-content-end col-3 timeFormatted">
          {this.state.checked ? 
          <span style={{ color: '#e0e0e0'}}><small className="align-items-center">
            {formattedDate}
          </small></span> :
          <span>
            <small className="todo-item-time text-muted align-items-center">
              {formattedDate}
            </small>
          <i className="material-icons todo-item-action" title="Edit" onClick={this.clickevent}>edit</i>
          <i className="material-icons todo-item-action" title="Delete" onClick={() => this.props.todoDateRemover(this.props.id)}>delete</i></span>}
          </div>

      </div></div>
    )

    const TodoEdit = (<div className="list-group-item todo-item">
      <div className="row h-input align-items-center">
       

          <div className="col-1 col-sm-1">
            <Icon color="secondary" fontSize="small"  onClick={this.clickevent}>cancel
  </Icon>
        </div>
        <div className={"align-items-start col-1 col-sm-1 col-md-1"}>
          <Icon color="primary" fontSize="small" onClick={this.clickeventSave}>save</Icon>
        </div>
        <div className="col-4 col-lg-6 col-md-6 col-sm-4 mb-1">
          <input type="text" className="form-control" id="todoInput" placeholder="NewToDo" value={this.state.selectedTodo} onChange={this.handleChange} />
        </div>

        <div className="col-md-3 col-sm-4 col-2 col-lg-2 d-flex align-items-center justify-content-end">
          {TimePic}
        </div>

      </div></div>
    )
    return (
      <Aux>
        {this.state.isEdit ? TodoEdit : Todo}
      </Aux>
    )

  }
}


export default Todoreturn;

