import React, { useState, useEffect, SyntheticEvent, BaseSyntheticEvent } from 'react';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import './forgotPassword.css';

function ForgotPassword() {

  const navigate = useNavigate();

  const [ForgotPassData, setForgotPasswordState] = useState({

    email: ''

  });

  useEffect(() => {
    console.log('MOUNTING');

    return () => {
      console.log('UN MOUNT ---');
    }
  }, []);


  const handleChange = async (event: BaseSyntheticEvent) => {
    console.log('EVENT ---', event);
    setForgotPasswordState(
      {
        ...ForgotPassData,
        [event.target.name]: event.target.value
      }
    );
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();

    let forgotpassData = ForgotPassData;

    const data = new FormData();
    // data.append("name", forgotpassData.name);
    data.append("email", forgotpassData.email);


    fetch('http://localhost:4200/api/v1/forgot-password', {
      method: "post",
      body: data,
    })
      .then((response) => {
        response.json();
        if (response.status === 400) {
          toast.error("Email doesnot exist");
        } else if (response.status === 200) {
          toast.success("Password Reset Link Sent");
          // history.replace("/login");
          // navigate('/login');
        } else {
          toast.error("Something invalid happened");
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
              <h3 className="card-title" style={{ float: 'inherit' }}>Forgot Password</h3>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="card-body">

                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input name="email" onChange={handleChange} type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                </div>

              </div>

              <div className="card-footer">
                <button type="submit" className="btn btn-primary">Get Password Reset Link</button>

              </div>
            </form>
          </div>

        </div>
      </div>

    </div>
  );
}

export default ForgotPassword;

