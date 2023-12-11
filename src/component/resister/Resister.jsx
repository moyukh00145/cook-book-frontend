import React, { useState } from "react";
import "./Resister.css";
import {Link} from 'react-router-dom';
import resisterPic from '../../images/resister.jpg'
import axios from 'axios';

const Resister = () => {

  const [resister_user,set_resister_user] = useState({name: '',username: '',email: '',password: ''})

  const [inputErrors, set_input_errors] = useState({
    name_error: '',
    username_error: '',
    email_error: '',
    password_error: ''
  })

  const inputChange=(event)=>{
    const {name,value} = event.target;
    set_resister_user((predata)=>{
      return {
        ...predata,
        [name]: value
      }
    })
  }

  const inputErrorChange = (name,msg)=>{
    set_input_errors((preData)=>{
      return {
        ...preData,
        [name]:msg
      }
    })
  }

  const formSubmit = async()=>{

    let valid = inputValidation();

    if(valid && emailValidation(resister_user.email)==true){
      axios.post('/resister',resister_user, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
      }).then((response) => {
        
        alert(response.data.msg)
        if(response.data.done==true){
          window.location='/login';
        }
        
      }).catch(function (error) {
        console.log(error);
      })
    }    
  }


  function inputValidation(){
    set_input_errors({
      name_error: '',
      username_error: '',
      email_error: '',
      password_error: ''
    })
    let validation=true;
    if(resister_user.name==''){
      inputErrorChange('name_error','Field Can not be empty');
      validation = false
    }
    if(resister_user.username==''){
      inputErrorChange('username_error','Field Can not be empty');
      validation = false
    }
    if(resister_user.email==''){
      inputErrorChange('email_error','Field Can not be empty');
      validation = false
    }
    if(resister_user.password==''){
      inputErrorChange('password_error','Field Can not be empty');
      validation = false
    }
    return validation
  }

  function emailValidation(){
    let valid_email = String(resister_user.email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if(!valid_email){
      inputErrorChange('email_error','Please enter a valid email');
    }
    return valid_email
  }

  return (
    <div>
      <div className="resister-container container">
        <h1 className="resister__main-heading">Welcome to C<span>oo</span>k B<span>oo</span>k</h1>
        <div className="resister-form card d-flex flex-column justify-content-center px-3 pt-5">
        <div className="row">
          <div className="col-md-6">
            <div action="" className="d-flex flex-column px-5 pb-5">
              <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">Name</label>
                <input type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" onChange={inputChange} name="name" value={resister_user.name}></input>
                <span className="text-danger">{inputErrors.name_error}</span>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputUsername" className="form-label">Username</label>
                <input type="text" className="form-control" id="exampleInputUsername" aria-describedby="nameHelp" onChange={inputChange} name="username" value={resister_user.username}></input>
                <span className="text-danger">{inputErrors.username_error}</span>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={inputChange} name="email" value={resister_user.email}></input>
                <span className="text-danger">{inputErrors.email_error}</span>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={inputChange} value={resister_user.password}></input>
                <span className="text-danger">{inputErrors.password_error}</span>
              </div>
              <button type="submit" className="btn resistration-btn" onClick={formSubmit}>Sign up</button>
              <Link to="/login" className="text-center">
                Already have account? Log in Here.
              </Link>
            </div>
          </div>
          <div className="col-md-6">
            <img src={resisterPic} alt="" className="resistration-form__image" />
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Resister