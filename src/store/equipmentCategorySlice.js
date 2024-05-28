import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosapi from '../utilities/axiosapi';

export const equipmentCategoryList = createAsyncThunk(
    'categories/list',
    async () => {
        const response = await axiosapi.get('equipment-category');
        return response;
    }
)

export const equipmentCategorySlice = createSlice({
    name: 'equipmentCategory',
    initialState: {
        categories:{}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(equipmentCategoryList.fulfilled,(state, { payload }) => {
            if(payload.data.success === true){
                state.categories = payload.data.data;
            }
        });
        builder.addCase(equipmentCategoryList.rejected, (state, { payload }) => {
            if(payload.data.success === false){
                state.categories = {};
            }
        })
    }
})

export default equipmentCategorySlice.reducer