import { combineReducers } from 'redux';
import usersReducer from './slices/users';
import groupsReducer from './slices/groups';

const reducer = combineReducers({
  users: usersReducer,
  groups: groupsReducer,
});

export default reducer;
