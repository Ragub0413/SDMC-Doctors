import React, { useState } from 'react'
import { Grid, IconButton } from '@material-ui/core'
import { MTableBodyRow } from 'material-table'
import PreviewIcon from '@mui/icons-material/Preview';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';

const CustomRow = (props) => {
    const [show,setShow]=useState(true);
    const overlayStyle = { width: "100%", position: "absolute" }

    return(
        <Grid style={{ display: "contents" }} 
        onMouseOver={()=>setShow(true)}
        onMouseLeave={()=>setShow(true)}
        >
            {show&&<Grid align="right" style={overlayStyle}>
    
                <Grid sm={2} align="center" style={{ background: "#ffffff" }}>
                <IconButton title="Edit" onClick={()=>props.handleMenu(props.data)}>
                   <AttachEmailIcon/>
                </IconButton>
                <IconButton title="Edit" onClick={()=>alert(props.index)}>
                <PreviewIcon/>
                </IconButton>
                </Grid>
            </Grid>}
            <MTableBodyRow {...props} />
        </Grid>
    )
}
export default CustomRow