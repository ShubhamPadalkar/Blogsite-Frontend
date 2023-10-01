import { createAsyncThunk , createSlice, createAction } from "@reduxjs/toolkit"; 
import axios from "axios";
import baseUrl from '../../utils/baseURL'

//Action to redirect empty state
const resetEditAction = createAction("category/reset")
const resetDeleteAction = createAction("category/delete-reset")
const resetCategoryAction = createAction("category/reset-category")

//Api call thunk action
export const createCategoryAction = createAsyncThunk(
    'category/create',async (category,{rejectWithValue,getState,dispatch,})=>{
        
        const user = getState()?.users ;
        const { userAuth } = user
        const config = {headers:{
            Authorization : `Bearer ${userAuth.token}`
        }}
        //http call    
        try {
                const {data} = await axios.post(`${baseUrl}/api/category`
                ,{title : category?.title},
                config)
                //Redirect action
                dispatch(resetCategoryAction())
                return data

            } catch (error) {
                if(!error?.response){
                    throw error ;
                }
                return rejectWithValue(error?.response?.data)
            }
    }
)

export const fetchCategoriesAction = createAsyncThunk(
    'category/fetchall',
    async (category,{rejectWithValue,getState,dispatch,})=>{
        //http call    
        try {
                const {data} = await axios.get(
                    `${baseUrl}/api/category`)
                return data

            } catch (error) {
                if(!error?.response){
                    throw error ;
                }
                return rejectWithValue(error?.response?.data)
            }
    }
)

//Update category
export const updateCategoriesAction = createAsyncThunk(
    'category/update',
    async (category,{rejectWithValue,getState,dispatch,})=>{
        const user = getState()?.users ;
        const { userAuth } = user
        const config = {headers:{
            Authorization : `Bearer ${userAuth.token}`
        }}
        //http call    
        try {
                const {data} = await axios.put(
                    `${baseUrl}/api/category/${category?.id}`,
                    {title:category?.title},
                    config)
                //Dispatch a reset state action       
                dispatch(resetEditAction())
                return data

            } catch (error) {
                if(!error?.response){
                    throw error ;
                }
                return rejectWithValue(error?.response?.data)
            }
    }
)

//Delete category
export const deleteCategoriesAction = createAsyncThunk(
    'category/delete',async (id,{rejectWithValue,getState,dispatch,})=>{
        
        const user = getState()?.users ;
        const { userAuth } = user
        const config = {headers:{
            Authorization : `Bearer ${userAuth.token}`
        }}
        //http call    
        try {
                const {data} = await axios.delete(`${baseUrl}/api/category/${id}`
                ,config)
                //Dispatch delete state action
                dispatch(resetDeleteAction())
                return data

            } catch (error) {
                if(!error?.response){
                    throw error ;
                }
                return rejectWithValue(error?.response?.data)
            }
    }
)

//Fetch single category details
export const fetchCategoryAction = createAsyncThunk(
    'category/details',
    async (id,{rejectWithValue,getState,dispatch,})=>{    
        const user = getState()?.users ;
        const { userAuth } = user
        const config = {headers:{
            Authorization : `Bearer ${userAuth.token}`
        }}
        //http call    
        try {
                const {data} = await axios.get(`${baseUrl}/api/category/${id}`
                ,config)
                return data

            } catch (error) {
                if(!error?.response){
                    throw error ;
                }
                return rejectWithValue(error?.response?.data)
            }
    }
)

const catergorySlices = createSlice({
    name : "category",
    initialState:{},
    extraReducers: (builder) =>{
        //Create category
       builder.addCase(createCategoryAction.pending,(state,action)=>{
        state.loading = true ;
       })
       builder.addCase(resetCategoryAction,(state,action)=>{
        state.isCreated = true
       })
       builder.addCase(createCategoryAction.fulfilled,(state,action)=>{
        state.category = action?.payload ;
        state.loading = false ;
        state.isCreated = false ;
        state.appErr = undefined ;
        state.serverErr = undefined
       })
       builder.addCase(createCategoryAction.rejected,(state,action)=>{
        state.loading = false ;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
       })
        // Fetch all category
        builder.addCase(fetchCategoriesAction.pending,(state,action)=>{
            state.loading = true 
           })
        builder.addCase(fetchCategoriesAction.fulfilled,(state,action)=>{
            state.categoryList = action?.payload ;
            state.loading = false ;
            state.appErr = undefined ;
            state.serverErr = undefined
        })
        builder.addCase(fetchCategoriesAction.rejected,(state,action)=>{
            state.loading = false ;
            state.appErr = action?.payload?.message ;
            state.serverErr = action?.error?.message ;
        })

        //Update category
        builder.addCase(updateCategoriesAction.pending,(state,action)=>{
            state.loading = true 
        })
        builder.addCase(resetEditAction,(state,action)=>{
            state.isEdited = true ;
        })   
        builder.addCase(updateCategoriesAction.fulfilled,(state,action)=>{
            state.updateCategory = action?.payload ;
            state.loading = false ;
            state.isEdited = false ;
            state.appErr = undefined ;
            state.serverErr = undefined
        })
        builder.addCase(updateCategoriesAction.rejected,(state,action)=>{
            state.loading = false ;
            state.appErr = action?.payload?.message ;
            state.serverErr = action?.error?.message ;
        })
        

        //Delete category
        builder.addCase(deleteCategoriesAction.pending,(state,action)=>{
            state.loading = true 
           })
          //Dispatch action for redirect
        builder.addCase(resetDeleteAction,(state,action)=>{
            state.isDeleted = true ;
        }) 
        builder.addCase(deleteCategoriesAction.fulfilled,(state,action)=>{
            state.deleteCategory = action?.payload ;
            state.loading = false ;
            state.isDeleted = false ;
            state.appErr = undefined ;
            state.serverErr = undefined
        })
        builder.addCase(deleteCategoriesAction.rejected,(state,action)=>{
            state.loading = false ;
            state.appErr = action?.payload?.message ;
            state.serverErr = action?.error?.message ;
        })

        //Fetch single category
        builder.addCase(fetchCategoryAction.pending,(state,action)=>{
            state.loading = true 
           })
        builder.addCase(fetchCategoryAction.fulfilled,(state,action)=>{
            state.category = action?.payload ;
            state.loading = false ;
            state.appErr = undefined ;
            state.serverErr = undefined
        })
        builder.addCase(fetchCategoryAction.rejected,(state,action)=>{
            state.loading = false ;
            state.appErr = action?.payload?.message ;
            state.serverErr = action?.error?.message ;
        })
    }
})

export default catergorySlices.reducer