import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { addTodo } from '../actions/todoActions'


const styles = theme => ({
  todoListRoot: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  todoListContent: {
    maxWidth: 950,
    padding: theme.spacing.unit * 5,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  todoForm: {
    padding: theme.spacing.unit * 4,
  },
  field: {
    width: '100%',
  },
  button: {
    paddingTop: theme.spacing.unit * 2,
    width: '130px',
    marginLeft: 'auto',
  }
})

const renderTextField = ({ input, label, ...others }) => (
  <TextField
    {...input}
    label={label}
    {...others}
  />
);

const renderTextArea = ({ input, label, ...others }) => (
  <TextField
    {...input}
    {...others}
    label={label}
    multiline
    rows="3"
    rowsMax="4"
    margin="normal"
    variant="outlined"
    type="time"
  />
);

class AddTodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }
  submit(value) {
    const { addTodo, history, match: { params: { uid } } } = this.props
    const { title, text } = value;
    if (!value.title.trim()) {
      return;
    }
    addTodo(uid, title, text);
    history.push(`/users/${uid}/todos`);
  }
  render() {
    const { classes, history, handleSubmit } = this.props;
    return (
      <div className={classes.todoListRoot}>
        <Paper className={classes.todoListContent}>
          <form
            onSubmit={handleSubmit(this.submit)}
          >
            <div>
              <Field
                name="title"
                label="Title"
                component={renderTextField}
                type="text"
                className={classes.field}
              />
            </div>
            <Field
              name="text"
              label="Text"
              component={renderTextArea}
              type="time"
              className={classes.field}
            />
            <div className={classes.button}>
              <Button variant="contained" color="secondary" type="submit">
                追加
              </Button>
              <Button ariant="contained" color="secondary" onClick={() => history.goBack()}>戻る</Button>
            </div>
          </form>
        </Paper>
      </div >
    )
  }
}

AddTodoForm.propTypes = {
  classes: PropTypes.object.isRequired,
  addTodo: PropTypes.func.isRequired,
}

function mapDispatchToProps(dispatch) {
  return {
    addTodo: bindActionCreators(addTodo, dispatch)
  };
}

export default
  compose(
    withStyles(styles),
    connect(null, mapDispatchToProps),
    reduxForm({ form: "addForm" })
  )(withRouter(AddTodoForm));