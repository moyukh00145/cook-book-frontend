import { createSlice } from "@reduxjs/toolkit";

const followerSlice = createSlice({
  name: 'followers',
  initialState:{
    list: []
  },
  reducers: {
    getAllFollowers(state,action){
      return {
        list: [...action.payload]
      }
    }
  }
})

export default followerSlice.reducer
export const {getAllFollowers} = followerSlice.actions