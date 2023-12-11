import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import './Navbar.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { change } from '../../store/slices/ProfileSlice';

const pages = ['Home', 'Profile', 'Posts', 'Friends'];
const settings = ['Profile', 'Logout'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const user_name = useSelector((store)=>{
    return store.profile.name
  })
  const dispatch = useDispatch()
  const profile_pic_url= useSelector((store)=>{
    return store.profile.profile_pic_url
  })
  const makeLoggedOut=()=>{
    Cookies.remove('token')
    let logout_url = "https://accounts.google.com/o/oauth2/revoke?token=#{}"
    window.location="/"
  }
  const showProfile=()=>{
    console.log("Profile")
  }
  const menueCallbacks = {
    'logout': makeLoggedOut,
    'profile' : showProfile
  }

  React.useEffect(()=>{
    axios.get('/userInfo', {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          "Authorization": "Bearer "+ Cookies.get('token')
      }
    }).then((response) => {

      if(response.data.user){
        dispatch(change(response.data.user))
      }
      else{
        Cookies.remove('token')
        window.location="/"
      }

    }).catch(function (error) {
      console.log(error);
    })
  })

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event) => {
    let menuEvent=event.target.getAttribute('name')
    if(menuEvent){
      menueCallbacks[menuEvent.toLowerCase()]();
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" style={{backgroundColor:'#2EC4B6'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontSize:'2rem',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
            className='logo-heading'
          >
            C<span className='logo-span'>OO</span>K B<span className='logo-span ms-1'>OO</span>K
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Cook Book
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },justifyContent:{ xs: 'start',md: 'center'} }}>
            {pages.map((page) => (
              <Link
                key={page}
                onClick={handleCloseNavMenu}
                className='nav-items'
                to= {page.toLowerCase()}
              >
                {page}
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user_name} src={profile_pic_url} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu} name={setting}>
                  {setting}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
