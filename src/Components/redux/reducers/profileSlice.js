import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import  baseUrl  from "../../utils/baseURL";

const resetAfterUpdate = createAction('profile/update/reset')

export const fetchProfileAction = createAsyncThunk(
    'profile/fetch',
    async(id,{getState,dispatch,rejectWithValue})=>{
        const user = getState()?.users ;
        const { userAuth } = user
        const config = {headers:{
            Authorization : `Bearer ${userAuth.token}`
        }}
        try {
            const  {data}  =await axios.get(
                `${baseUrl}/api/users/profile/${id}`,
                config)

            return data    
        } catch (error) {
            if(!error.response) throw error
            return rejectWithValue(error?.response?.data)
        }
    }
)

//Profile Photo update
export const updateProfilePhotoAction = createAsyncThunk(
    'profile/updatephoto',
    async(profilePhoto,{getState,dispatch,rejectWithValue})=>{
        const user = getState()?.users ;
        const { userAuth } = user
        const config = {headers:{
            Authorization : `Bearer ${userAuth.token}`
        }}
        try {
            const formdata = new FormData() ;
            formdata.append('image',profilePhoto)
            const  {data}  =await axios.put(
                `${baseUrl}/api/users/profile-photo-upload`,
                formdata ,
                config )

            return data    
        } catch (error) {
            if(!error.response) throw error
            return rejectWithValue(error?.response?.data)
        }
    }
)

//Update profile action
export const updateProfileAction = createAsyncThunk(
    'profile/update',
    async(profileData,{getState,dispatch,rejectWithValue})=>{
        const user = getState()?.users ;
        const { userAuth } = user
        const config = {headers:{
            Authorization : `Bearer ${userAuth.token}`
        }}
        try {
            const  {data}  =await axios.put(
                `${baseUrl}/api/users/${profileData?._id}`,
                profileData,config )
            dispatch(resetAfterUpdate())
            return data    
        } catch (error) {
            if(!error.response) throw error
            return rejectWithValue(error?.response?.data)
        }
    }
)

//Follow profile action
export const followProfileAction = createAsyncThunk(
    'profile/follow-user',
    async(profileTofollow,{getState,dispatch,rejectWithValue})=>{
        const user = getState()?.users ;
        const { userAuth } = user
        const config = {headers:{
            Authorization : `Bearer ${userAuth.token}`
        }}
        try {
            const  data  =await axios.put(
                `${baseUrl}/api/users/follow`,
                {followId : profileTofollow},config )
            return data?.data    
        } catch (error) {
            if(!error.response) throw error
            return rejectWithValue(error?.response?.data)
        }
    }
)

//unFollow profile action
export const unfollowProfileAction = createAsyncThunk(
    'profile/unfollow-user',
    async(profileTounfollow,{getState,dispatch,rejectWithValue})=>{
        const user = getState()?.users ;
        const { userAuth } = user
        const config = {headers:{
            Authorization : `Bearer ${userAuth.token}`
        }}
        try {
            const  data  =await axios.put(
                `${baseUrl}/api/users/unfollow`,
                {unFollowId : profileTounfollow},config )
            return data?.data    
        } catch (error) {
            if(!error.response) throw error
            return rejectWithValue(error?.response?.data)
        }
    }
)


const profileSlice = createSlice({
    name:'profile',
    initialState:{},
    extraReducers:builder => {
        //Fetch profile action
        builder.addCase(fetchProfileAction.pending,(state,action)=>{
            state.loading = true ;
        })
        builder.addCase(fetchProfileAction.fulfilled,(state,action)=>{
            state.profile = action?.payload ;
            state.loading = false ;
            state.appErr = undefined ;
            state.serverErr = undefined ;
        })
        builder.addCase(fetchProfileAction.rejected,(state,action)=>{
            state.loading = false ;
            state.appErr = state?.payload?.message ;
            state.serverErr = state?.error?.message ;
        })
        //Update profile photo
        builder.addCase(updateProfilePhotoAction.pending,(state,action)=>{
            state.loading = true ;
        })
        builder.addCase(updateProfilePhotoAction.fulfilled,(state,action)=>{
            state.profilePhoto = action?.payload ;
            state.loading = false ;
            state.appErr = undefined ;
            state.serverErr = undefined ;
        })
        builder.addCase(updateProfilePhotoAction.rejected,(state,action)=>{
            state.loading = false ;
            state.appErr = state?.payload?.message ;
            state.serverErr = state?.error?.message ;
        })
        //Update profile action
        builder.addCase(updateProfileAction.pending,(state,action)=>{
            state.loading = true ;
        })
        builder.addCase(resetAfterUpdate ,(state)=>{
            state.isUpdated = true ;
        })
        builder.addCase(updateProfileAction.fulfilled,(state,action)=>{
            state.profileUpdated = action?.payload ;
            state.isUpdated = false ;
            state.loading = false ;
            state.appErr = undefined ;
            state.serverErr = undefined ;
        })
        builder.addCase(updateProfileAction.rejected,(state,action)=>{
            state.loading = false ;
            state.isUpdated = false ;
            state.appErr = state?.payload?.message ;
            state.serverErr = state?.error?.message ;
        })

        //Follow profile action
        builder.addCase(followProfileAction.pending,(state,action)=>{
            state.loading = true ;
        })
        builder.addCase(followProfileAction.fulfilled,(state,action)=>{
            state.profileFollowed = action?.payload ;
            state.loading = false ;
            state.appErr = undefined ;
            state.serverErr = undefined ;
        })
        builder.addCase(followProfileAction.rejected,(state,action)=>{
            state.loading = false ;
            state.appErr = state?.payload?.message ;
            state.serverErr = state?.error?.message ;
        })

        //unFollow profile action
        builder.addCase(unfollowProfileAction.pending,(state,action)=>{
            state.loading = true ;
        })
        builder.addCase(unfollowProfileAction.fulfilled,(state,action)=>{
            state.profileFollowed = action?.payload ;
            state.loading = false ;
            state.appErr = undefined ;
            state.serverErr = undefined ;
        })
        builder.addCase(unfollowProfileAction.rejected,(state,action)=>{
            state.loading = false ;
            state.appErr = state?.payload?.message ;
            state.serverErr = state?.error?.message ;
        })
    }
})

export default profileSlice.reducer