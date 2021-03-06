import moment from 'moment'
import {
  ADD_TODO_REQUEST, ADD_TODO_SUCCESS, ADD_TODO_ERROR,
  TOGGLE_TODO_REQUEST, TOGGLE_TODO_SUCCESS, TOGGLE_TODO_ERROR,
  NOT_AUTHENTICATED_ON_TODO_ACTION, LOCATION_CHANGE_ON_TODOS,
} from './index'

const addTodoRequest = (todoId) => ({
  type: ADD_TODO_REQUEST,
  todoId,
})

const addTodoSuccess = (todoId) => ({
  type: ADD_TODO_SUCCESS,
  todoId,
})

const addTodoError = (todoId, err) => ({
  type: ADD_TODO_ERROR,
  todoId,
  err,
})

const toggleTodoRequest = (todoId) => ({
  type: TOGGLE_TODO_REQUEST,
  todoId,
})

const toggleTodoSuccess = (todoId) => ({
  type: TOGGLE_TODO_SUCCESS,
  todoId,
})

const toggleTodoError = (todoId, err) => ({
  type: TOGGLE_TODO_ERROR,
  todoId,
  err
})

const notAuthenticatedOnTodoAction = () => ({
  type: NOT_AUTHENTICATED_ON_TODO_ACTION
})


export const addTodo = (uid, text) => {
  return (dispatch, getState, { getFirebase }) => {
    if (!uid) {
      dispatch(notAuthenticatedOnTodoAction());
      return;
    }
    dispatch(addTodoRequest());
    const firebase = getFirebase();
    const id = firebase.push(`todos/${uid}`).key;
    dispatch(addTodoRequest(id));
    const createdAt = moment().valueOf();
    firebase.set(`todos/${uid}/${id}`, {
      completed: false,
      text,
      _createdAt: createdAt,
      _updatedAt: createdAt
    })
      .then(() => {
        dispatch(addTodoSuccess());
      }).catch(err => {
        dispatch(addTodoError(err));
      });
  }
}

export const toggleTodo = (uid, id) => {  // #4
  return (dispatch, getState, { getFirebase }) => {
    if (!uid) {
      dispatch(notAuthenticatedOnTodoAction());
      return;
    }
    const firebase = getFirebase();
    const state = getState();
    const todo = state.firebase.data.todos[uid][id];
    dispatch(toggleTodoRequest(id));
    const updatedAt = moment().valueOf();
    firebase.update(`todos/${uid}/${id}`, {
      completed: !todo.completed,
      _updatedAt: updatedAt
    })
      .then(() => {
        dispatch(toggleTodoSuccess(id));
      }).catch(err => {
        dispatch(toggleTodoError(id, err));
      });
  }
}

export const locationChangeOnTodos = () => ({
  type: LOCATION_CHANGE_ON_TODOS
})