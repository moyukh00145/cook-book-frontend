import { configureStore } from "@reduxjs/toolkit";
import  profileSlice  from "./slices/ProfileSlice";
import AllUserSlice from "./slices/AllUserSlice";
import followerSlice from "./slices/FollowerSlice";

const store = configureStore({
  reducer:{
    profile: profileSlice,
    allUser: AllUserSlice,
    allfollowers: followerSlice
  }
})

export default store;