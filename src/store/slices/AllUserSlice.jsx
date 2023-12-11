import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: 'allUser',
  initialState:{
    list: []
  },
  reducers: {
    getAllUser(state,action){
      return {
        list: [...action.payload]
      }
    },
    removeUser(state,action){
      
      return {
        list: state.list.filter(item=> item._id !== action.payload)
      }
      
    }
  }
})

export default profileSlice.reducer
export const {getAllUser} = profileSlice.actions
export const {removeUser} = profileSlice.actions