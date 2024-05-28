import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider} from './context/AuthContext';

// middlewares
import ProtectedRoute from "./components/ProtectedRoute";

// Pages List
import Login from "./container/pages/auth/Login";
import Dashboard from "./container/pages/Dashboard";

import EmployeeList from "./container/pages/employee/List";
import AddNewEmployee from "./container/pages/employee/Add";
import EditEmployee from "./container/pages/employee/Edit";

import EquipmentList from "./container/pages/equipment/List";
import AddNewEquipment from "./container/pages/equipment/Add";
import EditEquipment from "./container/pages/equipment/Edit";
import ViewEquipment from "./container/pages/equipment/View";

import CustomerList from "./container/pages/customer/List";
import AddNewCustomer from "./container/pages/customer/Add";
import EditCustomer from "./container/pages/customer/Edit";

import PlanList from "./container/pages/plan/List";
import AddNewPlan from "./container/pages/plan/Add";
import EditPlan from "./container/pages/plan/Edit";

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<Login/>}/>
                        <Route exact path="/dashboard" element={<ProtectedRoute> <Dashboard/> </ProtectedRoute>}/>
                        <Route exact path="/employee" element={<ProtectedRoute> <EmployeeList/> </ProtectedRoute>}/>
                        <Route exact path="/employee/new" element={<ProtectedRoute> <AddNewEmployee/> </ProtectedRoute>}/>
                        <Route exact path="/employee/edit/:id" element={<ProtectedRoute> <EditEmployee/> </ProtectedRoute>}/>
                        <Route exact path="/equipment" element={<ProtectedRoute> <EquipmentList/> </ProtectedRoute>}/>
                        <Route exact path="/equipment/new" element={<ProtectedRoute> <AddNewEquipment/> </ProtectedRoute>}/>
                        <Route exact path="/equipment/edit/:id" element={<ProtectedRoute> <EditEquipment/> </ProtectedRoute>}/>
                        <Route exact path="/equipment/show/:id" element={<ProtectedRoute> <ViewEquipment/> </ProtectedRoute>}/>
                        <Route exact path="/customer" element={<ProtectedRoute> <CustomerList/> </ProtectedRoute>}/>
                        <Route exact path="/customer/new" element={<ProtectedRoute> <AddNewCustomer/> </ProtectedRoute>}/>
                        <Route exact path="/customer/edit/:id" element={<ProtectedRoute> <EditCustomer/> </ProtectedRoute>}/>
                        <Route exact path="/plan" element={<ProtectedRoute> <PlanList/> </ProtectedRoute>}/>
                        <Route exact path="/plan/new" element={<ProtectedRoute> <AddNewPlan/> </ProtectedRoute>}/>
                        <Route exact path="/plan/edit/:id" element={<ProtectedRoute> <EditPlan/> </ProtectedRoute>}/>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}

export default App;
