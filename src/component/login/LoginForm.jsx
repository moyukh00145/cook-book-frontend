import React, { useState } from "react";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import loginPic from "../../images/login.jpg";
import Cookies from 'js-cookie';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';

const LoginForm = () => {
  const [login_user, set_login_user] = useState({ email: "", password: "" });
  const [loading_btn_vis, set_loading_btn_vise] = useState('none')
  const [submit_btn_vis, set_submit_btn_vis] = useState('block')
  const [pass_err_msg, set_pass_err_msg] = useState('')
  const [email_err_msg, set_email_err_msg] = useState('')

  const inputChange = (event) => {
    const { name, value } = event.target;
    set_login_user((predata) => {
      return {
        ...predata,
        [name]: value,
      };
    });
  };

  const formSubmit = async (e) => {


    let valid = inputValidation()

    if(valid){
      set_loading_btn_vise('block')
      set_submit_btn_vis('none')
      axios.post('/login',login_user, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
      }).then((response) => {
        
        Cookies.set('token', response.data.token,);
        // alert(response.data.msg);
        set_loading_btn_vise('none')
        set_submit_btn_vis('block')
        window.location="/"
        
      }).catch(function (error) {
        console.log(error);
      })
    }

  };

  function inputValidation(){
    set_email_err_msg('')
    set_pass_err_msg('')
    if(login_user.email==''){
      set_email_err_msg('Field Can not be empty');
      return false
    }
    else if(login_user.password==''){
      set_pass_err_msg('Field Can not be empty');
      return false
    }
    return true
  }

  return (
    <div className="login-container container">
      <h1 className="login__main-heading">
        Welcome to C<span>oo</span>k B<span>oo</span>k
      </h1>
      <div className="login-form card d-flex flex-column justify-content-center px-3 pt-3">
        <div className="row">
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <img src={loginPic} alt="" className="login-form__image" />
          </div>
          <div className="col-md-6">
            <h2 className="mt-5 px-5">Login Here</h2>
            <div className="d-flex flex-column px-5 pb-5">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={inputChange}
                  name="email"
                  value={login_user.email}
                ></input>
                <span className="text-danger">{email_err_msg}</span>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="password"
                  onChange={inputChange}
                  value={login_user.password}
                ></input>
                <span className="text-danger">{pass_err_msg}</span>
              </div>
              <div className="mt-3 mb-2 mx-auto">
                <ul className="login-social-list">
                  <li>
                    <a href="http://localhost:5000/auth/google" className="login-social-list__item" >
                      <img
                        className="google-icon"
                        // src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4="
                      />
                    </a>
                  </li>
                  <li>
                    <a href="" className="login-social-list__item">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <LoadingButton loading variant="outlined" className="login-btn" style={{display: loading_btn_vis}}>
                Submit
              </LoadingButton>
              <button
                type="submit"
                className="btn login-btn"
                onClick={formSubmit}
                style={{display: submit_btn_vis}}
              >
                Login
              </button>
              <Link to="/resister" className="text-center">
                New User? Resister Here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
