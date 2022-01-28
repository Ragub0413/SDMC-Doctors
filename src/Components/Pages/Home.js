import React,{useState,useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import MaterialTable from 'material-table';
import { Typography, Button,
    Paper, Container, Grid, Card, 
    CircularProgress,CardContent, CardActionArea,
    Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle, TextField} from "@material-ui/core";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { COLORS } from "../Styles/color.styles";

const Home = () =>{
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const classes = useStyles();
    const [searchData,setSearchData]= useState('');
    const [data,setData] =useState([])


useEffect(function () {
    fetch("https://sdmc-clinic.herokuapp.com/appointment/appointmentsss")
    .then(resp=>resp.json())
    .then(resp=>setData(resp))

})


    return(
        <div>
            <Container className={classes.container}>
                <Paper className={classes.paper} elevation={5}>
                    <Typography className={classes.typo1}>Doctor's Patient Records</Typography>
                        <InputBase
                            className={classes.input}
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="..Search Patient"
                            inputProps={{ 'aria-label': 'search google maps' }}
                            onChange={(event)=>{
                                setSearchData(event.target.value);
                            }}
                        />
                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon className={classes.icon} />
                        </IconButton>

                        {data.filter((appointment)=>{
                            if(searchData==''){
                                return appointment
                            }
                            else if(appointment.firstName.toLowerCase().includes(searchData.toLowerCase())){
                                return appointment
                            }
                        }).map((appointment,index) => (
                           
                            <Grid item key={index} xs={12} >
                    {appointment.doctorsName === user?.result._id ?
                             (
                            <Card className={classes.card1 }>
                                <CardContent>
                                <Typography className={classes.typo4} >{appointment.firstName},{appointment.lastName}</Typography>
                                <Typography className={classes.typo4} >{appointment.concerns}</Typography>
                                <Typography className={classes.typo4} >{appointment.concernType}</Typography>
                                    <Typography className={classes.typo4}>{moment(appointment.dateAndTime).format('D MMM YYYY')}</Typography>
                                    <Typography className={classes.typo4} >{moment(appointment.dateAndTime).format('h:mm a')}</Typography>
                                    <Typography className={classes.typo4}>{appointment.appointmentStatus}</Typography>
                                    <Typography className={classes.typoIcon}>
                                    {/* {appointment.dateAndTime === new Date().toISOString() ? <Typography>Green</Typography>:<Typography>Red</Typography>} */}
                                    {/* <Button  variant="contained" >See Details</Button> */}
                                        
                                    </Typography>       
                            </CardContent>
                        </Card>
                            ):  null}
                            </Grid>
                         ) )}

                </Paper>
            </Container>
        </div>
    )
}
const useStyles = makeStyles((theme) => ({

    typo1: {
        fontSize: "40px",
        fontWeight: "bold",
        fontFamily: "Montserrat",
        paddingTop: "10px",
        marginBottom: "25px",
    },

    paper: {
        marginTop: "50px",
        marginLeft: "50px",
        marginRight: "50px",
        textAlign: "center",
        backgroundColor: COLORS.WHITE,
    },

    container: {
        marginBottom: "100px",
    },

    input: {
        border: "1px solid",
        backgroundColor: COLORS.WHITE,
        marginBottom: "50px",
        
    },

    icon: {
        
        color: COLORS.BLACK,
        width: "100%",
    },

}))
export default Home