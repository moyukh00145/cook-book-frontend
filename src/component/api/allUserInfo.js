import axios from "axios"
import Cookies from 'js-cookie';
const getAllUserInfo = ()=>{
  return new Promise((resolve, reject) => {
    axios('/allUsers',{
      headers: {
        'Content-Type': 'multipart/form-data',
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Bearer "+ Cookies.get('token')
      }
    }).then((response) => {
      resolve(response) 
    }).catch(function (error) {
      console.log(error);
      reject(error)
    })
  })
}

export default getAllUserInfo