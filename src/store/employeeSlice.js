import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosapi from '../utilities/axiosapi';

export const employeeList = createAsyncThunk(
    'employee/list',
    async (params) => {
        const response = await axiosapi.get('employee', { params });
        return response;
    }
)

export const storeEmployee = createAsyncThunk(
    'employee/store',
    async (employeeDetails) => {
        const response = await axiosapi.post('employee',employeeDetails,{ headers: { "Content-Type": "multipart/form-data", "Accept": "application/json" } });
        return response;
    }
)

export const employeeById = createAsyncThunk(
    'employee/show',
    async (employeeId) => {
        const response = await axiosapi.get(`employee/${employeeId}`);
        return response;
    }
)

export const updateEmployee = createAsyncThunk(
    'employee/update',
    async (employeeDetails) => {
        const response = await axiosapi.post(`employee/${employeeDetails.get('id')}`, employeeDetails, { headers: { "Content-Type": "multipart/form-data", "Accept": "application/json" } });
        return response.data;
    }
);

export const deleteEmployeeById = createAsyncThunk(
    'employee/delete',
    async (employeeId) => {
        const response = await axiosapi.delete(`employee/${employeeId}`);
        return response;
    }
)

export const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employees:{}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(employeeList.fulfilled,(state, { payload }) => {
            if(payload.data.success === true){
                state.employees = payload.data.data.employees;
            }
        });
        builder.addCase(employeeList.rejected, (state, { payload }) => {
            if(payload.data.success === false){
                state.employees = {};
            }
        })
    }
})

export default employeeSlice.reducer