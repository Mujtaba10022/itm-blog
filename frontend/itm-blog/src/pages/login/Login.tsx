import React,  {useState, useContext, useReducer, useEffect, SyntheticEvent, BaseSyntheticEvent} from 'react';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import './login.css';
import { Link } from "react-router-dom";

const initState = {
  email: '',
  password: '',
  emailValid: false,
  passwordValid: false
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN_DATA_SET":
      return {
         ...state, 
         ...action.payload
      };
    case "LOGIN_VALIDATION_SET":
        return {
          ...state, 
          ...action.payload
       };
    default :
      return state;
  }
}

function Login() {

  const [loginData, dispatch] = useReducer(reducer, initState);
  const navigate = useNavigate();

  const ctx = useContext(AuthContext);

  useEffect(() => {
        dispatch(
          { 
            type: "LOGIN_VALIDATION_SET", 
            payload: {
              emailValid: loginData.email.includes('@gmail.com'),
              passwordValid: loginData.password.length > 3? true : false,
            }
         });
  }, [loginData.email, loginData.password]);


  const handleChange = async (event: BaseSyntheticEvent) => {
    dispatch(
      { 
        type: "LOGIN_DATA_SET", 
        payload: {
          [event.target.name]: event.target.value
        }
     })
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();


    if (loginData.emailValid == false || loginData.passwordValid == false) {
      toast.error("Invalid data");
      return;
    }
    console.log(loginData);
    const data = new FormData();
    data.append("email", loginData.email);
    data.append("password", loginData.password);

     fetch('http://localhost:4200/api/v1/login', {
      method: "post",
      body: data,
    })
      .then(async (response: any) => {
       let res = await response.json();
        console.log(response);
       console.log(res);
        if (response.status === 400) {
          toast.error("User does not exist");
        } else if (response.status === 202) {
          toast.success("Successfully Registered");
          ctx.loginHandler(res.data.token);
          navigate('/dashboard');
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
    <>

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
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input name="email" onChange={handleChange} type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                    {loginData.emailValid == false && loginData.email.length > 0 &&
                    <label className='red'>Email is invalid</label>
                  }
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input name="password" onChange={handleChange} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    {loginData.passwordValid == false && loginData.password.length > 0 &&
                    <label className='red'>Pasword missmatch</label>
                  }
                  </div>
                  
                
                </div>

                <div className="card-footer">
                  <button >Login</button>
                  <Link className='anchor' to='/signup'>Signup</Link>
                </div>
              </form>
            </div>

            </div>
            </div>

   </div>
   
      <Link className='anchor'  to="/signup">Signup</Link>
    </>
  );
}

export default Login;
