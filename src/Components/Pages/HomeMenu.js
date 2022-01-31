import React,{useState,useEffect} from "react";
import { Typography, makeStyles,Button,
    Paper, Container, Grid, Card, 
    CircularProgress,CardContent, CardActionArea,
    Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle, TextField} from "@material-ui/core";
import hometable from'../Home.js/hometable'
import { useNavigate } from "react-router";
const HomeMenu =()=>{
    const navigate = useNavigate();
    
    const classes = useStyles();
    const handleOpen=()=>{
      navigate('/hometable/page')
    }
    const handleOpens=()=>{
      navigate('/scheduled')
    }
    const handleToday=()=>{
      navigate('/today')
    }
    const handleComplete=()=>{
      navigate('/completed')
    }
    return(
        <Container component="main" maxWidth="lg" >
             <Paper className={classes.paper} elevation={0}>
                <Grid container>
                    <Grid item sm={6} >
                        {/* <Button  className={classes.paper1} onClick={handleOpen}> */}
                        <Paper elevation={4} className={classes.paper1} onClick={handleOpen}>
                        <Typography component="h1" variant="h6">Pending Appointments</Typography>
                        </Paper>
                        {/* </Button> */}
                    </Grid>
                    <Grid item sm={6}>
                        <Paper className={classes.paper1} elevation={4}onClick={handleOpens}>
                        <Typography component="h1" variant="h6">Scheduled Appointments</Typography>
                        </Paper>
                    </Grid>
                    <Grid item sm={6}>
                        <Paper className={classes.paper1} elevation={4} onClick={handleToday}>
                        <Typography component="h1" variant="h6">Appointments for Today</Typography>
                        </Paper>
                    </Grid>
                    {/* <Grid item sm={6}>
                        <Paper className={classes.paper1} elevation={4} onClick={handleComplete}>
                        <Typography component="h1" variant="h6">Completed Appointment Records</Typography>
                        </Paper>
                    </Grid> */}
                </Grid>
            </Paper>
        </Container>
    )
}
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(10),
      display: 'flex',
      flexDirection: 'column',
      
      alignItems: 'center',
      padding: theme.spacing(2),
      marginBottom: theme.spacing(10),
      
    },
    paper1:{
        marginTop: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100px',
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
      },
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    googleButton: {
      marginBottom: theme.spacing(2),
    },
  }));
  export default HomeMenu;