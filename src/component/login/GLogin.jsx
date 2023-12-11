import React from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';

const GLogin = () => {

  axios.get('/success').then((response) => {
    
    Cookies.set('token', response.data.token);
    if(response.data.done){
      window.location="/"
    }
    else{
      window.location='/login'
    }
    
  }).catch(function (error) {
    console.log(error);
  })

  return (
    <div>GLogin Redirecting........</div>
  )
}

export default GLogin