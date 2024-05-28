import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosapi from '../utilities/axiosapi';

export const employeeRoleList = createAsyncThunk(
    'role/list',
    async () => {
        const response = await axiosapi.get('role');
        return response;
    }
)

export const employeeRoleSlice = createSlice({
    name: 'role',
    initialState: {
        roles:{}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(employeeRoleList.fulfilled,(state, { payload }) => {
            if(payload.data.success === true){
                state.roles = payload.data.data;
            }
        });
        builder.addCase(employeeRoleList.rejected, (state, { payload }) => {
            if(payload.data.success === false){
                state.roles = {};
            }
        })
    }
})

export default employeeRoleSlice.reducer