import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import  baseUrl  from "../../utils/baseURL";
import { toast } from "react-toastify";


export const getallUsersAction = createAsyncThunk(
    'User/getall',
    async (user , {dispatch , getState , rejectWithValue}) => {
        try {
            const user = getState()?.users ;
            const { userAuth } = user
            const config = {headers:{
            Authorization : `Bearer ${userAuth.token}`}}

            const { data } = await axios.get(
                `${baseUrl}/api/users/`, config );

                return data
        } catch (error) {
            if(!error?.response){
                throw error
            }
            return rejectWithValue(error?.response?.data)
        }
    }
)

const authorSlices = createSlice({
    name:'userControl',
    initialState:{},
    extraReducers:builder =>{
        //Fetch all user action
        builder.addCase(getallUsersAction.pending,(state,action)=>{
            state.loading = true ;
        })
        builder.addCase(getallUsersAction.fulfilled,(state,action)=>{
            state.allusers = action?.payload ;
            state.loading = false ;
            state.appErr = undefined ;
            state.serverErr = undefined ;
        })
        builder.addCase(getallUsersAction.rejected,(state,action)=>{
            state.loading = false ;
            state.appErr = state?.payload?.message ;
            state.serverErr = state?.error?.message ;
        })
    }
})

export default authorSlices.reducer