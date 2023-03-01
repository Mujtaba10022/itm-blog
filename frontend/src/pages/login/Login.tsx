
import React, { useState, useEffect, SyntheticEvent, BaseSyntheticEvent } from 'react';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import './login.css';

function Login() {

  const navigate = useNavigate();

  const [logINData, setLoginState] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    console.log('MOUNTING');

    return () => {
      console.log('UN MOUNT ---');
    }
  }, []);


  const handleChange = async (event: BaseSyntheticEvent) => {
    console.log('EVENT ---', event);
    setLoginState(
      {
        ...logINData,
        [event.target.name]: event.target.value
      }
    );
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();

    let loginData = logINData;

    const data = new FormData();
    // data.append("name", loginData.name);
    data.append("email", loginData.email);
    data.append("password", loginData.password);

    fetch('http://localhost:4200/api/v1/login', {
      method: "post",
      body: data,
    })
      .then((response) => {
        response.json();
        if (response.status === 400) {
          toast.error("Email/Password wrong");
        } else if (response.status === 202) {
          toast.success("Successfully Logged In");
          // history.replace("/login");
          // navigate('/login');
        } else if (response.status === 401) {
          toast.error("Email/Password wrong");
        }
      })
      .catch((err) => {
        toast.error(`${err}`);
      });

    // actions.resetForm();

  }

  return (
    <div>
      <div className="row form-section">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title" style={{ float: 'inherit' }}>Login</h3>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="card-body">

                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input name="email" onChange={handleChange} type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input name="password" onChange={handleChange} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div>
                  <Link to='/forgot-password'>Forgot Password</Link>
                </div>

              </div>

              <div className="card-footer">
                <button type="submit" className="btn btn-primary">Login</button>
                <Link className="btn btn-primary" to='/signup'>SignUp </Link>
              </div>
            </form>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Login;

