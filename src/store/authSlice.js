import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosapi from '../utilities/axiosapi';

export const userLogin = createAsyncThunk(
    'user/login',
    async (loginDetails) => {
        const response = await axiosapi.post('/auth/login',loginDetails);
        return response;
    }
)

export const userDetails = createAsyncThunk(
    'user/details',
    async () => {
        const response = await axiosapi.get('/auth/me');
        return response;
    }
)

export const userLogout = createAsyncThunk(
    'user/logout',
    async () => {
        const response = await axiosapi.get('/auth/logout');
        return response;
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userLogin.fulfilled,(state, { payload }) => {
            if(payload.data.success === true){
                state.isAuthenticated = true;
            }
        });
        builder.addCase(userDetails.fulfilled, (state, { payload }) => {
            if(payload.data.success === true){
                state.isAuthenticated = true;
                state.user = payload.data.data;
            }
        });
        builder.addCase(userDetails.rejected,(state, { payload }) => {
            if(payload === undefined) {
                state.isAuthenticated = false;
                state.user = null;
            }
        });
        builder.addCase(userLogout.fulfilled, (state, { payload }) => {
            if(payload.data.success === true){
                state.isAuthenticated = false;
                state.user = null;
            }
        });
    }
})

export default authSlice.reducer