import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import Aux from '../hoc/Auxiliary/Auxiliary';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),

    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));



const TodosHeader = (props) => {
  const classes = useStyles();

  const newDate = new Date();
  const todayDate = newDate.toLocaleDateString();

  const show = props.opener;

  
  const TodoForm = (
    <Aux>
              <div className="row mb-2">
                <div className="col-md-9 col-sm-6 col-8">
                  <h3 className="mb-0 text-secondary">
                    {<Moment format="dddd">
                      {todayDate}
                    </Moment>}
            , <span className="font-weight-normal">{
              <Moment format="Do">
                      {todayDate}
                    </Moment>}</span>
                  </h3>

                  <span className="text-muted">
                    {<Moment format="MMMM">
                      {todayDate}
                    </Moment>}
                  </span>
                </div>
  <div className="justify-content-flex-end d-flex  justify-content-sm-end pt-1 col-sm-6 col-md-3 row col-2">
  <div className="text-muted">
                    {props.todosCount ?  <strong>{props.todosCount}</strong> :  <strong>0</strong>} Tasks
                 </div>
                  </div>
                  </div>
                {show ? <div className={"btn--transForm"}>
                  <Fab color="secondary" aria-label="add" onClick={props.showTodoForm}>
                    <AddIcon />
                  </Fab></div>: <div className={"btn--transForm"}>
                    <Fab color="secondary" aria-label="remove" onClick={props.showTodoForm}>
                    <AddIcon />
                  </Fab>
                  </div>}
                  </Aux>
                  
  )


  return (
    <Aux>
      {TodoForm}
    </Aux>)


}
export default TodosHeader;