import React from 'react';
import './login.css';
import { Link } from "react-router-dom";
import Wrapper from '../../components/Wrapper'
import styles from './Login.module.css';

function Login() {
  return (
    <Wrapper pageHeading={'Welcome to login page of ITM Blog'}>
      Login
      <Link className='anchor'  to="/signup">Signup</Link>
    </Wrapper>
  );
}

export default Login;
