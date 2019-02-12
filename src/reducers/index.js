import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form';
import { firebaseReducer } from 'react-redux-firebase'
import visibilityFilter from './visibilityFilter'
import notice from './notice'
import todoStatuses from './todoStatuses'

export default combineReducers({
  firebase: firebaseReducer,
  notice,
  todoStatuses,
  visibilityFilter,
  form: reduxFormReducer,
})