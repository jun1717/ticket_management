import React from 'react'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import green from '@material-ui/core/colors/green'
import Done from '@material-ui/icons/Done'
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank'
import Tooltip from '@material-ui/core/Tooltip'
import CallMade from '@material-ui/icons/CallMade'
import Error from '@material-ui/icons/Error'

const CheckIcon = (isOwnTodos, completed) => {
  if (completed) {
    return (
      <ListItemIcon>
        <Done nativeColor={green[500]} />
      </ListItemIcon>
    )
  }
  if (isOwnTodos) {
    return (
      <ListItemIcon>
        <CheckBoxOutlineBlank />
      </ListItemIcon>
    )
  }
  return null
}

const StatusIcon = (todoStatus) => {
  if (!todoStatus) {
    return null;
  }

  if (todoStatus.status === 'sending') {
    return (
      <Tooltip title="送信中">
        <CallMade />
      </Tooltip>
    )
  }
  if (todoStatus.status === 'error') {
    return (
      <Tooltip title="エラー">
        <Error />
      </Tooltip>
    )
  }
  return null
}

const Todo = ({ onClick, completed, text, isOwnTodos, todoStatus }) => (
  <ListItem
    onClick={onClick}
    button={isOwnTodos}
  >
    {CheckIcon(isOwnTodos, completed)}
    <ListItemText inset>
      <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
        {text}
      </span>
    </ListItemText>
    {StatusIcon(todoStatus)}
  </ListItem>
)

Todo.propTypes = {
  isOwnTodos: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  todoStatus: PropTypes.shape({
    status: PropTypes.oneOf(['sending', 'success', 'error']).isRequired
  })
}

export default Todo