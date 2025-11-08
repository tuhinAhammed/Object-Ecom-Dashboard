import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../Slice/userSlice"

export default configureStore({
  reducer: {
    userData: userReducer,
  },
})