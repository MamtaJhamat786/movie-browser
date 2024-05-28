import React from "react";
import {Box} from "@mui/material";
import Events from "../components/Movies";

const Home: React.FC=()=>{
    return(
        <Box sx={{padding: '10px', backgroundColor: '#F4F4F6' }}>
            <Events/>
        </Box>

    )
}
export default Home;