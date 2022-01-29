import React,{useEffect,useState} from 'react';
import MaterialTable from 'material-table';
import { Typography, makeStyles,Button,
    Paper, Container, Grid,IconButton,InputAdornment, Card, 
    CircularProgress,CardContent, CardActionArea,
    Dialog,DialogActions,DialogContent,
    DialogTitle, TextField,FormControlLabel,MenuItem} from "@material-ui/core";
import tableIcons from '../MaterialTable/MaterialTableIcons';
import CustomRow from './index';
import { useDispatch } from "react-redux";
import moment from 'moment'
import {cancelAppointment,doctorStatAppointment} from '../Connection/Action/appointments'

const ClientsTB = () =>{
    const classes = useStyles()
    const dispatch= useDispatch()
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [data,setData] = useState([]);
    const [openAccept,setOpenAccept]=useState(false);
    const [openDecline,setOpenDecline]=useState(false)
    const [values,setValues]= useState([]);
    const [stas,setStats]=useState({doctorsStatus:'Approved'})
    const [stasD,setStatsD]=useState({doctorsStatus:'Declined'})
    const [filtered,setFilteredData]= useState([])
    const [filteredtu,setFilteredDatatu]= useState([])
    const [openMenu,setOpenMenu]=useState(false);
    
    const handleMenu =(data)=>{
        setOpenMenu(true);
        setValues(data)
      
    }
    const handleCloseMenu =()=>{
        setOpenMenu(false);
    }
    const handleDecline =()=>{
        setOpenDecline(true)
    }
    const handleCloseDecline =()=>{
        setOpenDecline(false)
        setOpenMenu(false);
    }
    const handleAccept =()=>{
        setOpenAccept(true)
        console.log(values._id)
       
    }
    const handleCloseAccept =()=>{
        setOpenAccept(false)
        setOpenMenu(false);
    }
    const handleAcceptYes =()=>{
        dispatch(doctorStatAppointment(values._id,{...stas}))
        setOpenAccept(false)
        setOpenMenu(false)
    }
    const handleDeclineYes =()=>{
        dispatch(doctorStatAppointment(values._id,{...stasD}))
        setOpenDecline(false)
        setOpenMenu(false)
        
    }
    const columns=[
        {
            title: "Last Name", field:"lastName" 
        },
        {
            title: "First Name", field:"firstName" 
        },
        {
            title: "Date", field: "dateAndTime", type: 'date'
        },
        {
            title: "Time", field: "dateAndTime", type: 'time'
        },
        {
            title: "Actions",width: "3%"
        }]

        useEffect(()=>{
            fetch("https://sdmc-clinic.herokuapp.com/appointment/appointmentsss")
            .then(resp => resp.json())
            .then(resp => setData(resp))
        })
        useEffect(()=>{
            setFilteredData(data.filter(d=>d.doctorsName === user?.result._id));
        },[data])

        useEffect(()=>{
            setFilteredDatatu(filtered.filter(d=>d.doctorsStatus === 'Pending'));
        },[filtered])
    return(
        <Container component="main" maxWidth="lg">        
            <MaterialTable  
            icons={tableIcons}
            title="Information"
            data={filteredtu}
            columns={columns}
            components={{
                Row: props => <CustomRow {...props} handleMenu={handleMenu}/>
              }}
             />

        <Dialog open={openMenu} onClose={handleCloseMenu} >
        <Container component="main" maxWidth='lg'>
              <DialogTitle>
              <div className={classes.division}>
                  <Typography className={classes.details}>Appointment Confirmation</Typography>
                </div>
              </DialogTitle>
              <Grid container spacing={2} justify="center">
                        <Grid item xs={12}>
                            <Typography className={classes.subdetails}>Client Details</Typography>
                        </Grid>
                        <Grid item xs={12} >
                            <Typography className={classes.subdetails}> Name:</Typography>
                            <Typography > {values.suffix === 'undefined'? values.lastName +", "+ values.firstName +" "+values.middleName:values.lastName +" "+values.suffix+", "+ values.firstName +" "+values.middleName}</Typography>
                            <Typography className={classes.subdetails}>Contact Number:</Typography>
                            <Typography >{values.contactNumber}</Typography>
                            <Typography className={classes.subdetails}>Email Address:</Typography>
                            <Typography >{values.email}</Typography>
                        </Grid>
                        <Grid item xs={12} >
                            <div className={classes.division}>
                            <Typography className={classes.details}>Appointment Details</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} >
                             <Typography className={classes.subdetails}>Concern</Typography>
                             <Typography >{values.concerns}</Typography>
                            <Typography className={classes.subdetails}>Type of Consultation</Typography>
                            <Typography >{values.concernType}</Typography>
                            <Typography className={classes.subdetails}>Appointment Date:</Typography>
                            <Typography>{moment(values.dateAndTime).format('D MMM YYYY')}</Typography>
                            <Typography className={classes.subdetails}>Appointment Time:</Typography>
                            <Typography >{moment(values.dateAndTime).format('h:mm a')}</Typography>
                        </Grid>
                        {/* <Grid item xs={12}>
                            <Typography className={classes.subdetails}>Doctor's Confirmation Status:</Typography>
                            <Typography >{values.doctorsStatus}</Typography>
                        </Grid> */}
                    </Grid>
              <DialogActions>
              <Button variant="contained" color="primary" className={classes.addbtn} onClick={handleAccept}>Accept</Button>
              <Button variant="contained" color="secondary" className={classes.addbtn} onClick={handleDecline}>Decline</Button>
           
              </DialogActions>
        </Container>
        </Dialog>
        <Dialog open={openDecline} onClose={handleCloseDecline} >
        <Container component="main" maxWidth='lg'>
              <DialogTitle>
                  <Typography>Decline Appointment</Typography>
              </DialogTitle>
              <DialogContent>
                  <Typography>Are you sure you want to decline this appointment?</Typography>
              </DialogContent>
              <Grid container justifyContent='center' alignItems='center'>
              <Button variant="contained" color="primary" className={classes.addbtn} onClick={handleDeclineYes}>Yes</Button>
              <Button variant="contained" color="secondary" className={classes.addbtn} onClick={handleCloseDecline}>No</Button>
              </Grid>
        </Container>
        </Dialog>
        <Dialog open={openAccept} onClose={handleCloseAccept} >
        <Container component="main" maxWidth='lg'>
              <DialogTitle>
                  <Typography>Accept Appointment</Typography>
              </DialogTitle>
              <DialogContent>
                  <Typography>Are you sure you want to Accept this appointment?</Typography>
              </DialogContent>
              <Grid container justifyContent='center' alignItems='center'>
              <Button variant="contained" color="primary" className={classes.addbtn} onClick={handleAcceptYes}>Yes</Button>
              <Button variant="contained" color="secondary" className={classes.addbtn} onClick={handleCloseAccept}>No</Button>
              </Grid>
        </Container>
        </Dialog>

        </Container>
    )
}
const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(2, 1, 2),
      },
      addbtn: {
        // backgroundColor: COLORS.BLUE,
         color: "white",
         width: "30%",
         marginTop: theme.spacing(6),
         marginRight: theme.spacing(6),
         marginBottom: theme.spacing(6),
     },
 
     cancelbtn: {
         //backgroundColor: COLORS.BLUE,
         color: "white",
         width: "30%",
         marginTop: theme.spacing(6),
         marginRight: theme.spacing(6),
         marginBottom: theme.spacing(6),
     },
    details: {
        textAlign: "center",
        fontSize: "25px",
        fontWeight: "bold",
    },

    division: {
        borderBottom: "3px solid red"
    },

    subdetails: {
        fontWeight: "bold",
    },

  }));
export default ClientsTB