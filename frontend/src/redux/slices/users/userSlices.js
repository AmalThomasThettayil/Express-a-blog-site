import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from 'axios'

//register action

export  const registerUserAction = createAsyncThunk(
    "users/register",
        async(user,{rejectWithValue,getState,dispatch})=>{
            try{
                //http call
                const config = {
                    headers:{
"Content-type": "application/json"
                    }
                }
                const {data} = await axios.post("http://localhost:5000/api/v1/register",
                user,
                config,
                )
                return data;
            }catch(error){
if(!error && !error.res){
    throw error;
}
return rejectWithValue(error?.response?.data);
            }
        }
    )

    //slices
    const userSlices = createSlice({
        name:"users",
        initialState:{
            userAuth: "login",
        },
        extraReducers: builders=>{
            //register
            builders.addCase(registerUserAction.pending,(state,action)=>{
                state.loading = true;
                state.appErr = undefined;
                state.serverErr = undefined;
            });
            builders.addCase(registerUserAction.fulfilled,(state,action)=>{
                state.loading = false;
                state.registered = action?.payload;
                state.appErr = undefined;
                state.serverErr = undefined;
            });
            builders.addCase(registerUserAction.rejected,(state,action)=>{
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            });
        }
    })
export default userSlices.reducer;