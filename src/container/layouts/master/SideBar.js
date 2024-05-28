import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from '../../../context/AuthContext';
import userLogo from '../../../themes/images/user.jpg';

const SideBar = () => {
    const location = useLocation();
    const { user } = useAuth();

    return (
        <>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src={userLogo} className="img-circle elevation-2" alt="User Avtar" />
                    </div>
                    <div className="info">
                        { !!user && <div className="text-light d-block">{user.last_name} {user.first_name}</div> }
                    </div>
                </div>
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item menu-open">
                            <NavLink className={'nav-link ' + (location.pathname === '/dashboard' ? 'active' : '') } to="/dashboard">
                                <i className="nav-icon fas fa-tachometer-alt"></i> <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="nav-item menu-open">
                            <NavLink className={'nav-link ' + (location.pathname === '/employee' ? 'active' : '') } to="/employee">
                                <i className="nav-icon fas fa-users"></i> <span>Employee</span>
                            </NavLink>
                        </li>
                        <li className="nav-item menu-open">
                            <NavLink className={'nav-link ' + (location.pathname === '/equipment' ? 'active' : '') } to="/equipment">
                                <i className="nav-icon fas fa-cogs"></i> <span>Equipment</span>
                            </NavLink>
                        </li>
                        <li className="nav-item menu-open">
                            <NavLink className={'nav-link ' + (location.pathname === '/customer' ? 'active' : '') } to="/customer">
                                <i className="nav-icon fas fa-users"></i> <span>Customer</span>
                            </NavLink>
                        </li>
                        <li className="nav-item menu-open">
                            <NavLink className={'nav-link ' + (location.pathname === '/plan' ? 'active' : '') } to="/plan">
                                <i className="nav-icon fas fa-tags"></i> <span>Plan</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default SideBar;