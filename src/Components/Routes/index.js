import React,{useState} from "react";
import { Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import NavMenu from "../NavBar/Navmenu";
import Login from '../Pages/Auth';
import Home from '../Pages/Home';

const RootRoutes = () =>{
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    return(
    <Router>
        <NavMenu/>
        <Routes>
            {user?.result?  <Route exact path='/' element={<Home/>}></Route>: <Route exact path='/' element={<Login/>}></Route>}
        <Route exact path='/login' element={<Login/>}></Route>
        <Route exact path='/home' element={<Home/>}></Route>
        </Routes>
    </Router>
    )
}
export default RootRoutes   