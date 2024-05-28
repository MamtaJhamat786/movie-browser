import React from 'react';
import { Link } from "react-router-dom";
import { Box, AppBar, Typography, Badge } from "@mui/material";
import { setMovieInfo } from "../store/active/reducer";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useAppDispatch, useAppSelector } from "../store";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from '@mui/icons-material/Menu';


export const NavBar :React.FC =()=> {
    const item= useAppSelector((s)=> s.active.itemsInBag)
    const mobileView = useMediaQuery('(max-width:600px)');
    const dispatch = useAppDispatch();
    
    const setMovieEmpty=()=>{
        dispatch(setMovieInfo(undefined))
    }
    return(
        <AppBar position="static" sx={{ backgroundColor: 'white', padding: '10px 20px' }} >
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: 'space-between',
                height: "100%",
                gap: mobileView ? '5px' : '30px',
                alignItems: 'center'

            }}>
                <Link  to="/" style={{textDecoration: 'none'}} >
                    <Typography onClick={setMovieEmpty} fontWeight='700' sx={{color: 'red',  fontSize: '24px', fontFamily: 'Segoe UI'}}>TMDB</Typography>
                </Link>
                <Box gap='10px' display="flex">
                    <Badge color="success" variant="dot"
                           anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                    }}>
                        <PersonRoundedIcon sx={{color: 'black'}} />
                    </Badge>
                    {mobileView ? (
                        <MenuIcon sx={{color: 'black'}} />
                        ):(
                        <>
                            <Typography sx={{color: 'black'}}>Mamta</Typography>
                            <FavoriteRoundedIcon sx={{color: 'red'}} />
                            <Badge color="primary" badgeContent={item}>
                                <AddShoppingCartRoundedIcon sx={{color: 'black'}}/>
                            </Badge>
                        </>
                        )}
                </Box>
            </Box>
        </AppBar>
    )

}
export default NavBar;