import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import  baseUrl  from "../../utils/baseURL";
import { toast } from "react-toastify";

const resetAfterRegister = createAction('register-reset')

//Register action
export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      //http call
      const config = { header: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `${baseUrl}/api/users/register`,
        user, config );
        toast.success('Registration Succesful')
        dispatch(resetAfterRegister())
        return data
    } catch (error) {
        if(!error?.response){
            throw error
        }
        return rejectWithValue(error?.response?.data)
    }
  }
);

//Login actions
export const loginUserAction = createAsyncThunk(
    'user/login',
    async (userData,{rejectWithValue,getState, dispatch}) => {
        const config = { header: { "Content-Type": "application/json" } };
        try {
            const { data } = await axios.post(
                `${baseUrl}/api/users/login`,
                userData,
                config
            )
            //save user into local storage
            localStorage.setItem('userInfo',JSON.stringify(data))
            return data
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data)
        }
    }    
)

//Update password action
export const updatePasswordAction = createAsyncThunk(
    "users/update-password",
    async (password, { rejectWithValue, getState, dispatch }) => {
      try {
        const user = getState()?.users ;
        const { userAuth } = user
        const config = {headers:{
            Authorization : `Bearer ${userAuth.token}`
        }}
        const { data } = await axios.put(
          `${baseUrl}/api/users/password`,
          password, config );
        toast.success('Password Updated')
          return data
      } catch (error) {
        toast.error('Unable to Update Password')
          if(!error?.response){
              throw error
          }
          return rejectWithValue(error?.response?.data)
      }
    }
  );

//Password reset mail action
export const passResetmailAction = createAsyncThunk(
    'users/reset-pass-mail',
    async (email,{getState , dispatch , rejectWithValue} )=>{
        try {
            const {data} = await axios.post(
                `${baseUrl}/api/users/forget-password-token`,
                email
            )
            toast.success('Email sent to registered mail.')
            return data
        } catch (error) {
            if(!error?.response){
                throw error ;
            }
            return rejectWithValue(error?.response?.data)
        }
    }
)

//Password reset action
export const passwordResetAction = createAsyncThunk(
    'users/reset-password',
    async (reqdata,{getState , dispatch , rejectWithValue} )=>{
        try {
            const {data} = await axios.post(
                `${baseUrl}/api/users/reset-password`,
                reqdata )
            toast.success('Password Reset Succesful..')
            return data
        } catch (error) {
            if(!error?.response){
                throw error ;
            }
            return rejectWithValue(error?.response?.data)
        }
    }
)

//Logout action
export const logoutUserAction = createAsyncThunk(
    'user/logout',
    async (payload,{rejectWithValue , getState , dispatch}) =>{
        try {
            localStorage.removeItem('userInfo')
        } catch (error) {
            if(!error?.response){
                throw error ;
            }
            return rejectWithValue(error?.response?.data)
        }
    }
)

//get user from localstorage and place into store
const userLoginFromStorage = localStorage.getItem("userInfo") 
? JSON.parse(localStorage.getItem("userInfo"))
: null ;

//slices
const userSlices = createSlice({
    name :'users',
    initialState:{
        userAuth : userLoginFromStorage
    },
    extraReducers :(builder) =>{
        builder.addCase(registerUserAction.pending,(state,action)=>{
            state.loading = true;
            state.appErr = undefined ;
            state.serverErr = undefined ;
        }) ;
        builder.addCase(resetAfterRegister,(state)=>{
            state.isRegistered = true ;
        })
        builder.addCase(registerUserAction.fulfilled,(state,action)=>{
            state.loading = false ;
            state.registered = action?.payload ;
            state.isRegistered = false
            state.appErr = undefined ;
            state.serverErr = undefined ;
        });
        builder.addCase(registerUserAction.rejected,(state,action)=>{
            state.loading = false ;
            state.appErr = action?.payload?.message ;
            state.serverErr = action?.error?.message ;
            state.isRegistered = false ;
        })
        //Login reducer
        builder.addCase(loginUserAction.pending,(state,action)=>{
            state.loading = true ;
            state.appErr = undefined ;
            state.serverErr = undefined
        })
        builder.addCase(loginUserAction.fulfilled,(state,action)=>{
            state.userAuth = action?.payload ;
            state.loading = false ;
            state.appErr = undefined ;
            state.serverErr = undefined
        })
        builder.addCase(loginUserAction.rejected,(state,action)=>{
            state.appErr = action?.payload?.message ;
            state.serverErr = action?.error?.message ;
            state.loading = false ;
        })
        //Update password reducer
        builder.addCase(updatePasswordAction.pending,(state,action)=>{
            state.loading = true ;
            state.appErr = undefined ;
            state.serverErr = undefined
        })
        builder.addCase(updatePasswordAction.fulfilled,(state,action)=>{
            state.passwordUpdated = action?.payload ;
            state.loading = false ;
            state.appErr = undefined ;
            state.serverErr = undefined
        })
        builder.addCase(updatePasswordAction.rejected,(state,action)=>{
            state.appErr = action?.payload?.message ;
            state.serverErr = action?.error?.message ;
            state.loading = false ;
        })
        //Password Reset Mail action
        builder.addCase(passResetmailAction.pending,(state,action)=>{
            state.loading = true ;
            state.appErr = undefined ;
            state.serverErr = undefined
        })
        builder.addCase(passResetmailAction.fulfilled,(state,action)=>{
            state.passwordMailSent = action?.payload ;
            state.loading = false ;
            state.appErr = undefined ;
            state.serverErr = undefined
        })
        builder.addCase(passResetmailAction.rejected,(state,action)=>{
            state.appErr = action?.payload?.message ;
            state.serverErr = action?.error?.message ;
            state.loading = false ;
        })
        //Password Reset action
        builder.addCase(passwordResetAction.pending,(state,action)=>{
            state.loading = true ;
            state.appErr = undefined ;
            state.serverErr = undefined
        })
        builder.addCase(passwordResetAction.fulfilled,(state,action)=>{
            state.passwordReset = action?.payload ;
            state.loading = false ;
            state.appErr = undefined ;
            state.serverErr = undefined
        })
        builder.addCase(passwordResetAction.rejected,(state,action)=>{
            state.appErr = action?.payload?.message ;
            state.serverErr = action?.error?.message ;
            state.loading = false ;
        })
        //Logout
        builder.addCase(logoutUserAction.pending , (state,action)=>{
            state.loading = true
        })
        builder.addCase(logoutUserAction.fulfilled , (state,action)=>{
            state.userAuth = undefined ;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(logoutUserAction.rejected, (state,action)=>{
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
            state.loading = false ;
        })

    }
})

export default userSlices.reducer