import React, { useEffect, useState } from 'react'
import UserInfo from '../api/userInfo'
import './Profile.css'
import ScrollAbleTabs from '../scrollabletabs/ScrollAbleTabs'
import ImageUploadDialog from '../ImageUploadDialog/imageUploadDialog'
import { change } from '../../store/slices/ProfileSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const Profile = () => {

  // const [profile,setProfile]=useState({});
  const [open, setOpen] = React.useState(false);
  const profile = useSelector((store)=>{
    return store.profile
  })
  // console.log(profile)

  const dispatch = useDispatch()
  const imageUploadCallback = (url)=>{
    // setProfile((pre)=>{
    //   return {
    //     ...pre,
    //     ['profile_pic_url']: url
    //   }
    // })

    dispatch(change({profile_pic_url: url}))

  }
  useEffect(() =>{
    UserInfo().then(userInfo =>{
      // setProfile(userInfo.data.user)
      dispatch(change(userInfo.data.user))
    })
  },[])

  const handleClose = () => {
    setOpen(false);
  };

  const imageClick=()=>{
    setOpen(true);
  }



  return (
    <div className='profile'>
      <div className="card p-3 profile-overlay ">
        <img src="https://images.unsplash.com/reserve/EnF7DhHROS8OMEp2pCkx_Dufer%20food%20overhead%20hig%20res.jpg?q=80&w=2078&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='profile-overlay__img'/>
        <div className='profile-pic__container'>
          <img src={profile.profile_pic_url} alt="" className='prifile_pic__container__img img-thumbnail' onClick={imageClick} />
          <h3>{profile.name}</h3>
          <ImageUploadDialog
            visiblity = {open}
            handleClose={handleClose}
            callback={imageUploadCallback}
          />
        </div>
        <ScrollAbleTabs/>
      </div>
    </div>
  )
}

export default Profile