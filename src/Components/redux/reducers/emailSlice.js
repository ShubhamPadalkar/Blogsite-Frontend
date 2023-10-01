import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import  baseUrl  from "../../utils/baseURL";

const resetSent = createAction('email/afterReset')

export const sendMessageAction = createAsyncThunk(
    'email/usermsg', 
    async(content,{dispatch , getState , rejectWithValue}) =>{
        const user = getState()?.users ;
        const { userAuth } = user
        const config = {headers:{
            Authorization : `Bearer ${userAuth.token}`
        }}
        try {
            const data = await axios.post(
                `${baseUrl}/api/email`,
                content,
                config )
            dispatch(resetSent())
            return data.data
        } catch (error) {
            if(!error.response) throw error
            return rejectWithValue(error?.response?.data)
        }
    }
)

//Account verification
export const accountVerificationAction = createAsyncThunk(
    'email/verification', 
    async(email,{dispatch , getState , rejectWithValue}) =>{
        const user = getState()?.users ;
        const { userAuth } = user
        const config = {headers:{
            Authorization : `Bearer ${userAuth.token}`}}
        try {
            const data = await axios.post(
                `${baseUrl}/api/users/generate-verify-email-token`,
                {},
                config )
            return data.data
        } catch (error) {
            if(!error.response) throw error
            return rejectWithValue(error?.response?.data)
        }
    }
)

const emailSlice = createSlice({
    name:'email',
    initialState:{},
    extraReducers:(builder) =>{
        //Send Message 
        builder.addCase(sendMessageAction.pending,(state,action)=>{
            state.loading = true ;
        })
        builder.addCase(resetSent,(state)=>{
            state.isSent = true ;
        })
        builder.addCase(sendMessageAction.fulfilled,(state,action)=>{
            state.message = action?.payload ;
            state.isSent = false ;
            state.loading = false ;
            state.appErr = undefined ;
            state.serverErr = undefined ; 
        })
        builder.addCase(sendMessageAction.rejected,(state,action)=>{
            state.loading = false ;
            state.isSent = false ;
            state.appErr = state?.payload?.message ;
            state.serverErr = state?.error?.message ;
        })
        
        //Verfication Mail
        builder.addCase(accountVerificationAction.pending,(state,action)=>{
            state.loading = true ;
        })
        builder.addCase(accountVerificationAction.fulfilled,(state,action)=>{
            state.token = action?.payload ;
            state.isSent = false ;
            state.loading = false ;
            state.appErr = undefined ;
            state.serverErr = undefined ; 
        })
        builder.addCase(accountVerificationAction.rejected,(state,action)=>{
            state.loading = false ;
            state.isSent = false ;
            state.appErr = state?.payload?.message ;
            state.serverErr = state?.error?.message ;
        })
    }
})

export default emailSlice.reducer