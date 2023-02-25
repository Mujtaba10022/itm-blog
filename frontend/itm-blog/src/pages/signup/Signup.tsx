import React,  {useState, useEffect, SyntheticEvent, BaseSyntheticEvent} from 'react';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import './signup.css';

function Signup() {

  const navigate = useNavigate();

  const [signUpData, setSignupState] = useState({
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
   setSignupState(
      {
        ...signUpData,
        [event.target.name]: event.target.value
      }
    );
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();

    let signupData  = signUpData;

    const data = new FormData();
    data.append("name", signupData.name);
    data.append("email", signupData.email);
    data.append("password", signupData.password);

     fetch('http://localhost:4200/api/v1/signup', {
      method: "post",
      body: data,
    })
      .then((response) => {
        response.json();
        if (response.status === 400) {
          toast.error("Email already exist");
        } else if (response.status === 201) {
          toast.success("Successfully Registered");
          // history.replace("/login");
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
                <h3 className="card-title" style={{float: 'inherit'}}>Register</h3>
              </div>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="card-body">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input name="name" onChange={handleChange} type="name" className="form-control" id="name" placeholder="Enter Name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input name="email" onChange={handleChange} type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input name="password" onChange={handleChange} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmpassword">Confirm password</label>
                    <input name="confirmPassword" onChange={handleChange} type="password" className="form-control" id="confirmpassword" placeholder="Confirm Password" />
                  </div>
                  {/* <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                  </div> */}
                </div>

                <div className="card-footer">
                  <button type="submit" className="btn btn-primary">Signup</button>
                  <Link to='/login'>Sign In</Link>
                </div>
              </form>
            </div>

            </div>
            </div>

   </div>
  );
}

export default Signup;
