import React,{useEffect,useState} from 'react';
import MaterialTable from 'material-table';
import moment from 'moment'
import tableIcons from '../MaterialTable/MaterialTableIcons';
import CustomRow from './index'
import { useDispatch } from 'react-redux';
import {cancelAppointment,doctorRemark} from '../Connection/Action/appointments'
import { Typography, makeStyles,Button,
    Paper, Container, Grid,IconButton,InputAdornment, Card, 
    CircularProgress,CardContent, CardActionArea,
    Dialog,DialogActions,DialogContent,
    DialogTitle, TextField,FormControlLabel,MenuItem} from "@material-ui/core";

const TodaysAppointment =()=>{
    const dispatch = useDispatch()
    const classes = useStyles()
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [data,setData] =useState([])
     const [filtered,setFilteredData]= useState([])
    const [filteredtu,setFilteredDatatu]= useState([])
    const [filteredDate,setFilteredDataDate]= useState([])
    const [open,setOpen]= useState(false)
    const [values,setValues]=useState([])
    const [appStat,setAppStat] = useState({appointmentStatus:'Completed'});
    const [remark,setRemark] =useState({doctorsRemark:''});

    const handleRemark =()=>{
        dispatch(cancelAppointment(values._id,{...appStat}));
        dispatch(doctorRemark(values._id,{...remark}))
        setOpen(false)
        console.log(values)
    }
    const handleOpen =(data)=>{
        setOpen(true);
        setValues(data)
    }
    const handleClose =()=>{
        setOpen(false);
    }
    const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

            useEffect(function () {
                fetch("https://sdmc-clinic.herokuapp.com/appointment/appointmentsss")
                .then(resp=>resp.json())
                .then(resp=>setData(resp)) 

            })
            useEffect(()=>{
                setFilteredData(data.filter(d=>d.doctorsName === user?.result._id));
            },[data])

            useEffect(()=>{
                setFilteredDatatu(filtered.filter(d=>d.doctorsStatus === 'Approved'));
            },[filtered])
            useEffect(()=>{
                setFilteredDataDate(filteredtu.filter(d=>d.dateAndTime.split("T")[0] === new Date().toISOString().split("T")[0]));
            },[filteredtu])
    const columns=[ 
        {
            title: "Patient Name", field: "firstName"
        },
        // {
        //     title: "Email", field:"email"
        // },
        {
            title: "Contact Number", field: "contactNumber"
        },
        {
            title: "Date", field: "dateAndTime", type: 'date'
        },
        {
            title: "Time", field: "dateAndTime", type: 'time'
        },
        {
            title: "Status", field:"appointmentStatus"
        },
        {
            title:"Action"
        }
    ]
    return(
        <Container component="main" maxWidth="lg">        
            <MaterialTable  
            icons={tableIcons}
            title="Information"
            data={filteredDate}
            columns={columns}
            components={{
                Row: props => <CustomRow {...props} handleOpen={handleOpen} />
              }}
             />


    <Dialog open={open} onClose={handleClose} >
        <Container component="main" maxWidth='lg'>
              <DialogTitle>
              <div className={classes.division}>
                  <Typography className={classes.details}>Doctor's Remark</Typography>
                </div>
              </DialogTitle>
              <Grid container spacing={2} justify="center">
                        <Grid item xs={12}>
                            <Typography className={classes.subdetails}>Patient Details</Typography>
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
                            {/* <Typography className={classes.subdetails}>Appointment Date:</Typography>
                            <Typography>{moment(values.dateAndTime).format('D MMM YYYY')}</Typography>
                            <Typography className={classes.subdetails}>Appointment Time:</Typography>
                            <Typography >{moment(values.dateAndTime).format('h:mm a')}</Typography> */}
                        </Grid>
                        {/* <Grid item xs={12}>
                        <TextField  name="doctorsRemark" label="Remark" 
                                placeholder='Enter Remark for this patient' required
                                value={values.doctorsRemark} 
                                onChange={handleChange} 
                                fullWidth  variant="outlined" />
                        </Grid> */}
                    </Grid>
              <DialogActions>
              {/* <Button variant="contained" color="primary" className={classes.addbtn} onClick={handleRemark} >Submit</Button> */}
              <Button variant="contained" color="primary" className={classes.addbtn} onClick={handleClose} >Close</Button>
           
              </DialogActions>
        </Container>
        </Dialog>



        </Container>
    )
}
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(5),
      display: 'flex',
      flexDirection: 'column',
      
      alignItems: 'center',
      padding: theme.spacing(2),
      marginBottom: theme.spacing(10),
      textAlign:'center'
    },
    grids:{
        display: 'flex',
      
    },
    paper1:{
        marginTop: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(2),
      marginBottom: theme.spacing(3),
    //   marginLeft: theme.spacing(2),
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
  
    addstaff: {
        textAlign: "center",
        fontSize: "25px",
        fontWeight: "bold",
    },
  
  
    numberid: {
      fontSize: "20px",
      fontWeight: "bold",
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(1)
  },
  
  division: {
    borderBottom: "3px solid red"
  },
  
  profile: {
    fontSize: "30px",
    fontWeight: "bold",
  },
  
  profiledetails: {
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold",
  },
  
  editbtn: {
    width: "35%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2)
  },
  }));
  
export default TodaysAppointment