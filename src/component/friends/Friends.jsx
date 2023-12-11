import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import FriendsList from './FriendsList';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import getAllUserInfo from '../api/allUserInfo';
import {getAllUser} from '../../store/slices/AllUserSlice'
import {getFollowers} from '../api/followerInfo'
import {getAllFollowers} from '../../store/slices/FollowerSlice';
import SendIcon from '@mui/icons-material/Send';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Friends = () => {
  const [value, setValue] = React.useState('1');

  const dispatch = useDispatch()
  const allUserData = useSelector((store)=>{
    return store.allUser.list
  })

  const allFollowersData = useSelector((store)=>{
    return store.allfollowers.list
  })

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(()=>{
    getAllUserInfo().then((allUser)=>{
      dispatch(getAllUser(allUser.data))
    })

    getFollowers().then((followers)=>{
      dispatch(getAllFollowers(followers))
    })
  },[])

  return (
    <Box sx={{ width: '100%', typography: 'body1', marginTop: '2rem' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Follow" value="1" />
            <Tab label="Followers" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">

        <ul className='user-list'>
        {
          allUserData.map((item)=>{
            return (
              <FriendsList
                user={item}
                key={item._id}
                tooltip={"Follow"}
                btnLogo = {<PersonAddIcon/>}
              />
            )
          })
        }
        </ul>
        
        </TabPanel>
        <TabPanel value="2">
        <ul className='user-list'>
        {
          allFollowersData.map((item)=>{
            return (
              <FriendsList
                user={item}
                key={item._id}
                tooltip={"Follow Back"}
                btnLogo = {<SendIcon/>}
              />
            )
          })
        }
        </ul>
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default Friends