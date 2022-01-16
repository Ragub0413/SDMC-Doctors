import React, { useState,useEffect} from "react";
import { makeStyles, Typography, AppBar } from "@material-ui/core";
import {Button,
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";
import { Link } from "react-router-dom";
import { COLORS } from "../Styles/color.styles";
import Item from "./Item";
import "./NavMenu.css";
import decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import * as actionType from '../Connection/Constant/action.Type'
const menu = [
    {
      title: "Home",
      component: "/home",
    },
    {
      title: "About Us",
      component: "/",
    },
   
  ];
  
  const NavMenu = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPage, setSelectedPage] = useState("Home");
    const classes = useStyles();
    
    const logout = () => {
      dispatch({ type: actionType.LOGOUT });
  
      navigate('/login');
  
      setUser(null);
    };

    useEffect(() => {
      const token = user?.token;
  
      if (token) {
        const decodedToken = decode(token);
  
        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
  
      setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
      <AppBar
        elevation={0}
        position='relative'
        style={{ boxShadow: "none", background: COLORS.MAROON, }}
      >
         <Navbar
          className='navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow w-100'
          dark
        >
        
            <NavbarBrand tag={Link} to='/'>
            <div className="navbarbrand">
                {/* <Typography className={classes.title}>Basic App</Typography> */}
              </div>
            </NavbarBrand>
            {user?.result? (<>
            <NavbarToggler
              onClick={() => setIsOpen(!isOpen)}
              className='mr-2 white '
            />
             <Collapse
              className='d-sm-inline-flex flex-sm-row-reverse'
              isOpen={isOpen}
              navbar
            >
                <ul className='navbar-nav flex-grow mx-auto'>
                {menu.map(({ title, component }, idx) => (
                  <Item
                    key={idx}
                    title={title}
                    component={component}
                    onClickListener={() => {
                      setSelectedPage(title);
                    }}
                  />
                ))}
              </ul>
            </Collapse>
            <Button className={classes.buttonlogout} variant="contained"  onClick={logout} >Logout</Button>
            </>):(<> <NavbarBrand tag={Link} to='/'>
                    <div className="navbarbrand">
                      <Button className={classes.buttonlogin} variant="contained">Sign In</Button>
                    </div>
                  </NavbarBrand>
         </>)}
        </Navbar>
      </AppBar>
    );
  };
  
  const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
      fontWeight: "bold",
      fontSize: 25,
      color: COLORS.WHITE,
      fontFamily: "Pathway Gothic One",
    },

    buttonlogout: {
      backgroundColor: "lightgray",
      color: COLORS.BLACK,
      
    },
    buttonlogin: {
      color: COLORS.BLACK,
      backgroundColor: "lightgray",
      
    },
  }));
  export default NavMenu;