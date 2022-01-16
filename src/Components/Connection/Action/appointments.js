import { FETCH_ALL,CREATE,UPDATE } from '../Constant/action.Type.js'
import * as api from '../Api/index.js';
export const cancelAppointment =(id,cancelApps) => async (dispatch) =>{
    try{
        const {data} = await api.cancelAppointment(id, cancelApps)

        dispatch({type: 'UPDATE', payload: data})

        console.log("di ko alam kung tama pa to");

    }catch(error){
        console.log(error.message);
    }
}