import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store";
import "../styles.scss"

const NavBar :React.FC =()=> {
  const item= useAppSelector((s)=> s.active.itemsInBag);

  return(
    <div className="app-bar">
      <div className="flex justify-space-between align-center">
        <Link  to="/" style={{textDecoration: "none"}} >
          <h1 className="font-24 font-weight-700">Movie Browser</h1>
        </Link>
        <div>
            Cart: {item} items
        </div>
      </div>
    </div>
  )

}
export default NavBar;