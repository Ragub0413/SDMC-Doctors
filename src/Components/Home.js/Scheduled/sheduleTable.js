import React,{useEffect,useState} from 'react';
import MaterialTable from 'material-table';
import { Typography, makeStyles,Button,
    Paper, Container, Grid,IconButton,InputAdornment, Card, 
    CircularProgress,CardContent, CardActionArea,
    Dialog,DialogActions,DialogContent,
    DialogTitle, TextField,FormControlLabel,MenuItem} from "@material-ui/core";
import tableIcons from '../../MaterialTable/MaterialTableIcons';
import CustomRow from './index';

const Schedule = () =>{
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
            setFilteredDatatu(filtered.filter(d=>d.doctorsStatus === 'Approved'));
        },[filtered])


    return(
        <Container component="main" maxWidth="lg">        
            <MaterialTable  
            icons={tableIcons}
            title="Information"
            data={filtered}
            columns={columns}
            components={{
                Row: props => <CustomRow {...props}/>
              }}
             />

           
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
export default Schedule