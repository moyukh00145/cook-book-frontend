import logo from './logo.svg';
import './App.css';
import LoginForm from './component/login/LoginForm';
import Home from './component/home/Home'
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Resister from './component/resister/Resister';
import Cookies from 'js-cookie';
import ProtectedRoute from './component/protectedroute/ProtectedRoute';
import Profile from './component/profile/Profile';
import GLogin from './component/login/GLogin';
import Friends from './component/friends/Friends';
import Posts from './component/posts/Posts';

function App() {
  
  let isLoggedIn = false;
  if (Cookies.get('token')!=undefined) {
    isLoggedIn = true;
  }
  
  return (
    <>
    <Routes>
      <Route path="/" element={<ProtectedRoute/>}>
        <Route path="home" element={<Home/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="posts" element={<Posts/>}/>
        <Route path="friends" element={<Friends/>}/>
      </Route>
      <Route exact path="/login" element={<LoginForm/>}  />
      <Route exact path="/resister" element={<Resister/>}/>
      <Route exact path="/loginCallback" element={<GLogin/>}/>
    </Routes>
    </>
    
  
  );
}

export default App;
