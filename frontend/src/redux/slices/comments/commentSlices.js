import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseURL";

//create action

export const createCommentAction = createAsyncThunk(
    "comment/create",
    async (comment, { rejectWithValue, getState, dispatch }) => {
        //get user token
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        }
        //http call
        try {
            const { data } = await axios.post(
                `${baseUrl}/api/comments`,
                {
                    description: comment?.description,
                    postId: comment?.postId,

                },
                config
            );
            console.log(data)
            // //dispatch action
            // dispatch(resetCategoryAction())
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

const commentSlices = createSlice({
    name: "comment",
    initialState: {},
    extraReducers: builder => {
        builder.addCase(createCommentAction.pending, (state, action) => {
            state.loading = true;
        });
        //dispatch action to redirect
        // builder.addCase(createCommentAction, (state, action) => {
        //     state.isCreated = true;
        // })
        builder.addCase(createCommentAction.fulfilled, (state, action) => {
            state.loading = false;
            state.commentCreated = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(createCommentAction.rejected, (state, action) => {
            state.loading = false;
            state.commentCreated = undefined;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
    },
});

export default commentSlices.reducer;