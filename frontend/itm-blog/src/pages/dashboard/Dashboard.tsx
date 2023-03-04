import React,  {useState, useContext, useReducer, useEffect, SyntheticEvent, BaseSyntheticEvent} from 'react';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import './dashboard.css';
import { Link } from "react-router-dom";


function Dashboard() {
  const navigate = useNavigate();

  const ctx = useContext(AuthContext);

  const logoutHandler = () => {
    ctx.logoutHandler();
    navigate('/login');
  }
  return (
    <>
      <div>
        {ctx.isLoggedIn &&
        <a onClick={logoutHandler}> Logout</a>
        }
      </div>
    </>
  );
}

export default Dashboard;
