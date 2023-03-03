import React,  { useState, useEffect, SyntheticEvent, BaseSyntheticEvent, useRef} from 'react';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import Wrapper from '../../components/Wrapper'

import './forgotPassword.css';
import ConfirmPopup from '../../components/ConfirmPopup';

// Backup of Forgot password page 
// Implemented with useRef, Fragments and portals



function ForgotPassword() {

  const emailField: any = useRef(null);
  const navigate = useNavigate();

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  // const [ForgotPasswordData, setForgotPasswordState] = useState({
  //   email: '',
  // });

  useEffect(() => {
      console.log('MOUNTING');

      return () => {
        console.log('UN MOUNT ---');
      }
  }, []);


  // const handleChange = async (event: BaseSyntheticEvent) => {
  //   console.log('EVENT ---', event);
  //  setForgotPasswordState(
  //     {
  //       ...ForgotPasswordData,
  //       [event.target.name]: event.target.value
  //     }
  //   );
  // }
  const onSubmit = async (event: any) => {
  // const onSubmit = async (values: any, actions: any) => {
    event.preventDefault();
    let email = emailField.current.value;
    // let forgotPasswordData  = ForgotPasswordData;

    const data = new FormData();
    // data.append("email", forgotPasswordData.email);

    data.append("email", email);

     fetch('http://localhost:4200/api/v1/forgot-password', {
      method: "post",
      body: data,
    })
      .then((response) => {
        response.json();
        if (response.status === 400) {
          toast.error("Email does not exist");
        } else if (response.status === 200) {
          toast.success("Password reset link has been sent.");
          // navigate('/login');
          setShowConfirmPopup(true);
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
   <Wrapper pageHeading={'Welcome to forgot password page of ITM Blog'}>
    <ConfirmPopup show={showConfirmPopup}/>
    <div className="row form-section">
    <div className="col-md-3"></div>
    <div className="col-md-6">
          <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title" style={{float: 'inherit'}}>Register</h3>
              </div>
              <form onSubmit={(e) => onSubmit(e)}>

              {/* <Formik
                // validationSchema={validate}
                initialValues={{ email: "" }}
                onSubmit={onSubmit}
              >
                {({ values, errors, touched, handleChange, handleBlur }) => ( */}
                <>
                <div className="card-body">
                  
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input ref={emailField} name="email"
                    //  onChange={handleChange}
                      type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                  </div>
                
                </div>

                <div className="card-footer">
                  <button type="submit" className="btn btn-primary">Send</button>
                  <Link to='/login'>Login</Link>
                </div>
                </>
              {/* )} */}
              {/* </Formik> */}
              </form>
            </div>

            </div>
            </div>

   </Wrapper>
  );
}

export default ForgotPassword;
