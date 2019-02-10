import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { addTodo } from '../../actions/todoActions'

class AddTodo extends React.Component {
  render() {
    const { uid, dispatch } = this.props

    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault()
            if (!this.inputElement.value.trim()) {
              return
            }
            dispatch(addTodo(uid, this.inputElement.value))
            this.inputElement.value = ''
          }}
        >
          <TextField
            inputRef={node => {
              this.inputElement = node
            }}
          />
          {' '}
          <Button variant="contained" color="secondary" type="submit">
            タスクを追加
          </Button>
        </form>
        <Button variant="contained" color="secondary" component={Link} to="/addtodoform">
          タスクを追加
        </Button>
      </div>
    )
  }
}

AddTodo.propTypes = {  // #4
  uid: PropTypes.string.isRequired,
}

export default connect()(AddTodo)