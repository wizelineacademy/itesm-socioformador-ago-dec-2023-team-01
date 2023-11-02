import { combineReducers } from 'redux';
import usersReducer from './slices/users';

const reducer = combineReducers({
  users: usersReducer,
});

export default reducer;
