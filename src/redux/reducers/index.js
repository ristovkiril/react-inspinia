import { combineReducers } from 'redux';
import user from './user';
import loading from './loading';
import error from './error';
import { reducer as toastrReducer } from 'react-redux-toastr';

export default combineReducers({
  user,
  loading,
  error,
  toastr: toastrReducer
});


