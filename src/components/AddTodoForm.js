import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  todoListRoot: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  todoListContent: {
    maxWidth: 950,
    padding: theme.spacing.unit * 3,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
})
class AddTodoForm extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.todoListRoot}>
        <Paper className={classes.todoListContent}>
          <div>
            AddTodoForm
        </div>
        </Paper>
      </div >
    )
  }
}

AddTodoForm.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AddTodoForm);