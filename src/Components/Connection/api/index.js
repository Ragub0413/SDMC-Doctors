import axios from 'axios';

const API = axios.create({ baseURL: 'https://sdmc-clinic.herokuapp.com' });
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });
  export const newStaffData = (newDatas) => API.post('/doctor/newDoctor',newDatas);
  export const deleteStaffData = (id) => API.delete(`/staff/${id}/remove`);
  export const cancelAppointment = (id,cancelApps) => API.patch(`/appointment/${id}/cancelAppointment`, cancelApps);
  export const signInStaff = (formData) => API.post('/doctor/signin/doctor', formData);