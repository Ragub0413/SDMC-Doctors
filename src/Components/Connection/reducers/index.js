import { combineReducers } from "redux";
import auth from './auth';
import staffReducers from './staffReducers'
import appointments from './appointments';
export default combineReducers({auth,staffReducers,appointments});