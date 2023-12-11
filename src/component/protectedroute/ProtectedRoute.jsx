import React from 'react'
import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../header/Navbar';
import LeftSideBar from '../sidebar/LeftSideBar';
import RightSideBar from '../sidebar/RightSideBar';
import './ProtectedRoute.css'
const ProtectedRoute = ({children}) => {

  let isLoggedIn = false;
  if (Cookies.get('token')!=undefined) {
    isLoggedIn = true;
  }

  return isLoggedIn? (
    <>
      <Navbar/>
      <div className="row w-100">
        <div className="col-3 sticky">
          <LeftSideBar/>
        </div>
        <div className="col-6 middle-column">
           <Outlet/>
        </div>
        <div className="col-3 sticky">
          <RightSideBar/>
        </div>
      </div>
    </>
  ): <Navigate to="/login"/>
}

export default ProtectedRoute