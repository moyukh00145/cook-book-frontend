import axios from 'axios';
import Cookies from 'js-cookie';
const uploadImage = (formData)=>{
  console.log(formData)
  return new Promise((resolve,reject)=>{
    axios.post('/file/upload', formData, {
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

export default uploadImage