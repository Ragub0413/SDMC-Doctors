import React,{useState} from "react";
import { Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import NavMenu from "../NavBar/Navmenu";
import Login from '../Pages/Auth';
import Home from '../Pages/Home2';
import Profile from '../Profile/profile'
import HomeMenus from "../Pages/HomeMenu";
import Hometable from '../Home.js/hometable'
import Schedule from '../Home.js/Scheduled/ScheduledAppointments'
import Today from '../Appointments/AppointmentToday'
import Complete from '../Completed/baseComplete'

const RootRoutes = () =>{
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    // if()
    if(!user?.result){
        return(
        <Router>
            <NavMenu/>
            <Routes>
             <Route exact path='/' element={<Login/>}/>
            <Route exact path='/login' element={<Login/>}></Route>
            <Route exact path='/home' element={<HomeMenus/>}></Route>
            </Routes>
        </Router>
        )
    }
    else if(user?.result){
        return(
            <Router>
                <NavMenu/>
                <Routes>
                 <Route exact path='/' element={<Home/>}></Route>
                <Route exact path='/login' element={<Login/>}></Route>
                <Route exact path='/home' element={<HomeMenus/>}></Route>
                <Route exact path='/profile' element={<Profile/>}/>
                <Route exact path='/hometable/page' element={<Home/>}/>
                <Route exact path='/scheduled' element={<Schedule/>}/>
                <Route exact path='/today' element={<Today/>}/>
                <Route exact path='/completed' element={<Complete/>}/>
                </Routes>
            </Router>
            )
    }
}
export default RootRoutes   