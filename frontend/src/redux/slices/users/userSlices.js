import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import  baseUrl  from "../../../utils/baseURL"


//register action

export const registerUserAction = createAsyncThunk(
    "users/register",
    async (user, { rejectWithValue, getState, dispatch }) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            //http call
            
            const { data } = await axios.post(
                `${baseUrl}/api/v1/register`,
                user,
                config,
            )
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)

//login
export const loginUserAction = createAsyncThunk(
    "user/login",
    async (userData, { rejectWithValue, getState, dispatch }) => {
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }
        try {
            const {data} = await axios.post(
                `${baseUrl}/api/v1/login`,
                userData,
                config,
            )
            //save user into local storage
            localStorage.setItem("userInfo",JSON.stringify(data));
            return data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//logout action
export const logoutAction = createAsyncThunk(
    '/user/logout',
    async (payload,{rejectwithvalue,getState,dispatch}) =>{
        try{
localStorage.removeItem("userInfo")
        }catch(error){
if(!error?.response){
    throw error
}
return rejectwithvalue(error?.response?.data)
        }
    }
)

//get user from local storage and place into store
const userLoginFromStorage = localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem("userInfo"))
: null;

//slices
const userSlices = createSlice({
    name: "users",
    initialState: {
        userAuth:userLoginFromStorage,
    },
    extraReducers: builders => {
        //register
        builders.addCase(registerUserAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builders.addCase(registerUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.registered = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builders.addCase(registerUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //login
        builders.addCase(loginUserAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builders.addCase(loginUserAction.fulfilled, (state, action) => {
            state.userAuth = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builders.addCase(loginUserAction.rejected, (state, action) => {
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
            state.loading = false;
        });
        //logout
        builders.addCase(logoutAction.pending,(state,action)=>{
            state.loading = false;
        })
        builders.addCase(logoutAction.fulfilled,(state,action)=>{
            state.userAuth = undefined;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr= undefined;
        })
        builders.addCase(logoutAction.rejected,(state,action)=>{
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
            state.loading = false
        })
        

    }
})
export default userSlices.reducer;