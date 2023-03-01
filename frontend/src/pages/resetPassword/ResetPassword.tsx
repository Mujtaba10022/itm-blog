
import React, { useState, useEffect, SyntheticEvent, BaseSyntheticEvent } from 'react';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import './resetPassword.css';

function ResetPassword() {

  const token = useParams();
  const newToken = JSON.stringify(token);

  const navigate = useNavigate();

  const [ResetPassData, setResetPasswordState] = useState({

    password: '',
    token: ''

  });

  useEffect(() => {
    console.log('MOUNTING');

    return () => {
      console.log('UN MOUNT ---');
    }
  }, []);


  const handleChange = async (event: BaseSyntheticEvent) => {
    console.log('EVENT ---', event);

    setResetPasswordState(
      {
        ...ResetPassData,
        [event.target.name]: event.target.value
      }
    );
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();

    let resetpassData = ResetPassData;

    const data = new FormData();
    // data.append("name", resetpassData.name);

    data.append("password", resetpassData.password);
    data.append('token', newToken);



    fetch(`http://localhost:4200/api/v1/reset-password/`, {
      method: "post",
      body: data,
    })
      .then((response) => {
        console.log(data)
        response.json();
        if (response.status === 400) {
          toast.error("Email doesn't exist");
        } else if (response.status === 202) {
          toast.success("Password Reset Successfully");
          navigate('/login');
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
              <h3 className="card-title" style={{ float: 'inherit' }}>Reset Password</h3>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="card-body">

                <div className="form-group">
                  <label htmlFor="examplenewpassword">New Password</label>
                  <input name="password" onChange={handleChange} type="password" className="form-control" id="exampleInputEmail1" placeholder="Enter new Password" />
                </div>

              </div>

              <div className="card-footer">
                <button type="submit" className="btn btn-primary">Submit</button>

              </div>
            </form>
          </div>

        </div>
      </div>

    </div>
  );
}

export default ResetPassword;

