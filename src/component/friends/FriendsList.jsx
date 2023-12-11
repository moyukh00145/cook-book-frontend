import React from 'react'
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import './friends.css'
import {addFollowRequest} from '../api/followerInfo'
import { useDispatch } from 'react-redux';
import { removeUser } from '../../store/slices/AllUserSlice';
import { Tooltip } from '@mui/material';


const FriendsList = (props) => {

  const dispatch = useDispatch()
  

  const addToFriend = (id)=>{
    
    addFollowRequest(id).then((result)=>{
      if(result){
        dispatch(removeUser(id))
      }
    })
    
  }

  return (
    <li className='mt-3'>
      <div className="card p-3 followers-card">
        <div className="row">
          <div className="col-3 d-flex justify-content-center align-items-center">
            <img src={props.user.profile_pic_url} alt=""  className='follower-img'/>
          </div>
          <div className="col-6">
            <h3>{props.user.name}</h3>
            <p>{props.user.bio}</p>
          </div>
          <div className="col-3 d-flex justify-content-center align-items-center">
            <Tooltip title={props.tooltip}>
              <Button variant="contained" onClick={()=>{addToFriend(props.user._id)}}>
                {props.btnLogo}
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </li>
  )
}

export default FriendsList