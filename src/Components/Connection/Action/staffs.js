import {AUTH,UPDATE,DELETE} from '../Constant/action.Type.js'
import * as api from '../api/index.js';

export const signInStaff = (formData,navigate) => async (dispatch) => {
    try {
      const { data } = await api.signInStaff(formData);
  
      dispatch({ type: AUTH, data });
     navigate('/home')
      
    } catch (error) {
      console.log(error);
      alert("Please Check your Information");
    }
  };