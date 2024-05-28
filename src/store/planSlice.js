import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosapi from '../utilities/axiosapi';

export const planList = createAsyncThunk(
    'plan/list',
    async (params) => {
        const response = await axiosapi.get('plan', { params });
        return response;
    }
)

export const storePlan = createAsyncThunk(
    'plan/store',
    async (planDetails) => {
        const response = await axiosapi.post('plan',planDetails);
        return response;
    }
)

export const planById = createAsyncThunk(
    'plan/show',
    async (planId) => {
        const response = await axiosapi.get(`plan/${planId}`);
        return response;
    }
)

export const updatePlan = createAsyncThunk(
    'plan/update',
    async (planDetails) => {
        const response = await axiosapi.post(`plan/${planDetails.get('id')}`, planDetails);
        return response.data;
    }
);

export const deletePlanById = createAsyncThunk(
    'plan/delete',
    async (planId) => {
        const response = await axiosapi.delete(`plan/${planId}`);
        return response;
    }
)

export const getAllPlans = createAsyncThunk(
    'plan/all',
    async () => {
        const response = await axiosapi.get('company-plans-list');
        return response;
    }
)

export const planSlice = createSlice({
    name: 'plan',
    initialState: {
        plans:{}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(planList.fulfilled,(state, { payload }) => {
            if(payload.data.success === true){
                state.plans = payload.data.data.plans;
            }
        });
        builder.addCase(planList.rejected, (state, { payload }) => {
            if(payload.data.success === false){
                state.plans = {};
            }
        })
    }
})

export default planSlice.reducer