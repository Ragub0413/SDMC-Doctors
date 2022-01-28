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

  export const updatePersonalInfo =(id,perInUp)=> async (dispatch)=>{
    try{
      const {data} = await api.updatePersonalInfo(id,perInUp);
      dispatch({type: 'UPDATE',payload:data})
      console.log('updated Doctors Information')
    }
    catch(error){
      console.log(error);

    }
  }