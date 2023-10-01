import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducers/userSlice'
import categorySlice from './reducers/categorySlice'
import postSlice from './reducers/postSlice'
import commentSlice from './reducers/commentSlice'
import profileSlice from './reducers/profileSlice'
import emailSlice from './reducers/emailSlice'
import authorSlice from './reducers/authorSlice'


export default configureStore({
  reducer: {
    users : userSlice ,
    category : categorySlice,
    posts : postSlice,
    comment : commentSlice,
    profile: profileSlice,
    email : emailSlice,
    author : authorSlice
  },
  devTools:true
})