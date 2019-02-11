import React from 'react'
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
  textField: {
    width: 600,
  },
  button: {
    paddingTop: theme.spacing.unit * 2,
  }
})
class AddTodoForm extends React.Component {
  render() {
    const { classes, match: { params: { uid } }, addTodo, history } = this.props;
    return (
      <div className={classes.todoListRoot}>
        <Paper className={classes.todoListContent}>
          <form
            onSubmit={e => {
              e.preventDefault()
              if (!this.inputElement.value.trim()) {
                return
              }
              addTodo(uid, this.inputElement.value)
              this.inputElement.value = ''
              history.push(`/users/${uid}/todos`);
            }}
          >
            <TextField
              inputRef={node => {
                this.inputElement = node
              }}
              style={styles.textField}
              label='Title'
            />
            <div className={classes.button}>
              <Button variant="contained" color="secondary" type="submit">
                追加
              </Button>
            </div>
          </form>
          <Button ariant="contained" color="secondary" onClick={() => history.goBack()}>戻る</Button>
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
  )(withRouter(AddTodoForm));