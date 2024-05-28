import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { userDetails } from "../store/authSlice";
import { Spinner } from "react-bootstrap";
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const checkAuthenticated = async () => {
            dispatch(userDetails()).then(res => {
                if (res.payload === undefined) {
                    navigate('/');
                } else {
                    if (res.payload.data.success === false) {
                        navigate('/');
                    }
                }
            });
        }

        checkAuthenticated();
    }, [dispatch,navigate]);

    return (isAuthenticated === true) ? children : <div className="loading show"> <Spinner className="loader" animation="grow" variant="primary" /> </div>;
};

export default ProtectedRoute;