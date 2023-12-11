import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: 'profile',
  initialState:{},
  reducers: {
    change(state,action){
      const newState = {
        ...state,
        ...action.payload
      }
      return newState
    }
  }
})

export default profileSlice.reducer
export const {change} = profileSlice.actions