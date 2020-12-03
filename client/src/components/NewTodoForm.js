import React, { Component } from 'react';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import SaveAltIcon from '@material-ui/icons/SaveAlt';


class newTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      selectedTodo: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ selectedTodo: event.target.value });
  }

  render() {

    const TimePic = (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <TimePicker value={this.state.selectedDate} onChange={(value) => { this.setState({ selectedDate: value }) }} />
      </MuiPickersUtilsProvider>
    )
    return (
      <div className="d-flex justify-content-around">
        <form className="form-inline">
          <div className="p-2">
            {TimePic}
          </div>
          <div className="p-2">
            <input type="text" className="form-control" id="todoInput" placeholder="NewToDo" value={this.state.selectedTodo} onChange={this.handleChange} />
          </div>
          <div className="p-2">
            <button type="submit" className="btn btn btn-outline-secondary rounded-circle 
" onClick={() => this.props.todoDataHandler(this.state.selectedTodo, this.state.selectedDate)}>
             <SaveAltIcon />
              </button>     
          </div>
        </form>
      </div>
    )
  }
}
export default newTodo;