import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../Constant/action.Type.js';

export default (staffReducers = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case LIKE:
      return staffReducers.map((staff) => (staff._id === action.payload._id ? action.payload : staff));
    case CREATE:
      return [...staffReducers, action.payload];
    case UPDATE:
      return staffReducers.map((staff) => (staff._id === action.payload._id ? action.payload : staff));
    case DELETE:
      return staffReducers.filter((staff) => staff._id !== action.payload);
    default:
      return staffReducers;
  }
};