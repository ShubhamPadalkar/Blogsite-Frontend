import { createAction, createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../utils/baseURL";


//Api call thunk action
export const createCommentAction = createAsyncThunk(
    'comment/create',
    async (comment,{rejectWithValue,getState,dispatch,})=>{    
        const user = getState()?.users ;
        const { userAuth } = user
        const config = {headers:{
            Authorization : `Bearer ${userAuth.token}`
        }}
        //http call    
        try {
                const {data} = await axios.post(`${baseUrl}/api/comments`
                ,{ postId:comment?.postId,
                description:comment?.description },
                config)
                return data

            } catch (error) {
                if(!error?.response){
                    throw error ;
                }
                return rejectWithValue(error?.response?.data)
            }
    }
)

//Update comment
export const updateCommentAction = createAsyncThunk(
    'comment/update',
    async (comment,{rejectWithValue,getState,dispatch,})=>{    
        const user = getState()?.users ;
        const { userAuth } = user
        const config = {headers:{
            Authorization : `Bearer ${userAuth.token}`
        }}
        //http call    
        try {
                const {data} = await axios.put(
                    `${baseUrl}/api/comments/${comment?.commentId}`
                ,{ postId:comment?.postId,
                description:comment?.description },
                config)
                return data

            } catch (error) {
                if(!error?.response){
                    throw error ;
                }
                return rejectWithValue(error?.response?.data)
            }
    }
)

export const deleteCommentAction = createAsyncThunk(
'comment/delete',
async(id,{rejectWithValue , getState , dispatch})=>{
    const user = getState()?.users ;
    const {userAuth} = user
    const config = {headers:{
        Authorization : `Bearer ${userAuth.token}`
    }}
    try {
        const {data} = await axios.delete(`${baseUrl}/api/comments/${id}`,
            config
        )
        return data
    } catch (error) {
        if(!error?.response){
            throw error ;
        }
        return rejectWithValue(error?.response?.data)
    }
}
)

const commentSlice = createSlice({
    name:'comment',
    initialState:{},
    extraReducers:builder =>{
        //Create comment
        builder.addCase(createCommentAction.pending ,(state,action)=>{
            state.loading = true ;
        })
        builder.addCase(createCommentAction.fulfilled,(state,action)=>{
            state.loading = false ;
            state.commentCreated = action?.payload ;
            state.appErr = undefined ;
            state.serverErr = undefined ;
        })
        builder.addCase(createCommentAction.rejected,(state,action)=>{
            state.loading = false ;
            state.commentCreated = undefined ;
            state.appErr = state?.payload?.message;
            state.serverErr = state?.error?.message;
        })
        //Update comment
        builder.addCase(updateCommentAction.pending ,(state,action)=>{
            state.loading = true ;
        })
        builder.addCase(updateCommentAction.fulfilled,(state,action)=>{
            state.loading = false ;
            state.commentUpdated = action?.payload ;
            state.appErr = undefined ;
            state.serverErr = undefined ;
        })
        builder.addCase(updateCommentAction.rejected,(state,action)=>{
            state.loading = false ;
            state.commentCreated = undefined ;
            state.appErr = state?.payload?.message;
            state.serverErr = state?.error?.message;
        })
        
        //Delete comment
        builder.addCase(deleteCommentAction.pending ,(state,action)=>{
            state.loading = true ;
        })
        builder.addCase(deleteCommentAction.fulfilled,(state,action)=>{
            state.loading = false ;
            state.commentDeleted = action?.payload ;
            state.appErr = undefined ;
            state.serverErr = undefined ;
        })
        builder.addCase(deleteCommentAction.rejected,(state,action)=>{
            state.loading = false ;
            state.commentCreated = undefined ;
            state.appErr = state?.payload?.message;
            state.serverErr = state?.error?.message;
        })
    }
})

export default commentSlice.reducer