import axios from "axios"
import Cookies from 'js-cookie';
const getFollowers = ()=>{
  return new Promise((resolve, reject) => {
    axios('/getFellowUser',{
      headers: {
        'Content-Type': 'multipart/form-data',
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Bearer "+ Cookies.get('token')
      }
    }).then((response) => {
      resolve(response.data) 
    }).catch(function (error) {
      console.log(error);
      reject(error)
    })
  })
}

const addFollowRequest = (id)=>{
  return new Promise((resolve, reject) => {
    const obj ={
      requestTo: id
    }
    axios.post('/addFollowersRequest',obj,{
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Bearer "+ Cookies.get('token')
      }
    }).then((response) => {
      resolve(response.data) 
    }).catch(function (error) {
      console.log(error);
      reject(error)
    })
  })
}

export default getFollowers

export {addFollowRequest}
export {getFollowers}
