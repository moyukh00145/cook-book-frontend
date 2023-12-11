import axios from 'axios';
import Cookies from 'js-cookie';


const getUserInfo=()=>{

  return new Promise((resolve,reject)=>{

    axios.get('/userInfo', {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
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


export default getUserInfo