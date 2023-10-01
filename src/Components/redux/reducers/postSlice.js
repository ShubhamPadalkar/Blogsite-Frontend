import { createAction, createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../utils/baseURL";


const resetPost = createAction("post/reset")
const resetPostEdit = createAction("post/resetafteredit")
const resetPostDelete = createAction("post/resetafterdelete")

//Create post slice
export const createpostAction = createAsyncThunk('post/created',
async(post,{rejectWithValue,getState,dispatch}) => {
    const user = getState()?.users ;
        const { userAuth } = user
        const config = {headers:{
            Authorization : `Bearer ${userAuth.token}`
        }}
        try {
            const formData = new FormData()
            formData.append('title',post?.title)
            formData.append('description',post?.description)
            formData.append('category',post?.category?.label)
            formData.append('image',post?.image)
            const { data} = await axios.post(
                `${baseUrl}/api/posts`,formData,config)
            
            // Dispatch action
            dispatch(resetPost())
            return data
        } catch (error) {
            if(!error.response) throw error
            return rejectWithValue(error?.response?.data)
        }
})

//Update post slice
export const updatepostAction = createAsyncThunk(
    'post/updated',
async(post,{rejectWithValue, getState, dispatch}) => {
    const user = getState()?.users ;
        const { userAuth } = user
        const config = {headers:{
            Authorization : `Bearer ${userAuth.token}`
        }}
        try {
            const { data} = await axios.put(
                `${baseUrl}/api/posts/${post?.id}`,
                post ,
                config)
            //Reset after edit
            dispatch(resetPostEdit())    
            return data
        } catch (error) {
            if(!error.response) throw error
            return rejectWithValue(error?.response?.data)
        }
})


//Fetch post action
export const fetchPostAction = createAsyncThunk(
    'post/list',
async(category,{rejectWithValue,getState,dispatch}) => {    
        try {
            const { data} = await axios.get(
                `${baseUrl}/api/posts?category=${category}`)
            // Dispatch action
            dispatch(resetPost())
            return data
        } catch (error) {
            if(!error.response) throw error
            return rejectWithValue(error?.response?.data)
        }
})

//Fetch post details
export const fetchPostDetilsAction = createAsyncThunk(
    'post/details',
async(id,{rejectWithValue,getState,dispatch}) => {    
        try {
            const { data} = await axios.get(
                `${baseUrl}/api/posts/${id}`)
            // Dispatch action
            dispatch(resetPost())
            return data
        } catch (error) {
            if(!error.response) throw error
            return rejectWithValue(error?.response?.data)
        }
})

//Like toggle action
export const toggleAddLikestoPost = createAsyncThunk('post/like',
async (postId , {rejectWithValue,getState,dispatch})=>{
    const user = getState()?.users ;
        const { userAuth } = user
        const config = {headers:{
            Authorization : `Bearer ${userAuth.token}`
        }}
        try {
            const {data} = await axios.put(
                `${baseUrl}/api/posts/likes`,
                {postId},
                config
                )
            return data    
        } catch (error) {
            if(!error.response) throw error
            return rejectWithValue(error?.response?.data)
        }
})

//Dislikes toggle action
export const toggleAddDislikestoPost = createAsyncThunk('post/dislike',
async (postId , {rejectWithValue,getState,dispatch})=>{
    const user = getState()?.users ;
        const { userAuth } = user
        const config = {headers:{
            Authorization : `Bearer ${userAuth.token}`
        }}
        try {
            const {data} = await axios.put(
                `${baseUrl}/api/posts/dislikes`,
                {postId},
                config
                )
            return data    
        } catch (error) {
            if(!error.response) throw error
            return rejectWithValue(error?.response?.data)
        }
})

//Delete post
export const deletepostAction = createAsyncThunk(
    'post/deleted',
async(id,{rejectWithValue, getState, dispatch}) => {
    const user = getState()?.users ;
        const { userAuth } = user
        const config = {headers:{
            Authorization : `Bearer ${userAuth.token}`
        }}
        try {
            const { data} = await axios.delete(
                `${baseUrl}/api/posts/${id}`,
                config)
            //Reset after edit
            dispatch(resetPostDelete())    
            return data
        } catch (error) {
            if(!error.response) throw error
            return rejectWithValue(error?.response?.data)
        }
})


//slice

const postSlice = createSlice({
    name:'post',
    initialState:{isCreated:false},
    extraReducers:builder =>{
        //Create post action
        builder.addCase(createpostAction.pending ,(state,action)=>{
            state.loading = true ;
        })
        builder.addCase(resetPost,(state,action)=>{
            state.isCreated = false ;
        })
        builder.addCase(createpostAction.fulfilled,(state,action)=>{
            state.postCreated = action?.payload ;
            state.loading = false ;
            state.isCreated = true ;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(createpostAction.rejected,(state,action)=>{
            state.loading = false ;
            state.appErr = state?.payload?.message;
            state.serverErr = state?.error?.message;
        })

        //update post action
        builder.addCase(updatepostAction.pending ,(state,action)=>{
            state.loading = true ;
        })
        builder.addCase(resetPostEdit , (state) =>{
            state.isUpdated = true ;
        })
        builder.addCase(updatepostAction.fulfilled,(state,action)=>{
            state.postUpdated = action?.payload ;
            state.loading = false ;
            state.appErr = undefined;
            state.serverErr = undefined;
            state.isUpdated = false ;
        })
        builder.addCase(updatepostAction.rejected,(state,action)=>{
            state.loading = false ;
            state.appErr = state?.payload?.message;
            state.serverErr = state?.error?.message;
        })

        //fetch post action
        builder.addCase(fetchPostAction.pending ,(state,action)=>{
            state.loading = true ;
        })
        builder.addCase(fetchPostAction.fulfilled,(state,action)=>{
            state.postLists = action?.payload ;
            state.loading = false ;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(fetchPostAction.rejected,(state,action)=>{
            state.loading = false ;
            state.appErr = state?.payload?.message;
            state.serverErr = state?.error?.message;
        })

        //Like toggle
        builder.addCase(toggleAddLikestoPost.pending ,(state,action)=>{
            state.loading = true ;
        })
        builder.addCase(toggleAddLikestoPost.fulfilled,(state,action)=>{
            state.likes = action?.payload ;
            state.loading = false ;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(toggleAddLikestoPost.rejected,(state,action)=>{
            state.loading = false ;
            state.appErr = state?.payload?.message;
            state.serverErr = state?.error?.message;
        })
        //Dislike toggle
        builder.addCase(toggleAddDislikestoPost.pending ,(state,action)=>{
            state.loading = true ;
        })
        builder.addCase(toggleAddDislikestoPost.fulfilled,(state,action)=>{
            state.dislikes = action?.payload ;
            state.loading = false ;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(toggleAddDislikestoPost.rejected,(state,action)=>{
            state.loading = false ;
            state.appErr = state?.payload?.message;
            state.serverErr = state?.error?.message;
        })

        //fetch post details action
        builder.addCase(fetchPostDetilsAction.pending ,(state,action)=>{
            state.loading = true ;
        })
        builder.addCase(fetchPostDetilsAction.fulfilled,(state,action)=>{
            state.postDetails = action?.payload ;
            state.loading = false ;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(fetchPostDetilsAction.rejected,(state,action)=>{
            state.loading = false ;
            state.appErr = state?.payload?.message;
            state.serverErr = state?.error?.message;
        })

        //Delete post action
        builder.addCase(deletepostAction.pending ,(state,action)=>{
            state.loading = true ;
        })
        builder.addCase(resetPostDelete , (state,action)=>{
            state.isDeleted = true ;
        })
        builder.addCase(deletepostAction.fulfilled,(state,action)=>{
            state.postDeleted = action?.payload ;
            state.loading = false ;
            state.appErr = undefined;
            state.serverErr = undefined;
            state.isDeleted = false ;
        })
        builder.addCase(deletepostAction.rejected,(state,action)=>{
            state.loading = false ;
            state.appErr = state?.payload?.message;
            state.serverErr = state?.error?.message;
        })
    }
})


export default postSlice.reducer