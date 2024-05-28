import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosapi from '../utilities/axiosapi';

export const equipmentList = createAsyncThunk(
    'equipment/list',
    async (params) => {
        const response = await axiosapi.get('equipment', { params });
        return response;
    }
)

export const storeEquipment = createAsyncThunk(
    'equipment/store',
    async (equipmentDetails) => {
        const response = await axiosapi.post('equipment',equipmentDetails,{ headers: { "Content-Type": "multipart/form-data", "Accept": "application/json" } });
        return response;
    }
)

export const equipmentById = createAsyncThunk(
    'equipment/show',
    async (equipmentId) => {
        const response = await axiosapi.get(`equipment/${equipmentId}`);
        return response;
    }
)

export const updateEquipment = createAsyncThunk(
    'equipment/update',
    async (equipmentDetails) => {
        const response = await axiosapi.post(`equipment/${equipmentDetails.get('id')}`, equipmentDetails, { headers: { "Content-Type": "multipart/form-data", "Accept": "application/json" } });
        return response.data;
    }
);

export const deleteEquipmentById = createAsyncThunk(
    'equipment/delete',
    async (equipmentId) => {
        const response = await axiosapi.delete(`equipment/${equipmentId}`);
        return response;
    }
)

export const equipmentMaintenanceById = createAsyncThunk(
    'equipment/maintenance',
    async (equipmentDetails) => {
        const response = await axiosapi.post('equipment-maintenance',equipmentDetails);
        return response;
    }
)

export const removeEquipmentMaintenanceById = createAsyncThunk(
    'equipment/remove-maintenance',
    async (equipmentDetails) => {
        const response = await axiosapi.post('remove-equipment-from-maintenance',equipmentDetails);
        return response;
    }
)

export const equipmentSlice = createSlice({
    name: 'equipment',
    initialState: {
        equipments:{}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(equipmentList.fulfilled,(state, { payload }) => {
            if(payload.data.success === true){
                state.equipments = payload.data.data.equipments;
            }
        });
        builder.addCase(equipmentList.rejected, (state, { payload }) => {
            if(payload.data.success === false){
                state.equipments = {};
            }
        })
    }
})

export default equipmentSlice.reducer