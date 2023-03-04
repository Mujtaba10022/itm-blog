import React,  { useContext, useEffect } from 'react';
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Dashboard from './pages/dashboard/Dashboard';
import Signup from './pages/signup/Signup';
import Redirect from './components/Redirect';

import Login from './pages/login/Login';

import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import ResetPassword from './pages/resetPassword/ResetPassword';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from "./store/auth-context";

import './App.css';


function App() {
  const ctx: any = useContext(AuthContext);

  useEffect(() => {
    let auth: any = localStorage.getItem('auth');
    if(auth && auth !== undefined) {
      auth = JSON.parse(auth);
      ctx.loginHandler(auth.token, auth.isLoggedIn)
    }
  }, []);

  return (
    <BrowserRouter>
      {ctx.isLoggedIn == true && (
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<Redirect url ="/dashboard" />} />
        </Routes>
      )}

      {ctx.isLoggedIn == false && (
        <Routes>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="*" element={<Redirect url ="/login" />} />
        </Routes>
      )}

      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
