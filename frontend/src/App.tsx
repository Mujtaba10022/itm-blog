import React from 'react';
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import ResetPassword from './pages/resetPassword/ResetPassword';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path='signup' element={<Signup />} />
          <Route path='login' element={<Login />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='reset-password/:token' element={<ResetPassword />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>

  );
}

export default App;
