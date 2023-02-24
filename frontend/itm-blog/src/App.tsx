import React from 'react';
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import ResetPassword from './pages/resetPassword/ResetPassword';

import './App.css';


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path='signup' element={<Signup />} />
          <Route path='login' element={<Login />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='reset-password' element={<ResetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
