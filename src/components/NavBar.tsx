import React from 'react';
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import { setMovieInfo } from "../store/active/reducer";
import { useAppDispatch, useAppSelector } from "../store";
import useMediaQuery from "@mui/material/useMediaQuery";
import '../Movies.scss'

export const NavBar :React.FC =()=> {
    const item= useAppSelector((s)=> s.active.itemsInBag)
    const dispatch = useAppDispatch();
    console.log(item)
    const setMovieEmpty=()=>{
        dispatch(setMovieInfo(undefined))
    }
    return(
        <div className="app-bar">
            <div className="flex justify-space-between align-center">
                <Link  to="/" style={{textDecoration: 'none'}} >
                    <h1 className="font-24 font-weight-700" onClick={setMovieEmpty}>Movie Browser</h1>
                </Link>
                <div>
                    Cart: {item} items
                </div>
            </div>
        </div>
    )

}
export default NavBar;