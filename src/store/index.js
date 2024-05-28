import { configureStore } from '@reduxjs/toolkit'

/* all reducer */
import authReducer from './authSlice';
import employeeReducer from './employeeSlice';
import employeeRoleReducer from './employeeRoleSlice';
import equipmentReducer from './equipmentSlice';
import customerReducer from './customerSlice';
import planReducer from './planSlice';

/* store setup */
export default configureStore({
    reducer: {
        auth: authReducer,
        employee: employeeReducer,
        employeeRole: employeeRoleReducer,
        equipment: equipmentReducer,
        customer: customerReducer,
        plan: planReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})