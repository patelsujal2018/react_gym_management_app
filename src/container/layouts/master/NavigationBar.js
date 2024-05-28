import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { userLogout } from "../../../store/authSlice";

const NavigationBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(userLogout()).then(res => {
            if(res.payload.data.success === true) {
                setTimeout( ()=>{
                    navigate('/');
                },process.env.REACT_APP_NOTIFICATION_TIME);
            } else {
                console.log(res);
            }
        });

        navigate('/');
    }

    return (
        <>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <div className="nav-link pl-4" role="button"><i className="fas fa-bars"></i></div>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <div className="nav-link" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt"></i>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default NavigationBar;