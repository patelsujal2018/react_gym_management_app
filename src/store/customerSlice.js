import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosapi from '../utilities/axiosapi';

export const customerList = createAsyncThunk(
    'customer/list',
    async (params) => {
        const response = await axiosapi.get('customer', { params });
        return response;
    }
)

export const storeCustomer = createAsyncThunk(
    'customer/store',
    async (customerDetails) => {
        const response = await axiosapi.post('customer',customerDetails,{ headers: { "Content-Type": "multipart/form-data", "Accept": "application/json" } });
        return response;
    }
)

export const customerById = createAsyncThunk(
    'customer/show',
    async (customerId) => {
        const response = await axiosapi.get(`customer/${customerId}`);
        return response;
    }
)

export const updateCustomer = createAsyncThunk(
    'customer/update',
    async (customerDetails) => {
        const response = await axiosapi.post(`customer/${customerDetails.get('id')}`, customerDetails, { headers: { "Content-Type": "multipart/form-data", "Accept": "application/json" } });
        return response.data;
    }
);

export const deleteCustomerById = createAsyncThunk(
    'customer/delete',
    async (customerId) => {
        const response = await axiosapi.delete(`customer/${customerId}`);
        return response;
    }
)

export const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        customers:{}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(customerList.fulfilled,(state, { payload }) => {
            if(payload.data.success === true){
                state.customers = payload.data.data.customers;
            }
        });
        builder.addCase(customerList.rejected, (state, { payload }) => {
            if(payload.data.success === false){
                state.customers = {};
            }
        })
    }
})

export default customerSlice.reducer