import React,{useEffect,useState} from 'react';
import MaterialTable from 'material-table';
import { Typography, makeStyles,Button,
    Paper, Container, Grid,IconButton,InputAdornment, Card, 
    CircularProgress,CardContent, CardActionArea,
    Dialog,DialogActions,DialogContent,
    DialogTitle, TextField,FormControlLabel,MenuItem} from "@material-ui/core";
import tableIcons from '../MaterialTable/MaterialTableIcons';
import CustomRow from './index';
import moment from 'moment'

const CompleteTable = () =>{
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [filtered,setFilteredData]= useState([])
    const [filteredtu,setFilteredDatatu]= useState([])
    const [data,setData] = useState([]);
    const classes = useStyles()
    const [open,setOpen] = useState(false);
    const [values,setValues] = useState([])

    const handleOpen=(data)=>{
        setOpen(true)
        setValues(data)
    }
    const handleClose=()=>{
        setOpen(false)
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
            setFilteredDatatu(filtered.filter(d=>d.appointmentStatus === 'Completed'));
        },[filtered])

        const handleClickedOpen =(data)=>{
            setOpen(true);
            setValues(data)
        }


    return(
        <Container component="main" maxWidth="lg">        
            <MaterialTable  
            icons={tableIcons}
            title="Information"
            data={filteredtu}
            columns={columns}
            components={{
                Row: props => <CustomRow {...props} handleClickedOpen={handleClickedOpen}/>
            }}
        />

<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <Container component="main" maxWidth='lg'>
                        <DialogTitle>
                            <div className={classes.division}>
                            <Typography className={classes.details}>Completed Appointment Details</Typography>
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
                            <Typography>{moment(values.dataAndTime).format('D MMM YYYY')}</Typography>
                            <Typography className={classes.subdetails}>Appointment Time:</Typography>
                            <Typography >{moment(values.dataAndTime).format('h:mm a')}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.subdetails}>Doctor's Confirmation Status:</Typography>
                            <Typography >{values.doctorsStatus}</Typography>
                        </Grid>
                    </Grid>
                    <DialogActions>
                            <Button variant="contained" color="primary" onClick={handleClose}>Close</Button>
                        </DialogActions>
                    </Container>
                </Dialog>

        </Container>
    )
}
const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(2, 1, 2),
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
export default CompleteTable