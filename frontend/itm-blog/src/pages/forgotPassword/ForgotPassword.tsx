import React,  { useState, useEffect, SyntheticEvent, BaseSyntheticEvent, useRef} from 'react';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import Wrapper from '../../components/Wrapper'

import './forgotPassword.css';
import ConfirmPopup from '../../components/ConfirmPopup';

function ForgotPassword() {

  const emailField: any = useRef(null);
  const navigate = useNavigate();

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);


  useEffect(() => {
      console.log('MOUNTING');

      return () => {
        console.log('UN MOUNT ---');
      }
  }, []);



  const onSubmit = async (values: any, actions: any) => {
        console.log('FORMIK SUBMIT', values.email);
    const data = new FormData();
    data.append("email", values.email);

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
    <Wrapper pageHeading={"Welcome to forgot password page of ITM Blog"}>
      <ConfirmPopup show={showConfirmPopup} />
      <div className="row form-section">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title" style={{ float: "inherit" }}>
                Register
              </h3>
            </div>

            <Formik
              // validationSchema={validate}
              initialValues={{ email: "" }}
              onSubmit={onSubmit}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Email address</label>
                      <Field
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        >
                     </Field>
                    </div>
                  </div>

                  <div className="card-footer">
                    <button type="submit" className="btn btn-primary">
                      Send
                    </button>
                    <Link to="/login">Login</Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default ForgotPassword;
